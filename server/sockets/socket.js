const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  client.emit("status", {
    last: ticketControl.getLast(),
    attending: ticketControl.getAttending(),
  });

  // get a new ticket
  client.on("getTicket", (data, callback) => {
    let next = ticketControl.getTicket(data);
    callback(next);
  });

  //get one ticket to attend
  client.on("attendTicket", (data, callback) => {
    console.log(data);
    if (!data) {
      return callback({
        ok: false,
        message: "No se indicó el número de escritorio",
      });
    }

    let ticket = ticketControl.attendTicket(data);

    //notify all clients changes
    if (ticket.number) {
      client.broadcast.emit("status", {
        last: ticketControl.getLast(),
        attending: ticketControl.getAttending(),
      });
    }

    callback(ticket);
  });
});
