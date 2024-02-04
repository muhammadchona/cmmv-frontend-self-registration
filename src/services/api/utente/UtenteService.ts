import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import Utente from 'src/stores/models/utente/Utente';

const utente = useRepo(Utente);

export default {
  async post(params: string) {
    return api()
      .post('utente', params)
      .then((resp) => {
        utente.save(resp.data);
        return resp;
      });
  },

  // Local Storage Pinia
  newInstanceEntity() {
    return utente.getModel().$newInstance();
  },
  getAllFromStorage() {
    return utente.all();
  },
  deleteAllFromStorage() {
    utente.flush();
  },

  getLocalUtenteById(id: number) {
    return utente.query().whereId(id).first();
  },

  getLocalUtenteBySystemNumber(systemNumber: number) {
    return utente.query().where('systemNumber', systemNumber).first();
  },

  update(utente: any) {
    utente.save(utente);
  },
};
