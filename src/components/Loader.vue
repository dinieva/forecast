<template>
  <span class="loader">Loading</span>
</template>
  
  <script setup>
</script>
  
  <style lang="scss" scoped>
.loader {
  color: var(--color-text);
  display: inline-block;
  position: relative;
  font-size: 48px;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  margin-top: 35vh;
}
.loader::after {
  content: '';
  width: 5px;
  height: 5px;
  background: currentColor;
  position: absolute;
  bottom: 10px;
  right: -5px;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}

@keyframes animloader {
  0% {
    box-shadow: 10px 0 rgba(255, 255, 255, 0), 20px 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 10px 0 black, 20px 0 rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 10px 0 black, 20px 0 black;
  }
}
</style>