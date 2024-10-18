<template>
  <q-page class="absolute full-width full-height column">
    <div class="row items-center q-mb-md bg-deep-orange-3">
      <div class="col q-my-sm">
        <q-btn flat round color="white" />
      </div>
    </div>
    <div class="q-px-sm">
      <div class="row text-center q-my-xl">
        <q-icon class="col" name="task_alt" size="200px" color="primary" />
      </div>
      <div class="row">
        <!-- First column -->
        <div class="col text-center">
          <p class="text-subtitle1 text-center">
            A solicitação de consulta foi efectuada com sucesso!
          </p>
          <p class="text-subtitle1 text-center">
            Aguarde pela confirmação via SMS, de disponibilidade do lado da
            unidade sanitária {{ appointment.clinic.name }}, para o dia
            {{ getDDMMYYYFromJSDate(appointment.appointmentDate) }}. O seu
            código de utente é
            <strong><br />{{ utente.systemNumber }} </strong>. Este código serve
            para visualizar dados da sua consulta e/ou remarcar no sistema CMMV,
            bem como deve ser apresentado quando for à unidade sanitária para a
            sua identificação
          </p>
        </div>
      </div>
    </div>
    <div class="absolute-bottom q-px-sm q-mb-lg">
      <div class="text-center q-mb-md">
        <q-btn
          class="full-width q-py-sm q-mt-lg"
          unelevated
          rounded
          color="primary"
          label="Sair"
          @click="redirectToIndex"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { inject } from 'vue';
import { useDateUtils } from 'src/composables/shared/dateUtils/dateUtils';
const { getDDMMYYYFromJSDate } = useDateUtils();

const redirectToIndex = () => {
  console.log('clicked');
  window.location.reload(true); // Replace '/' with your index route
};
const utente = inject('utente');
const appointment = inject('appointment');
</script>
