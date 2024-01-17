let todayName = document.querySelector(".today-name");
let todayNumber = document.querySelector(".todayNumber");
let todayMonth = document.querySelector(".todayMonth");
let todayLocation = document.querySelector(".todayLocation");
let todayTemp = document.querySelector(".todayTemp");
let todayImage = document.querySelector(".todayImage");
let todayCondition = document.querySelector(".today-condition");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let windDirection = document.querySelector(".wind-direction");

//  next days

let nextDayName = document.getElementsByClassName("nextDay-name");
let nextDayImg = document.getElementsByClassName("nextDayImg");
let nextDayNameTemp = document.getElementsByClassName("nextDayNameTemp");
let nextDayCondition = document.getElementsByClassName("nextDayCondition");

// search
let searchInput = document.getElementById("search");

// date
let date = new Date();


// get API
async function getWeatherApi(city) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e0a8ae695ceb496db79103326240701&q=${city}&days=3`
  );
  let weatherData = await weatherResponse.json();
  // console.log(weatherData);
  return weatherData;
}

// display today data ==========>
function displayTodayData(data) {
  let todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-us", {
    month: "long",
  });
  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayImage.setAttribute("src", data.current.condition.icon);
  todayCondition.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph;
  windDirection.innerHTML = data.current.wind_dir;
}

// display next days data ======>
function displayNextDaysData(data) {
  let forcastData = data.forecast.forecastday;

  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forcastData[i+1].date);
    // console.log(nextDate);
    nextDayName[i].innerHTML = nextDate.toLocaleDateString('en-us', {weekday:'long'});
    nextDayNameTemp[i].innerHTML = forcastData[i + 1].day.avgtemp_c;
    nextDayImg[i].setAttribute("src", forcastData[i + 1].day.condition.icon);
    nextDayCondition[i].innerHTML = forcastData[i + 1].day.condition.text;
  }
  // console.log(forcastData);
}

// launch data===>
async function startApp(cityName='cairo') {
  let weatherData = await getWeatherApi(cityName);

  if(!weatherData.error){
    displayTodayData(weatherData);
    displayNextDaysData(weatherData);
  }
  
}
startApp();
searchInput.addEventListener('keyup',function(){
    startApp(searchInput.value)
})