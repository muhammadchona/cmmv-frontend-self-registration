import { Model } from 'pinia-orm';
// import CommunityMobilizer from '../mobilizer/CommunityMobilizer'
import Utente from '../utente/Utente';
import District from '../district/District';
import Province from '../province/Province';
// import db from 'src/store/localbase'

export default class Clinic extends Model {
  static entity = 'clinics';

  static fields() {
    return {
      id: this.attr(null),
      code: this.attr(''),
      name: this.attr(''),
      type: this.attr(''),
      latitude: this.attr(''),
      longitude: this.attr(''),
      active: this.attr(''),
      distance: this.attr(''),
      district_id: this.attr(''),
      province_id: this.attr(''),

      // Relationshiops
      province: this.belongsTo(Province, 'province_id'),
      district: this.belongsTo(District, 'district_id'),

      // appointments: this.hasMany(Appointment, 'clinic_id'),
      // communityMobilizers: this.hasMany(CommunityMobilizer, 'clinic_id'),
      utentes: this.hasMany(Utente, 'clinic_id'),
    };
  }

  /*
  static async apiGetAll () {
    return await this.api().get('/clinic')
  }

  static localDbAdd (clinic) {
    return db.newDb().collection('clinics').add(clinic)
  }

  static localDbGetById (id) {
    return db.newDb().collection('clinics').doc({ id: id }).get()
  }

  static localDbGetAll () {
    return db.newDb().collection('clinics').get()
  }

  static localDbUpdate (clinic) {
    return db.newDb().collection('clinics').doc({ id: clinic.id }).set(clinic)
  }

  static localDbUpdateAll (clinics) {
    return db.newDb().collection('clinics').set(clinics)
  }

  static localDbDelete (clinic) {
    return db.newDb().collection('clinics').doc({ id: clinic.id }).delete()
  }

  static localDbDeleteAll () {
    return db.newDb().collection('clinics').delete()
  }
  */
}
