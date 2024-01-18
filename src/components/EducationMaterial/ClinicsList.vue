<template>
  <div class="row q-mb-md">
    <q-select
      class="col"
      dense
      outlined
      rounded
      v-model="selectedProvince"
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
  <p>
    <strong>
      Lista de Unidade Sanitarias que realizam a Circuncisão Masculina
    </strong>
  </p>
  <transition-group
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-card key="clinics" class="my-card full-width">
      <q-list bordered separator v-if="clinics.length > 0">
        <q-item clickable v-ripple v-for="clinic in clinics" :key="clinic.id">
          <q-item-section> {{ clinic.name }}</q-item-section>
        </q-item>
      </q-list>
      <q-list v-else separator>
        <q-item v-ripple>
          <q-item-section avatar>
            <q-icon color="red" name="mood_bad" />
          </q-item-section>
          <q-item-section class="text-left"
            >Sem resultados na lista</q-item-section
          >
        </q-item>
      </q-list>
    </q-card>
  </transition-group>
  <div class="row justify-end" v-if="clinics.length > 0">
    <q-btn
      unelevated
      push
      rounded
      label="Baixar"
      icon="file_download"
      color="primary"
      @click="downloadList"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, computed, inject, provide } from 'vue';
import provinceService from '../../services/api/province/provinceService';
import districtService from '../../services/api/district/districtService';
import clinicService from 'src/services/api/clinic/clinicService';
import { useLoading } from 'src/composables/shared/loading/loading';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import clinicList from '../../services/api/Report/ClinicList';
const { closeLoading, showloading } = useLoading();
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const initialDistrict = ref(0);
onMounted(async () => {
  getParams();
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

const clinics = computed(() => {
  if (selectedDistrict.value != null) {
    return getClinicsByDistrictId();
  } else {
    return [];
  }
});

const getClinicsByDistrictId = () => {
  console.log(selectedDistrict.value.id);
  if (
    selectedDistrict.value.id != undefined &&
    initialDistrict.value !== selectedDistrict.value.id
  ) {
    showloading();
    initialDistrict.value = selectedDistrict.value.id;
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
  return await clinicService.getAllClinicsByDistrictId(districtId);
};

const downloadList = () => {
  clinicList.downloadPDF(
    selectedProvince.value,
    selectedDistrict.value,
    clinics.value
  );
};
</script>
