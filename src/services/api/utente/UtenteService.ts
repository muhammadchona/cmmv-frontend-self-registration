import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import Utente from 'src/stores/models/utente/Utente';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';

const utente = useRepo(Utente);

const { alertSucess, alertError } = useSwal();
const { isMobile } = useSystemUtils();

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
