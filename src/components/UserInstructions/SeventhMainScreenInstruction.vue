<template>
  <div class="q-pa-md">
    <!--q-btn label="Open Dialog" color="primary" @click="dialog = true" /-->
    <!--q-dialog persistent v-model="dialog">
      <q-card flat bordered class="fixed bottom-instruction text-white" style="background: radial-gradient(circle, #939597 30%, #6b6661 100%)">
        <q-card-section>
          <div class="text-h6">Instruções de Uso</div>
          <div class="text-h7">Botão para navegar para tela de registo do utente</div>
        </q-card-section>
        <q-card-section class="row items-center q-gutter-sm">
          <q-btn v-close-popup label="OK" color="primary" @click="this.dialog2 = true"/>
        </q-card-section>
      </q-card>
      <div class="absolute-bottom q-ma-lg">
       <div class="q-mb-xl">
          <q-btn class="full-width pulsing" rounded color="primary" label="Registar"/>
       </div>
      </div>
    </q-dialog-->
    <q-dialog persistent v-model="dialog2">
        <q-card flat bordered class="fixed bottom-instruction-right text-white" style="background: radial-gradient(circle, #939597 30%, #6b6661 100%)">
          <q-card-section>
            <div class="text-h6">Instruções de Uso</div>
            <div class="text-h7">Botão para navegar para a tela de acesso ao Sistema</div>
          </q-card-section>
          <q-card-section class="row items-center q-gutter-sm">
            <q-btn v-close-popup label="OK" color="primary" />
          </q-card-section>
        </q-card>
        <div class="absolute-bottom flex q-ma-lg">
                <q-btn class="full-width pulsing" rounded color="primary" label="Entrar"/>
        </div>
      </q-dialog>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue'

const dialog = ref(true)
const dialog2 = ref(true)



onMounted(() => {
 checkInstruction()
});

const checkInstruction = () => {
   if (localStorage.getItem('SeventhInstruction')) {
       dialog2.value = false
        localStorage.setItem('SeventhInstruction', false)
      } else {
        localStorage.setItem('SeventhInstruction', true)
      }
}
</script>
<style lang="css" scoped>
.stage {
  position: fixed;
  top: 87.4%;
  border: none;
  transform: translate(3%, -0%);
}

.icon {
  display: inline-block;
  background: #FFF;
  border-radius: 50%;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  color: #000;
  line-height: 50px;
}

.icon:after {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0%;
  content: '';
  box-shadow: inset 0 0 0 3px #FFF;
  transition: transform 0.2s, opacity 0.2s;
}

.icon:hover:after {
  transform: scale(2.45);
  opacity: 0.8;
}

.pulsing:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 30%;
  content: '';
  box-shadow: inset 0 0 0 50px rgb(70, 68, 66);
  transition: transform 0.2s, opacity 0.2s;
  animation: pulsing 0.7s infinite;
}

.bottom-instruction {
  top: 70%;
  left: 0%;
  border-radius: 10%;
  transition: transform 0.2s, opacity 0.2s;
  transform: translate(5%, -40%);
}
.bottom-instruction-right {
  top: 75%;
  left: 20%;
  border-bottom-right-radius: 2em;
  border-bottom-left-radius: 2em;
  transition: transform 0.2s, opacity 0.2s;
  transform: translate(0%, 0%);
}
@keyframes pulsing {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
