import express from "express";
import UserController from "../controllers/UserController";
import LoginController from "../controllers/LoginController";
import DeviceController from "../controllers/DeviceController";
const router = express.Router();

router.post("/create", UserController.create);
router.post("/users", LoginController.authMiddleware, UserController.create);
router.put("/users", LoginController.authMiddleware, UserController.update);
router.delete("/users/:id", LoginController.authMiddleware, UserController.delete);

router.post("/auth/login", LoginController.login);
router.get("/auth/login/:id", LoginController.authMiddleware, LoginController.returnInfoUser);

router.post("/devices", LoginController.authMiddleware, DeviceController.create);
router.get("/devices/:idUser", LoginController.authMiddleware, DeviceController.findAll);
router.delete("/devices/:id", LoginController.authMiddleware, DeviceController.delete);
router.put("/devices/:id", LoginController.authMiddleware, DeviceController.update);

export { router };