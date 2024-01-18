import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import { nSQL } from 'nano-sql';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';
import { UserLogin } from 'src/stores/models/userLogin/UserLogin';


const userLogin = useRepo(UserLogin);

const { alertSucess, alertError } = useSwal();
const { isMobile, isOnline } = useSystemUtils();

export default {
  post(params: string) {
    if (isMobile.value && !isOnline.value) {
      return this.putMobile(params);
    } else {
      return this.postWeb(params);
    }
  },
  get(offset: number) {
    if (isMobile.value && !isOnline.value) {
      this.getMobile();
    } else {
      return this.getWeb(offset);
    }
  },
  patch(id: number, params: string) {
    if (isMobile.value && !isOnline.value) {
      return this.putMobile(params);
    } else {
      return this.patchWeb(id, params);
    }
  },
  delete(id: number) {
    if (isMobile.value && !isOnline.value) {
      this.deleteMobile(id);
    } else {
      return this.deleteWeb(id);
    }
  },
  // WEB
  postWeb(params: string) {
    return api()
      .post('userLogin', params)
      .then((resp) => {
        userLogin.save(resp.data);
      });
  },
  getWeb(offset: number) {
    if (offset >= 0) {
      return api()
        .get('userLogin?offset=' + offset + '&max=100')
        .then((resp) => {
          userLogin.save(resp.data);
          offset = offset + 100;
          if (resp.data.length > 0) {
            this.get(offset);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  patchWeb(id: number, params: string) {
    return api()
      .patch('userLogin/' + id, params)
      .then((resp) => {
        userLogin.save(resp.data);
      });
  },
  deleteWeb(id: number) {
    return api()
      .delete('userLogin/' + id)
      .then(() => {
        userLogin.destroy(id);
      });
  },

  // Mobile
  putMobile(params: string) {
    return nSQL(UserLogin.entity)
      .query('upsert', params)
      .exec()
      .then((resp) => {
        userLogin.save(resp[0].affectedRows);
      });
  },
  getMobile() {
    return nSQL(UserLogin.entity)
      .query('select')
      .exec()
      .then((rows: any) => {
        userLogin.save(rows);
      })
      .catch((error: any) => {
        // alertError('Aconteceu um erro inesperado nesta operação.');
        console.log(error);
      });
  },
  deleteMobile(paramsId: string) {
    return nSQL(UserLogin.entity)
      .query('delete')
      .where(['id', '=', paramsId])
      .exec()
      .then(() => {
        userLogin.destroy(paramsId);
        alertSucess('O Registo foi removido com sucesso');
      })
      .catch((error: any) => {
        // alertError('Aconteceu um erro inesperado nesta operação.');
        console.log(error);
      });
  },
  // Local Storage Pinia
  newInstanceEntity() {
    return userLogin.getModel().$newInstance();
  },
  getAllFromStorage() {
    return userLogin.all();
  },
  deleteAllFromStorage() {
    userLogin.flush();
  },
  getByUserLoginId(id: number) {
    return userLogin.query().whereId(id).first();
  },
  getAllUsers() {
    return userLogin.query().withAllRecursive(2).orderBy('id', 'desc').get();
  },
};
