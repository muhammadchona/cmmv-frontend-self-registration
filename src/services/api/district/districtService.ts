import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import District from 'src/stores/models/district/District';

const district = useRepo(District);

export default {
  post(params: string) {
    return api()
      .post('district', params)
      .then((resp) => {
        district.save(resp.data);
      });
  },
  async get(offset: number) {
    if (offset >= 0) {
      return api()
        .get('district?offset=' + offset + '&max=100')
        .then((resp) => {
          district.save(resp.data);
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
  patch(id: number, params: string) {
    return api()
      .patch('district/' + id, params)
      .then((resp) => {
        district.save(resp.data);
      });
  },
  // Local Storage Pinia
  newInstanceEntity() {
    return district.getModel().$newInstance();
  },
  getAllFromStorage() {
    return district.all();
  },
  deleteAllFromStorage() {
    district.flush();
  },

  getAllByProvinceId(provinceId: number) {
    return district.query().withAll().where('province_id', provinceId).get();
  },
  getById(districtId: number) {
    return district.query().withAll().whereId(districtId).first();
  },
  getDistrictByIdLogin(idLogin: any) {
    return district.query().find(idLogin);
  },
};
