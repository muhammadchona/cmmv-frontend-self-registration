<template>
  <div class="redd-square">
    <div class="first-container">
      <img src="~src/assets/02.png" style="height: auto" fit="cover" />
    </div>
    <div class="button-container">
      <div class="q-ma-lg">
        <div class="row q-mb-lg">
          <q-btn
            class="full-width q-py-sm"
            unelevated
            rounded
            color="primary"
            @click="$emit('startPresentation')"
            label="Saiba Mais"
          />
        </div>
        <div class="row q-mb-lg">
          <q-btn
            class="full-width q-py-sm"
            unelevated
            rounded
            color="primary"
            @click="$emit('createAppointment')"
            label="Marcar Consulta"
          />
        </div>
        <div class="row">
          <q-btn
            class="full-width q-py-sm"
            unelevated
            rounded
            color="primary"
            @click="$emit('searchAppointment')"
            label="Pesquisar Consulta"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import navigationButtons from 'components/MainScreen/NavigationButtons.vue';
import pageContent from 'components/MainScreen/Buttons.vue';
</script>
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
  bottom: 20px; /* Adjust the distance from the bottom */
  left: 50%;
  transform: translateX(-50%);
  width: 90%; /* Adjust the width of the buttons */
}
</style>
