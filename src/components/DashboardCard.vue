<template>
  <div
    class="w-full h-full p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg"
    :class="themeClasses"
  >
    <div class="text-4xl mb-2">{{ icon }}</div>
    <h3 class="text-base text-gray-700 font-semibold mb-1">{{ title }}</h3>
    <p class="text-3xl font-bold text-gray-800">{{ value }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  theme: {
    type: String,
    default: 'blue', // fallback tema
  },
})

const themeMap = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  pink: 'bg-pink-100 text-pink-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  purple: 'bg-purple-100 text-purple-800',
  red: 'bg-red-100 text-red-800',
  teal: 'bg-teal-100 text-teal-800',
}

const themeClasses = themeMap[props.theme] || themeMap['blue']
</script>
