<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">
          Last updated on {{ loadedPost.updatedDate }}
        </div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section>
      <p class="post-feedback">
        Let me know what you think about this one, send a mail to
        <a href="mailto:ingatok@inbox.ru">ingatok@inbox.ru</a>
      </p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  asyncData(context) {
    return axios
      .get(
        `https://nuxt-blog-8e612-default-rtdb.firebaseio.com/posts/${context.params.id}.json`
      )
      .then((res) => {
        return {
          loadedPost: res.data,
        }
      })
      .catch((e) => context.error(e))
    // eslint-disable-next-line nuxt/no-timing-in-fetch-data
    // setTimeout(() => {
    //   callback(null, {
    //     loadedPost: {
    //       id: '4',
    //       author: 'Inga',
    //       updatedDate: new Date(),
    //       content: 'Some stupid text that is not preview Text.',
    //       thumbnail:
    //         'https://3dmatica.ru/upload/medialibrary/fdc/fdc45298532c1343781a66bc955d0a46.jpg',
    //       title: `Additional Post 1 with id ${context.params.id}!`,
    //       previewText: 'This is my first post!',
    //     },
    //   })
    // }, 1000)
  },
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: #585858;
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
