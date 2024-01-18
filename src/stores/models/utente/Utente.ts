import { Model } from 'pinia-orm';

export default class Utente extends Model {
  static entity = 'utentes';
  // static eagerLoad = ['address', 'mobilizer', 'clinic', 'appointments', 'infoDocsImages']

  static fields() {
    return {
      id: this.attr(null),
      firstNames: this.attr(''),
      lastNames: this.attr(''),
      birthDate: this.attr(''),
      cellNumber: this.attr(''),
      whatsappNumber: this.attr(''),
      systemNumber: this.attr(''),
      status: this.attr(''),
      selected: this.attr(''),
      syncStatus: this.attr(''),
      registerDate: this.attr(''),
      // communityMobilizer_id: this.attr(''),
      //  clinic_id: this.attr(''),
    };
  }
  static piniaOptions = {
    persist: true,
  };

  getFullName() {
    return this.firstnames + ' ' + this.lastname;
  }
}
