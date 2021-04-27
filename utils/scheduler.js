const UserModel = require('../models/user');

const checkSchedulerForTask = async () => {
    let data = await UserModel.count({ bmi: { $gte: 25, $lte: 29.9 } });
    console.log("Overweight People: ", data);
    setTimeout(() => { checkSchedulerForTask() }, 10000)
    checkSchedulerForTask();
};

module.exports = {
    checkSchedulerForTask
};
