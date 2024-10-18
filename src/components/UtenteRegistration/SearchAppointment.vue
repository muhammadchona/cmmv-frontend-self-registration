<template>
  <q-page-container>
    <q-page>
      <div>
        <!-- Colored div -->
        <div class="row items-center q-mb-md bg-deep-orange-3">
          <!-- Left button -->
          <div class="col q-my-sm">
            <q-btn
              flat
              round
              color="white"
              icon="chevron_left"
              @click="$emit('previousScreen')"
            />
          </div>

          <!-- Title -->
          <div class="row text-white text-weight-bolder justify-center">
            Visualizar/Alterar consulta
          </div>

          <!-- Space filler -->
          <div class="col"><q-space /></div>

          <!-- Container for inputs and button -->
          <div class="col-12 q-pa-md">
            <div class="row">
              <q-input
                label="Introduza o codigo do utente *"
                dense
                rounded
                outlined
                ref="nomeRef"
                :rules="[(val) => !!val || 'Por favor indicar o nome']"
                v-model="utenteSystemNumber"
                class="col-12"
                color="white"
              />
            </div>
            <div class="row justify-end">
              <q-btn
                unelevated
                outline
                push
                rounded
                label="Visualizar"
                icon="visibility"
                @click="searchAppointment"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="q-pa-md row items-start q-gutter-md full-width"
        v-if="showDetails"
      >
        <q-card class="my-card full-width">
          <q-card-section>
            <div class="text-h6 text-center">Dados da consulta</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pt">
            <div class="q-col q-pa-md">
              <div class="flex items-center">
                <q-icon name="event" class="q-mr-sm" size="2em" />
                <div style="font-size: 16px">Data da Marcação</div>
              </div>
              <div class="q-col q-pa-xs" style="font-size: 14px">
                {{ appointment == null ? '' : appointment.appointmentDate }}
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pt">
            <div class="q-col q-pa-md">
              <div class="flex items-center">
                <q-icon name="location_on" class="q-mr-sm" size="2em" />
                <div>Unidade Sanitária</div>
              </div>
              <div class="q-col q-pa-xs" style="font-size: 14px">
                {{ appointment == null ? '' : appointment.clinic.name }}
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pt">
            <div class="q-col q-pa-md">
              <div class="flex items-center">
                <q-icon name="location_on" class="q-mr-sm" size="2em" />
                <div>Estado da Consulta</div>
              </div>
              <div
                class="q-col q-pa-xs"
                style="font-size: 14px"
                :class="getColourText()"
              >
                {{ appointment == null ? '' : appointment.status }}
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pt re-marcar-section">
            <q-btn
              outline
              rounded
              color="primary"
              icon="free_cancellation"
              size="1em"
              v-if="appointment.status !== 'CONFIRMADO'"
              @click="showReshedule = true"
            >
              Re-marcar
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
      <q-dialog v-model="showReshedule">
        <resheduleApp
          :appointment="appointment"
          @close="showReshedule = false"
        />
      </q-dialog>
    </q-page>
  </q-page-container>
</template>
<script setup>
import { ref, provide } from 'vue';
import appointmentService from 'src/services/api/appointment/appointmentService';
import resheduleApp from 'components/UtenteRegistration/ResheduleAppoinment.vue';
import moment from 'moment';
import { useSwal } from 'src/composables/shared/dialog/dialog';
const { alertWarning, alertError } = useSwal();
const appointment = ref(null);
const showReshedule = ref(false);
const showDetails = ref(false);
const utenteSystemNumber = ref();

const searchAppointment = async () => {
  console.log(utenteSystemNumber.value);
  utenteSystemNumber.value = utenteSystemNumber.value.toUpperCase();
  if (
    utenteSystemNumber.value === null ||
    utenteSystemNumber.value === undefined ||
    utenteSystemNumber.value === ''
  ) {
    alertError('Por favor introduza o código do utente.');
    return true;
  }

  if (!validateCodeFormat()) {
    alertWarning(
      'O código de utente introduzido está no formato incorrecto. \n' +
        'Dica: \n' +
        '1- Verifique se cumpre o formato YYYYMM-NA-XXXXXXXXX. \n' +
        '2- Confirme o histórico de mensagens recebidas no número de telefone introduzido durante a marcação da consulta.',
      true
    );
    return true;
  }
  await appointmentService.apiGetAppointmentByUtenteSystemNumber(
    utenteSystemNumber.value.trim()
  );
  appointment.value = appointmentService.getAppointmentByUtenteSystemNumber(
    utenteSystemNumber.value.trim()
  );
  if (appointment.value) showDetails.value = true;
  appointment.value.appointmentDate = moment(
    appointment.value.appointmentDate
  ).format('DD-MM-YYYY');
};

const getColourText = () => {
  if (appointment.value && appointment.value.status === 'PENDENTE') {
    return 'text-red';
  } else {
    return 'text-green';
  }
};

const validateCodeFormat = () => {
  const pattern = /^\d{6}-[A-Za-z\d]{2}-\d{9}$/;
  return pattern.test(utenteSystemNumber.value.trim());
};

provide('appointment', appointment);
provide('showReshedule', showReshedule);
</script>
<style>
.full-width {
  width: 100%; /* Occupy full width */
}

.my-card {
  width: calc(100% - 40px); /* Adjust width to include left and right margins */
  margin: 20px auto; /* Top and bottom margins set to 20px, auto for horizontal centering */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for the card */
  border: none; /* Remove default border */
}

.text-center {
  text-align: center; /* Center the title text */
}

.re-marcar-section {
  display: flex;
  justify-content: flex-end; /* Aligns button to the right */
  padding: 16px 20px; /* Adjust padding for the section */
}

.text-green {
  color: green;
}
</style>
