import { Router } from "express";
import csvRouter from "./csvRoutes";

const routes = Router()

routes.use('/', csvRouter);


export default routes