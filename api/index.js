const express = require('express');
const cors = require('cors');

const { Post } = require('./models');

const app = express();

app.use(cors());

app.get('/posts', async (req, res) => {
  const posts = await Post.list(req.query)
    .then(posts => posts.map(post => ({
      id: post.id,
      title: post.title,
      date: post.date,
    })));

  res.send(posts);
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  // 投稿が存在しない場合には404エラー
  if (!post) {
    res.status(404).send({
      error: 'not found',
    });

    return;
  }

  res.send({
    id: post.id,
    title: post.title,
    date: post.date,
    content: post.contentHtml,
  });
});

app.listen(4000);
