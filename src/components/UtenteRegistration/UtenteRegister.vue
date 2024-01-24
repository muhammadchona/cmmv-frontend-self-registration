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
        <div class="row q-pl-sm q-my-lg bold-text">
          <strong>Unidade Sanitaria para Acompanhamento </strong>
        </div>
        <div class="row justify-end">
          <q-toggle
            v-model="searchNearMe"
            label="Ver locais próximos a mim"
            @update:model-value="changeValue()"
            left-label
          />
        </div>
        <div class="row q-mb-md">
          <q-select
            class="col"
            dense
            outlined
            rounded
            v-model="selectedProvince"
            :options="provinces"
            :disable="disableFields"
            transition-show="flip-up"
            transition-hide="flip-down"
            ref="provinceRef"
            option-value="id"
            option-label="description"
            :rules="[(val) => val != null || ' Por favor indique a província']"
            lazy-rules
            label="Província"
          />
          <q-select
            class="col q-pl-sm"
            dense
            outlined
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            :disable="disableFields"
            v-model="selectedDistrict"
            :options="districts"
            ref="districtRef"
            option-value="id"
            option-label="description"
            :rules="[
              (val) => val != null || ' Por favor indique a Distrito/Cidade',
            ]"
            lazy-rules
            label="Distrito"
          />
        </div>
        <div class="row q-mb-md">
          <q-select
            class="col"
            dense
            outlined
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            v-model="selectedClinic"
            :options="clinics"
            ref="clinicRef"
            option-value="id"
            option-label="name"
            :rules="[
              (val) => val != null || ' Por favor indique a Unidade Sanitaria',
            ]"
            lazy-rules
            label="Unidade Sanitaria"
          />
        </div>
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
import { date } from 'quasar';
import { ref, onMounted, computed, inject, provide } from 'vue';
import moment from 'moment';
import Appointment from '../../stores/models/appointment/Appointment';
import provinceService from '../../services/api/province/provinceService';
import districtService from '../../services/api/district/districtService';
import clinicService from 'src/services/api/clinic/clinicService';
import inputPhoneCode from 'components/Shared/IconPhoneCode.vue';
import { useLoading } from 'src/composables/shared/loading/loading';
import utenteService from 'src/services/api/utente/UtenteService';
import UtenteSuccess from './UtenteSuccess.vue';

const { closeLoading, showloading } = useLoading();
const utente = ref(new Utente());
const currUtente = ref({});
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedClinic = ref(null);
const searchNearMe = ref(false);
const location = ref(null);
const gettingLocation = ref(false);
const errorStr = ref(null);
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
const provinceRef = ref(null);
const districtRef = ref(null);
const ageRef = ref(null);
const clinicRef = ref(null);
const appointmentDateRef = ref(null);
const disableFields = ref(false);
const showRegistrationScreen = inject('showRegistrationScreen');
const showMainScreen = inject('showMainScreen');
const appointment = ref(new Appointment());
const showSucessScreen = ref(false);
let initialDistrict = 0;

onMounted(async () => {
  currUtente.value = Object.assign({}, utente.value);
  getParams();
  await locateMe();
  console.log(myLocation);
  clinicService.getClinicsByGeoLocationAndRadius(
    myLocation.latitude,
    myLocation.longitude,
    10
  );
  //  console.log(utenteToEdit.value)
});

const blockDataPassado = (date) => {
  return date >= moment(new Date()).format('YYYY/MM/DD');
};

const provinces = computed(() => {
  return provinceService.getAllProvinces();
});

const districts = computed(() => {
  if (selectedProvince.value !== null) {
    return districtService.getAllByProvinceId(selectedProvince.value.id);
  } else {
    return null;
  }
});

const clinics = computed(() => {
  if (selectedDistrict.value != null) {
    return getClinicsByDistrictId();
  } else if (searchNearMe.value === true) {
    getClinicsByGeoLocationAndRadius();
    return clinicService.getAllFromStorage();
  } else {
    return [];
  }
});

const getClinicsByGeoLocationAndRadius = async () => {
  return clinicService.getClinicsByGeoLocationAndRadius(
    myLocation.latitude,
    myLocation.longitude,
    10
  );
};

const getClinicsByDistrictId = () => {
  console.log(selectedDistrict.value.id);
  if (
    selectedDistrict.value.id != undefined &&
    initialDistrict !== selectedDistrict.value.id
  ) {
    showloading();
    initialDistrict = selectedDistrict.value.id;
    getAllClinicsByDistrictId(selectedDistrict.value.id).then((resp) => {
      closeLoading();
      console.log(resp);
    });
  }
  console.log(selectedDistrict.value);
  if ((selectedDistrict.value.id != undefined) != null) {
    return getLocalClinicsByDistrictId(selectedDistrict.value.id);
  } else {
    return null;
  }
};

const getLocalClinicsByDistrictId = (districtId) => {
  return clinicService.getLocalClinicsByDistrictId(districtId);
};

const getAllClinicsByDistrictId = async (districtId) => {
  /*
           await Clinic.api().get('/clinic/district/' + districtId).then(resp => {
              console.log(resp.response.data)
            }).catch(error => {
                console.log(error)
            })
            */
  return await clinicService.getAllClinicsByDistrictId(districtId);
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

const changeValue = () => {
  console.log('mudou');
  if (searchNearMe.value) {
    disableFields.value = true;
  } else {
    disableFields.value = false;
  }
  // Display or use the sorted list of clinics with distances
  /*
  nearbyClinics.forEach((clinic) => {
    console.log(`${clinic.name} - Distance: ${clinic.distance.toFixed(2)} km`);
  });
  */
};

const closeRegistration = () => {
  showloading();
  setTimeout(() => {
    closeLoading();
    // $emit('update:showUtenteRegistrationScreenProp', close)
    //  showUtenteRegistrationScreen.value = false;
  }, 100);
};

const closeRegistrationVerification = () => {
  console.log(showRegistrationScreen);
  showRegistrationScreen.value = false;
  showMainScreen.value = true;
};

/*
const verificationDialog = () => {
  alertWarningAction('Pretende voltar ao ecrã anterior?').then((result) => {
    if (result) {
      utente.value = {};
      //  emit('update:showUtenteRegistrationScreenProp', false)
      showRegistrationScreen.value = false;
    }
  });
};
*/
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
  clinicRef.value.validate();
  appointmentDateRef.value.validate();
  if (
    !nomeRef.value.hasError &&
    !apelidoRef.value.hasError &&
    !phoneRef.value.hasError &&
    !whatsappRef.value.hasError &&
    !ageRef.value.hasError &&
    !clinicRef.value.hasError &&
    !appointmentDateRef.value.hasError
  ) {
    saveOrUpdateUtente();
  }
};

const getYYYYMMDDFromJSDate = (jsDate) => {
  return moment(jsDate).local().format('YYYY-MM-DD');
};

const getDateFromHyphenDDMMYYYY = (jsDate) => {
  return date.extractDate(jsDate, 'DD-MM-YYYY');
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
  // utenteService.post(utente.value)
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

const getLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(
        new Error(
          'Localização Geográfica não está disponível. Por favor, ligue a Localização Geográfica no seu dispositivo.'
        )
      );
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve(pos);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

const locateMe = async () => {
  // showloading();
  gettingLocation.value = true;
  try {
    gettingLocation.value = false;
    location.value = await getLocation();
    console.log(location.value);
    myLocation.latitude = location.value.coords.latitude;
    myLocation.longitude = location.value.coords.longitude;
    closeLoading();
  } catch (e) {
    gettingLocation.value = false;
    errorStr.value = e.message;
    closeLoading();
    alertWarningAction(
      'Não tem permissões para aceder a localização do dispositivo ou a função de localização encontra-se desligada.\n Por favor ligue a localização ou dê as permissões de localização'
    ).then((result) => {
      if (result) {
        myLocation.latitude = -25.9678239;
        myLocation.longitude = 32.5864914;
        console.log(myLocation);
        closeLoading();
      }
    });
  }
};

provide('utente', utente);
provide('appointment', appointment);
</script>
