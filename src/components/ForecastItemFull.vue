<template>
  <div class="forecast-info">
    <div class="flex-column date-gradient">
      <div class="flex">
        <div class="left-side">
          <!-- <div class="city" v-if="forecast.city">{{ forecast.city.name }}</div> -->
          <div class="city">{{ forecast.name }}</div>
          <p class="temperature" v-if="forecast.main">{{ Math.ceil(forecast.main.temp) }}°C</p>
          <p class="feels_like" v-if="forecast.main">
            Ощущается {{ Math.ceil(forecast.main.feels_like) }} °C
          </p>
        </div>
        <!-- <img src="@/public/weather-svg/cloudy2.svg" alt="cloudy2.svg" />
        <img src="" alt="cloudy2.svg" /> -->
        <div class="right-side" v-if="currentImage">
          <img :src="currentImage[0].path" :alt="currentImage[0].title" class="weather-image" />
        </div>
      </div>
      <p class="weather-descr" v-if="forecast.weather">
        {{ forecast.weather[0].description }}
      </p>
      <p class="weather-descr" v-if="forecast.wind">ветер {{ forecast.wind.speed }} м/сек</p>
      <p class="weather-descr" v-if="forecast.main">
        давление {{ Math.ceil(forecast.main.pressure / 1.333) }} мм рт.ст.
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  forecast: {
    type: Object,
    required: true
  },
  currentImage: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.forecast-info {
  position: relative;
  margin-top: 1rem;
  width: calc(100vw / 3);
  height: 270px;
  border-radius: 25px;
  background-image: url('https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80');
  -webkit-box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
  -webkit-transition: -webkit-transform 300ms ease;
  transition: -webkit-transform 300ms ease;
  -o-transition: transform 300ms ease;
  transition: transform 300ms ease;
  transition: transform 300ms ease, -webkit-transform 300ms ease;
  -webkit-transform: translateZ(0) scale(1.02) perspective(1000px);
  transform: translateZ(0) scale(1.02) perspective(1000px);
  float: left;
  @media (max-width: 1000px) {
    width: calc(100vw / 2);
  }
  @media (max-width: 580px) {
    width: calc(100vw / 1.3);
  }
}
.date-gradient {
  position: absolute;
  width: calc(100vw / 3);
  height: 270px;
  background-image: var(--gradient);
  border-radius: 25px;
  opacity: 0.8;
  padding: 1.5rem;

  @media (max-width: 1000px) {
    width: calc(100vw / 2);
  }
  @media (max-width: 580px) {
    width: calc(100vw / 1.3);
  }
}
.city {
  color: white;
  border-color: #ebe7e7;
  border-width: 1.5px !important;
  border-style: solid;
  border-radius: 3px;
  font-size: 1rem;
  padding: 0.3rem;
  background-color: rgba(153, 148, 148, 0.3);
  font-weight: 500;
}
.temperature {
  font-size: 3rem;
}
.feels_like {
  font-size: 1rem;
}
.weather-image {
  width: 100px;
  height: 100px;
}
.weather-descr,
.feels_like {
  margin-top: 0.5rem;
}
</style>