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
var nextArrivalFormatted = "";
var minutesAway = "";


//Button to add values to Firebase
$("#add-submit-button").on("click", function(){
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#trainDestination").val().trim();
    firstTrainTime = moment($("#trainTime").val(), "hh:mm").format("hh:mm A");
    frequency = $("#trainFrequency").val();
        nextArrival = moment().add(frequency, "minutes");
        nextArrivalFormatted = moment(nextArrival).format("hh:mm A");


    var trainData = {
        name: trainName,
        place: destination,
        time: firstTrainTime,
        freq: frequency,
        arrive: nextArrivalFormatted,
    };

    database.ref().push(trainData);

    console.log(trainData.name);
    console.log(trainData.place);
    console.log(trainData.time);
    console.log(trainData.freq);

});


// code below takes the values from Firebase data and appends it to the webpage
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTrainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;
    var nextArrivalFormatted = childSnapshot.val().arrive;

    console.log(trainName);

    var appendInfo = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td style='color: yellow'>").text(nextArrivalFormatted),
    );

    //append input info to the webpage
    $("#train-schedule").append(appendInfo);
})