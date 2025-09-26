const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
	 if (process.env.NODE_ENV === "test") {
      // In tests, you'll override mongoose.connect in beforeAll
      return;
    }
	mongoose
		.connect(MONGODB_URL, {
			// useNewUrlparser: true,
			// useUnifiedTopology: true,
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
