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
        @previousScreen="(showFirstScreen = false), (showMainScreen = true)"
      />
      <secondScreen
        v-if="showSecondScreen"
        @previousScreen="
          (showSecondScreen = !showSecondScreen), (showFirstScreen = true)
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
        @firstScreen="(showSeventhScreen = false), (showMainScreen = true)"
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
      <utenteRegistration v-if="showRegistrationScreen" />
      <searchAppointment
        v-if="showSearchScreen"
        @previousScreen="(showSearchScreen = false), (showFirstScreen = true)"
      />
      <informationScreen
        v-if="showInformationScreen"
        @previousScreen="
          (showInformationScreen = false), (showSeventhScreen = true)
        "
      />
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

const showMainScreen = ref(true);
const showFirstScreen = ref(false);
const showSecondScreen = ref(false);
const showThirdScreen = ref(false);
const showfourthScreen = ref(false);
const showfifthScreen = ref(false);
const showSixthScreen = ref(false);
const showSeventhScreen = ref(false);
const showRegistrationScreen = ref(false);
const showSearchScreen = ref(false);
const showInformationScreen = ref(false);

provide('showRegistrationScreen', showRegistrationScreen);
provide('showFirstScreen', showFirstScreen);
provide('showInformationScreen', showInformationScreen);
</script>
<style lang="scss"></style>
