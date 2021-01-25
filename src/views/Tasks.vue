<template>
  <h1 v-if="!posts" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <AppLoader v-if="!loading" />
    <div v-else>
      <h3 class="text-white">Всего активных задач: {{total}}</h3>
      <div class="card" v-for="post in posts" :key="post.id">
        <h2 class="card-title">
          {{post.title}}
          <AppStatus :type="post.status" />
        </h2>
        <p>
          <strong>
            <small>
              {{new Date().toLocaleDateString()}}
            </small>
          </strong>
        </p>
        <button class="btn primary" @click.prevent="navigate(post.id)">Посмотреть</button>
      </div>
    </div>
  </template>
</template>
<script>
import AppStatus from '../components/AppStatus'
import AppLoader from '../components/AppLoader'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const posts = ref([])
    const loading = ref(true)

    async function fetchPosts() {
      loading.value = false
      posts.value = await store.dispatch('fetchPosts')
      loading.value = true
    }

    onMounted(() => fetchPosts())

    function navigate(postId) {
      router.push('/post/' + postId)
    }

    return {
      total: store.getters.getTotal,
      loading,
      posts,
      navigate
    }
  },
  components: { AppStatus, AppLoader }
}
</script>
