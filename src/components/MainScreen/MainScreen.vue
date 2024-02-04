<template>
  <transition-group
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutLeft absolute-top"
  >
    <div
      key="main"
      class="row bg-light-green-2 absolute full-width full-height column"
    >
      <div class="q-gutter-md row items-start">
        <q-img src="~src/assets/01MainScreen.jpg" fit="cover" />
      </div>
    </div>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    </transition>
  </transition-group>
  <div class="absolute-bottom flex flex-center q-my-md">
    <q-btn
      class="q-py-sm"
      unelevated
      rounded
      color="primary"
      label="Entrar"
      @click="$emit('nextScreen')"
    />
  </div>
</template>
<script setup></script>
