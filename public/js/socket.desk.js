var socket = io();

var deskLabel = $("h1");
var ticketLabel = $("h4");

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desk")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}

var desk = searchParams.get("desk");
deskLabel.text("Escritorio " + desk);

$("button").on("click", function () {
  socket.emit("attendTicket", desk, function (res) {
    console.log(res);
    if (res.number) {
      ticketLabel.text(res.desk);
      ticketLabel.text(res.number + ". " + res.name);
    } else {
      ticketLabel.text(res.message);
      alert(res.message);
    }
  });
});
