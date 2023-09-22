const {Router} = require("express");
const {createCourse,getCourse,createSem,getSem,createUser,getUser} = require("../services/display_user_details");

const router = Router();

router.post("/course",createCourse);
router.get("/course",getCourse);
router.post("/sem",createSem);
router.get("/sem",getSem);
router.post("/User",createUser);
router.get("/User",getUser);

module.exports = router;