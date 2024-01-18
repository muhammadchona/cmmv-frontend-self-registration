import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import Appointment from 'src/stores/models/appointment/Appointment';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';
import { date } from 'quasar';
import UtenteService from '../utente/UtenteService';

const appointment = useRepo(Appointment);

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
    console.log(utente);
    return appointment.query().where('utente_id', utente.id).first();
  },
  getAppointmentByUtenteId(utenteId: number) {
    //  return appointment.query().where('utente_id', ).first();
  },

  formatDate(value) {
    return date.formatDate(value, 'YYYY/MM/DD');
  },
  formatDateDDMMMYYYY(value) {
    return date.formatDate(value, 'DD MMM YYYY');
  },
};
