<template >
  <div class="forecast-item__wrapper" v-if="forecastItem !== null">
    <div class="forecast__day">{{ weekend }}</div>
    <div class="forecast__date">{{ date }}</div>
    <div class="forecast__img" v-if="forecastItem.svg">
      <img :src="forecastItem.svg.path" :alt="forecastItem.svg.title" class="weather-image" />
    </div>

    <div class="forecast__max-temp">Днем: {{ Math.ceil(forecastItem.dayTemp) }}</div>
    <div class="forecast__min-temp">Ночью: {{ Math.ceil(forecastItem.nightTemp) }}</div>
    <div class="forecast__condition" v-if="forecastItem.weather">
      <p class="forecast__condition-text">{{ forecastItem.weather[0].description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  forecastItem: {
    type: Object,
    required: true
  },
  forecast: {
    type: Object,
    required: true
  },
  weekend: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.forecast-item__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
  padding-bottom: 2rem;
  align-items: center;
  text-align: center;
  padding: 0.5rem;
  width: 10rem;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
  color: #939cb0;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;

  &:hover {
    background-color: #fff;
    border: 1px solid #214ead;
  }
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