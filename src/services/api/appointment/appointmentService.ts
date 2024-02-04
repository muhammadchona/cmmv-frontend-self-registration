import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import Appointment from 'src/stores/models/appointment/Appointment';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { date } from 'quasar';
import UtenteService from '../utente/UtenteService';

const appointment = useRepo(Appointment);

const { alertInfo, alertError } = useSwal();

export default {
  async post(params: string) {
    return api()
      .post('appointment', params)
      .then((resp) => {
        appointment.save(resp.data);
      });
  },
  async patch(id: number, params: string) {
    return api()
      .patch('appointment/' + id, params)
      .then((resp) => {
        appointment.save(resp.data);
        return resp.data;
      });
  },

  async apiGetAppointmentByUtenteSystemNumber(systemNumber: string) {
    return api()
      .get('/appointment/utente/search/' + systemNumber)
      .then((resp) => {
        appointment.save(resp.data);
        return resp;
      })
      .catch((error) => {
        if (error.response) {
          alertInfo(
            'Nenhuma consulta encontrada com o código \n[' + systemNumber + ']'
          );
        } else if (!error.status) {
          alertError(
            'Não foi possivel conectar-se ao serviço de pesquisa. \nPor favor tente mais tarde.'
          );
        }
      });
  },

  // Local Storage Pinia
  newInstanceEntity() {
    return appointment.getModel().$newInstance();
  },
  getAllFromStorage() {
    return appointment.all();
  },
  deleteAllFromStorage() {
    appointment.flush();
  },
  getAppointmentByUtenteSystemNumber(systemNumber: number) {
    const utente = UtenteService.getLocalUtenteBySystemNumber(systemNumber);
    return appointment.query().where('utente_id', utente.id).first();
  },
  getAppointmentByUtenteId(utenteId: number) {
    console.log(utenteId);
    //  return appointment.query().where('utente_id', ).first();
  },

  formatDate(value) {
    return date.formatDate(value, 'YYYY/MM/DD');
  },
  formatDateDDMMMYYYY(value) {
    return date.formatDate(value, 'DD MMM YYYY');
  },
};
