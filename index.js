// Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBTS-KHCoxy9ognaRyLclu2p7QTMFeaoxM",
    authDomain: "employee-data-management-91ba8.firebaseapp.com",
    databaseURL: "https://employee-data-management-91ba8.firebaseio.com",
    projectId: "employee-data-management-91ba8",
    storageBucket: "employee-data-management-91ba8.appspot.com",
    messagingSenderId: "505929259974"
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

