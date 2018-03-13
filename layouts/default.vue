<template>
  <div class="">
    <app-header v-if="['index'].indexOf($route.name) == -1"/>
    <app-home-header v-if="['index'].indexOf($route.name) > -1"/>
    <nuxt/>
    <appFooter/>
    <app-player v-if="this.$store.getters.getPlayerState"/>
  </div>
</template>

<script>
import Header from '@/components/shared/Header.vue'
import HomeHeader from '@/components/shared/HomeHeader.vue'
import Player from '@/components/shared/Player.vue'
import Footer from '@/components/shared/Footer.vue'


export default {
  components: {
    appHeader: Header,
    appHomeHeader: HomeHeader,
    appPlayer: Player,
    appFooter: Footer,
  },
}
</script>


<style>
body {
    background-color: #f7f7f7;
    color: #2b2b2b;
    font-family: 'Roboto Condensed', sans-serif;
}

.app-player {
  position: fixed;
  bottom: 0;
}

.spacer {
  min-height:  92vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s ease-out;
}
.fade-enter {
  transform: translate3d(-96px,0,0);
  opacity: 0;
}
.fade-enter-to {
  transform: translate3d(0,0,0);
  opacity: 1;
}
.fade-leave {
  transform: translate3d(0,0,0);
  opacity: 1;
}
.fade-leave-to {
  transform: translate3d(96px,0,0);
  opacity: 0;
}

.slide-enter-active, 
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-enter {
  transform: translate3d(0,96px,0);
}
.slide-leave-to {
  transform: translate3d(0,96px,0);
}
</style>
