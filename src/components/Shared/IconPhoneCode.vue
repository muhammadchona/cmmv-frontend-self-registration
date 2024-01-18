 <template>
 <q-input
                    ref="whatsapp"
                    mask="###"
                    :disable="true"
                    label="+258" >
                 <template v-slot:prepend>
                   <q-avatar>
            <img src="~src/assets/MZ.svg">
                   </q-avatar>
        </template>
            </q-input>
</template>
