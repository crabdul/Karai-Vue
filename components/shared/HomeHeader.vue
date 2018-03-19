<template>
    <div class="sitenav">
        <div class="nav-container">
            <nuxt-link to="/" class="nav-container__logo" tag="div" @click="closeMenu()">
                <h1>karai music</h1>
            </nuxt-link>
            <nav class="primary-nav">
                <ul class="primary-nav__list">
                    <nuxt-link class="primary-nav__item" :to="'tracks'" tag="li" ><a class="primary-nav__link">new tracks</a></nuxt-link>
                    <nuxt-link class="primary-nav__item" :to="'albums'" tag="li"><a class="primary-nav__link">new albums</a></nuxt-link>
                    <nuxt-link class="primary-nav__item" :to="'radio'" tag="li"><a class="primary-nav__link">karai radio</a></nuxt-link>
                </ul>
            </nav>
        </div>
        <nav-menu/>
    </div>
</template>

<script>
import NavMenu from '~/components/shared/NavMenu'

export default {
    components: {
        NavMenu
    }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/mixins.scss';
@import 'assets/styles/util.scss';


$min-width: 800px;

.sitenav {
    position: relative;
    z-index: 100; // Order above content
    font-style: italic;
    width: 100%;
    background-color: white; // background-color: #121212;
    height: 56px;
    display: grid;
}
.nav-container {
    text-align: center;
}

.nav-container__logo {
    display: grid;
    height: 100%;
    align-items: center;

    h1 {
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 30pt;
        color: black;
        display: inline-block;
        text-shadow: -0.05em 0 red, 0.05em 0 cyan;
        transition: all linear 0.1s;
        cursor: pointer;

        &:hover {
            text-shadow: 0.05em 0 red, -0.05em 0 cyan;
        }
    }
}
.primary-nav {
    display: none;
    font-style: normal;
}

.primary-nav__list {
    display: inline-flex;
}

.primary-nav__item {
    display: inline-block;
    padding: 1.5rem;
    font-size: 16pt;
}

.primary-nav__link {
    color: black;
    @include hover-underline;
}

@media screen and (min-width: $screen-m) {
    .sitenav {
        height: 100%;
    }
    .primary-nav {
        display: initial;
    }
    .nav-container__logo {
        padding-top: 2rem;

        h1 {
            font-size: 36pt;
        }
    }
}
</style>
