<!-- Главная страница: приветствие, погода, дата день недели, город -->
<template>
  <div class="date-info">
    <div class="wrapper">
      <form
        class="enter-city"
        @submit.prevent="
          forecastStore.getCityForecast(city),
            forecastStore.getNextDaysForecasts(city),
            setLocalStorage(city),
            (city = '')
        "
      >
        <input
          class="searchbar transparent"
          id="search"
          type="text"
          placeholder="Введите город"
          v-model="city"
        />
        <button class="button transparent" id="button" type="submit">GO</button>
      </form>

      <div v-if="!forecastStore.errorText">
        <div class="flex day-forecast" v-if="forecast">
          <div class="day-forecast__info">
            <div class="flex-column">
              <span class="today">сегодня</span>
              <p class="week-day">{{ findDate.weekDay }}</p>
              <p class="date">{{ findDate.dateToday }}</p>
            </div>
          </div>
          <div class="time">{{ findDate.time }}</div>
        </div>

        <div class="flex full-forecast">
          <ForecastItemFull :forecast="forecast" />
        </div>

        <div class="flex future-forecast" v-if="nextDaysForecastList">
          <ForecastItemShort
            v-for="day in days"
            :key="day"
            :forecastItem="validator(day.dtDay.toString(), day.dtNight.toString())"
            :weekend="day.week"
            :date="day.date"
          /><!--:dtDay="day.dtDay.toString()"
              :dtNight="day.dtNight.toString()"
          "-->
        </div>
      </div>
    </div>

    <div class="error-text" v-if="forecastStore.errorText">
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useForecastStore } from '@/stores/forecast'
import { useFindDateStore } from '@/stores/findDate'
import { useWeatherImgStore } from '@/stores/weatherImg'

import ForecastItemFull from '@/components/ForecastItemFull.vue'
import ForecastItemShort from '@/components/ForecastItemShort.vue'

const forecastStore = useForecastStore()
const findDate = useFindDateStore()
const weatherImg = useWeatherImgStore()

const days = computed(() => {
  const week = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  // const days = ['day1','day2','day3','day4','day5']

  let today = findDate.dateFind

  let firstDay = new Date()
  firstDay.setDate(today.getDate() + 1)

  let nextDay = new Date()
  nextDay.setDate(today.getDate() + 2)

  let thirdDay = new Date()
  thirdDay.setDate(today.getDate() + 3)

  let fourthDay = new Date()
  fourthDay.setDate(today.getDate() + 4)

  let fifthDay = new Date()
  fifthDay.setDate(today.getDate() + 5)

  const day1 = {
    week: week[firstDay.getDay()],
    date: firstDay.getDate() + ' ' + firstDay.toLocaleString('default', { month: 'short' }),
    dtDay: firstDay.setUTCHours(12, 0, 0),
    dtNight: firstDay.setUTCHours(21, 0, 0)
  }

  let day2 = {
    week: week[nextDay.getDay()],
    date: nextDay.getDate() + ' ' + nextDay.toLocaleString('default', { month: 'short' }),
    dtDay: nextDay.setUTCHours(12, 0, 0),
    dtNight: nextDay.setUTCHours(21, 0, 0)
  }

  let day3 = {
    week: week[thirdDay.getDay()],
    date: thirdDay.getDate() + ' ' + thirdDay.toLocaleString('default', { month: 'short' }),
    dtDay: thirdDay.setUTCHours(12, 0, 0),
    dtNight: thirdDay.setUTCHours(21, 0, 0)
  }
  let day4 = {
    week: week[fourthDay.getDay()],
    date: fourthDay.getDate() + ' ' + fourthDay.toLocaleString('default', { month: 'short' }),
    dtDay: fourthDay.setUTCHours(12, 0, 0),
    dtNight: fourthDay.setUTCHours(21, 0, 0)
  }
  let day5 = {
    week: week[fifthDay.getDay()],
    date: fifthDay.getDate() + ' ' + fifthDay.toLocaleString('default', { month: 'short' }),
    dtDay: fifthDay.setUTCHours(12, 0, 0),
    dtNight: fifthDay.setUTCHours(21, 0, 0)
  }

  return [day1, day2, day3, day4, day5]
})

const city = ref()
const forecast = ref()
const nextDaysForecastList = ref([])
const errorText = ref()

const validator = (day, night) => {
  day = +day.slice(0, -3)
  night = +night.slice(0, -3)
  if (nextDaysForecastList.value.length !== 0) {
    const listItemDay = nextDaysForecastList.value.filter((item) => item.dt == day)
    const listItemNight = nextDaysForecastList.value.filter((item) => item.dt == night)
    console.log(listItemDay, listItemNight)
    if (listItemDay.length != 0 && listItemNight.length != 0) {
      const descr = listItemDay[0].weather[0].description
      const svg = weatherImg.weatherSvg.filter((item) => item.title == descr)
      const item = {
        svg: svg[0],
        dayTemp: listItemDay[0].main.temp,
        weather: listItemDay[0].weather,
        nightTemp: listItemNight[0].main.temp
      }
      return item
    } else {
      const item = null
      return item
    }
  } else {
    return
  }
}

const setLocalStorage = (city) => {
  localStorage.setItem('город', city)
}

watchEffect(() => (forecast.value = forecastStore.forecast))
watchEffect(() => (nextDaysForecastList.value = forecastStore.forecastList))
watchEffect(() => (errorText.value = forecastStore.errorText))

onMounted(async () => {
  let currentCity = localStorage.getItem('город')
  if (!currentCity) {
    currentCity = 'Москва'
  }
  await forecastStore.getCityForecast(currentCity)
  await forecastStore.getNextDaysForecasts(currentCity)
  nextDaysForecastList.value = forecastStore.forecastList
})
</script>

<style lang="scss" scoped>
.date-info {
  position: relative;
  width: 100vw;
  height: 100vh;
  border-radius: 25px;
  color: #fff;
}

.wrapper {
  height: 100vh;
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  gap: 2rem;
  /* justify-content: space-between; */
}

.week-day {
  font-size: 1rem;
}
.time {
  /* position: absolute;
  right: 10px; */
  margin-left: 2rem;
  font-size: 3rem;
}
.flex {
  align-items: center;
  color: #fff;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.day-forecast {
  display: flex;
  align-items: center;
  justify-content: center;
  &__info {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.today {
  color: #939cb0;
}
.searchbar,
.button {
  margin: 1rem 0 2rem;
  padding: 0;
  font-size: 1rem;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  color: white;
  border: none;
}
.searchbar {
  text-transform: none;
}
.searchbar::-webkit-input-placeholder {
  color: white;
  opacity: 0.55;
}
.searchbar::-moz-placeholder {
  color: white;
  opacity: 0.55;
}
.searchbar:-ms-input-placeholder {
  color: white;
  opacity: 0.55;
}
.searchbar:-moz-placeholder {
  color: white;
  opacity: 0.55;
}
.button:focus,
.searchbar:focus {
  outline: none;
  color: white;
}
.searchbar:focus::-webkit-input-placeholder {
  color: white;
  opacity: 0.7;
}
.searchbar:focus::-moz-placeholder {
  color: white;
  opacity: 0.7;
}
.searchbar:focus:-ms-input-placeholder {
  color: white;
  opacity: 0.7;
}
.searchbar:focus:-moz-placeholder {
  color: white;
  opacity: 0.7;
}

.button {
  float: right;
  width: 100px;
}
.searchbar {
  float: left;
  //   width: 380px;
  border-bottom: solid thin white;
  // color: #e8e8e8;
  color: rgba(255, 255, 255, 1);
}
.transparent {
  background: transparent;
}
.enter-city {
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-text {
  position: absolute;
  top: 45vh;
  left: 40%;
  font-size: 2rem;
  text-align: center;
  color: #fff;
}
.full-forecast {
  justify-content: center;
}
.future-forecast {
  justify-content: center;
  padding: 1rem;
  flex-wrap: wrap;
}
</style>