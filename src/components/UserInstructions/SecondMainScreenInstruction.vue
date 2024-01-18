<template>
  <div class="q-pa-md">
    <!--q-btn label="Open Dialog" color="primary" @click="dialog = true" /-->
    <q-dialog persistent v-model="dialog">
      <q-card flat bordered class="fixed bottom-instruction-left text-white" style="background: radial-gradient(circle, #939597 30%, #6b6661 100%)">
        <q-card-section>
          <div class="text-h6">Instruções de Uso</div>
           <div class="text-h7">Botão para navegar para tela anterior</div>
        </q-card-section>
        <q-card-section class="row items-center q-gutter-sm">
          <q-btn v-close-popup label="OK" color="primary" @click="this.dialog2 = true"/>
        </q-card-section>
      </q-card>
      <div class="absolute-bottom flex flex-left q-ma-sm">
        <div class="stage-right">
          <div class="icon pulsing">
              <q-btn flat round color="primary" icon="west"/>
          </div>
        </div>
      </div>
    </q-dialog>
    <q-dialog persistent v-model="dialog2">
        <q-card flat bordered class="fixed bottom-instruction-right text-white" style="background: radial-gradient(circle, #939597 30%, #6b6661 100%)">
          <q-card-section>
            <div class="text-h6">Instruções de Uso</div>
            <div class="text-h7">Botão para navegar para próxima tela</div>
          </q-card-section>
          <q-card-section class="row items-center q-gutter-sm">
            <q-btn v-close-popup label="OK" color="primary" />
          </q-card-section>
        </q-card>
        <div class="absolute-bottom flex flex q-ma-sm">
          <div class="stage-left">
            <div class="icon pulsing">
                <q-btn rounded label="Próximo"/>
            </div>
          </div>
        </div>
      </q-dialog>
  </div>

</template>

<script setup>
import { ref,onMounted } from 'vue'

const dialog = ref(true)
const dialog2 = ref(false)



onMounted(() => {
 checkInstruction()
});

const checkInstruction = () => {
   if (localStorage.getItem('SecondInstruction')) {
       dialog.value = false
        localStorage.setItem('SecondInstruction', false)
      } else {
        localStorage.setItem('SecondInstruction', true)
      }
}
</script>
<style lang="css" scoped>
.stage-right {
  position: fixed;
  /*top: 50%;
  left: 50%;*/
  transform: translate(-0%, -90%);
}
.stage-left {
  position: fixed;
  /*top: 50%;*/
  left: 84%;
  transform: translate(-0%, -90%);
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
  border-radius: 50%;
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
  border-radius: 50%;
  content: '';
  box-shadow: inset 0 0 0 50px rgb(70, 68, 66);
  transition: transform 0.2s, opacity 0.2s;
  animation: pulsing 0.7s infinite;
}

.bottom-instruction-left {
  top: 85%;
  left: 7%;
  border-bottom-left-radius: 2em;
  transition: transform 0.2s, opacity 0.2s;
  transform: translate(5%, -40%);
}
.bottom-instruction-right {
  top: 85%;
  left: 7%;
   border-bottom-right-radius: 2em;
  transition: transform 0.2s, opacity 0.2s;
  transform: translate(70%, -40%);
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
