<!-- Главная страница: приветствие, погода, дата день недели, город -->
<template>
  <div class="date-info">
    <div class="loder" v-if="loader">
      <Loader />
    </div>
    <div class="content" v-else>
      <form
        class="enter-city"
        @submit.prevent="
          forecastStore.getCityForecast(city.trim()),
            forecastStore.getNextDaysForecasts(city.trim()),
            threeHoursForecastStore.getThreeHoursForecast(city.trim()),
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
      <div class="wrapper" v-if="!forecastStore.errorText">
        <div v-if="forecast.weather">
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

          <div class="flex full-forecast" v-if="forecast.weather">
            <ForecastItemFull :forecast="forecast" :currentImage="currentImage" />
          </div>

          <div class="hourly-forecast" v-if="hoursForecastData">
            <div><p>Текущая погода</p></div>
            <div class="hourly-forecast-items">
              <HourlyForecastComponent
                v-for="info in hoursForecastData"
                :key="info"
                :hourForecastData="info"
                :hour="info.dt_txt"
                :svg="findSvgPath(info.weather[0].description)"
              />
            </div>
          </div>

          <div class="future-forecast" v-if="nextDaysForecastList">
            <div><p>Следующие дни</p></div>
            <div class="flex">
              <ForecastItemShort
                v-for="day in days"
                :key="day"
                :forecastItem="validator(day.dtDay.toString(), day.dtNight.toString())"
                :weekend="day.week"
                :date="day.date"
              />
            </div>
          </div>
          <!--:dtDay="day.dtDay.toString()"
              :dtNight="day.dtNight.toString()"
          "-->
        </div>
      </div>

      <div class="error-text" v-if="forecastStore.errorText">
        <p>{{ errorText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useForecastStore } from '@/stores/forecast'
import { useFindDateStore } from '@/stores/findDate'
import { useThreeHoursForecastStore } from '@/stores/threeHoursDayForecast'
import { useWeatherImgStore } from '@/stores/weatherImg'

import Loader from '@/components/Loader.vue'
import ForecastItemFull from '@/components/ForecastItemFull.vue'
import HourlyForecastComponent from '@/components/HourlyForecastComponent.vue'
import ForecastItemShort from '@/components/ForecastItemShort.vue'

const forecastStore = useForecastStore()
const threeHoursForecastStore = useThreeHoursForecastStore()
const findDate = useFindDateStore()
const weatherImg = useWeatherImgStore()
const loader = ref('false')

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
const hoursForecastData = ref([])
const nextDaysForecastList = ref([])
const errorText = ref()
const currentImage = computed(() => {
  const allImages = weatherImg.weatherSvg
  const currentSvg = allImages.filter((img) => img.title === forecast.value.weather[0].description)
  return currentSvg
})

const validator = (day, night) => {
  day = +day.slice(0, -3)
  night = +night.slice(0, -3)
  if (nextDaysForecastList.value.length !== 0) {
    const listItemDay = nextDaysForecastList.value.filter((item) => item.dt == day)
    const listItemNight = nextDaysForecastList.value.filter((item) => item.dt == night)
    // console.log(listItemDay, listItemNight)
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
  localStorage.setItem('город', city.trim())
}

const findSvgPath = (descr) => {
  const currentSvg = weatherImg.weatherSvg.filter((img) => img.title == descr)
  return currentSvg
}
watchEffect(() => (forecast.value = forecastStore.forecast))
watchEffect(() => (hoursForecastData.value = threeHoursForecastStore.hoursForecastList))
watchEffect(() => (nextDaysForecastList.value = forecastStore.forecastList))
watchEffect(() => (errorText.value = forecastStore.errorText))
watchEffect(() => (loader.value = forecastStore.loader))

onMounted(async () => {
  let currentCity = localStorage.getItem('город') ? localStorage.getItem('город') : 'Москва'
  await forecastStore.getCityForecast(currentCity)
  await threeHoursForecastStore.getThreeHoursForecast(currentCity)
  await forecastStore.getNextDaysForecasts(currentCity)
  hoursForecastData.value = threeHoursForecastStore.hoursForecastList
  nextDaysForecastList.value = forecastStore.forecastList
})
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.date-info {
  position: relative;
  // width: 100vw;
  min-height: 100vh;
  border-radius: 25px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.wrapper {
  margin-top: 80px;
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  gap: 2rem;
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

.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  border-bottom: solid thin white;
  color: rgba(255, 255, 255, 1);
}
.transparent {
  background: transparent;
}
.enter-city {
  position: absolute;
  top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-text {
  font-size: 2rem;
  text-align: center;
  color: #fff;
}
.full-forecast {
  justify-content: center;
}
.future-forecast,
.hourly-forecast {
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  color: #939cb0;
  padding: 1rem;
  // flex-wrap: wrap;
  /*  @media (max-width: 1000px) {
    width: calc(100vw / 2);
  }
  @media (max-width: 580px) {
    width: calc(100vw / 1.3);
  } */
}
.hourly-forecast {
  // overflow: hidden;
  margin-top: 30px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  &-items {
    display: flex;
    min-width: 100%;
    min-height: 200px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.flex {
  align-items: center;
  color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>