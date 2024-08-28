import Joi, { array } from "joi";

export const getAllValues = Joi.object().keys({
  spreadsheetId: Joi.string().required(),
  sheetId: Joi.number().required(),
});

export const getSheetValuesInRangeDto = Joi.object().keys({
  spreadsheetId: Joi.string().required(),
  sheetId: Joi.number().required(),
  range: Joi.string().required(),
});

export const appendValuesDto = Joi.object().keys({
  spreadsheetId: Joi.string().required(),
  sheetId: Joi.number().required(),
  range: Joi.string().required(),
  values: Joi.array().required(),
  valueInputOption: Joi.string().valid("RAW", "USER_ENTERED").required(),
});

export const updateValuesDto = Joi.object().keys({
  spreadsheetId: Joi.string().required(),
  sheetId: Joi.number().required(),
  range: Joi.string().required(),
  values: Joi.array().required(),
  valueInputOption: Joi.string().valid("RAW", "USER_ENTERED").required(),
});

export const batchUpdateValuesDto = Joi.object().keys({
  spreadsheetId: Joi.string().required(),
  sheetId: Joi.number().required(),
  data: Joi.array().items(Joi.object().required()).required(),
  valueInputOption: Joi.string().valid("RAW", "USER_ENTERED").required(),
});

export const clearValuesDto = Joi.object().keys({
  spreadsheetId: Joi.string().required(),
  sheetId: Joi.number().required(),
  range: Joi.string().required(),
});

export const getValuesByDataFilterDto = Joi.object().keys({
  spreadsheetId: Joi.string().required(),
  sheetId: Joi.number().required(),
  dataFilters: Joi.array()
    .items(
      Joi.object()
        .keys({
          gridRange: Joi.object().keys({
            startRowIndex: Joi.number().optional(),
            endRowIndex: Joi.number().optional(),
            startColumnIndex: Joi.number().optional(),
            endColumnIndex: Joi.number().optional(),
          }),
        })
        .required()
    )
    .required(),
  majorDimension: Joi.string().valid("ROWS", "COLUMNS"), // "ROWS" yoki "COLUMNS"
});

export const batchClearValuesDto = Joi.object().keys({
  spreadsheetId: Joi.string().required(),
  sheetId: Joi.number().required(),
  ranges: Joi.array().items(Joi.string().required()).required(),
});

export const batchUpdateByDataFilterDto = Joi.object().keys({
  spreadsheetId: Joi.string().required(),
  sheetId: Joi.number().required(),
  data: Joi.array()
    .items(
      Joi.object().keys({
        dataFilter: Joi.object().keys({
          gridRange: Joi.object().keys({
            startRowIndex: Joi.number().optional(),
            endRowIndex: Joi.number().optional(),
            startColumnIndex: Joi.number().optional(),
            endColumnIndex: Joi.number().optional(),
          }).required(),
        }).required(),
        values: Joi.array()
          .items(Joi.array().items(Joi.any()))
          .required(),
      }).required()
    )
    .required(),
  valueInputOption: Joi.string().valid("RAW", "USER_ENTERED").required(),
});
