import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { docsBuilder, driveBuilder } from "@config"; // Google Docs uchun konfiguratsiya

export class DocsController {
  static async GetAllDocuments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      const result = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.document'",
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "Barcha hujjatlar muvaffaqiyatli olindi",
        data: result.data.files,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreateDocument(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let docs = await docsBuilder(token);

      const { title } = req.body;

      const result = await docs.documents.create({
        requestBody: {
          title: title || "Untitled Document",
        },
      });

      res.status(200).send({
        success: true,
        message: "Yangi hujjat yaratildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetDocumentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let docs = await docsBuilder(token);

      const { documentId } = req.query;

      const result = await docs.documents.get({
        documentId: String(documentId),
      });

      res.status(200).send({
        success: true,
        message: "Hujjat muvaffaqiyatli olindi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdateDocumentTitle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      const { documentId, title } = req.body;

      // Hujjat nomini yangilash
      const result = await drive.files.update({
        fileId: documentId,
        requestBody: {
          name: title,
        },
      });

      res.status(200).send({
        success: true,
        message: "Hujjat nomi muvaffaqiyatli yangilandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdateDocument(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let docs = await docsBuilder(token);

      const { documentId, requests } = req.body;

      const result = await docs.documents.batchUpdate({
        documentId: documentId,
        requestBody: {
          requests: requests || [],
        },
      });

      res.status(200).send({
        success: true,
        message: "Hujjat muvaffaqiyatli yangilandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DeleteDocument(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      const { documentId } = req.body;

      await drive.files.delete({
        fileId: documentId,
      });

      res.status(200).send({
        success: true,
        message: "Hujjat muvaffaqiyatli o'chirildi",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
