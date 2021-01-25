import { createStore } from 'vuex'
export default createStore({
  state() {
    return {
      total: 10,
      posts: []
    }
  },
  getters: {
    getTotal(state) {
      return state.total
    },
    getPosts(state) {
      return state.posts
    },
    getPostsById(state) {
      return state.posts
    }
  },
  mutations: {
    addPost(state, payload) {
      state.posts.push(payload)
    }
  },
  actions: {
    async newPost({ dispatch }, data) {
      try {
        const response = await fetch('https://vue-coursework3-default-rtdb.firebaseio.com/posts.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...data })
        })
        const responseData = await response.json()
        this.commit('addPost', { ...data, id: responseData.name })
      } catch (e) {
        console.log(e)
      }
    },
    async fetchPosts() {
      try {
        const response = await fetch('https://vue-coursework3-default-rtdb.firebaseio.com/posts.json')
        const responseData = await response.json()
        return Object.keys(responseData).map(key => ({ ...responseData[key], id: key }))
      } catch (e) {
        console.log(e)
      }
    },
    async fetchPostById({ dispatch }, id) {
      try {
        const response = await fetch(`https://vue-coursework3-default-rtdb.firebaseio.com/posts/${id}.json`)
        return await response.json()
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async changeStatus({ dispatch }, data) {
      try {
        await fetch(`https://vue-coursework3-default-rtdb.firebaseio.com/posts/${data.postId}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: data.status })
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
})
