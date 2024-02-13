<template>
  <div class="row text-black text-weight-bolder justify-center q-pt-lg text-h6">
    Informação
  </div>
  <div class="container">
    <div class="red-square">
      <div class="image-container">
        <img
          src="~src/assets/information.png"
          style="width: 100%; height: auto; max-width: 100%"
          fit="cover"
        />
      </div>
    </div>
  </div>
  <div class="q-pa-md" style="max-width: 100%">
    <q-tabs
      v-model="tab"
      active-color="white"
      indicator-color="primary"
      align="justify"
      active-bg-color="primary"
      narrow-indicator
      style="border-style: solid; border-color: #ee764e"
      class="text-grey q-mb-lg"
    >
      <q-tab
        style="border-style: solid; border-color: white"
        name="material"
        label="Material Educativo"
      />
      <q-tab
        style="border-style: solid; border-color: white"
        name="clinics"
        label="Unidades Sanitarias"
      />
    </q-tabs>
    <div class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
        class="text-dark text-left"
        style="border-radius: 5%"
      >
        <q-tab-panel name="material">
          <view-docs :showDownload="true" />
        </q-tab-panel>
        <q-tab-panel name="clinics">
          <clinicsList />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="col q-my-sm">
      <q-btn
        flat
        round
        color="primary"
        icon="west"
        @click="$emit('previousScreen')"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import viewDocs from '../EducationMaterial/MaterialEducativo.vue';
import clinicsList from '../EducationMaterial/ClinicsList.vue';
const tab = ref('material');
</script>
<style>
.container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px; /* Add top padding as needed */
}

.red-square {
  width: 50%; /* Ajuste para ocupar metade da largura */
  height: 50%; /* Ajuste para ocupar metade da altura */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5997a; /* Light red color */
  padding: 20px; /* Adjust padding */
  box-sizing: border-box;
  border-radius: 15px; /* Adicione um raio de borda para a curva */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Adicione uma sombra */
}

.title {
  font-size: 24px; /* Adjust the font size */
  margin-bottom: 20px; /* Adjust spacing */
}

.image-container {
  width: 100%;
  max-width: 600px; /* Set maximum width for responsiveness */
}
</style>
