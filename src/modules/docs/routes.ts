import { Router } from "express";
import { DocsController } from "./docs";
import { validate } from "@middlewares";
import { createDocsDto, deleteDocsDto, getDocsByIdDto, updateDocsDto, updateDocsTitleDto } from "src/middlewares/validation/doc";

const DocsRouter = Router()

DocsRouter
    .get("/all",  DocsController.GetAllDocuments)
    .get("/get-by-id", validate(getDocsByIdDto, "query"), DocsController.GetDocumentById)
    .post("/create", validate(createDocsDto), DocsController.CreateDocument)
    .put("/update-title", validate(updateDocsTitleDto), DocsController.UpdateDocumentTitle)
    .put("/update", validate(updateDocsDto), DocsController.UpdateDocument)
    .delete("/delete", validate(deleteDocsDto), DocsController.DeleteDocument)

export { DocsRouter }