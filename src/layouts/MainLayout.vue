<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated> </q-header>
    <q-page-container>
      <keep-alive>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script setup></script>
