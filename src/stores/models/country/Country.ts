import { Model } from 'pinia-orm'
import Province from '../province/Province'
// import db from 'src/store/localbase'

export default class Country extends Model {
  static entity = 'countries'

  static fields () {
    return {
      id: this.attr(null),
      description: this.attr(''),
      nacionality: this.attr(''),
      code: this.attr(''),

      // Relationshiops
      provinces: this.hasMany(Province, 'country_id')
    }
  }

  /*
  static localDbAdd (country) {
    return db.newDb().collection('countries').add(country)
  }

  static localDbGetById (id) {
    return db.newDb().collection('countries').doc({ id: id }).get()
  }

  static localDbGetAll () {
    return db.newDb().collection('countries').get()
  }

  static localDbUpdate (country) {
    return db.newDb().collection('countries').doc({ id: country.id }).set(country)
  }

  static localDbUpdateAll (countries) {
    return db.newDb().collection('countries').set(countries)
  }

  static localDbDelete (country) {
    return db.newDb().collection('countries').doc({ id: country.id }).delete()
  }

  static localDbDeleteAll () {
    return db.newDb().collection('countries').delete()
  }
  */
}
