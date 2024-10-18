<template>
  <div class="redd-square">
    <div class="first-container">
      <img src="~src/assets/02.png" style="max-width: 100%" />
    </div>
    <div class="button-container">
      <div class="q-ma-sm">
        <div class="row q-mb-lg">
          <q-btn
            class="full-width q-py-sm text-primary"
            size="20px"
            outline
            unelevated
            rounded
            @click="$emit('startPresentation')"
            label="Saiba Mais"
          />
        </div>
        <div class="row q-mb-lg">
          <q-btn
            class="full-width q-py-sm text-primary"
            size="20px"
            outline
            unelevated
            rounded
            @click="$emit('createAppointment')"
            label="Marcar Consulta"
          />
        </div>
        <div class="row">
          <q-btn
            class="full-width q-py-sm text-primary"
            size="20px"
            outline
            unelevated
            rounded
            @click="$emit('searchAppointment')"
            label="Visualizar/Alterar consulta"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row absolute-bottom justify-center">
    <q-btn
      class=""
      flat
      color="primary"
      @click="$emit('previousScreen')"
      label="Sair"
    />
  </div>
</template>

<script setup></script>
<style>
.first-container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px; /* Add top padding as needed */
}

.redd-square {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5997a; /* Light red color */
  padding: 20px; /* Adjust padding */
  box-sizing: border-box;
  border-radius: 30px; /* Adicione um raio de borda para a curva */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.button-container {
  position: absolute;
  bottom: 15%; /* Adjust the distance from the bottom */
  left: 50%;
  transform: translateX(-50%);
  width: 90%; /* Adjust the width of the buttons */
}
</style>
