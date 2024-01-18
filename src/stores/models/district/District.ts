import { Model } from 'pinia-orm'
import Province from '../province/Province'
// import Address from '../address/Address'
//import db from 'src/store/localbase'

export default class District extends Model {
  static entity = 'districts'
  static primaryKey = 'id';
  static fields () {
    return {
      id: this.attr(null),
      code: this.attr(''),
      description: this.attr(''),
      province_id: this.attr(''),

      // Relationshiops
      province: this.belongsTo(Province, 'province_id')
    //  addresses: this.hasMany(Address, 'district_id')
    }
  }
  static piniaOptions = {
    persist: true,
  };
  /*
  static async apiGetAll () {
    return await this.api().get('/district')
  }

  static localDbAdd (district) {
    return db.newDb().collection('districts').add(district)
  }

  static localDbGetById (id) {
    return db.newDb().collection('districts').doc({ id: id }).get()
  }

  static localDbGetAll () {
    return db.newDb().collection('districts').get()
  }

  static localDbUpdate (district) {
    return db.newDb().collection('districts').doc({ id: district.id }).set(district)
  }

  static localDbUpdateAll (districts) {
    return db.newDb().collection('districts').set(districts)
  }

  static localDbDelete (district) {
    return db.newDb().collection('districts').doc({ id: district.id }).delete()
  }

  static localDbDeleteAll () {
    return db.newDb().collection('districts').delete()
  }
  */
}
