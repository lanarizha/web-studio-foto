<template>
<LayoutPage>
  <div class="bg-white shadow rounded-lg p-4 flex items-center justify-between">
    <div :class="cardClass">
      <h3 class="text-sm text-gray-500">{{ title }}</h3>
      <p class="text-2xl font-bold text-gray-800">{{ value }}</p>
    </div>
    <div class="text-3xl">{{ icon }}</div>
  </div>
  
  </LayoutPage>
</template>

<script setup>
defineProps(['title', 'value', 'icon'])

</script>