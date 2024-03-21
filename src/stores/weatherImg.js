import { defineStore } from 'pinia'

export const useWeatherImgStore = defineStore('weatherImg', () => {

    const weatherSvg = [
        { title: 'ясно', path: './public/weather-svg/sun.svg' },
        { title: 'небольшая облачность', path: './public/weather-svg/sun-cloud.svg' },
        { title: 'переменная облачность', path: './public/weather-svg/sun-cloud.svg' },
        {
          title: 'облачно с прояснениями',
          path: './public/weather-svg/sun-cloud.svg'
        },
        { title: 'облачно', path: './public/weather-svg/cloudy.svg' },
        { title: 'пасмурно', path: './public/weather-svg/cloudy2.svg' },
      
        { title: 'снег', path: './public/weather-svg/snowing.svg' },
        { title: 'небольшой снег', path: './public/weather-svg/light-snow.svg' },
        { title: 'небольшой снегопад', path: './public/weather-svg/light-snow.svg' },
        { title: 'небольшой дождь', path: './public/weather-svg/rain.svg' },
        { title: 'морось', path: './public/weather-svg/rain.svg' },
        { title: 'ливень', path: './public/weather-svg/rain1.svg' },
        { title: 'мгла', path: './public/weather-svg/fog.svg' },
        { title: 'туман', path: './public/weather-svg/fog.svg' }
      ]
    return {
        weatherSvg
    }  
})