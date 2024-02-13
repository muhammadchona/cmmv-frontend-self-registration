<template>
  <transition-group
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutLeft absolute-top"
  >
    <q-slide-item @left="$emit('previousScreen')" left-color="white">
      <template v-slot:left>
        <q-icon name="reply" />
      </template>
      <q-item>
        <div key="seventhScreen" class="q-gutter-md row items-start">
          <img
            src="~src/assets/07Escolha.png"
            style="height: auto; max-width: 100%"
          />
          <div class="row q-mb-lg">
            <q-item-label class="text-h4">{{
              'Faça uma escolha consciente'
            }}</q-item-label>
          </div>
          <div class="row">
            <p>A circuncisão médica é gratuita, segura e rápida.</p>
            <p>
              Passe a palavra ao seu irmão/amigo/vizinho/parente, com 15 à 49
              anos de idade.
            </p>

            <p>
              Para mais informação sobre a circuncisão médica masculina
              voluntária

              <q-btn
                class="link"
                flat
                color="primary"
                text-color="primary"
                @click="$emit('showInformationScreen')"
              >
                clique aqui
              </q-btn>
            </p>
          </div>
        </div>
      </q-item>
    </q-slide-item>
    <div class="q-pa-md">
      <div class="row justify-center q-gutter-md">
        <!-- Use 'col' classes for responsive columns -->
        <q-col v-if="!$q.platform.is.mobile" cols="6">
          <q-btn
            unelevated
            rounded
            color="primary"
            label="Marcar Consulta"
            @click="$emit('createAppointment')"
          />
        </q-col>

        <q-col cols="12" v-if="$q.platform.is.mobile">
          <!-- Full width on mobile -->
          <q-btn
            unelevated
            rounded
            color="primary"
            label="Marcar Consulta"
            @click="$emit('createAppointment')"
          />
        </q-col>

        <q-col v-if="!$q.platform.is.mobile" cols="6">
          <q-btn
            unelevated
            rounded
            color="green"
            label="Pesquisar Consulta"
            @click="$emit('searchAppointment')"
          />
        </q-col>

        <q-col cols="12" v-if="$q.platform.is.mobile">
          <!-- Full width on mobile -->
          <q-btn
            unelevated
            rounded
            color="green"
            label="Pesquisar Consulta"
            @click="$emit('searchAppointment')"
          />
        </q-col>
      </div>
      <div class="row q-pt-md">
        <div class="col-4">
          <q-btn
            flat
            round
            color="primary"
            icon="west"
            @click="$emit('previousScreen')"
          />
        </div>
        <div class="col-4 flex justify-center items-center">
          <q-btn flat color="red" @click="$emit('firstScreen')" label="Sair" />
        </div>
        <div class="col-4"></div>
      </div>
    </div>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    </transition>
  </transition-group>
</template>

<script setup></script>

<style>
.link {
  text-decoration: underline; /* Remove button default styling */
  cursor: pointer;
  margin: 0; /* Adjust margin as needed */
  padding: 0; /* Adjust padding as needed */
}
.link .q-btn__label {
  text-decoration: underline;
}
</style>
