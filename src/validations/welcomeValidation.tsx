import * as Yup from 'yup';

 export const welcomeValidationSchema = Yup.object().shape({

   name: Yup.string()
    .min(5, 'Demasíado corto, minimo 5 letras.')
    .max(200, 'Maximo 200 letras.')
    .required('Ingresa un nombre'),

    businessCategoryId: Yup.number()
    .min(1, 'Selecciona una categoría')
    .required('Selecciona una categoría'),
 });