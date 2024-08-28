import { Router } from "express";
import { SheetsController } from "./sheets";
import { copyToAnotherSpreadSheetDto, createSheetDto, deleteSheetDto, duplicateSheetDto, duplicateSheetToNewSpreadSheetDto, getAllSheetsDto, getSheetProtectesDto, moveSheetToNewIndexDto, protectSheetDto, unProtectSheetDto, updateSheetDto, validate } from "@middlewares";

const SheetsRouter = Router()


SheetsRouter
    .get("/all", validate(getAllSheetsDto, "query"), SheetsController.GetAllSheets)
    .get("/get-protectes", validate(getSheetProtectesDto, "query"), SheetsController.GetSheetProtectes)
    .post("/create", validate(createSheetDto), SheetsController.CreateSheet)
    .post("/copy-to-another-spreadsheet", validate(copyToAnotherSpreadSheetDto), SheetsController.CopySheetToAnotherSpreadSheet)
    .post("/move-to-newindex", validate(moveSheetToNewIndexDto), SheetsController.MoveSheetToNewIndex)
    .post("/duplicate", validate(duplicateSheetDto), SheetsController.DuplicateSheet)
    .post("/duplicate-to-new-spreadsheet", validate(duplicateSheetToNewSpreadSheetDto), SheetsController.DuplicateSheetToNewSpreadsheet)
    .post("/protect", validate(protectSheetDto), SheetsController.ProtectSheet)
    .post("/unprotect", validate(unProtectSheetDto), SheetsController.UnprotectSheet)
    .put("/update", validate(updateSheetDto), SheetsController.UpdateSheet)
    .delete("/delete", validate(deleteSheetDto), SheetsController.DeleteSheet)


export { SheetsRouter }