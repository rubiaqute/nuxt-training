import { Store } from 'vuex'

const createStore = () => {
  return new Store({
    state: {
      loadedPosts: [],
      token: null,
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, addedPost) {
        state.loadedPosts.push(addedPost)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          (post) => post.id === editedPost.id
        )
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('posts.json')
          .then((data) => {
            const postsArray = []
            for (const key in data) {
              postsArray.push({ ...data[key], id: key })
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch((e) => context.error(e))
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
          .$post(`/posts.json?auth=${vuexContext.state.token}`, newPost)
          .then((data) => {
            vuexContext.commit('addPost', { ...newPost, id: data.name })
          })
          .catch((e) => console.log(e))
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(
            `/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
            editedPost
          )
          .then((res) => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch((e) => console.log(e))
      },
      authenticate(vuexContext, authData) {
        const authUrl = authData.isLogin
          ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`
          : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.apiKey}`

        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((result) => {
            vuexContext.commit('setToken', result.idToken)
            localStorage.setItem('tokenNuxt', result.idToken)
            localStorage.setItem('tokenExpirationNuxt', new Date().getTime() + result.expiresIn * 1000)
            vuexContext.dispatch('setLogoutTimer', result.expiresIn * 1000)
          })
          .catch((e) => console.log(e))
      },
      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => vuexContext.commit('clearToken'), duration)
      },
      initAuth(vuexContext) {
        const token = localStorage.getItem('tokenNuxt')
        const expirationDate = localStorage.getItem('tokenExpirationNuxt')

        if (new Date() > +expirationDate || !token) {
          return
        }

        vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
        vuexContext.commit('setToken', token)


      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token !== null
      },
    },
  })
}

export default createStore
