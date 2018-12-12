<template>
  <div class="page">
    <section class="header">
      <nuxt-link to="/">
        <h1>Contentful + Express + Nuxt で作るブログ</h1>
      </nuxt-link>
    </section>
    <section class="main">
      <nuxt/>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  padding: 20px 0;
}

.header a {
  text-decoration: none;
}

.header h1 {
  font-size: 18px;
  /* text-align: center; */
}

.main {

}
</style>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  color: #333;
}
</style>
