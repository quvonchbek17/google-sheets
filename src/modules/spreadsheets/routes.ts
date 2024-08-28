import { Router } from "express";
import { SpreadSheetsController } from "./spreadsheets";
import { validate } from "@middlewares";
import { createSpreadSheetDto,  deleteSpreadSheetDto,  getSpreadSheetsByIdDto, updateSpreadSheetDto } from "@middlewares";

const SpreadSheetsRouter = Router()


SpreadSheetsRouter
    .get("/all", SpreadSheetsController.GetAllSpreadSheets)
    .get("/get-by-id", validate(getSpreadSheetsByIdDto, "query"), SpreadSheetsController.GetSpreadSheetsById)
    .post("/create", validate(createSpreadSheetDto), SpreadSheetsController.CreateSpreadSheet)
    .put("/update", validate(updateSpreadSheetDto), SpreadSheetsController.UpdateSpreadSheet)
    .delete("/delete", validate(deleteSpreadSheetDto), SpreadSheetsController.DeleteSpreadSheet)

export { SpreadSheetsRouter }