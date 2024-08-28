import Joi from "joi";

export const getAllSheetsDto = Joi.object().keys({
    spreadsheetId: Joi.string().required()
});


export const getSheetProtectesDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    sheetId: Joi.number().required()
});

export const createSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    title: Joi.string().required()
});

export const copyToAnotherSpreadSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    sheetId: Joi.number().required(),
    destinationSpreadsheetId: Joi.string().required(),
});

export const moveSheetToNewIndexDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    sheetId: Joi.number().required(),
    newIndex: Joi.number().required(),
});

export const duplicateSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    sheetId: Joi.number().required()
});


export const duplicateSheetToNewSpreadSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    sheetId: Joi.number().required(),
    newSpreadsheetTitle: Joi.string().required()
});

export const updateSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    sheetId: Joi.number().required(),
    title: Joi.string().optional(),
    tabColor: Joi.object({
        red: Joi.number().min(0).max(256).required(),
        green: Joi.number().min(0).max(256).required(),
        blue: Joi.number().min(0).max(256).required(),
    }).optional()

});

export const deleteSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    sheetId: Joi.number().required()
});


export const protectSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    sheetId: Joi.number().required(),
    description: Joi.string().required(),
    protectedRange: Joi.object().keys({
        startRowIndex: Joi.number().optional(),
        endRowIndex: Joi.number().optional(),
        startColumnIndex: Joi.number().optional(),
        endColumnIndex: Joi.number().optional()
    }).optional(),
    editors: Joi.array().items(Joi.string().email()).optional()
});

export const unProtectSheetDto = Joi.object().keys({
    spreadsheetId: Joi.string().required(),
    protectedRangeId: Joi.number().required()
});
