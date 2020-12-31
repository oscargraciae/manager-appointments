import { IBusiness } from "../types/Business";

export const businessValidation = (values: IBusiness) => {
  const errors : any = {};
  
  if (!values.name) {
    errors.name = 'Ingresa el nombre de tu negocio'
  }

  if (Number(values.businessCategoryId) === 0) {
    errors.businessCategoryId = 'Ingresa una categoría'
  }

  return errors;
}