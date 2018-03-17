<template>
  <footer>
      <div class="footer__container">
            <div class="footer__logo">
                Karai Music © 2018
            </div>
            <div class="footer__info">
                Designed by <a href="https://www.linkedin.com/in/el-khazaani/" target="_blank">Karim El Khazaani</a> Hosted By <a href="https://www.digitalocean.com/" target="_blank">Digital Ocean</a>
            </div>
      </div>
  </footer>
</template>

<style lang="scss" scoped>
    footer {
        display: grid;
        font-family: 'Lato', sans-serif;
        color: white;
        height: 98px;
        background-color: #181818;
        text-align: center;
        font-size: 10pt;

        .footer__container {
            margin: auto;

            * {
                margin: 4px 0;
            }
        }

        a {
            text-decoration: none;
            color: white;
            &:hover {
                color: #E91E63;
            }
        }
    }
</style>