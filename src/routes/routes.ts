import express from "express";
import UserController from "../controllers/UserController";
import LoginController from "../controllers/LoginController";
import DeviceController from "../controllers/DeviceController";
import TopicController from "../controllers/TopicController";
import DataSensorControlller from "../controllers/DataSensorController";

const router = express.Router();

router.post("/auth/login", LoginController.login);
router.get("/auth/login/:id", LoginController.authMiddleware, LoginController.returnInfoUser);

router.post("/device", LoginController.authMiddleware, DeviceController.create);
router.put("/device/:id", LoginController.authMiddleware, DeviceController.update);
router.delete("/device/:id", LoginController.authMiddleware, DeviceController.delete);
router.get("/device", LoginController.authMiddleware, DeviceController.findAll);
router.get("/device/:id", LoginController.authMiddleware, DeviceController.findOne);

router.post("/create", UserController.create);
router.post("/user", LoginController.authMiddleware, UserController.create);
router.put("/user/:id", LoginController.authMiddleware, UserController.update);
router.delete("/user/:id", LoginController.authMiddleware, UserController.delete);
router.get("/user", LoginController.authMiddleware, UserController.findAll);
router.get("/user/:id", LoginController.authMiddleware, UserController.findOne);


router.post("/topic", LoginController.authMiddleware, TopicController.create);
router.get("/topic/device/:idDevice", LoginController.authMiddleware, TopicController.findByDevice);
router.delete("/topic/:id", LoginController.authMiddleware, TopicController.delete);
router.put("/topic/:id", LoginController.authMiddleware, TopicController.update);
router.get("/topic", LoginController.authMiddleware, TopicController.findAll);
router.get("/topic/:id", LoginController.authMiddleware, TopicController.findOne);

// router.post("/data", LoginController.authMiddleware, DataSensorControlller.create);
router.get("/data/device/:idDevice/:dataBegin/:dataEnd", LoginController.authMiddleware, DataSensorControlller.findByDevice);
router.get("/data/topic/:idTopic", LoginController.authMiddleware, DataSensorControlller.findByTopic);

export { router };