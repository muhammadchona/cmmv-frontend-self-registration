<template>
    <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top" >
        <q-slide-item @left="$emit('previousScreen')" @right="$emit('nextScreen')" left-color="white" right-color="white">
            <template v-slot:left>
            <q-icon name="reply" />
            </template>
            <template v-slot:right>
            <q-icon name="arrow_forward_ios" />
            </template>
            <q-item>
                <div key="fourthScreen" class="row full-height justify-center">
                    <img
                            src="~src/assets/04Vantagensmenor15.png"
                            style="height: auto; max-width: 100%"
                            >
                        <div class="q-ma-lg">
                            <div class="row q-mb-lg">
                                <q-item-label class="text-h5">Vantagens da circuncisão a partir dos 15 anos de idade</q-item-label>
                            </div>
                            <div class="row">
                                <ul>
                                    <li>Facilita o processo de circuncisão porque o pénis está bem desenvolvido;</li>
                                    <li>Facilita o autocuidado (seguimento das medidas de trata­mento da ferida na fase de recuperação);</li>
                                    <li>Facilita o cumprimento das visitas para o penso na unidade de circuncisão; </li>
                                    <li>Perceberá melhor as mensagens sobre circuncisão e HIV, fornecidas pelos provedores e mobilizadores;</li>
                                    <li>Perceberá melhor os cuidados a ter com a ferida durante o tempo de recuperação;</li>
                                    <li>Previna-te do HIV enquanto ainda é novo, observando as medidas de prevenção; incluindo retardar o início da acti­vidade sexual. Ao completar 15 anos, a prevenção do HIV será reforçada pela circuncisão. </li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </q-item>
        </q-slide-item>
        <navigationButtons
            @nextScreen="$emit('nextScreen')"
            @previousScreen="$emit('previousScreen')" />
    </transition-group>
</template>

<script setup>
import navigationButtons from 'components/MainScreen/NavigationButtons.vue'

</script>

<style>

</style>
