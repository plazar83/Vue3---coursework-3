<template>
  <form class="card" @submit.prevent="newPost">
    <h1>Создать новую задачу {{ new Date().toLocaleDateString() }}</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input v-model="title" type="text" id="title">
    </div>
    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input v-model="endDate" type="date" id="date">
    </div>
    <div class="form-control">
      <label for="description">Описание</label>
      <textarea v-model="description" id="description"></textarea>
    </div>
    <button class="btn primary" :disabled="validate">Создать</button>
  </form>
</template>
<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const title = ref('')
    const endDate = ref('')
    const description = ref('')
    const status = computed(() => new Date(endDate.value) > new Date() ? 'active' : 'cancelled')

    async function newPost() {
      try {
        await store.dispatch('newPost', {
          title: title.value,
          endDate: endDate.value,
          description: description.value,
          status: status.value
        })
        router.push('/')
      } catch (e) {}
    }

    const validate = computed(() => {
      return (title.value === '' || description.value === '' || endDate.value === '') || false
    })

    return {
      newPost,
      title,
      endDate,
      description,
      status,
      validate
    }
  }
}
</script>
