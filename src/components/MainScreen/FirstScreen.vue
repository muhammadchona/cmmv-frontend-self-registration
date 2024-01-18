<template>
  <div class="red-square">
    <div class="image-container">
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
.image-container {
  width: 100%;
  height: auto;
}
.red-square {
  width: 100%; /* Adjust percentage as needed */
  height: auto; /* Change as needed or remove if using fixed height */
  background-color: #f5997a; /* Light red color */
  display: flex;
  flex-direction: column;
}

.button-container {
  position: absolute;
  bottom: 20px; /* Adjust the distance from the bottom */
  left: 50%;
  transform: translateX(-50%);
  width: 90%; /* Adjust the width of the buttons */
}
</style>
