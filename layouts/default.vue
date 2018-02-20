<template>
  <div class="">
    <app-header/>
    <nuxt/>
    <appFooter/>
  </div>
</template>

<script>
import Header from '@/components/shared/Header.vue';
// import Player from './components/shared/Player.vue';
import Footer from '@/components/shared/Footer.vue';
// import { eventBus } from './components/eventBus/eventBus';


export default {
  components: {
    appHeader: Header,
    // appPlayer: Player,
    appFooter: Footer,
  },
  // data() {
  //   return {
  //     showPlayer: false,
  //   }
  // },
  // created() {
  //   eventBus.$on('showPlayer', (showPlayer) => {
  //     this.showPlayer = showPlayer;
  //   });
  // },
}
</script>


<style>
body {
    background-color: #111111;
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
