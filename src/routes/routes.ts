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
router.post("/user", LoginController.authMiddleware, UserController.create);
router.put("/user/:id", LoginController.authMiddleware, UserController.update);
router.delete("/user/:id", LoginController.authMiddleware, UserController.delete);
router.get("/user", LoginController.authMiddleware, UserController.findAll);
router.get("/user/:id", LoginController.authMiddleware, UserController.findOne);

router.post("/device", LoginController.authMiddleware, DeviceController.create);
router.put("/device/:id", LoginController.authMiddleware, DeviceController.update);
router.delete("/device/:id", LoginController.authMiddleware, DeviceController.delete);
router.get("/device", LoginController.authMiddleware, DeviceController.findAll);
router.get("/device/:id", LoginController.authMiddleware, DeviceController.findOne);

router.post("/port", LoginController.authMiddleware, TopicController.create);
router.get("/port/:idDevice", LoginController.authMiddleware, TopicController.findByDevice);
router.delete("/port/:id", LoginController.authMiddleware, TopicController.delete);
router.put("/port/:id", LoginController.authMiddleware, TopicController.update);

router.post("/data", LoginController.authMiddleware, DataSensorControlller.create);
router.get("/data/:idPort", LoginController.authMiddleware, DataSensorControlller.findByPort);

export { router };