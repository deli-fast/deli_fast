import * as yup from "yup";

const addrressSerializer = yup.object().shape({
  district: yup.string(),
  zipCode: yup
    .string()
    .min(8, "zipcode must have 8 digits!")
    .max(8, "zipcode must have 8 digits!"),
  number: yup.string(),
  city: yup.string(),
  state: yup.string(),
});

const returAddressSerializer = yup.object().shape({
  district: yup.string(),
  zipCode: yup.string(),
  number: yup.string(),
  city: yup.string(),
  state: yup.string(),
});

const createUserSerializer = yup.object().shape({
  name: yup.string().required("Empty field!"),
  cpf: yup
    .string()
    .min(11, "cpf must have 11 digits!")
    .max(11, "cpf must have 11 digits!")
    .required("Empty field!"),
  email: yup.string().email("Invalid email").required("Empty field!"),
  password: yup.string().required("Empty field"),
  telephone: yup.string().required("Empty field"),
  type: yup
    .string()
    .oneOf(["admin", "deliveryman", "normal"], "Invalid type!")
    .required("Empty field"),
});

const returnUserSerializer = yup.object().shape({
  name: yup.string(),
  cpf: yup.string(),
  email: yup.string(),
  telephone: yup.string(),
  type: yup.string().oneOf(["admin", "deliveryman", "normal"]),
  address: yup.array(returAddressSerializer),
  id: yup.string(),
  isActive: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});

const listUsersSerializer = yup.array(returnUserSerializer);

export {
  addrressSerializer,
  createUserSerializer,
  returnUserSerializer,
  listUsersSerializer,
  returAddressSerializer,
};
