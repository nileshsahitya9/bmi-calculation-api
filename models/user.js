const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        gender: String,
        height: Number,
        weight: Number,
        bmi: Number,
        bmi_category: String,
        health_risk: String
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);