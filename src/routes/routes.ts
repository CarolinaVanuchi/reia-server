import express from "express";
import UserController from "../controllers/UserController";
import LoginController from "../controllers/LoginController";

const router = express.Router();

router.post("/users", UserController.create);
router.get("/users", UserController.findAll);
router.get("/users/:userId", UserController.findOne);
router.put("/users/:userId", UserController.update);
router.delete("/users/:userId", UserController.delete);

router.post("/auth/login", LoginController.login);
router.get("/auth/login/:userId", LoginController.authMiddleware, LoginController.returnInfoUser);


export { router };