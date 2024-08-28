import Joi from "joi"

export const getSpreadSheetsByIdDto = Joi.object().keys({
    spreadsheetId: Joi.string().required()
})

export const createSpreadSheetDto = Joi.object().keys({
    title: Joi.string().required()
})

export const updateSpreadSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    title: Joi.string().required()
})

export const deleteSpreadSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required()
})