const expect = require("expect");
const request = require("request");

describe("create bmi ", () => {
    let options = {
        url: "http://localhost:5000/task",
        body: {
            payload:
                [
                    {
                        Gender: "Male",
                        HeightCm: 171,
                        WeightKg: 96
                    },
                ]
        },
        json: true
    };
    it("returns status 201", function (done) {
        request.post(options, function (error, response) {
            expect(response.statusCode).toEqual(201);
            done();
        });
    });

    it("return all bmi detail", function (done) {
        request.post(options, function (error, response, body) {
            console.log("ddd", body)
            expect(body.result).toEqual("Information Added Successfully");
            done();
        });
    });
});


describe("create bmi ", () => {
    let options = {
        url: "http://localhost:5000/task",
        json: true
    };
    it("returns status 200", function (done) {
        request(options, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("return overweight count", function (done) {
        request(options, function (error, response, body) {
            expect(typeof body.result).toBe("number")
            done();
        });
    });
});