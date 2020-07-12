// Time Stamp
function timeStamp(number) {

    let times = new Date(number * 1000);
    let hours = times.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + times.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + times.getSeconds();
    // 
    var formattedTime = hours + ':' + minutes.substr(-2);
    // console.log(formattedTime);
    return formattedTime;

}

// Celcuis to Fahre
    function celFah() {
        let tempDeg = document.querySelector('.tempdeg').innerText;
        let tempUnit = document.querySelector('.tempunit').innerText;
        console.log(tempDeg);
        console.log(tempUnit);

        if (tempUnit=='C') {
            newDeg = (tempDeg*9/5)+32;
            let newTempDeg = document.querySelector('.tempdeg');
            newTempDeg.innerText=newDeg;
            let newTempUnit = document.querySelector('.tempunit');
            newTempUnit.innerText='F';
            // let tempunit = document.querySelector('.tempunit').innerText="F";
        }else{
            if (tempUnit=='F') {
                newDeg = (tempDeg-32)*5/9;
                let newTempDeg = document.querySelector('.tempdeg');
                newTempDeg.innerText=newDeg;
                let newTempUnit = document.querySelector('.tempunit');
                newTempUnit.innerText='C';
            }
        }
        
    }


// timeStamp(1594531746);
const api= {
    key: "a3b6f15258058e4c4430dfc2ae1f7424",
    baseurl: "https://api.openweathermap.org/data/2.5"
}
const search = document.querySelector('.search');
search.addEventListener('keypress', setQuery);
// console.log(search.value);

// Getting searched location
function setQuery(evt) {
    if (evt.keyCode == 13 ) {
        console.log(search.value);
        getSearch(search.value)
        // let query = search.value
    }
}

// Using search location to query api
function getSearch(query) {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+query+'&units=metric&APPID=a3b6f15258058e4c4430dfc2ae1f7424')
    .then(weather =>{
        return weather.json();
    }).then(displayWeather);
    console.log(query);
    
}

function displayWeather(weather) {
    console.log(weather);
    // City
    let city = document.querySelector('.city');
    city.innerText= weather.name +','+ weather.sys.country;

    // Date
    let now = new Date();
    let date =document.querySelector('.date');
    date.innerText=dateBuild(now);

    // Weather & Temp
    let temp = document.querySelector('.tempdeg');
    temp.innerHTML=Math.round(weather.main.temp);

    let weathers = document.querySelector('.weather');
    weathers.innerText= weather.weather[0].main;

    // Sunrise & Sunset
    weatherSunrise = weather.sys.sunrise;
    weatherSunrise = timeStamp(weatherSunrise);
    let sunrise = document.querySelector('.sunrise');
    sunrise.innerHTML = weatherSunrise;
    
    weatherSunset = weather.sys.sunset;
    weatherSunset = timeStamp(weatherSunset);
    let sunset = document.querySelector('.sunset');
    sunset.innerHTML =weatherSunset;

    // Humidity
    let humidity = document.querySelector('.humidity');
    humidity.innerHTML = weather.main.humidity+"%";

    // Icons
    let icon= weather.weather[0].icon
    // iconUrl = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
    let imgUrl = document.getElementById("icon").src= 'http://openweathermap.org/img/wn/'+icon+'@2x.png';
    // imgUrl.src=iconUrl;
    // console.log(imgUrl);
    
}




function dateBuild(d) {
    let months =["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
    let days =["Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday","Sunday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    let newDate = day+', '+date+' '+month+', '+year+'.'
    // console.log(newDate);
    return newDate;
    // return '{day} {date} {month} {year}';
}


