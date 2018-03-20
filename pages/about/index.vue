<template>
  <div class="about">
    <div class="about-container">
      <h1>Karai Music</h1>
      <h2>[ 辛い ] - spicy 🌶️</h2>
      <div class="images">
        <div class="mugs">
          <img src="~/assets/img/abdul.jpg" alt="abdul">
        </div>
        <div class="mugs">
          <img src="~/assets/img/jolyon.png" alt="jolyon">
        </div>
      </div>
      <p>created by Abdulkarim E K and Jolyon S</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

.about {
  margin-top: 64px;
  margin-left: 32px;
  margin-right: 32px;
  min-height: 70vh;
}
.about-container > * {
  margin: 32px 0;
}

h1 {
  font-size: 30pt;
}

h2 {
  font-size: 20pt;
}

p {
  font-size: 14pt;
}
.image {
}
.mugs {
  display: inline-block;
  margin-right: 32px;
  img {
    width: 120px;
    border-radius: 50%;
  }
}

@media screen and (min-width: $screen-lg) {
    .about {
        display: grid;
        grid-template-areas: '. container .';
        grid-template-columns: 1fr $container 1fr;
    }
    .about-container {
      grid-area: container;
    }
}

</style>
