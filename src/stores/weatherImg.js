import { defineStore } from 'pinia'

export const useWeatherImgStore = defineStore('weatherImg', () => {
  
    const weatherSvg = [
      { title: 'ясно', path: '@/weather-svg/sun.svg' },
      { title: 'небольшая облачность', path: '@/weather-svg/sun-cloud.svg' },
      { title: 'переменная облачность', path: '@/weather-svg/sun-cloud.svg' },
      {
        title: 'облачно с прояснениями',
        path: '@/weather-svg/sun-cloud.svg'
      },
      { title: 'облачно', path: '@/weather-svg/cloudy.svg' },
      { title: 'пасмурно', path: '@/weather-svg/cloudy2.svg' },
    
      { title: 'снег', path: '@/weather-svg/snowing.svg' },
      { title: 'небольшой снег', path: '@/weather-svg/light-snow.svg' },
      { title: 'небольшой снегопад', path: '@/weather-svg/light-snow.svg' },
      { title: 'небольшой дождь', path: '@/weather-svg/rain.svg' },
      { title: 'морось', path: '@/weather-svg/rain.svg' },
      { title: 'ливень', path: '@/weather-svg/rain1.svg' },
      { title: 'мгла', path: '@/weather-svg/fog.svg' },
      { title: 'туман', path: '@/weather-svg/fog.svg' }
      ]
    return {
        weatherSvg
    }  
})