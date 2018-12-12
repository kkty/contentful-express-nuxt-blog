<template>
  <div>
    <p
      v-text="formatDate(post.date)"
      class="post-date"/>
    <h1
      v-text="post.title"
      class="post-title"/>
    <div
      v-html="post.content"
      class="post-content"/>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params, error }) {
    const post = await app.$axios.get(`http://localhost:4000/posts/${params.id}`)
      .then(i => i.data)
      .catch(() => null);

    if (!post) {
      return error({
        statusCode: 404,
      });
    }

    return {
      post,
    };
  },
  methods: {
    formatDate(date) {
      return date.split('T')[0].split('-').map(Number).join('/');
    },
  },
};
</script>

<style scoped>
.post-date {
  font-size: 12px;
}

.post-title {
  font-size: 24px;
}

.post-content {
  padding: 20px 0;
}
</style>

<style>
.post-content h1 {
  font-size: 20px;
  margin: 5px 0;
}

.post-content h2 {
  font-size: 20px;
  margin: 5px 0;
}

.post-content h3 {
  font-size: 18px;
  margin: 5px 0;
}

.post-content h4 {
  font-size: 18px;
  margin: 5px 0;
}

.post-content h5 {
  font-size: 16px;
  margin: 5px 0;
}

.post-content h6 {
  font-size: 14px;
  margin: 5px 0;
}

.post-content p {
  font-size: 14px;
  margin: 5px 0;
}

.post-content img {
  max-width: 100%;
  margin: 5px 0;
}
</style>
