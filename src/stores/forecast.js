import { defineStore } from 'pinia'
import axios from 'axios'; 
import { ref } from 'vue';
// { AxiosRequestConfig }
export const useForecastStore = defineStore('forecast', () => {

const apiKey = import.meta.env.VITE_API_KEY_OPENWEATHERMAP;

const loader = ref(true)
const forecast = ref({})
const timezone = ref({})
const errorText = ref()
const fewDaysForecastData = ref()
const forecastList = ref()

const getCityForecast = async(cityName) => {
  loader.value = true
  console.log('start getCityForecast',  cityName);
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=${apiKey}&units=metric`)
        // await axios.get(`https://jsonplaceholder.typicode.com/users`)

        .then(function (response) {
            forecast.value = response.data
            timezone.value = response.data.timezone
            console.log('func 1', cityName, forecast.value);
            // timezone.value = 10800 // временно так как превышено колличество запросов на сервер
            errorText.value = "" 
            loader.value = false
          })
          .catch(function (error) {
            loader.value = false
            forecast.value = ""
            errorText.value = "Информация не найдена" 
            console.log(error);
          });
    } 
    

const getNextDaysForecasts = async(city) => {
    // await axios.get(`api.openweathermap.org/data/2.5/forecast?q=London&cnt=3&lang=ru&appid=${apiKey}&units=metric`)
    await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&appid=${apiKey}&units=metric`)
    
    .then(function (response) {
        fewDaysForecastData.value = response.data
        forecastList.value = fewDaysForecastData.value.list
      })
      .catch(function (error) {
        console.log("ОШИБКА ",error.response);
      });
}    


return {
    forecast,
    timezone,
    errorText,
    fewDaysForecastData,
    forecastList,
    getCityForecast,
    getNextDaysForecasts,
    loader
    }
})