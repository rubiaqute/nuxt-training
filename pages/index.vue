<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news</h1>
      <PostList :posts="loadedPosts" />
      <!-- <nuxt-link :to="'/posts/' + 2" class="post-preview">
          <article>
            <div
              class="post-thumbnail"
              style="
                background-image: url('https://optosystems.ru/wp-content/uploads/2020/06/tech1.jpg');
              "
            ></div>
            <div class="post-content">
              <h2>Post Title 2</h2>
              <p>Preview Text 2</p>
            </div>
          </article>
        </nuxt-link> -->
    </section>
  </div>
</template>

<script>
import PostList from '~/components/posts/PostList'

export default {
  components: {
    PostList,
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    },
  },
}
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/030 main-page-background.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  /* position: absolute; */
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: #d3d3d3;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
