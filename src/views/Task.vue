<template>
  <AppLoader v-if="!loading" />
  <div v-else-if="loading && post" class="card">
    <h2>{{post.title}}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="post.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(post.endDate).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{post.description}}</p>
    <div>
      <button class="btn" @click.prevent="changeStatus(postId, 'pending')">Взять в работу</button>
      <button class="btn primary" @click.prevent="changeStatus(postId, 'done')">Завершить</button>
      <button class="btn danger" @click.prevent="changeStatus(postId, 'cancelled')">Отменить</button>
    </div>
  </div>
  <h3 v-else class="text-white center">
    Задачи с id = <strong>Tут АЙДИ</strong> нет.
  </h3>
</template>

<script>
import AppLoader from '../components/AppLoader'
import AppStatus from '../components/AppStatus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
export default {
  components: { AppStatus, AppLoader },
  setup() {
    const loading = ref(true)
    const store = useStore()
    const route = useRoute()
    const postId = ref(route.params.id)
    const post = ref({})

    async function fetchPostById() {
      loading.value = false
      post.value = await store.dispatch('fetchPostById', postId.value)
      loading.value = true
    }
    onMounted(() => {
      fetchPostById()
    })
    async function changeStatus(postId, status) {
      await store.dispatch('changeStatus', { postId, status })
      post.value.status = status
    }
    return {
      post,
      postId,
      loading,
      changeStatus
    }
  }
}
</script>
