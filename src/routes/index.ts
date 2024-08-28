import { Router } from "express"
import { AuthRouter, SheetsRouter, SpreadSheetsRouter, ValuesRouter } from "@modules"
import { verifyAccessToken } from "@middlewares"
import { DocsRouter } from "src/modules/docs"

const router = Router()


router.use("/auth", AuthRouter)
router.use("/spreadsheets", verifyAccessToken, SpreadSheetsRouter)
router.use("/sheets", verifyAccessToken, SheetsRouter)
router.use("/values", verifyAccessToken, ValuesRouter)
router.use("/docs", verifyAccessToken, DocsRouter)



export default router