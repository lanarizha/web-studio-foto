<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps(["text", "textColor", "backgroundColor"]);

const buttonClass = `relative w-18 h-8 font-semibold text-[${props.textColor}] bg-[${props.backgroundColor}] rounded-[15px] shadow-[4px_8px_19px_-3px_rgba(0,0,0,0.27)] overflow-hidden transition-all duration-250 hover:text-[#e8e8e8] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:rounded-[15px] before:bg-[#212121] before:-z-10 before:shadow-[4px_8px_19px_-3px_rgba(0,0,0,0.27)] before:transition-all before:duration-250 hover:before:w-full z-[1]`;
</script>
