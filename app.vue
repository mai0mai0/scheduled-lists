<script>
import {ref, onMounted} from 'vue'

export default {
  setup(){
    const itemData = ref(null)

    const fetchData = async () => {
      try{
        const res = await fetch('test.json')
        const data = await res.json()
        itemData.value = data[0]
      } catch (error) {
        console.error('Could not fetch JSON data: ', error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      itemData
    }
  }
}
</script>

<template>
  <div class="bg-white">
    <div class="bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div v-if="itemData">
        <h1>{{ itemData.list_name }}</h1>
        <ul>
          <li v-for="item in itemData.list_items" :key="item" class="flex items-center space-x-4">
          <span>{{ item }}</span>
          <input type="checkbox" :id="`${item}-checkbox1`" />
          <label :for="`${item}-checkbox1`">Zoom</label>
        </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>
