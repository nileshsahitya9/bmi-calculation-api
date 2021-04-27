const UserModel = require('../models/user');
const { Worker } = require('worker_threads');
const path = require('path');


module.exports.create = async (req, res) => {
    try {
        const { payload } = req.body;
        if (payload.length < 1) {
            return res.status(422).json({ success: false, error: 'Invalid Request' })
        }
        const worker = new Worker(path.join(__dirname, '/workerController.js'), { workerData: payload });
        worker.on('error', (err) => { throw err; });
        worker.on('exit', () => {
        })
        worker.on('message', async (msg) => {
            try {
                await UserModel.insertMany(msg);
            }
            catch (err) {
                throw err;
            }
        });

        return res.status(201).json({ success: true, result: "Information Added Successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

module.exports.get = async (req, res) => {
    try {
        const data = await UserModel.countDocuments({ bmi: { $gte: 25, $lte: 29.9 } });
        return res.status(200).json({ success: true, result: data ? data : 0 });

    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}