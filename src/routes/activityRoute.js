import express from "express";
import {deleteData, getAllData, getOneData, saveData, updateData,} from "../controllers/activity-controller.js";

const activityRoutes = express.Router();

activityRoutes.route("/").get(getAllData).post(saveData);

activityRoutes
    .route("/:id")
    .get(getOneData)
    .delete(deleteData)
    .patch(updateData);

export default activityRoutes;
