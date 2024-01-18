<template>
  <div class="q-pa-md">
    <!--q-btn label="Open Dialog" color="primary" @click="dialog = true" /-->
    <q-dialog persistent v-model="dialog">
    <div class="row justify-end">
      <q-card flat bordered
              class="fixed bottom text-white bottom-instruction-right"
              style="border-bottom-left-radius: 2em; background: radial-gradient(circle, #939597 30%, #6b6661 100%)">
        <q-card-section>
          <div class="text-h6">Instruções de Uso</div>
           <div class="text-h7">Botão inicial, seguir para a próxima tela</div>
        </q-card-section>
        <q-card-section class="row items-center q-gutter-sm">
          <q-btn v-close-popup label="OK" color="primary" />
        </q-card-section>
      </q-card>
    </div>
      <div class="absolute-bottom flex flex-center q-ma-xl">
        <div class="stage">
            <div class="icon pulsing">
            <q-btn
                size="xl"
                unelevated round
                @click="$emit('nextScreen')"
                color="primary"
                icon="chevron_right"/>
                    <!--q-icon style="font-size: 2.4em;" name='person'/-->
            </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref,onMounted } from 'vue'

const dialog = ref(true)


onMounted(() => {
 checkInstruction()
});

const checkInstruction = () => {
   if (localStorage.getItem('firstInstruction')) {
       dialog.value = false
        localStorage.setItem('firstInstruction', false)
      } else {
        localStorage.setItem('firstInstruction', true)
      }
}
</script>
<style lang="css" scoped>
.stage {
  position: fixed;
  /*top: 50%;
  left: 50%;*/
  transform: translate(0%, -50%);
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

.bottom {
  top: 70%;
  left: 0%;
/*  border-radius: 10%;*/
  transition: transform 0.2s, opacity 0.2s;
  transform: translate(5%, -40%);
}
.bottom-instruction-right {
  top: 77%;
  left: 50%;
  border-left-radius: 10%;
  transition: transform 0.2s, opacity 0.2s;
  transform: translate(0%, -40%);
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
