<template>
    <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top">
        <q-slide-item @left="$emit('previousScreen')" @right="$emit('nextScreen')" left-color="white" right-color="white">
            <template v-slot:left>
            <q-icon name="reply" />
            </template>
            <template v-slot:right>
            <q-icon name="arrow_forward_ios" />
            </template>
            <q-item>
                <div key="thirdScreen" class="q-gutter-md row items-start">
                    <img src="~src/assets/03Vantagensmaior15.png"
                        style="height: auto; max-width: 100%">
                        <div class="q-ma-lg">
                            <div class="row q-mb-lg">
                                <q-item-label class="text-h5">As vantagens da circuncisão</q-item-label>
                            </div>
                            <div class="row">
                                <ul>
                                    <li>Facilita a higiene do pénis;</li>
                                    <li>Previne infecções urinárias;</li>
                                    <li>Diminui o risco de contrair doenças de transmissão sexual, in­cluindo a infecção pelo HIV/SIDA;</li>
                                    <li>Resolve problemas ligados ao prepúcio (dificuldade ou impossi­bilidade de puxar o prepúcio para trás, de forma a expor a cabeça do pénis);</li>
                                    <li>Diminui o risco de desenvolvimento do cancro do pénis;</li>
                                    <li>Reduz o risco de desenvolvimento do cancro do colo do útero na parceira.</li>
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
