import * as yup from "yup";

export const ordersSerializer = yup.object().shape({
  value: yup.number().required(),
  status: yup.string().required(),
  date: yup.date().required()
});

export const ordersSerializerResponse = yup.object().shape({
  value: yup.number().nullable(),
  status: yup.string().nullable(),
  date: yup.date().nullable(),
  id:yup.number().nullable(),
  user:yup.object({
    id:yup.string().nullable(),
    name:yup.string().nullable()
  })
});

export const listordersSerializerResponse = yup.array(ordersSerializerResponse)

