<template>
    <div id="header">
        <nav>
            <nuxt-link to="/" class="text-logo__container" tag="div">
                <div class="text-logo">
                    <h1>karai music</h1>
                </div>
            </nuxt-link>
        </nav>
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

$min-width: 800px;

#header {
    position: relative;
    z-index: 100; // Order above content
}

nav {
    font-family: 'Lato', sans-serif;
    font-style: italic;
    width: 100%;
    height: 54px;
    background-color: white; // background-color: #121212;
}

.text-logo__container {
    text-align: center;
    height: 100%;
        display: grid;
    align-items: center;

    h1 {
        font-family: 'Lato', sans-serif;
        font-size: 28pt;
        color: black;
        display: inline-flex;
        text-shadow: -0.06em 0 red, 0.06em 0 cyan;
        cursor: pointer;
    }
}
</style>
