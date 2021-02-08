import moment from 'moment';
moment.locale('es-mx');

export const formatDate = (date :Date, format? :string) => {
  if (!format) {
    return moment(date).tz('America/Monterrey').format('DD/MM/YYYY HH:mm');
  }

  return moment(date).format(format);
}

export const formatDateLG = (date :Date) => {
  return moment(date).tz('America/Monterrey').format('dddd DD [de] MMMM [de] YYYY HH:mm');
}