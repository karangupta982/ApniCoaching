const express = require("express");
const app = express();
const userRoutes = require("./Route/User");
const profileRoutes = require("./Route/Profile");
const courseRoutes = require("./Route/Course");
const paymentRoutes = require("./Route/Payment");
const contactUsRoute = require("./Route/Contact");
const database = require("./Configuration/Database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./Configuration/Cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;


dotenv.config();


database.connect();
 

app.use(express.json());
app.use(cookieParser());


app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

// app.use(
// 	cors({
// 	  origin: "http://localhost:3000", // Replace with your frontend URL
// 	  credentials: true,
// 	})
//   );

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);


cloudinaryConnect();


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);


app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Welcome To Apni Coaching",
	});
});
let server;
// Only start server if this file is run directly

// Every file in Node.js is treated as a module.
// The module object represents the current file.
// require.main is a special property that points to the entry point module (the file that Node executed first with node ...).
// require.main → points to app.js
// module → also app.js
// So they are the same (true).


if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
  });
}

module.exports = { app, server };

