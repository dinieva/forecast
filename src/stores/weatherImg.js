import { defineStore } from 'pinia'

export const useWeatherImgStore = defineStore('weatherImg', () => {
  
    const weatherSvg = [
      { title: 'ясно', path: '/forecast/weather-svg/sun.svg' },
      { title: 'небольшая облачность', path: '/forecast/weather-svg/sun-cloud.svg' },
      { title: 'переменная облачность', path: '/forecast/weather-svg/sun-cloud.svg' },
      {
        title: 'облачно с прояснениями',
        path: '/forecast/weather-svg/sun-cloud.svg'
      },
      { title: 'облачно', path: '/forecast/weather-svg/cloudy.svg' },
      { title: 'пасмурно', path: '/forecast/weather-svg/cloudy2.svg' },
    
      { title: 'снег', path: '/forecast/weather-svg/snowing.svg' },
      { title: 'небольшой снег', path: '/forecast/weather-svg/light-snow.svg' },
      { title: 'небольшой снегопад', path: '/forecast/weather-svg/light-snow.svg' },
      { title: 'небольшой дождь', path: '/forecast/weather-svg/rain.svg' },
      { title: 'морось', path: '/forecast/weather-svg/rain.svg' },
      { title: 'дождь', path: '/forecast/weather-svg/rain.svg' },
      { title: 'ливень', path: '/forecast/weather-svg/rain1.svg' },
      { title: 'мгла', path: '/forecast/weather-svg/fog.svg' },
      { title: 'туман', path: '/forecast/weather-svg/fog.svg' }
      ]
    return {
        weatherSvg
    }  
})