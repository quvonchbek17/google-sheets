import { Router } from "express";
import { ValuesController } from "./values";
import { appendValuesDto, batchUpdateValuesDto, clearValuesDto, batchClearValuesDto, getAllValues, getSheetValuesInRangeDto, updateValuesDto, validate, getValuesByDataFilterDto, batchUpdateByDataFilterDto } from "@middlewares";

const ValuesRouter = Router()


ValuesRouter
    .get("/all", validate(getAllValues, "query"), ValuesController.GetSheetValues)
    .get("/get-in-range", validate(getSheetValuesInRangeDto, "query"), ValuesController.GetSheetValuesInRange)
    .post("/get-by-datafilter", validate(getValuesByDataFilterDto), ValuesController.BatchGetByDataFilter)
    .post("/append", validate(appendValuesDto), ValuesController.AppendSheetValues)
    .put("/update", validate(updateValuesDto), ValuesController.UpdateSheetValues)
    .put("/batch-update", validate(batchUpdateValuesDto), ValuesController.BatchUpdateSheetValues)
    .put("/batch-update-by-datafilter", validate(batchUpdateByDataFilterDto), ValuesController.BatchUpdateByDataFilter)
    .delete("/clear", validate(clearValuesDto), ValuesController.ClearSheetValues)
    .delete("/batch-clear", validate(batchClearValuesDto), ValuesController.BatchClearSheetValues)


export { ValuesRouter }