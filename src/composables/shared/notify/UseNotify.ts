import { Notify,useQuasar } from 'quasar';
const $q = useQuasar()
export function  useNotify () {

  function notifySuccess (messageParam: string) {
        Notify.create({
            icon: 'announcement',
            message: messageParam,
            type: 'positive',
            progress: true,
            timeout: 5000,
            position: 'top',
            color: 'negative',
            textColor: 'white',
            classes: 'glossy',
        })
    };

    function notifyError (messageParam: string) {
    Notify.create({
        icon: 'announcement',
        message: messageParam,
        type: 'negative',
        progress: true,
        timeout: 5000,
        position: 'top',
        color: 'negative',
        textColor: 'white',
        classes: 'glossy',
    })
};

function notifyMobileSuccess (messageParam: string) {
  $q.notify({
    message: messageParam,
    color: 'teal'
})
}

function notifyMobileError  (messageParam: string) {
  $q.notify({
    message: messageParam,
    color: 'red'
})
}

  return {
    notifySuccess,
    notifyError,
    notifyMobileSuccess,
    notifyMobileError
  }
}
