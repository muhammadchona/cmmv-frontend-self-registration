<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md text-center">
      <h2>Informação</h2>
    </div>
    <div class="q-pa-md">
      <q-img
        src="~src/assets/information.png"
        style="width: 100%; height: auto; max-width: 100%"
        fit="cover"
      />
    </div>
    <q-separator />
    <div class="q-ma-md q-pa-md q-gutter-md">
      <q-btn-group spread>
        <q-btn
          unelevated
          rounded
          color="primary"
          label="Marcar Consulta"
          @click="$emit('createAppointment')"
        />
        <q-btn
          unelevated
          rounded
          color="green"
          label="Pesquisar Consulta"
          @click="$emit('searchAppointment')"
        />
      </q-btn-group>
    </div>
    <q-separator />
  </q-page>
</template>

<script></script>

<style>
/* Add specific styles if necessary */
</style>
