import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import Province from 'src/stores/models/province/Province';

const province = useRepo(Province);

export default {
  get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('province?offset=' + offset + '&max=100')
        .then((resp) => {
          province.save(resp.data);
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

  getAllProvinces() {
    const ab = province
      .query()
      .withAllRecursive(2)
      .orderBy('code', 'asc')
      .get();
    return ab;
    // .has('code')
  },

  // Local Storage Pinia
  newInstanceEntity() {
    return province.getModel().$newInstance();
  },
  getAllFromStorage() {
    return province.all();
  },
  deleteAllFromStorage() {
    province.flush();
  },
  getById(id: number) {
    return province.query().withAll().whereId(id).first();
  },
};
