// Initialize Firebase
var config = {
    apiKey: "AIzaSyC-yOp6S2I-N7HFArV5R8zerzL7WPUrFmY",
    authDomain: "my-project-63915.firebaseapp.com",
    databaseURL: "https://my-project-63915.firebaseio.com",
    projectId: "my-project-63915",
    storageBucket: "my-project-63915.appspot.com",
    messagingSenderId: "85086645475"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#sButton").on("click", function (event) {
    var nameInput = $("#name-input").val().trim();
    var roleInput = $("#role-input").val().trim();
    var startDateInput = $("#start-date-input").val().trim();
    var monthlyRateInput = $("#monthly-rate-input").val().trim();

    database.ref().push({
        name: nameInput,
        role: roleInput,
        startDate: startDateInput,
        monthlyRate: monthlyRateInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    $("#name-input").val("");
    $("#role-input").val("");
    $("#start-date-input").val("");
    $("#monthly-rate-input").val("");
});

database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {
    
    monthsWorkedCalc = moment().diff(childSnapshot.val().startDate, 'months');
    console.log(monthsWorkedCalc);
    totalBilled = monthsWorkedCalc * childSnapshot.val().monthlyRate;
 
    var newTableRow = $("<tr>");
    newTableRow.html(
        "<td>" + childSnapshot.val().name +
        "<td>" + childSnapshot.val().role +
        "<td>" + childSnapshot.val().startDate +
        "<td>" + monthsWorkedCalc +
        "<td>" + childSnapshot.val().monthlyRate +
        "<td>" + totalBilled
    );

    $("tbody").append(newTableRow);
});

