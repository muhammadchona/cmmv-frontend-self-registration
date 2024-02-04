<template>
  <q-card style="width: 700px; max-width: 80vw" class="q-pt-lg">
    <form @submit.prevent="submitAppointment">
      <q-card-section class="q-px-md">
        <div class="row">
          <q-input
            outlined
            disable
            v-model="editedAppointment.utente.systemNumber"
            label="Código"
            dense
            class="col"
          />
        </div>

        <div class="row q-pt-md">
          <q-input
            outlined
            disable
            v-model="editedAppointment.utente.firstNames"
            label="Nome"
            dense
            class="col"
          />
          <q-input
            outlined
            disable
            v-model="editedAppointment.utente.lastNames"
            label="Apelido"
            dense
            class="col q-ml-md"
          />
        </div>
        <clinic-location-listing></clinic-location-listing>
        <div class="row q-pt-md">
          <q-input
            dense
            outlined
            v-model="editedAppointment.appointmentDate"
            class="col"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    mask="DD-MM-YYYY"
                    v-model="editedAppointment.appointmentDate"
                    :options="blockDataPassado"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!--        <q-input dense outlined v-model="editedAppointment.time" mask="time" :rules="['time']" class="q-ml-md col">
                        <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-time v-model="editedAppointment.time">
                                <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-time>
                            </q-popup-proxy>
                        </q-icon>
                        </template>
                    </q-input> -->
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

// const appointment = inject('editedAppointment');
const { alertSucess } = useSwal();
const editedAppointment = inject('appointment');
const showReshedule = inject('showReshedule');
const $q = useQuasar();
const selectedClinic = ref(null);
//const date = ref(moment(date).format('YYYY-MM-DD'));

const blockDataPassado = (date) => {
  return date >= moment(new Date()).format('YYYY/MM/DD');
};

const promptToConfirm = (appointmentToConfirm) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Deseja Confirmar?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    // const clinic = appointmentToConfirm.clinic;
    appointmentToConfirm.clinic = {};
    appointmentToConfirm.clinic.id = selectedClinic.value.id;
    appointmentToConfirm.appointmentDate = moment(
      editedAppointment.value.appointmentDate,
      'DD-MM-YYYY'
    ).toDate();

    //  appointmentToConfirm.value.time = editedAppointment.value.time;

    console.log(appointmentToConfirm);
    appointmentService
      .patch(appointmentToConfirm.id, appointmentToConfirm)
      .then((resp) => {
        console.log(resp.data);

        // editedAppointment.value = resp.data;
        editedAppointment.value.appointmentDate = moment(
          editedAppointment.value.appointmentDate
        ).format('DD-MM-YYYY');
        editedAppointment.value.clinic = selectedClinic.value;
        alertSucess('Consulta Remarcada com Sucesso');
        showReshedule.value = false;
        console.log(editedAppointment.value);
        // showSucessScreen.value = true;
      });
  });
};

onBeforeMount(() => {
  console.log(editedAppointment);
  // editedAppointment.value = Object.assign({}, props.appointment);
  editedAppointment.value.appointmentDate = moment(
    editedAppointment.value.appointmentDate
  ).format('DD-MM-YYYY');
  selectedClinic.value = editedAppointment.value.clinic;
});

provide('selectedClinic', selectedClinic);
</script>

<style></style>
