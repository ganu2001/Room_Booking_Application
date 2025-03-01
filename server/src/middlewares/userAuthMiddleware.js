const User = require("../models/userSchema");
const { apiErrorResponse } = require("../utils/helperFuntions");

const adminAuthMiddleware = async(req, res, next) => {
    const {userId} = req.body;
    if(!userId)
    {
        return res.status(400).json({message: "User Id is required"});
    }
	const user = await User.findById({_id: userId});
    if(!user) {
        return res.status(404).json({message: "User not found"})
    } 
	if(user.role != "admin") {
		return res.status(401).json({message: "Require Admin Access"})
	}
    next();
}

const userAuthMiddleware = async(req, res, next) => {
    const {userId} = req.body;
    if(!userId)
    {
        return apiErrorResponse(res, 400,"User Id is required");
    }
	const user = await User.findById({_id: userId});
    if(!user) {
        return apiErrorResponse(res, 404, "User not found");
    } 

    next();
}

module.exports = {adminAuthMiddleware, userAuthMiddleware};