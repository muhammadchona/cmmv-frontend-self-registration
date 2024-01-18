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
                <div key="secondScreen" class="q-gutter-md row items-start">
                    <img src="~src/assets/02Definicao.png"
                        style="height: auto; max-width: 100%"/>
                    <pageContent
                        title="O que é a circuncisão"
                        content="Circuncisão masculina médica é uma pequena cirurgia que consiste na retirada da pele que cobre a cabeça do pénis (prepúcio)."
                        />
                </div>
            </q-item>
        </q-slide-item>
         <navigationButtons
                            @nextScreen="$emit('nextScreen')"
                            @previousScreen="$emit('previousScreen')" />
        <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
        <secondScreenInstruction/>
    </transition>
    </transition-group>
</template>

<script setup>
import secondScreenInstruction from 'components/UserInstructions/SecondMainScreenInstruction.vue'
import navigationButtons from 'components/MainScreen/NavigationButtons.vue'
import pageContent from 'components/MainScreen/Content.vue'

</script>

<style>

</style>
