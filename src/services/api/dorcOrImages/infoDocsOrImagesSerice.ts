import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import InfoDocsOrImages from 'src/stores/models/dorcOrImages/InfoDocsOrImages';
import { useSwal } from 'src/composables/shared/dialog/dialog';
import { useSystemUtils } from 'src/composables/shared/systemUtils/systemUtils';

const infoDocsOrImages = useRepo(InfoDocsOrImages);

const { alertSucess, alertError } = useSwal();
const { isMobile } = useSystemUtils();

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
    console.log(
      '111' + infoDocsOrImages.query().where('forMobilizer', true).get()
    );
    return infoDocsOrImages.query().where('forMobilizer', true).get();
  },
};
