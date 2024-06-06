import { defineStore } from 'pinia'
import axios from 'axios'; 
import { ref } from 'vue';
import { useFindDateStore } from '@/stores/findDate'

export const useThreeHoursForecastStore = defineStore('threeHoursDayForecast', () => {

    const findDate = useFindDateStore()
    const apiKey = import.meta.env.VITE_API_KEY_OPENWEATHERMAP;
    const loader = ref(true)
    const errorText = ref()
    const hoursForecastList = ref()
    const currentCityTime = ref()
    
    const getThreeHoursForecast = async(cityName) => {
        loader.value = true
        
            await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ru&appid=${apiKey}&units=metric`)
            
            .then(function (response) {
                currentCityTime.value = Math.ceil(findDate.dateFind.getTime() / 1000)
                const deff = new Date().getTimezoneOffset() * 60 //разница в секундах смещение часового пояса относительно часового пояса UTC 
                console.log('Местное время города в секундах ',currentCityTime.value, 'Разница часового пояса', deff );
            const allForecastData = response.data.list
            hoursForecastList.value = allForecastData.filter( item => item.dt > currentCityTime.value - deff).splice(0,5)
                console.log('список 3часовой прогноз погоды ', response.data);
                
                errorText.value = "" 
                loader.value = false
            })
            .catch(function (error) {
                loader.value = false
                hoursForecastList.value = ""
                errorText.value = "Информация не найдена" 
                console.log(error);
            });
          }    
          return {
            hoursForecastList,
            getThreeHoursForecast,
            loader
            }  
})