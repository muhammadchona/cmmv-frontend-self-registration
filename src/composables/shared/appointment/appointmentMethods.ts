import moment from 'moment';
import { useDateUtils } from '../dateUtils/dateUtils';
import { useSwal } from '../dialog/dialog';

export function useAppointmentValidation() {
  function validateAppointmentDate(appointmentDate: string) {
    const date =
      useDateUtils().extractHyphenDateFromDMYConvertYMD(appointmentDate);
    const dateToValidate = useDateUtils().getYYYYMMDDFromJSDate(date);
    const threeMonthsFromNow = moment().add(3, 'months');
    if (dateToValidate < moment().format('YYYY-MM-DD')) {
      useSwal().alertError(
        'A data da consulta indicada é menor que a data da corrente.'
      );
      return false;
    } else if (moment(appointmentDate).isAfter(threeMonthsFromNow)) {
      useSwal().alertError(
        'A data da consulta indicada é menor que a data da corrente.'
      );
      return false;
    }
    return true;
  }

  return { validateAppointmentDate };
}
