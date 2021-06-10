var searchBtn = document.querySelector(".searchBtn");
var weatherContainer = document.querySelector(".weatherContainer");
var dailyForecats = document.querySelector (".dailyForecat");
var temperature = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uvi = document.querySelector(".uvi");
var imageDaily = document.querySelector(".imageD");
var searchList = document.querySelector(".searchList");
var forecast = document.querySelector(".forecast");

// Create a local storage array to store search items
var storage = JSON.parse(localStorage.getItem('searchList')) || [];

function createForecastPage(data)  {
  forecast.innerHTML = "";
  for(var i = 5; i< data.list.length; i+=8){
    var icon = data.list[i].weather[0].icon;
    var iconForeUrl = "http://openweathermap.org/img/w/"+ icon +".png";  // get the icon link
    var date = moment(data.list[i].dt*1000).format("DD MMM YYYY");

    var image_f = document.createElement("img"); // create and img to house the icon
      image_f.src = iconForeUrl; //Add the icon url to the img
    var foreEl = document.createElement("div");
      foreEl.classList = "btn btn-info text-white divInline";
    var dt = document.createElement("p");
      dt.textContent = date;
    var pTemp = document.createElement("p");
      pTemp.textContent = "Temperature :" + data.list[i].main.temp +" °C";
    var pHum = document.createElement("p");
      pHum.textContent = "Humidity :" +data.list[i].main.humidity +" %";
    var pWind = document.createElement("p");
      pWind.textContent = "Wind :" +data.list[i].wind.speed + " MPH";
    foreEl.appendChild(dt);
    foreEl.appendChild(image_f);
    foreEl.appendChild(pTemp);
    foreEl.appendChild(pHum);
    foreEl.appendChild(pWind);
    forecast.appendChild(foreEl);
  }
};
// fetch UV info from nested API
function fetchUv (uv){
uvi.innerHTML = "";
var pUvi = document.createElement("p");
pUvi.textContent= "  UV Index :  "; 
var pSpan = document.createElement("span");
if (uv.current.uvi>5){
pSpan.classList = "btn btn-danger"}
else if(uv.current.uvi>2){
  pSpan.classList = "btn btn-warning"}
else{
  pSpan.classList = "btn btn-success"}

pSpan.textContent = uv.current.uvi
pUvi.appendChild(pSpan)
uvi.appendChild(pUvi);
};

function createDailyPage(data){
  imageDaily.innerHTML = "";
  var icon = data.weather[0].icon;

  var iconUrl = "http://openweathermap.org/img/w/"+ icon +".png";  // get the icon link
  var image_d = document.createElement("img"); // create and img to house the icon
  image_d.src = iconUrl; //Add the icon url to the img

// header section gets city name, date and icon
  var date = moment(data.dt*1000).format("DD MMM YYYY");
  var cityData = data.name + " - " + date + " - " ; 
  imageDaily.appendChild(image_d); // add the image to the header 

  // city name, date and icon is represented on the html 
  weatherContainer.innerHTML = `<h2> ${cityData} </h2>`;
  temperature.innerHTML= "  Temperature : " + data.main.temp + " °C";
  humidity.innerHTML = "  Humidity : " + data.main.humidity + " %";
  wind.innerHTML = "  Wind : " + data.wind.speed + " MPH";
  // store search values in the array initially created 
  storage.push(data.name);
  storage.reverse();
  storage.splice(10);
  // set values to the to the storage after making it string -the local storage datalist is coming when you search a city
  searchList.innerHTML = "" ;
  for(var i = 0; i< storage.length; i++){
    searchList.innerHTML += `<button class ="btnDist btn btn-secondary btn-sm" >  ${storage[i]}  </button>` ;
  }
  storage.reverse();
  localStorage.setItem('searchList', JSON.stringify(storage)); 
};
//to have the local storage data on the page even though you don"t search a city, the for loop is also applied outside of the class
storage.reverse(); // reversed multiple times to get the latest one always up
for(var i = 0; i< storage.length; i++){
  searchList.innerHTML += `<button class ="btnDist btn btn-secondary btn-sm" id=${i}>  ${storage[i]}  </button>` ;
}
storage.reverse(); // reversed again to keep it that way 


function getData (searchTerm){
var searchTerm = document.querySelector("#searchTerm").value;
//var resultBtn = document.querySelector("#buttons").value;
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=95692f2c0e1a1b5e25327de5d590734c&units=metric"
var apiUrlFive = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=dd622459b78841be1f2f087475975477&units=metric`

fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
          createDailyPage(data);
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          var apiUrlUv =`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=95692f2c0e1a1b5e25327de5d590734c`
          // nested api
         return fetch(apiUrlUv);
          }).then(function(response) {
            return response.json();
          }).then(function(uv){
            console.log(uv)
            console.log(uv.current.uvi)
            fetchUv(uv);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      });
      // fetch for 5 day forecast
fetch(apiUrlFive).then(function(response) {
      // request was successful
      if (response.ok) {
          response.json().then(function(data) {
              console.log(data);
              createForecastPage(data)         
            });
          } else {
            alert("Error: " + response.statusText);
          }
        });
      };

searchBtn.addEventListener("click", getData);

document.querySelector("#buttons").addEventListener("click", function(e){
  console.log(e);
  // IT IS CEHEKING IF THE CLIECKED PLACE IS A BUTTON OR NOT
  if(e.target.nodeName ==="BUTTON") { 
  document.querySelector("#searchTerm").value =  e.target.textContent;}
  else{
    return;
  }
  getData()
});


