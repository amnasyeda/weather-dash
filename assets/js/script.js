// Variables 
var searchBtn = document.querySelector(".searchBtn");
var mainSearch = document.querySelector(".mainSearch");
var userInput = document.querySelector(".userInput");
var dailyForcast = document.querySelector(".dailyForcast");
var nameofCity = document.querySelector(".cityName");
var currentDay = document.querySelector(".curentDay");
var weatherIcon = document.querySelector(".weatherIcon");
var previousSearches = document.querySelector(".prevsearches")
var temperature = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var windSpeed = document.querySelector(".windSpeed");
var uvIndex = document.querySelector(".uvIndex");
var cardRow = document.querySelector(".cardRow");

// Save to local storage
var storage = JSON.parse(localStorage.getItem('prevsearches'));

// Current date display



