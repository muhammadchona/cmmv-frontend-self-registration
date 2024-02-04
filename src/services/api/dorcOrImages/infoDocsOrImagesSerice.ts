import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import InfoDocsOrImages from 'src/stores/models/dorcOrImages/InfoDocsOrImages';

const infoDocsOrImages = useRepo(InfoDocsOrImages);

export default {
  get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('infoDocsOrImages?offset=' + offset + '&max=100')
        .then((resp) => {
          infoDocsOrImages.save(resp.data);
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
  async apiFetchById(id: number) {
    return await api()
      .get(`/infoDocsOrImages/${id}`)
      .then((resp) => {
        infoDocsOrImages.save(resp.data);
        return resp;
      });
  },
  // Local Storage Pinia
  newInstanceEntity() {
    return infoDocsOrImages.getModel().$newInstance();
  },
  getAllFromStorage() {
    return infoDocsOrImages.all();
  },
  deleteAllFromStorage() {
    infoDocsOrImages.flush();
  },

  getAllForMobilizer() {
    return infoDocsOrImages.query().where('forMobilizer', true).get();
  },
};
