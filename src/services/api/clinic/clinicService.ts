import { useRepo } from 'pinia-orm';
import api from '../apiService/apiService';
import Clinic from 'src/stores/models/clinic/Clinic';
import { useSwal } from 'src/composables/shared/dialog/dialog';

const clinic = useRepo(Clinic);

const { alertSucess, alertError } = useSwal();

export default {
  async getAllClinicsByDistrictId(districtId: number) {
    await api()
      .get('/clinic/district/' + districtId)
      .then((resp) => {
        clinic.save(resp.data);
        return resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async getClinicsByGeoLocationAndRadius(
    userLatitude: number,
    userLongitude: number,
    radiusInKm: number
  ) {
    try {
      const clinics = [];
      const response = await api().get(
        `/clinic/search/${userLatitude}/${userLongitude}/${radiusInKm}`
      );
      response.data.forEach((clinic: any) => {
        if (clinic.longitude !== undefined && clinic.longitude !== null) {
          const calcDist = this.getDistance(
            userLatitude,
            userLongitude,
            clinic.latitude,
            clinic.longitude,
            'K'
          );
          clinic.distance = this.round(calcDist / 1000, 3);
        }
        console.log(clinic);
        clinics.push(clinic);
      });
      console.log(clinics);
      clinic.save(clinics);
      console.log(clinic.all());
      return clinics;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  round(value: number, precision: number) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  },

  getDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: string
  ) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') {
        dist = dist * 1.609344;
      }
      if (unit === 'N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  },
  // Local Storage Pinia
  newInstanceEntity() {
    return clinic.getModel().$newInstance();
  },
  getAllFromStorage() {
    return clinic.all();
  },
  deleteAllFromStorage() {
    clinic.flush();
  },
  getLocalClinicsByDistrictId(districtId: number) {
    console.log(
      clinic
        .query()
        .with('province')
        .with('district')
        .where('district_id', districtId)
        .get()
    );
    return clinic
      .query()
      .with('province')
      .with('district')
      .where('district_id', districtId)
      .get();
  },

  getByClinicId(id: number) {
    return clinic.query().with('province').with('district').whereId(id).first();
  },

  getClinicByUse(id_clinicUser: any) {
    console.log(clinic.all());
    return clinic.query().withAllRecursive().whereId(id_clinicUser).first();
  },
  getClinicSByUser(id_clinicUser: any) {
    return clinic.query().get(id_clinicUser);
  },

  getClinicsWithDistance() {
    return clinic
      .query()
      .with('province')
      .with('district')
      .where((clinic) => {
        return clinic.distance !== '';
      })
      .orderBy('distance', 'asc')
      .get();
  },
};
