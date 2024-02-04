<template>
  <q-page-container>
    <q-page v-if="!showSucessScreen">
      <div class="row items-center q-mb-md bg-deep-orange-3">
        <div class="col q-my-sm">
          <q-btn
            flat
            round
            color="white"
            icon="chevron_left"
            @click="closeRegistrationVerification()"
          />
        </div>
        <div class="row text-white text-weight-bolder justify-center">
          Marcação da Consulta
        </div>
        <div class="col"><q-space /></div>
      </div>
      <form @submit.prevent="validateUtente">
        <div class="row q-my-lg q-pl-sm">
          <strong>Dados Pessoais </strong>
        </div>
        <div class="row">
          <q-input
            label="Nome *"
            dense
            rounded
            outlined
            class="col"
            ref="nomeRef"
            :rules="[(val) => !!val || 'Por favor indicar o nome']"
            v-model="utente.firstNames"
          />
        </div>
        <div class="row">
          <q-input
            label="Apelido *"
            dense
            rounded
            outlined
            class="col"
            ref="apelidoRef"
            :rules="[
              (val) => val.length >= 2 || 'O apelido indicado é inválido',
            ]"
            v-model="utente.lastNames"
          />
        </div>
        <div class="row">
          <div class="col-8 q-pr-sm">
            <q-input
              dense
              rounded
              outlined
              v-model="dateOfBirth"
              ref="birthDateRef"
              label="Data de Nascimento"
              @update:model-value="ageCalculator()"
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
                      v-model="dateOfBirth"
                      :options="blockDataFutura"
                      @update:model-value="ageCalculator()"
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
          <br />
          <div class="col-4 q-pl-sm">
            <q-input
              dense
              label="Idade"
              type="number"
              ref="ageRef"
              rounded
              outlined
              v-model="ageCalculated"
              :rules="[
                (val) =>
                  (val > 14 && val < 100) ||
                  'Digite uma idade real e maior que 14 anos de idade',
              ]"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon
                  name="autorenew"
                  class="cursor-pointer"
                  @update:model-value="dateOfBirthCalculator()"
                />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row">
          <input-phone-code dense rounded outlined class="col-2">
          </input-phone-code>
          <q-input
            class="col"
            mask="#########"
            ref="phoneRef"
            dense
            rounded
            outlined
            type="tel"
            :rules="[(val) => phoneRules(val)]"
            v-model="utente.cellNumber"
            lazy-rules
            label="Número de Telefone"
          />
        </div>
        <div class="row">
          <input-phone-code dense rounded outlined class="col-2">
          </input-phone-code>
          <q-input
            class="col"
            ref="whatsappRef"
            mask="#########"
            dense
            rounded
            outlined
            type="tel"
            :rules="[(val) => whatsapNumberRules(val)]"
            v-model="utente.whatsappNumber"
            label="Número de Telemovel com Whatsapp"
          />
        </div>
        <clinic-location-listing></clinic-location-listing>
        <div class="row q-mb-md">
          <q-input
            dense
            class="col"
            rounded
            outlined
            v-model="appointment.appointmentDate"
            ref="appointmentDateRef"
            label="Data da Consulta"
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
                    v-model="appointment.appointmentDate"
                    :options="blockDataPassado"
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
        <div class="bottom q-mb-md">
          <q-btn
            class="full-width q-py-sm q-mt-lg"
            unelevated
            rounded
            color="primary"
            type="submit"
            label="Submeter"
          />
        </div>
      </form>
    </q-page>
    <utente-success v-if="showSucessScreen"></utente-success>
  </q-page-container>
</template>
<script setup>
import Utente from 'src/stores/models/utente/Utente';
import { ref, onMounted, inject, provide } from 'vue';
import moment from 'moment';
import Appointment from '../../stores/models/appointment/Appointment';
import provinceService from '../../services/api/province/provinceService';
import districtService from '../../services/api/district/districtService';
import inputPhoneCode from 'components/Shared/IconPhoneCode.vue';
import { useLoading } from 'src/composables/shared/loading/loading';
import utenteService from 'src/services/api/utente/UtenteService';
import UtenteSuccess from './UtenteSuccess.vue';
import { useDateUtils } from 'src/composables/shared/dateUtils/dateUtils';
import ClinicLocationListing from './ClinicLocationListing.vue';

const { closeLoading, showloading } = useLoading();
const { getYYYYMMDDFromJSDate, getDateFromHyphenDDMMYYYY } = useDateUtils();
const utente = ref(new Utente());
const currUtente = ref({});
const selectedClinic = ref(null);

const myLocation = {
  latitude: '',
  longitude: '',
  distance: '',
};
const dateOfBirth = ref('');
const ageCalculated = ref('');

const nomeRef = ref(null);
const apelidoRef = ref(null);
const phoneRef = ref(null);
const birthDateRef = ref(null);
const whatsappRef = ref(null);
const ageRef = ref(null);
const appointmentDateRef = ref(null);
const showRegistrationScreen = inject('showRegistrationScreen');
const showFirstScreen = inject('showFirstScreen');
const appointment = ref(new Appointment());
const showSucessScreen = ref(false);

onMounted(async () => {
  currUtente.value = Object.assign({}, utente.value);
  getParams();
  console.log(myLocation);
});

const blockDataPassado = (date) => {
  return date >= moment(new Date()).format('YYYY/MM/DD');
};

const dateOfBirthCalculator = () => {
  if (
    ageCalculated.value !== null &&
    ageCalculated.value !== undefined &&
    ageCalculated.value !== ''
  ) {
    dateOfBirth.value = moment(
      '01-01-' + (moment().year() - ageCalculated.value)
    ).format('DD-MM-YYYY');
  } else {
    dateOfBirth.value = '';
  }
};

const ageCalculator = () => {
  if (
    dateOfBirth.value !== null &&
    dateOfBirth.value !== undefined &&
    dateOfBirth.value !== ''
  ) {
    ageCalculated.value = moment().diff(
      moment(getDateFromHyphenDDMMYYYY(dateOfBirth.value), 'YYYY-MM-DD'),
      'years'
    );
  } else {
    ageCalculated.value = '';
  }
};

const blockDataFutura = (date) => {
  return date <= moment(new Date()).format('YYYY/MM/DD');
};

const closeRegistration = () => {
  showloading();
  setTimeout(() => {
    closeLoading();
  }, 100);
};

const closeRegistrationVerification = () => {
  showRegistrationScreen.value = false;
  showFirstScreen.value = true;
};

const getParams = () => {
  provinceService.get(0);
  districtService.get(0);
};

const validateUtente = () => {
  nomeRef.value.validate();
  apelidoRef.value.validate();
  phoneRef.value.validate();
  birthDateRef.value.validate();
  whatsappRef.value.validate();
  ageRef.value.validate();
  appointmentDateRef.value.validate();
  if (
    !nomeRef.value.hasError &&
    !apelidoRef.value.hasError &&
    !phoneRef.value.hasError &&
    !whatsappRef.value.hasError &&
    !ageRef.value.hasError &&
    selectedClinic.value !== null &&
    !appointmentDateRef.value.hasError
  ) {
    saveOrUpdateUtente();
  }
};

const saveOrUpdateUtente = () => {
  console.log(dateOfBirth.value);
  utente.value.birthDate = getYYYYMMDDFromJSDate(
    getDateFromHyphenDDMMYYYY(dateOfBirth.value)
  );
  utente.value.registerDate = new Date();
  console.log(utente.value.birthDate);
  utente.value.syncStatus = 'S';
  fillAppointmentData();
  console.log(utente.value);
  utenteService.post(utente.value).then((resp) => {
    console.log(resp.data);
    utente.value = resp.data;
    console.log(utente.value);
    showSucessScreen.value = true;
  });

  closeRegistration(false);
};

const fillAppointmentData = () => {
  console.log(appointment.value.appointmentDate);
  const newDate = new Date(appointment.value.appointmentDate, 'DD-MM-YYYY');
  utente.value.clinic = selectedClinic.value;
  utente.value.status = 'ENVIADO';
  appointment.value.clinic = selectedClinic.value;
  appointment.value.status = 'PENDENTE';
  appointment.value.hasHappened = false;
  appointment.value.orderNumber = 1;
  appointment.value.visitDate = null;
  appointment.value.appointmentDate = moment(
    appointment.value.appointmentDate,
    'DD-MM-YYYY'
  ).format('YYYY-MM-DD');
  appointment.value.time = newDate.getHours() + ':' + newDate.getMinutes();
  appointment.value.utente = {};
  appointment.value.utente.id = utente.value.id;
  appointment.value.utente_id = utente.value.id;
  utente.value.appointments = [];
  utente.value.appointments.push(appointment.value);
};
const phoneRules = (val) => {
  if (val.length === 0 || val.length < 9) {
    return 'O Número é invalido. Deve conter 9 dígitos.';
  } else if (validatePhonePrefix(parseInt(val.substring(0, 2)))) {
    return 'O Número é invalido. O codigo da operadora não existe';
  }
};

const whatsapNumberRules = (val) => {
  if (val.length !== 0 && val.length < 9) {
    return 'O Número é invalido. Deve conter 9 dígitos.';
  } else if (
    val.length !== 0 &&
    validatePhonePrefix(parseInt(val.substring(0, 2)))
  ) {
    return 'O Número é invalido. O codigo da operadora não existe';
  }
};

const validatePhonePrefix = (val) => {
  if (
    val !== 82 &&
    val !== 83 &&
    val !== 84 &&
    val !== 85 &&
    val !== 86 &&
    val !== 87
  ) {
    return true;
  }
};

provide('utente', utente);
provide('appointment', appointment);
provide('selectedClinic', selectedClinic);
</script>
