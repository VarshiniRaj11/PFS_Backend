const {Router} = require("express");
const {addRole,register,login} = require("../services/login");

const router = Router();

router.post("/addrole",addRole);
router.post("/register",register);
router.post("/login",login);

module.exports = router;