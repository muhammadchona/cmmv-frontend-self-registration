<template>
  <div class="row q-pl-sm bold-text">
    <strong>Local e Data da Consulta</strong>
  </div>
  <div class="row justify-end q-pr-sm">
    <q-toggle
      v-model="searchNearMe"
      label="Ver locais próximos a mim"
      @update:model-value="changeValue()"
      left-label
    />
  </div>
  <div class="row q-mb-md q-pr-sm q-pl-sm" v-if="!disableFields">
    <q-select
      class="col"
      dense
      outlined
      rounded
      v-model="selectedProvince"
      @update:model-value="changeProvince(province)"
      :options="provinces"
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
      v-model="selectedDistrict"
      :options="districts"
      ref="districtRef"
      option-value="id"
      option-label="description"
      :rules="[(val) => val != null || ' Por favor indique a Distrito/Cidade']"
      lazy-rules
      label="Distrito"
    />
  </div>
  <div class="row q-mb-md q-pr-sm q-pl-sm">
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
      label="Local da consulta"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>{{ scope.opt.name }}</q-item-label>
          </q-item-section>
          <q-item-section side top v-if="searchNearMe">
            <q-item-label>{{ scope.opt.distance }}Km</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import provinceService from '../../services/api/province/provinceService';
import districtService from '../../services/api/district/districtService';
import clinicService from 'src/services/api/clinic/clinicService';
import { useLoading } from 'src/composables/shared/loading/loading';
import { useSwal } from 'src/composables/shared/dialog/dialog';
const { closeLoading, showloading } = useLoading();
const { alertInfo } = useSwal();
const disableFields = ref(false);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedClinic = inject('selectedClinic');
const searchNearMe = ref(false);
const location = ref(null);
const gettingLocation = ref(false);
const errorStr = ref(null);
const myLocation = {
  latitude: '',
  longitude: '',
  distance: '',
};
let initialDistrict = 0;
onMounted(async () => {
  console.log(searchNearMe.value);
  if (searchNearMe.value === true) {
    await locateMe();
    await getClinicsByGeoLocationAndRadius();
  }
  getParams();
  if (selectedClinic.value !== null) {
    console.log(selectedClinic.value);
    console.log(selectedClinic.value);
    selectedDistrict.value = selectedClinic.value.district;
    selectedProvince.value = provinceService.getById(
      selectedClinic.value.district.province_id
    );
  }
  //  console.log(utenteToEdit.value)
});

const getParams = () => {
  provinceService.get(0);
  districtService.get(0);
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

const changeProvince = () => {
  console.log('teste');
  selectedDistrict.value = null;
};

const clinics = computed(() => {
  if (selectedDistrict.value != null) {
    return getClinicsByDistrictId();
  } else if (searchNearMe.value === true) {
    return clinicService.getClinicsWithDistance();
  } else {
    return [];
  }
});

const changeValue = async () => {
  console.log('mudou');
  if (searchNearMe.value) {
    selectedDistrict.value = null;
    selectedProvince.value = null;
    disableFields.value = true;
    showloading();
    await locateMe();
    await getClinicsByGeoLocationAndRadius();
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

const getClinicsByGeoLocationAndRadius = async () => {
  let calcDist = 0;
  // let clinic = {};
  console.log(myLocation);

  const clinicsNearMe = await clinicService.getClinicsByGeoLocationAndRadius(
    myLocation.latitude,
    myLocation.longitude,
    10
  );
  console.log(clinicsNearMe);

  clinicsNearMe.forEach((clinic) => {
    if (clinic.longitude !== undefined && clinic.longitude !== null) {
      calcDist = getDistance(
        myLocation.latitude,
        myLocation.longitude,
        clinic.latitude,
        clinic.longitude,
        'K'
      );
      clinic.distance = round(calcDist / 1000, 3);
    }
  });
  console.log(clinicsNearMe);
  return clinicsNearMe;
};

const getAllClinicsByDistrictId = async (districtId) => {
  return await clinicService.getAllClinicsByDistrictId(districtId);
};

const locateMe = async (val) => {
  // showloading();
  console.log(val);
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
    myLocation.latitude = -25.9678239;
    myLocation.longitude = 32.5864914;
    console.log(myLocation);
    closeLoading();
    alertInfo(
      'Não tem permissões ou a função de localização do dispositivo encontra-se desligada.\n Por favor dê as permissões ou ligue a localização.'
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

const getLocation = async (val) => {
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

const getDistance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

const round = (value, precision) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

//provide('selectedClinic', selectedClinic);
</script>
