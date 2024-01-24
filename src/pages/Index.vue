<template>
  <q-page>
    <div class="full-width full-height column">
      <mainScreen
        v-if="showMainScreen"
        @nextScreen="(showMainScreen = false), (showFirstScreen = true)"
      />
      <firstScreen
        v-if="showFirstScreen"
        @startPresentation="
          (showFirstScreen = false), (showSecondScreen = true)
        "
        @createAppointment="
          (showRegistrationScreen = true), (showFirstScreen = false)
        "
        @searchAppointment="
          (showSearchScreen = true), (showFirstScreen = false)
        "
      />
      <secondScreen
        v-if="showSecondScreen"
        @previousScreen="
          (showSecondScreen = !showSecondScreen), (showMainScreen = true)
        "
        @nextScreen="(showThirdScreen = true), (showSecondScreen = false)"
      />
      <thirdScreen
        v-if="showThirdScreen"
        @previousScreen="
          (showThirdScreen = !showThirdScreen), (showSecondScreen = true)
        "
        @nextScreen="(showfourthScreen = true), (showThirdScreen = false)"
      />
      <fourthScreen
        v-if="showfourthScreen"
        @previousScreen="
          (showfourthScreen = !showfourthScreen), (showThirdScreen = true)
        "
        @nextScreen="(showfifthScreen = true), (showfourthScreen = false)"
      />
      <fifthScreen
        v-if="showfifthScreen"
        @previousScreen="
          (showfifthScreen = !showfifthScreen), (showfourthScreen = true)
        "
        @nextScreen="(showfifthScreen = false), (showSixthScreen = true)"
      />
      <sixthScreen
        v-if="showSixthScreen"
        @previousScreen="
          (showSixthScreen = !showSixthScreen), (showfifthScreen = true)
        "
        @nextScreen="(showSixthScreen = false), (showSeventhScreen = true)"
      />
      <seventhScreen
        v-if="showSeventhScreen"
        @previousScreen="
          (showSeventhScreen = !showSeventhScreen), (showSixthScreen = true)
        "
        @createAppointment="
          (showRegistrationScreen = true), (showSeventhScreen = false)
        "
        @searchAppointment="
          (showSearchScreen = true), (showSeventhScreen = false)
        "
        @showInformationScreen="
          (showInformationScreen = true), (showSeventhScreen = false)
        "
      />
      <utenteRegistration v-if="showRegistrationScreen"></utenteRegistration>
      <searchAppointment v-if="showSearchScreen"></searchAppointment>
      <informationScreen v-if="showInformationScreen"></informationScreen>
    </div>
  </q-page>
</template>
<script setup>
import { ref, provide } from 'vue';
import mainScreen from 'components/MainScreen/MainScreen.vue';
import firstScreen from 'components/MainScreen/FirstScreen.vue';
import secondScreen from 'components/MainScreen/SecondMainScreen.vue';
import thirdScreen from 'components/MainScreen/ThirdMainScreen.vue';
import fourthScreen from 'components/MainScreen/FourthMainScreen.vue';
import fifthScreen from 'components/MainScreen/FifthMainScreen.vue';
import sixthScreen from 'components/MainScreen/SixthMainScreen.vue';
import seventhScreen from 'components/MainScreen/SeventhMainScreen.vue';
import utenteRegistration from './../components/UtenteRegistration/UtenteRegister.vue';
import searchAppointment from './../components/UtenteRegistration/SearchAppointment.vue';
import informationScreen from '../components/UtenteRegistration/InformationScreen.vue';
//import Addresss from 'components/Utente/Address.vue'
//import SuccessRegistration from 'components/Utente/SuccessRegistration.vue'
// import clinicSearch from 'components/Utente/SearchSanitaryUnit.vue'
// import appointment from 'components/Utente/Appointment.vue'

const showMainScreen = ref(true);
const showFirstScreen = ref(false);
const showSecondScreen = ref(false);
const showThirdScreen = ref(false);
const showfourthScreen = ref(false);
const showfifthScreen = ref(false);
const showSixthScreen = ref(false);
const showSeventhScreen = ref(false);
const showEightScreen = ref(false);
const showRegistrationScreen = ref(false);
const showSearchScreen = ref(false);
const showInformationScreen = ref(false);

const goHome = (utente) => {
  // showLoginScreen.value = true;
};

provide('showRegistrationScreen', showRegistrationScreen);
provide('showMainScreen', showMainScreen);
provide('showInformationScreen', showInformationScreen);
</script>
<style lang="scss"></style>
