<template>
  <div class="forecast-item__wrapper" v-if="hourForecastData !== null">
    <div class="forecast__hour">{{ hour.slice(10, -3) }}</div>
    <div class="forecast__img" v-if="svg">
      <img :src="svg[0].path" :alt="svg[0].title" class="weather-image" />
    </div>
    <div class="forecast__max-temp">{{ Math.ceil(hourForecastData.main.temp) }}°C</div>

    <div class="forecast__condition" v-if="hourForecastData.weather">
      <p class="forecast__condition-text">{{ hourForecastData.weather[0].description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  hourForecastData: {
    type: Object,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  svg: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.forecast-item__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // margin-top: 30px;
  padding-bottom: 2rem;
  align-items: center;
  text-align: center;
  padding: 0.5rem;
  // width: 10rem;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
  color: #939cb0;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
  min-width: 10rem;
  margin: 5px;
}

.forecast__day {
  font-size: 1.1rem;
  line-height: 22px;
  margin: 0;
  font-weight: 400;
}
.forecast__img {
  text-align: center;
  margin: 0 auto;
  width: 50px;
  height: 50px;
}
.weather-image {
  width: 48px;
  height: 48px;
}
.forecast__condition {
  padding: 0.5rem 0;
  height: 3rem;
}
.forecast__condition-text {
  max-width: 7rem;
  white-space: pre-wrap;
  // overflow-wrap: break-word;
  // word-wrap: break-word;
}
.forecast__max-temp {
  font-size: 18px;
  font-weight: 500;
}
.forecast__min-temp {
  color: #939cb0;
  line-height: 21px;
  margin-bottom: 8px;
}
</style>