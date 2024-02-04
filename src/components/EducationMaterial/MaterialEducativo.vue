<template>
  <transition-group
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-card key="material" class="my-card full-width q-pt-lg">
      <q-list bordered separator v-if="infoDocsOrImages.length > 0">
        <viewDocsOrImages
          v-for="docs in infoDocsOrImages"
          :key="docs.id"
          :file="docs"
          :id="docs.id"
          :showDownload="showDownload"
        />
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
</template>
<script setup>
import { onMounted, computed } from 'vue';
import infoDocsOrImagesSerice from '../../services/api/dorcOrImages/infoDocsOrImagesSerice';
import { useQuasar } from 'quasar';
import { useLoading } from 'src/composables/shared/loading/loading';
import viewDocsOrImages from './ViewDocsOrImages.vue';

const { closeLoading, showloading } = useLoading();

const infoDocsOrImages = computed(() => {
  return infoDocsOrImagesSerice.getAllForMobilizer();
});

onMounted(() => {
  showloading();
  getInfoDocsOrImages();
});

const getInfoDocsOrImages = async () => {
  await infoDocsOrImagesSerice.get(0);
  closeLoading();
};
</script>

<script>
export default {
  props: ['docsOrImages', 'showDownload'],
  data() {
    const $q = useQuasar();
    return {
      $q,
    };
  },
};
</script>
