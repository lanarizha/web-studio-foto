<script setup>
defineProps({
  title: String,
  value: [String, Number],
  theme: String,
  iconSrc: String,
});

const pastelColors = {
  blue: "bg-blue-100 text-blue-800 border-blue-300",
  green: "bg-green-100 text-green-800 border-green-300",
  pink: "bg-pink-100 text-pink-800 border-pink-300",
  yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
  purple: "bg-purple-100 text-purple-800 border-purple-300",
};
</script>

<template>
  <div
    class="p-5 rounded-2xl shadow-sm flex items-center gap-4 border-l-8 transition hover:scale-[1.015] hover:shadow-md duration-300"
    :class="pastelColors[theme]"
  >
    <div class="flex-shrink-0 bg-white p-2 rounded-full shadow-inner">
      <img v-if="iconSrc" :src="iconSrc" alt="icon" class="w-10 h-10" />
    </div>

    <div>
      <div class="text-xs font-semibold uppercase tracking-widest opacity-70">
        {{ title }}
      </div>
      <div class="text-3xl font-bold mt-1">
        {{ value }}
      </div>
    </div>
  </div>
</template>
