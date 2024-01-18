<template>
  <div class="q-ma-lg">
    <div class="row q-mb-lg">
      <q-item-label class="text-h4">{{ title }}</q-item-label>
    </div>
    <div class="row">
      <p>
        {{ content }}
      </p>
      <p>
        {{ content1 }}
      </p>
      <p>
        {{ content2 }}
      </p>
    </div>
    <div class="row">
      <p>
        {{ content3 }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'content', 'content1', 'content2', 'content3'],
};
</script>

<style></style>
