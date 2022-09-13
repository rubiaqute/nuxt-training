import { Store } from 'vuex'

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
        return context.app.$axios.$get('posts.json')
        .then(data => {
          const postsArray = []
          for (const key in data) {
            postsArray.push({...data[key], id: key})
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
        return this.$axios
          .$post(
            '/posts.json',
            newPost
          )
          .then((data) => {
            vuexContext.commit('addPost', {...newPost, id: data.name})
          })
          .catch((e) => console.log(e))
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(
            `/posts/${editedPost.id}.json`,
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
