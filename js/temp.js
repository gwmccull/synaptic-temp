(function() {
    console.log("test");
    var myPerceptron = new Architect.Perceptron(2,3,1);
    var myTrainer = new Trainer(myPerceptron);

    var training = myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }
    console.log("training", training);

    var result = myPerceptron.activate([0,0]); // 0.0268581547421616
    console.log("result", result);
    result = myPerceptron.activate([1,0]); // 0.9829673642853368
    console.log("result", result);
    result = myPerceptron.activate([0,1]); // 0.9831714267395621
    console.log("result", result);
    result = myPerceptron.activate([1,1]); // 0.02128894618097928
    console.log("result", result);

    // document.getElementById('training-data').innerText = JSON.stringify(createTrainingData(10000));

    var tempPerceptron = new Architect.Perceptron(2, 3, 3, 3, 2);
    var tempTrainer = new Trainer(tempPerceptron);
    var tempTrainingData = createTrainingData(10000);
    var tempTraining = tempTrainer.train(tempTrainingData);

    console.log("tempTraining", tempTraining);

    function createTrainingData(records) {
        var trainingData = [];
        var dailyLowTemp;
        var dailyHighTemp;
        var dailyTempDelta;
        var indoorTemp;
        var indoorMinTemp = 50;
        var indoorMaxTemp = 80;
        var indoorTempDelta = indoorMaxTemp - indoorMinTemp;
        var indoorPreferredMinTemp = 65;
        var indoorPreferredMaxTemp = 70;
        var outdoorTemp;
        var maxTemp = 90;
        var minLowTemp = -15;
        var maxLowTemp = 60;
        var lowTempDelta = maxLowTemp - minLowTemp;
        var tempSwing = 50;
        var openWindows = null;
        var centralHeat = null;

        for (var i = 0; i < records; i++) {
            dailyLowTemp = Math.round((Math.random() * lowTempDelta) - minLowTemp);
            dailyHighTemp = Math.round((Math.random() * tempSwing) + dailyLowTemp);
            if (dailyHighTemp > maxTemp) {
                dailyHighTemp = maxTemp;
            }
            dailyTempDelta = dailyHighTemp - dailyLowTemp;

            outdoorTemp = Math.round((Math.random() * dailyTempDelta) + dailyLowTemp);

            indoorTemp = Math.round(Math.random() * indoorTempDelta + indoorMinTemp);

            if (indoorTemp < indoorPreferredMinTemp &&
                outdoorTemp >= indoorPreferredMinTemp) {

                openWindows = 1;
                centralHeat = 0;
            } else if (indoorTemp > indoorPreferredMaxTemp &&
                indoorTemp > outdoorTemp) {

                openWindows = 1;
                centralHeat = 0;
            } else if (indoorTemp > indoorPreferredMaxTemp &&
                indoorTemp <= outdoorTemp) {

                openWindows = 0;
                centralHeat = 0;
            } else if (indoorTemp >= indoorPreferredMinTemp &&
                indoorTemp <= indoorPreferredMaxTemp) {

                openWindows = 0;
                centralHeat = 0;
            } else if (indoorTemp < indoorPreferredMinTemp &&
                outdoorTemp < indoorPreferredMinTemp) {

                openWindows = 0;
                centralHeat = 1;
            }

            trainingData.push({
                input: [outdoorTemp, indoorTemp],
                output: [openWindows, centralHeat]
            });

            if (openWindows === null || centralHeat === null) {
                console.error('trainingData has null outputs', trainingData);
            }

            openWindows = null;
            centralHeat = null;
        }

        return trainingData;
    }
})();