<template>
  <span :class="['badge', type ? statuses[type].class : '' ]">{{type ? statuses[type].text : ''}}</span>
</template>
<script>
import { reactive } from 'vue'
export default {
  props: ['type'],
  setup() {
    const statuses = reactive({
      active: {
        text: 'Активен',
        class: 'primary'
      },
      done: {
        text: 'Завершен',
        class: 'primary'
      },
      cancelled: {
        text: 'Отменен',
        class: 'danger'
      },
      pending: {
        text: 'Выполняется',
        class: 'warning'
      }
    })

    return {
      statuses
    }
  }
}
</script>
