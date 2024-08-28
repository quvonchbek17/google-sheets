import { Request, Response, NextFunction } from "express";
import { sheetsBuilder } from "@config";
import { ErrorHandler } from "@errors";

export class ValuesController {
  static async GetSheetName(
    res: Response,
    sheets: any,
    spreadsheetId: String,
    sheetId: number
  ) {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId as string,
      fields: "*",
    });

    const sheet = spreadsheet.data.sheets?.find(
      (s: any) => s.properties?.sheetId === Number(sheetId)
    );


    if (!sheet) {
      res.status(404).send({
        success: false,
        message: "Sheet topilmadi",
      });
      return;
    }
    return sheet.properties?.title;
  }
  static async GetSheetValues(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId } = req.query;

      const sheetName = await ValuesController.GetSheetName(
        res,
        sheets,
        String(spreadsheetId),
        Number(sheetId)
      );

      // Varaqdagi barcha qiymatlarni olish
      const result = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId as string,
        range: sheetName!,
      });

      res.status(200).send({
        success: true,
        message: "Ma'lumotlar",
        data: result.data.values,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async GetSheetValuesInRange(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, range } = req.query;

      const sheetName = await ValuesController.GetSheetName(
        res,
        sheets,
        String(spreadsheetId),
        Number(sheetId)
      );

      // Varaqdagi barcha qiymatlarni olish
      const result = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId as string,
        range: `${sheetName}!${range}`,
      });

      res.status(200).send({
        success: true,
        message: "Ma'lumotlar",
        data: result.data.values,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async BatchGetByDataFilter(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, dataFilters, majorDimension } = req.body;

      // Agar `gridRange` berilgan bo'lsa, `sheetId` ni qo'shamiz
      const updatedDataFilters = dataFilters.map((filter: any) => {
        if (filter.gridRange) {
          return {
            ...filter,
            gridRange: {
              ...filter.gridRange,
              sheetId: sheetId,
            },
          };
        }
        return filter;
      });

      // Diapazonlardagi qiymatlarni `DataFilter` orqali olish uchun so'rovni amalga oshirish
      const result = await sheets.spreadsheets.values.batchGetByDataFilter({
        spreadsheetId,
        requestBody: {
          dataFilters: updatedDataFilters,
          majorDimension: majorDimension, // "ROWS" yoki "COLUMNS"
        },
      });

      res.status(200).send({
        success: true,
        message: "Qiymatlar DataFilter orqali muvaffaqiyatli olindi",
        data: result.data.valueRanges,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async AppendSheetValues(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, range, values, valueInputOption } =
        req.body;

      let sheetName = await ValuesController.GetSheetName(
        res,
        sheets,
        String(spreadsheetId),
        Number(sheetId)
      );

      const result = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!${range}`,
        valueInputOption,
        requestBody: {
          values,
        },
      });

      res.status(200).send({
        success: true,
        message: "Valuelar qo'shildi",
        data: result.data.updates,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async UpdateSheetValues(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, range, values, valueInputOption } =
        req.body;

      let sheetName = await ValuesController.GetSheetName(
        res,
        sheets,
        String(spreadsheetId),
        Number(sheetId)
      );

      const result = await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!${range}`,
        valueInputOption,
        requestBody: {
          values,
        },
      });

      res.status(200).send({
        success: true,
        message: "Valuelar yangilandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async BatchUpdateSheetValues(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, data, valueInputOption } = req.body;

      let sheetName = await ValuesController.GetSheetName(
        res,
        sheets,
        String(spreadsheetId),
        Number(sheetId)
      );

      // Batch update uchun har bir data elementiga varaq nomini qo'shamiz
      const dataWithSheetName = data.map((item: any) => ({
        range: `${sheetName}!${item.range}`,
        values: item.values,
      }));

      // Bir nechta diapazondagi qiymatlarni yangilash uchun so'rovni amalga oshirish
      const result = await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption,
          data: dataWithSheetName,
        },
      });

      res.status(200).send({
        success: true,
        message: "Batch update amalga oshirildi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async BatchUpdateByDataFilter(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, data, valueInputOption } = req.body;

      // Agar `gridRange` berilgan bo'lsa, `sheetId` ni qo'shamiz
      const updatedData = data.map((item: any) => {
        if (item.dataFilter && item.dataFilter.gridRange) {
          return {
            ...item,
            dataFilter: {
              ...item.dataFilter,
              gridRange: {
                ...item.dataFilter.gridRange,
                sheetId: sheetId,
              },
            },
          };
        }
        return item;
      });

      // Diapazonlardagi qiymatlarni `DataFilter` orqali yangilash uchun so'rovni amalga oshirish
      const result = await sheets.spreadsheets.values.batchUpdateByDataFilter({
        spreadsheetId,
        requestBody: {
          data: updatedData,
          valueInputOption: valueInputOption || "RAW", // "RAW" yoki "USER_ENTERED"
        },
      });

      res.status(200).send({
        success: true,
        message: "Qiymatlar DataFilter orqali muvaffaqiyatli yangilandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async ClearSheetValues(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, range } = req.body;

      let sheetName = await ValuesController.GetSheetName(
        res,
        sheets,
        String(spreadsheetId),
        Number(sheetId)
      );

      // Diapazondagi qiymatlarni tozalash uchun so'rovni amalga oshirish
      const result = await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `${sheetName}!${range}`,
      });

      res.status(200).send({
        success: true,
        message: "Qiymatlar tozalandi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async BatchClearSheetValues(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      let sheets = await sheetsBuilder(token);

      const { spreadsheetId, sheetId, ranges } = req.body;

      let sheetName = await ValuesController.GetSheetName(
        res,
        sheets,
        String(spreadsheetId),
        Number(sheetId)
      );

      // Har bir range uchun varaq nomini qo'shish
      const fullRanges = ranges.map((range: string) => `${sheetName}!${range}`);

      // Diapazonlardagi qiymatlarni tozalash uchun so'rovni amalga oshirish
      const result = await sheets.spreadsheets.values.batchClear({
        spreadsheetId,
        requestBody: {
          ranges: fullRanges,
        },
      });

      res.status(200).send({
        success: true,
        message: "Qiymatlar tozalandi",
        data: result.data.clearedRanges,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }
}
