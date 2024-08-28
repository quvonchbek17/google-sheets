import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@errors";
import { driveBuilder, sheetsBuilder } from "@config";
import { updateSpreadSheetDto } from "src/middlewares/validation/spreadsheet";

export class SpreadSheetsController {
  static async GetAllSpreadSheets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      const result = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.spreadsheet'",
        fields: "*"
      });

      res.status(200).send({
        success: true,
        message: "SpreadSheet list",
        data: {
            sheets: result.data.files
        },
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetSpreadSheetsById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const spreadsheetId = req.query.spreadsheetId as string;
      const result = await sheets.spreadsheets.get({
        spreadsheetId
      });

      res.status(200).send({
        success: true,
        message: "Sheets",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreateSpreadSheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { title } = req.body;
      const requestBody = {
        properties: {
          title,
        },
      };

      const result = await sheets.spreadsheets.create({
        requestBody,
      });

      res.status(200).send({
        success: true,
        message: "SpreadSheet yaratildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdateSpreadSheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, title } = req.body;

      const requests = [
        {
          updateSpreadsheetProperties: {
            properties: {
              title,
            },
            fields: "title",
          },
        },
      ];

      const result = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests,
        },
      });

      res.status(200).send({
        success: true,
        message: "Spreadsheet yangilandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DeleteSpreadSheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let drive = await driveBuilder(token);

      const { spreadsheetId } = req.body;

      await drive.files.delete({
        fileId: spreadsheetId,
      });

      res.status(200).send({
        success: true,
        message: "Spreadsheet o'chirildi",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
