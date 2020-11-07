var socket = io();

var label = $("#lblNuevoTicket");
var nameLabel = $("#label_name");
var nameInput = $("#name");
var ticketButton = $("#ticket_button");

socket.on("connect", function (client) {
  console.log("Online");
});

socket.on("disconnect", function (client) {
  console.log("Offline");
});

socket.on("status", function (res) {
  console.log(res);
  if (res.last != null) {
    label.text(res.last.number);
    nameLabel.text("Actual");
  }
});

$("button").on("click", function () {
  var name = $("#name").val();
  console.log(name);
  socket.emit("getTicket", name, function (resp) {
    console.log(resp);
    nameLabel.text(resp.name);
    label.text(resp.number);
    nameInput.hide();
    ticketButton.hide();

    function show_data() {
      nameLabel.text("Actual");
      nameInput.val("");
      nameInput.show();
      ticketButton.show();
    }
    window.setTimeout(show_data, 2000);
  });
});
