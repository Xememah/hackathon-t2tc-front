<template>
  <div id="app">
    <router-link :to="{ name: 'home' }">
      <header>
        <span>{{ title }}</span>
      </header>
    </router-link>
    <main>
      <transition name="fade">
          <router-view></router-view>
      </transition>
    </main>
    <footer class="navbar-fixed-bottom">
      <div class="footer-title">Dane dostępne dzięki uprzejmości serwisu </div>
      <div class="logo-container">
        <a href="http://niepelnosprawnik.pl" target="_blank">
          <img src="static/logo.svg" alt="Niepełnosprawnik" class="logo"/>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app', 
  data() {
    return {
      title: "Nazwa aplikacji"
    }
  }
}
</script>

<style lang="scss">
  $accent: #4fc08d;

  body, html {
    margin: 0;
    height: 100%;
  }

  #app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  .footer-title {
    font-size: 1em;
    text-align: center;
    margin-bottom: 1em;
  }

  .logo {
    margin: 0 auto;
    margin-left: 2em;
    margin-right: 2em;
    max-width: 200px;
  }

  .logo-container {
    text-align: center;
  }

  .fade-enter-active, .fade-leave-active {
		transition-property: opacity;
		transition-duration: .15s;
	}
	.fade-enter-active {
		transition-delay: .15s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}

  main {
    text-align: center;
    height: calc(100% - 56px);
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: $accent;
    color: #ffffff;
    text-align: center;
    transition: all 0.3s ease;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }

    header:hover {
      opacity: 0.8;
    }

  footer {
    background-color: #f3f3f3;
    padding-top: 1em;
    padding-bottom: 1em;
    height: 100px;
  }

  button {
    border: none;
    background-color: $accent;
    color: #fff;
    border-radius: 5px;
    font-size: 1.3em;
    padding: 1em;
    margin: 2em;
    padding-left: 3em;
    padding-right: 3em;
  }
  a, a:hover, a:focus {
    text-decoration: none;
  }
</style>
