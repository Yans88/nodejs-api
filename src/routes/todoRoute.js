import express from "express";
import {
    deleteDataTodo,
    getAllDataTodo,
    getOneDataTodo,
    saveDataTodo,
    updateDataTodo,
} from "../controllers/activity-controller.js";

const todoRoutes = express.Router();

todoRoutes.route("/").get(getAllDataTodo).post(saveDataTodo);

todoRoutes
    .route("/:id")
    .get(getOneDataTodo)
    .delete(deleteDataTodo)
    .patch(updateDataTodo);

export default todoRoutes;
