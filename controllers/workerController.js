const { workerData, parentPort } = require('worker_threads');


let finalData = [];
workerData.forEach(element => {
    let query = {};
    query.gender = element.Gender,
        query.HeightCm = element.HeightCm,
        query.WeightKg = element.WeightKg
    const cal_result = ((element.WeightKg) / ((element.HeightCm) / 100) ** 2).toFixed(2);
    query.bmi = cal_result;
    if (cal_result < 18.5) {
        query.bmi_category = 'Underweight';
        query.health_risk = 'Malnutrition';
    }

    else if (cal_result >= 18.5 && cal_result <= 24.9) {
        query.bmi_category = 'Normal';
        query.health_risk = 'Low';
    }

    else if (cal_result >= 25 && cal_result <= 29.9) {
        query.bmi_category = 'Overweight';
        query.health_risk = 'Enhanced';
    }

    else if (cal_result >= 30 && cal_result <= 34.9) {
        query.bmi_category = 'Moderately obese';
        query.health_risk = 'Medium';
    }

    else if (cal_result >= 35 && cal_result <= 39.9) {
        query.bmi_category = 'Severely obese';
        query.health_risk = 'High';
    }
    else {
        query.bmi_category = 'Very Severely obese';
        query.health_risk = 'Very High';
    }

    finalData.push(query);

});
parentPort.postMessage(finalData);