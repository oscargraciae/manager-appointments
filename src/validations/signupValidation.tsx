import { User } from "../types/User";

export const signupValidation = (values: User) => {
  const errors : any = {};
  if (!values.email) {
    errors.email = 'Ingresa una dirección de correo electrónico';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Ingresa una dirección de correo electrónico';
  }

  if (!values.password) {
    errors.password = 'Ingresa una contraseña'
  }

  if (!values.firstName) {
    errors.firstName = 'Ingresa un nombre'
  }

  if (!values.lastName) {
    errors.lastName = 'Ingresa un apellido'
  }

  return errors;
}