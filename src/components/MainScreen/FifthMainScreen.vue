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
                <div key="fifthScreen" class="q-gutter-md row items-start">
                    <img
                            src="~src/assets/05OndeFazer.png"
                            style="height: auto; max-width: 100%"
                            >
                        <pageContent
                            title="Onde fazer a circuncisão"
                            content="A circuncisão é feita na unidade sanitária que oferece os serviços de circuncisão."
                            content1="É seguro fazer a circuncisão na unidade sanitária porque o procedimento é feito por profissionais de saúde qualificados e usa-se anestesia para evitar a dor e leva medicamento para tomar quando a anestesia passar para que não sinta dor.."
                            content2="A circuncisão é feita de forma rápida e segura, dura 30 minutos, e depois de terminar a pessoa pode ir para casa a pé ou de chapa."
                            />
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
import pageContent from 'components/MainScreen/Content.vue'
</script>

<style>

</style>
