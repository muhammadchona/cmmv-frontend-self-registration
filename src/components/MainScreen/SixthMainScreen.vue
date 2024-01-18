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
                <div key="sixthScreen" class="q-gutter-md row items-start">
                    <img
                            src="~src/assets/06Cuidados.png"
                            style="height: auto; max-width: 100%"
                            >
                        <div class="q-ma-lg">
                            <div class="row q-mb-lg">
                                <q-item-label class="text-h5">Cuidados Pós-operatórios</q-item-label>
                            </div>
                            <div class="row">
                                <ul>
                                    <li>O penso deve ser removido na unidade sanitária 48 horas após a circuncisão</li>
                                    <li>O circuncisado retorna no  7º dia após o procedimento para avaliação do clínico</li>
                                    <li>Retorna a 6ª semana para última avaliação e alta definitiva</li>
                                    <li>Em caso de qualquer problema depois do procedimento volte de imediato a unidade sanitária ou ligue para o contacto recebido na unidade de circuncisão. </li>
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
