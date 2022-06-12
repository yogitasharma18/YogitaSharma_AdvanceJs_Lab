const appId = "7e3f21edee540e6110af347b55eb1ab2";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const searchButton = document.querySelector('.search-box');

function getWeather(city){
    fetch(`${baseUrl}?q=${city}&appid=${appId}&units=metric`)
        .then(response => {

            // throw error if server returns 4xx response
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
            .then(data => {
                showWeather(data);
            })
            .catch(error => console.log(error.message));
}


// Rendering the data in html
function showWeather( data ) {
    const city = document.querySelector( '.city' );
    const date = document.querySelector( '.date' );
    const temp = document.querySelector( '.temp' );
    const weather = document.querySelector( '.weather' );
    const hilow = document.querySelector( '.hi-low' );

    city.textContent = data.name;
    date.textContent = getFormattedDate( new Date( data.dt * 1000 ) );
    temp.innerHTML = `${data.main.temp} <span>°c</span>`;
    weather.textContent = data.weather[0].main;
    hilow.textContent = `${data.main.temp_min} °c / ${data.main.temp_max} °c`;
}

// Getting date from timestamp response
function getFormattedDate( date ) {
    const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

searchButton.addEventListener('keypress', function(event){
    if(event.key == 'Enter'){
        getWeather(this.value);
    }
});