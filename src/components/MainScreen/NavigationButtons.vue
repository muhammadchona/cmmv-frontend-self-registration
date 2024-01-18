<template>
  <div class="row no-wrap items-center q-mt-md q-pa-sm absolute-bottom ">
    <q-btn flat round color="primary" icon="west" @click="$emit('previousScreen')"/>
        <q-space />

        <div>
            <q-btn flat rounded label="Próximo" @click="$emit('nextScreen')"/>
    </div>
  </div>
</template>

<script setup>

</script>

<style>

</style>
