import express from "express";
import UserController from "../controllers/UserController";
import LoginController from "../controllers/LoginController";
import DeviceController from "../controllers/DeviceController";
import TopicController from "../controllers/TopicController";
import DataSensorControlller from "../controllers/DataSensorController";

const router = express.Router();

router.post("/auth/login", LoginController.login);
router.get("/auth/login/:id", LoginController.authMiddleware, LoginController.returnInfoUser);

router.post("/create", UserController.create);
router.post("/users", LoginController.authMiddleware, UserController.create);
router.put("/users/:id", LoginController.authMiddleware, UserController.update);
router.delete("/users/:id", LoginController.authMiddleware, UserController.delete);

router.post("/devices", LoginController.authMiddleware, DeviceController.create);
router.get("/devices/:idUser", LoginController.authMiddleware, DeviceController.findByUser);
router.delete("/devices/:id", LoginController.authMiddleware, DeviceController.delete);
router.put("/devices/:id", LoginController.authMiddleware, DeviceController.update);

router.post("/port", LoginController.authMiddleware, TopicController.create);
router.get("/port/:idDevice", LoginController.authMiddleware, TopicController.findByDevice);
router.delete("/port/:id", LoginController.authMiddleware, TopicController.delete);
router.put("/port/:id", LoginController.authMiddleware, TopicController.update);

router.post("/data", LoginController.authMiddleware, DataSensorControlller.create);
router.get("/data/:idPort", LoginController.authMiddleware, DataSensorControlller.findByPort);

export { router };