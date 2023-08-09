const router = require("express").Router();
const userController = require("../controllers/userController")

router.post("/",userController.signupUser);
router.post("/login",userController.loginUser);
router.put("/change-password",userController.changPassword);


module.exports = router;