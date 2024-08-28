import { Router } from "express"
import { AuthRouter, SheetsRouter, SpreadSheetsRouter, ValuesRouter } from "@modules"
import { verifyAccessToken } from "@middlewares"

const router = Router()


router.use("/auth", AuthRouter)
router.use("/spreadsheets", verifyAccessToken, SpreadSheetsRouter)
router.use("/sheets", verifyAccessToken, SheetsRouter)
router.use("/values", verifyAccessToken, ValuesRouter)



export default router