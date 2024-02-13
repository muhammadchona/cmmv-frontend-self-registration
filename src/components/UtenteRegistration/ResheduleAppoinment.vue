<template>
  <q-card style="width: 700px; max-width: 80vw" class="q-pt-lg">
    <form @submit.prevent="submitAppointment">
      <q-card-section class="q-px-md">
        <div class="row">
          <q-input
            outlined
            disable
            rounded
            v-model="editedAppointment.utente.systemNumber"
            label="Código"
            dense
            class="col"
          />
        </div>

        <div class="row q-pt-md q-pb-sm">
          <q-input
            outlined
            disable
            rounded
            v-model="editedAppointment.utente.firstNames"
            label="Nome"
            dense
            class="col"
          />
          <q-input
            outlined
            disable
            rounded
            v-model="editedAppointment.utente.lastNames"
            label="Apelido"
            dense
            class="col q-ml-md"
          />
        </div>
        <clinic-location-listing></clinic-location-listing>
        <div class="row q-pt-md">
          <q-input dense outlined rounded v-model="appointmentDate" class="col">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    mask="DD-MM-YYYY"
                    v-model="appointmentDate"
                    :options="blockDataFuturaAndPassadaAppo"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Fechar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-mb-md">
        <q-btn
          type="submit"
          rounded
          label="Cancelar"
          color="primary"
          @click="$emit('close')"
        />
        <q-btn
          type="submit"
          rounded
          label="Submeter"
          color="primary"
          @click.stop="promptToConfirm(editedAppointment)"
        />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script setup>
import { onBeforeMount, ref, inject, provide } from 'vue';
import moment from 'moment';
import { useQuasar } from 'quasar';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import appointmentService from 'src/services/api/appointment/appointmentService';
import ClinicLocationListing from './ClinicLocationListing.vue';
import { useDateUtils } from 'src/composables/shared/dateUtils/dateUtils';
import { useAppointmentValidation } from 'src/composables/shared/appointment/appointmentMethods';
const { getDateFromHyphenDDMMYYYYWithTime } = useDateUtils();

// const appointment = inject('editedAppointment');
const { alertSucess } = useSwal();
const { validateAppointmentDate } = useAppointmentValidation();
const editedAppointment = inject('appointment');
const showReshedule = inject('showReshedule');
const $q = useQuasar();
const selectedClinic = ref(null);
const appointmentDate = ref('');
//const date = ref(moment(date).format('YYYY-MM-DD'));

const promptToConfirm = (appointmentToConfirm) => {
  $q.dialog({
    title: 'Confirmação',
    message:
      'Deseja marcar a consulta para data ' +
      appointmentDate.value +
      ' na ' +
      selectedClinic.value.name +
      '?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    // const clinic = appointmentToConfirm.clinic;
    appointmentToConfirm.clinic = {};
    appointmentToConfirm.clinic.id = selectedClinic.value.id;
    console.log(getDateFromHyphenDDMMYYYYWithTime(appointmentDate.value));
    appointmentToConfirm.appointmentDate = moment(
      getDateFromHyphenDDMMYYYYWithTime(appointmentDate.value),
      'DD-MM-YYYY'
    ).toDate();

    //  appointmentToConfirm.value.time = editedAppointment.value.time;

    console.log(appointmentToConfirm);

    if (validateAppointmentDate(appointmentDate.value)) {
      appointmentService
        .patch(appointmentToConfirm.id, appointmentToConfirm)
        .then((resp) => {
          console.log(resp.data);

          // editedAppointment.value = resp.data;
          editedAppointment.value.appointmentDate = moment(
            appointmentToConfirm.appointmentDate
          ).format('DD-MM-YYYY');
          editedAppointment.value.clinic = selectedClinic.value;
          alertSucess(
            'A sua solicitação foi enviada para a  ' +
              selectedClinic.value.name +
              ', por favor aguarde confirmação por SMS.'
          );
          showReshedule.value = false;
          console.log(editedAppointment.value);
          // showSucessScreen.value = true;
        });
    }
  });
};

const blockDataFuturaAndPassadaAppo = (date) => {
  const currentDate = moment();
  const threeMonthsFromNow = moment().add(3, 'months');

  return (
    moment(date).isBefore(threeMonthsFromNow) &&
    moment(date).isSameOrAfter(currentDate)
  );
};

onBeforeMount(() => {
  // editedAppointment.value = Object.assign({}, props.appointment);
  appointmentDate.value = editedAppointment.value.appointmentDate;
  selectedClinic.value = editedAppointment.value.clinic;
});

provide('selectedClinic', selectedClinic);
</script>

<style></style>
