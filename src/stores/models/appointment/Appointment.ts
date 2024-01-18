import { Model } from 'pinia-orm';
import Clinic from '../clinic/Clinic';
import Utente from '../utente/Utente';
// import db from 'src/store/localbase'

export default class Appointment extends Model {
  static entity = 'appointments';
  static primaryKey = 'id';
  static fields() {
    return {
      id: this.attr(null),
      appointmentDate: this.attr(''),
      time: this.attr(''),
      hasHappened: this.attr(false),
      orderNumber: this.attr(''),
      status: this.attr('PENDENTE'),
      visitDate: this.attr(''),
      utente_id: this.attr(''),
      clinic_id: this.attr(''),
      syncStatus: this.attr(''),

      // Relationships
      utente: this.belongsTo(Utente, 'utente_id'),
      clinic: this.belongsTo(Clinic, 'clinic_id'),
    };
  }

  /*
  static localDbAdd (appointment) {
    return db.newDb().collection('appointments').add(appointment)
  }

  static localDbGetById (id) {
    return db.newDb().collection('appointments').doc({ id: id }).get()
  }

  static localDbGetAll () {
    return db.newDb().collection('appointments').get()
  }

  static localDbUpdate (appointment) {
    return db.newDb().collection('appointments').doc({ id: appointment.id }).set(appointment)
  }

  static localDbUpdateAll (appointments) {
    return db.newDb().collection('appointments').set(appointments)
  }

  static localDbDelete (appointment) {
    return db.newDb().collection('appointments').doc({ id: appointment.id }).delete()
  }

  static localDbDeleteAll () {
    return db.newDb().collection('appointments').delete()
  }
  */
}
