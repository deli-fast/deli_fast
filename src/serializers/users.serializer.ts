import * as yup from "yup";

const adrressSerializer = yup.object().shape({
  district: yup.string(),
  zipCode: yup.string(),
  number: yup.string(),
  city: yup.string(),
  state: yup.string(),
});

const createUserSerializer = yup.object().shape({
  name: yup.string().required("Empty field!"),
  cpf: yup.string().required("Empty field!"),
  email: yup.string().email("Invalid email").required("Empty field!"),
  password: yup.string().required("Empty field"),
  telephone: yup.string().required("Empty field"),
  type: yup.string().required("Empty field"),
  address: adrressSerializer,
});

const returnUserSerializer = yup.object().shape({
  name: yup.string(),
  cpf: yup.string(),
  email: yup.string(),
  telephone: yup.string(),
  type: yup.string(),
  address: yup.array(adrressSerializer),
  id: yup.string(),
  isActive: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});

const listUsersSerializer = yup.array(returnUserSerializer);

export {
  adrressSerializer,
  createUserSerializer,
  returnUserSerializer,
  listUsersSerializer,
};
