<template>
  <div class="q-ma-lg">
    <div class="row q-mb-lg">
      <q-btn
        class="full-width q-py-sm"
        unelevated
        rounded
        color="primary"
        type="submit"
        label="Saiba Mais"
      />
    </div>
    <div class="row q-mb-lg">
      <q-btn
        class="full-width q-py-sm"
        unelevated
        rounded
        color="primary"
        type="submit"
        label="Marcar Consulta"
      />
    </div>
    <div class="row">
      <q-btn
        class="full-width q-py-sm"
        unelevated
        rounded
        color="primary"
        type="submit"
        label="Pesquisar Consulta"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'content', 'content1', 'content2'],
};
</script>

<style></style>
