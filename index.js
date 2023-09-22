const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const loginroutes = require("./src/routes/login_route");
const display_user_routes = require("./src/routes/display_user_route");
const display_user_details_routes = require("./src/routes/display_user_details_routes")

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/",loginroutes);
app.use("/view",display_user_routes);
app.use("/home",display_user_details_routes);



function main() {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    mongoose
      .connect("mongodb://127.0.0.1:27017/PFS")
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
  });
}

main();
