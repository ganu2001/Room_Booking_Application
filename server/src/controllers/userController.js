const User = require("../models/userSchema");

const signupUser = async (req, res) => {
	try {
		const { name, email, password, role, mobileNo, city } = req.body;

		if (!name || !email || !password || !role || !mobileNo) {
		return res.status(400).json({ message: "All fields are required" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
		return res.status(400).json({ message: "User already exists" });
		}

		const newUser = new User({
		name,
		email,
		password,
		role,
		mobileNumber: mobileNo,
		currentCity: city,
		});
		await newUser.save(); 

		res.status(201).json({ message: "Signup successful" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password ) {
		return res.status(400).json({ message: "email and password required" });
		}

		const user = await User.findOne({ email, password });
		if(!user) {
			return res.status(404).json({ message: "Invalid credentials"})
		}
	
		return res.status(200).json({ message:"Login Successful", userData : user})
	}
	catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

module.exports = {signupUser, loginUser};


