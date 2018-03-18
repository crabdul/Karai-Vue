<template>
    <div class="block-row top-row">
        <div class="section-header">
            <nuxt-link 
            :to="section" 
            tag="div" 
            class="section-header__title">
                <div v-for="(word, index) in header" :key="index">
                    <p>{{ word }}</p>
                </div>
            </nuxt-link>
        </div>
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    props: {
        section: { type: String },
        sectionTitle: { type: String }
    },
  computed: {
      header () {
          return this.sectionTitle.split(' ')
      }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.section-header {
    grid-area: header;
    background: white;
    margin-bottom: 32px;
}

.section-header__title {
    p {
        color: #2b2b2b;
        font-size: 40pt;
        font-family: 'Roboto Condensed', sans-serif;
        border-bottom: 3px solid transparent;
        display: inline-flex;
        font-style: italic;
    }
    &:hover p {
        border-bottom: 3px solid black;
    }
}

.top-row {
    display: grid;
    grid-template-areas: 'header''feature';
}
.block-row {
    grid-area: row;
}
.feature {
    grid-area: feature;
}

@media screen and (min-width: $screen-m) {
    .top-row {
        grid-template-areas: 'header .''feature feature';
    }
    .section-header {
        width: 220px;
    }
}

@media screen and (min-width: $screen-lg) {
    .top-row {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-areas: 'header feature feature feature';
        grid-gap: 64px;
    }
    .section-header {
        width: 100%;
        height: 100%;
    }
}

</style>
