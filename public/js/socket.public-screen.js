var socket = io();

var ticket1 = $("#lblTicket1");
var ticket2 = $("#lblTicket2");
var ticket3 = $("#lblTicket3");
var ticket4 = $("#lblTicket4");

var desk1 = $("#lblDesk1");
var desk2 = $("#lblDesk2");
var desk3 = $("#lblDesk3");
var desk4 = $("#lblDesk4");

var ticketsLabels = [ticket1, ticket2, ticket3, ticket4];
var desksLabels = [desk1, desk2, desk3, desk4];

socket.on("status", function (res) {
  var audio = new Audio("audio/new-ticket.mp3");
  audio.play();
  res.attending.forEach((element, index) => {
    $(`#lblTicket${index + 1}`).text("Ticket " + element.number);
    $(`#lblDesk${index + 1}`).text("Escritorio " + element.desk);
  });
});
