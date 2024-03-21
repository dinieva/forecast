import { defineStore } from 'pinia'
import {computed} from 'vue'
import { useForecastStore } from '@/stores/forecast'

export const useFindDateStore = defineStore('findDate', () => {
    const forecastStore = useForecastStore()
    const myTimeZoneValue = new Date().getTimezoneOffset() * 60000 //смещение часового пояса относительно часового пояса UTC в минутах для текущей локали.
    const dateFind = computed(() => {
      //шаг 1 текущее время региона (utc +3)
      const date = new Date()
      let dateInMs = date.getTime() // в миллисекундах
    
      //шаг 2 прослойка между текущим временем региона (utc +3) и временем для города в поиске, то есть находим всемирное время (utc 0)
      /*const myTimeZoneValue = 10800 // цифра миллисекунд в timeZone */
      // const dateUTCInMs = dateInMs - myTimeZoneValue * 1000
      const dateUTCInMs = dateInMs + myTimeZoneValue
      //шаг 3 время для города по поиску отталкиваясь от  (utc 0)
      const timezone = computed(() => {
         return forecastStore.timezone
      })
     let newDateInMs = dateUTCInMs + timezone.value * 1000 // время для города в другой таймзоне в миллисекундах
      
      return new Date(newDateInMs)
    })
    
    // расчитывается день недели
    const weekDay = computed(() => {
      const options = { weekday: 'long' }
      const dayOfWeek = dateFind.value.toLocaleString('ru-RU', options).toLocaleUpperCase()
      return dayOfWeek
    })
    // расчитывается день недели в числовом значении
    const weekDayNum = computed(() => {
        let weekDayNum = dateFind.value.getDay()
        return weekDayNum
      })
    // расчитывается день месяца
    const dateToday = computed(() => {
      let today = dateFind.value.getDate()
      let month = dateFind.value.toLocaleString('default', { month: 'short' })
      let year = dateFind.value.getFullYear()
      return today + ' ' + month + ' ' + year
    })
    // расчитывается время
    const time = computed(() => {
      return dateFind.value.toTimeString().substring(0, 5)
    })


    return {
        myTimeZoneValue,
        dateFind,
        weekDay,
        weekDayNum,
        dateToday,
        time
    }
})