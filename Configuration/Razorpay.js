const Razorpay = require("razorpay");

try {
    exports.instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
    });
} catch (error) {
    console.error("Error initializing Razorpay:", error);
}
