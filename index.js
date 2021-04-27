const http = require("http");
const express = require("express");
const os = require('os-utils');

const cors = require("cors");
// mongo connection

const config = require("./config/mongo.js");
const taskRouter = require("./routes/task");


const app = express();

const { checkSchedulerForTask } = require('./utils/scheduler')
/** Get port from environment and store in Express. */
const port = process.env.PORT || "5000";
app.set("port", port);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/task", taskRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

/** Create HTTP server. */
const server = http.createServer(app);

server.listen(port);

setInterval(function () {
    os.cpuUsage(function (v) {
        console.log('CPU Usage (%): ' + v);
        process.on("exit", function () {

            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit"
            });
        });
        if (v >= 0.7) process.exit();

    });
}, 10000);

checkSchedulerForTask();


server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
});