<template>
  <div class="flex flex-column justify-content-center text-center py-4">
    <div class="px-5">
      <h2 class="text-3xl azul-orbis text-shadow">{{ title }}</h2>
      <p class="font-light text-xl" v-html="description"></p>
    </div>
    <div class="flex flex-row overflow-auto">
      <div class="col-12 p-0" v-for="image in images" :key="image.src">
        <img :src="image.src" class="w-full" :alt="image.alt">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Plantilla',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true,
      validator: function (value) {
        return value.every(img => 'src' in img && 'alt' in img);
      }
    }
  }
}
</script>

