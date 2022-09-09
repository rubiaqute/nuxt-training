import { Store } from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, addedPost) {
        state.loadedPosts.push(addedPost)

      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post=> post.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-8e612-default-rtdb.firebaseio.com/posts.json')
        .then(res => {
          const postsArray = []
          for (const key in res.data) {
            postsArray.push({...res.data[key], id: key})
          }
          vuexContext.commit('setPosts', postsArray)
        })
        .catch(e =>context.error(e))
        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     vuexContext.commit('setPosts', [
        //       {
        //         id: '4',
        //         thumbnail:
        //           'https://3dmatica.ru/upload/medialibrary/fdc/fdc45298532c1343781a66bc955d0a46.jpg',
        //         title: 'Additional Post 1!',
        //         previewText: 'This is my first post!',
        //       },
        //       {
        //         id: '5',
        //         thumbnail:
        //           'https://3dmatica.ru/upload/medialibrary/fdc/fdc45298532c1343781a66bc955d0a46.jpg',
        //         title: 'Additional Post 2',
        //         previewText: 'This is my second post!',
        //       },
        //       {
        //         id: '6',
        //         thumbnail:
        //           'https://3dmatica.ru/upload/medialibrary/fdc/fdc45298532c1343781a66bc955d0a46.jpg',
        //         title: 'Additional Post 3',
        //         previewText: 'This is my third post!',
        //       },
        //     ])
        //     resolve()
        //   }, 2000)
        // })
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      addPost(vuexContext, addedPost) {
        const newPost = {
          ...addedPost,
          updatedDate: new Date(),
        }
        return axios
          .post(
            'https://nuxt-blog-8e612-default-rtdb.firebaseio.com/posts.json',
            newPost
          )
          .then((result) => {
            vuexContext.commit('addPost', {...newPost, id: result.data.name})
          })
          .catch((e) => console.log(e))
      },
      editPost(vuexContext, editedPost) {
        return axios
          .put(
            `https://nuxt-blog-8e612-default-rtdb.firebaseio.com/posts/${editedPost.id}.json`,
            editedPost
          )
          .then((res) => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch((e) => console.log(e))
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
    },
  })
}

export default createStore
