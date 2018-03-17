<template>
    <div id="home-page">
        <div class="container">
            <div class="container-fluid">
                <div class="block-row top-row">
                    <div class="section-header">
                        <nuxt-link 
                        :to="'tracks'" 
                        tag="div" 
                        class="section-header__title">
                            <div><p>best</p></div>
                            <div><p>new</p></div>
                            <div><p>tracks</p></div>
                        </nuxt-link>
                    </div>
                    <Feature class="feature" :post="trackPosts[0]" :section='"tracks"'/>
                </div>
            </div>
            <div class="container-fluid">
                <BlockTiles class="block-row track-posts" :posts="trackPosts.slice(1,5)" :section='"tracks"'/>
            </div>
            <div class="container-fluid">
                <div class="block-row top-row">
                    <div class="section-header">
                        <nuxt-link 
                        :to="'albums'" 
                        tag="div" 
                        class="section-header__title">
                            <div><p>best</p></div>
                            <div><p>new</p></div>
                            <div><p>albums</p></div>
                        </nuxt-link>
                    </div>
                    <Feature class="feature" :post="albumPosts[0]" :section='"albums"'/>
                </div>
            </div>
            <div class="container-fluid">
                <BlockTiles class="block-row album-posts" :posts="albumPosts.slice(1,5)" :section='"albums"'/>
            </div>
            <div class="container-fluid">
                <div class="block-row top-row">
                    <div class="section-header">
                        <nuxt-link 
                        :to="'radio'" 
                        tag="div" 
                        class="section-header__title">
                            <div><p>karai</p></div>
                            <div><p>radio</p></div>
                        </nuxt-link>
                    </div>
                    <radio-row class="feature radio-posts" :posts="radioPosts" :section='"radio"'/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlockTiles from '~/components/home/BlockTiles.vue'
import RadioRow from '~/components/home/RadioRow.vue'
import Feature from '~/components/home/Feature.vue'
import wp from '~/lib/wp'

export default {
  // GET Data before loading components
  async asyncData ({ params }) {
    const page = 1;
    const[trackPosts, albumPosts, radioPosts] = await wp.initialPosts()
    return {
      trackPosts,
      albumPosts,
      radioPosts,
    }
  },
  components: {
    BlockTiles,
    RadioRow,
    Feature
  }
}
</script>

<style lang="scss">
@import 'assets/styles/util.scss';

$screen-lg: 1200px;
$screen-m: 512px;

// Grid styling
#home-page {
    font-family: 'Lato', sans-serif;
    color: white;
}

.container-fluid {
    position: relative;
    background-color: #f7f7f7;
    margin: 64px 32px;
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

.header {
    padding: 8px 0;
    border-bottom: 1px solid white;
    cursor: pointer;
    h2 {
        font-size: 24pt;
    }
    &:hover {
        h2 {
            color: $pink-500;
        }
    }
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
    .container-fluid {
        display: grid;
        grid-template-columns: 1fr $screen-lg 1fr;
        grid-template-areas: '. row .';
    }
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