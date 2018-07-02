//Initialize Firebase
var config = {
    apiKey: "AIzaSyAHVgrgvP1E3dYppdMx8VweN_njK0S3pbQ",
    authDomain: "train-scheduler-f4533.firebaseapp.com",
    databaseURL: "https://train-scheduler-f4533.firebaseio.com",
    projectId: "train-scheduler-f4533",
    storageBucket: "train-scheduler-f4533.appspot.com",
    messagingSenderId: "248840900800"
  };

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var nextArrival = "";

var currentTimePlusFrequency = "";
var currentTimePlusFreqFormatted = "";
var firstTimeConverted = "";

//Button to add values to Firebase
$("#add-submit-button").on("click", function(){
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#trainDestination").val().trim();
    firstTrainTime = moment($("#trainTime").val(), "hh:mm").format("hh:mm A");
    frequency = $("#trainFrequency").val().trim();
        //calculates next trains ARRIVAL TIME
        nextArrival = moment($("#trainTime").val(), "hh:mm").add(frequency, 'minutes').format("hh:mm A");;
        //function below calculates CURRENT TIME that user initiates click function, and then adds frequency to that current time
        currentTimePlusFrequency = moment().add(frequency, "minutes");
        currentTimePlusFreqFormatted = moment(nextArrival).format("hh:mm A");

    var trainData = {
        name: trainName,
        place: destination,
        current: firstTrainTime,
        freq: frequency,
        arrive: nextArrival,
    };

    database.ref().push(trainData);

    //this jquery code will reset the input fields for the user after pressing the submit button
    $(".form-control").val('');

});



// code below takes the values from Firebase data and appends it to the webpage
database.ref().on("child_added", function(childSnapshot){

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTrainTime = childSnapshot.val().current;
    var frequency = childSnapshot.val().freq;
    var nextArrival = childSnapshot.val().arrive;

    //appending all the gathered data into the row on the webpage
    var appendInfo = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrainTime),
        $("<td>").text(frequency),
        $("<td style='color: yellow'>").text(nextArrival),
        // $("<td>").text(),
    );

    //append input info to the webpage
    $("#train-schedule").append(appendInfo);
});