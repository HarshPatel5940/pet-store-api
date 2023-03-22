import * as yup from "yup";

export const petSchema = yup.object().shape({
    uuid: yup.string().required().trim(),
    OwnerID: yup.string().required().trim(),
    petName: yup.string().required().trim(),
    petAge: yup.number().required(),
    petType: yup.string().required().trim(),
    petGender: yup.string().required().trim(),
});

export const ownerSchema = yup.object().shape({
    uuid: yup.string().required().trim(),
    ownerName: yup.string().required().trim(),
    ownerEmail: yup.string().trim(), // Optional
});
