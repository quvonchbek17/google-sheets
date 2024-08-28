import { Request, Response, NextFunction } from "express";
import { sheetsBuilder } from "@config";
import { ErrorHandler } from "@errors";

export class SheetsController {
  static async GetAllSheets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId } = req.query;

      const result = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId as string,
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "All sheets in the spreadsheet",
        data: result.data.sheets,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetSheetProtectes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId } = req.query;

      const result = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId as string,
        fields: "*",
      });

      const sheet = result.data.sheets?.find(
        (sheet) => sheet.properties?.sheetId === Number(sheetId)
      );

      if (!sheet) {
        res.status(404).send({
          success: false,
          message: "Protectlar mavjud emas",
        });
        return;
      }

      res.status(200).send({
        success: true,
        message: "Protectlar",
        data: sheet.protectedRanges,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CreateSheet(
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
          addSheet: {
            properties: {
              title,
            },
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
        message: "Sheet yaratildi",
        data: result.data.replies,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdateSheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, title, tabColor } = req.body;

      const requests = [
        {
          updateSheetProperties: {
            properties: {
              sheetId,
              title,
              tabColor: tabColor
                ? {
                    red: tabColor.red / 255,
                    green: tabColor.green / 255,
                    blue: tabColor.blue / 255,
                    alpha: 1,
                  }
                : undefined,
            },
            fields: "title,tabColor",
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
        message: "Sheet updated",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DeleteSheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId } = req.body;

      const requests = [
        {
          deleteSheet: {
            sheetId,
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
        message: "Sheet o'chirildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async CopySheetToAnotherSpreadSheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, destinationSpreadsheetId } = req.body;

      const result = await sheets.spreadsheets.sheets.copyTo({
        spreadsheetId,
        sheetId,
        requestBody: {
          destinationSpreadsheetId,
        },
      });

      res.status(200).send({
        success: true,
        message: "Sheet nusxalandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async MoveSheetToNewIndex(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, newIndex } = req.body;

      const requests = [
        {
          updateSheetProperties: {
            properties: {
              sheetId,
              index: newIndex,
            },
            fields: "index",
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
        message: "Sheet ko'chirildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DuplicateSheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId } = req.body;

      const result = await sheets.spreadsheets.sheets.copyTo({
        spreadsheetId,
        sheetId,
        requestBody: {
          destinationSpreadsheetId: spreadsheetId,
        },
      });

      res.status(200).send({
        success: true,
        message: "Sheet nusxalandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async DuplicateSheetToNewSpreadsheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, newSpreadsheetTitle } = req.body;

      // 1. Varaqni dublikat qilish (faqat strukturani)
      const copyResult = await sheets.spreadsheets.sheets.copyTo({
        spreadsheetId,
        sheetId,
        requestBody: {
          destinationSpreadsheetId: spreadsheetId, // Varaq shu hujjat ichida dublikat qilinadi
        },
      });

      // 2. Dublikat qilingan varaqqa tegishli contentlarni olish
      const sheetRange = `'${copyResult.data.title}'`; // Varaq nomi bilan diapazonni olish
      const sheetContent = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: sheetRange,
      });

      // 3. Yangi spreadsheet yaratish
      const newSpreadsheet = await sheets.spreadsheets.create({
        requestBody: {
          properties: {
            title: newSpreadsheetTitle, // Yangi hujjat uchun nom
          },
          sheets: [
            {
              properties: {
                title: copyResult.data.title, // Dublikat qilingan varaqning nomi
              },
            },
          ],
        },
      });

      // 4. Yangi spreadsheetga contentni qo'shish
      await sheets.spreadsheets.values.update({
        spreadsheetId: newSpreadsheet.data.spreadsheetId!,
        range: sheetRange,
        valueInputOption: "RAW",
        requestBody: {
          values: sheetContent.data.values,
        },
      });

      res.status(200).send({
        success: true,
        message: "Sheet yangi sheetsga nusxalandi",
        data: newSpreadsheet.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async ProtectSheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, description, protectedRange, editors } =
        req.body;

      const requests = [
        {
          addProtectedRange: {
            protectedRange: {
              range: protectedRange
                ? {
                    sheetId,
                    startRowIndex: protectedRange.startRowIndex,
                    endRowIndex: protectedRange.endRowIndex,
                    startColumnIndex: protectedRange.startColumnIndex,
                    endColumnIndex: protectedRange.endColumnIndex,
                  }
                : {
                    sheetId, // Agar protect range kelmasa butun sheetni himoyalash
                  },
              description: description || "Protected Range",
              editors: {
                users: editors || [], // Tahrir qilishga ruxsat berilgan foydalanuvchilar
              },
              requestingUserCanEdit: false, // Hamma foydalanuvchilar uchun tahrirlashni bloklash
            },
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
        message: "Sheet himoyalandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UnprotectSheet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, protectedRangeId } = req.body;

      const requests = [
        {
          deleteProtectedRange: {
            protectedRangeId,
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
        message: "Sheet himoyasi o'chirildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
