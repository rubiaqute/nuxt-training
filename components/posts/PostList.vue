<template>
  <section class="post-list">
    <PostPreview
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      :is-admin="isAdmin"
      :thumbnail="post.thumbnail"
      :title="post.title"
      :preview-text="post.previewText"
    />
    <!-- thumbnail="https://3dmatica.ru/upload/medialibrary/fdc/fdc45298532c1343781a66bc955d0a46.jpg"
    title="Hello There!" preview-text="This is my first post!" -->
    <!-- <PostPreview
      id="2"
      :is-admin="isAdmin"
      thumbnail="https://3dmatica.ru/upload/medialibrary/fdc/fdc45298532c1343781a66bc955d0a46.jpg"
      title="Hello There 2!"
      preview-text="This is my second post!"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      thumbnail="https://3dmatica.ru/upload/medialibrary/fdc/fdc45298532c1343781a66bc955d0a46.jpg"
      title="Hello There 3!"
      preview-text="This is my third post!"
    /> -->
  </section>
</template>

<script>
import PostPreview from '~/components/posts/PostPreview'

export default {
  components: {
    PostPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.post-lst {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
