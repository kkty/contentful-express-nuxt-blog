<template>
  <div>
    <ul class="post-list">
      <template v-for="(post, idx) in postList">
        <li :key="'post'+idx">
          <nuxt-link :to="'/posts/' + post.id">
            <span v-text="post.title"/>
          </nuxt-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const postList = await app.$axios.get('http://localhost:4000/posts')
      .then(i => i.data);

    return {
      postList,
    };
  },
}
</script>

<style scoped>
.post-list {
  margin: 0;
  padding: 0;
}

.post-list li {
  list-style: none;
}
</style>
