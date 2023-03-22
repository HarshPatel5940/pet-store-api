import yup from "yup";

export const petSchema = yup.object().shape({
    _id: yup.string().required(),
    OwnerID: yup.string().required(),
    petName: yup.string().required(),
    petAge: yup.number().required(),
    petType: yup.string().required(),
    petGender: yup.string().required(),
});

export const ownerSchema = yup.object().shape({
    uuid: yup.string().required(),
    ownerName: yup.string().required(),
    ownerEmail: yup.string(), // Optional
});
