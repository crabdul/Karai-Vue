<template>
  <div class="hello">
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
</style>
