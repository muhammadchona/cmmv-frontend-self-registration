// import { useMediaQuery } from '@vueuse/core';
import { Platform } from 'quasar';
import { computed } from 'vue';
//import mixinplatform from '../mixins/mixin-system-platform'

export function useSystemUtils() {
  // const isWebScreen = useMediaQuery('(min-width: 1024px)');
  const website = computed(() => (Platform.is.mobile ? false : true));
  const isDeskTop = computed(() => (Platform.is.desktop ? true : false));
  const isMobile = computed(() => (Platform.is.mobile ? true : false));
  const isElectron = computed(() => (Platform.is.electron ? true : false));

  //(LocalStorage.getItem('clinic_sectors') !== null && LocalStorage.getItem('clinic_sectors').includes('NORMAL'))
  return { website, isDeskTop, isMobile, isElectron };
}
