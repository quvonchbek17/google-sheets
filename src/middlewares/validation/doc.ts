import Joi from "joi";


export const getDocsByIdDto = Joi.object().keys({
    documentId: Joi.string().required()
});


export const createDocsDto = Joi.object().keys({
    title: Joi.string().required()
});

export const updateDocsDto = Joi.object().keys({
    documentId: Joi.string().required(),
    requests: Joi.array().required(),
});


export const updateDocsTitleDto = Joi.object().keys({
    documentId: Joi.string().required(),
    title: Joi.string().required(),
});

export const deleteDocsDto = Joi.object().keys({
    documentId: Joi.string().required()
});
