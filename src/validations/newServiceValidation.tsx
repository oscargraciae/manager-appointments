import * as Yup from 'yup';

 export const NewServiceSchema = Yup.object().shape({

   name: Yup.string()
    .min(5, 'Demasíado corto, minimo 5 letras.')
    .max(200, 'Maximo 200 letras.')
    .required('Ingresa un nombre'),

  price:Yup.number()
    .min(1)
    .required('Ingresa el precio'),

  time: Yup.string()
  .required('Ingresa el tiempo'),
 });