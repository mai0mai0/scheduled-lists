<script>
import {ref, onMounted} from 'vue'

export default {
  setup(){
    //to store json data
    const itemData = ref(null)

    //fetch data from the json file
    const fetchData = async () => {
      try{
        const res = await fetch('test.json')
        const data = await res.json()
        itemData.value = data[0]
        console.log('JSON data fetched successfully.')
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

        <h1 class="text-center text-2xl font-bold mb-4">{{ itemData.list_name }}</h1>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table-auto overflow-scroll">

            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ itemData.item_type }}</th>
                <th v-for="check in itemData.check_items" :key="check" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ check }}</th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">

              <tr v-for="item in itemData.list_items" :key="item">

                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item }}</td>

                <td v-for="check in itemData.check_items" :key="check" class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" :id="`${item}-${check}-checkbox`" class="form-checkbox h-5 w-5 text-blue-600" />
               </td>

              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4">
          <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
          <textarea id="notes" name="notes" rows="4" class="pl-2 pt-1 mt-1 block w-full rounded-md border-black shadow-md focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
        </div>
        <div class="flex justify-end mt-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right">Submit</button>
        </div>

      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>
