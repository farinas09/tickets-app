const fs = require("fs");

class Ticket {
  constructor(number, name, desk) {
    this.number = number;
    this.desk = desk;
    this.name = name;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.attending = [];

    let data = require("../data/data.json");

    if (data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets;
      this.attending = data.attending;
    } else {
      this.resetCount();
    }
  }

  getTicket(name) {
    this.last += 1;
    let ticket = new Ticket(this.last, name, null);
    this.tickets.push(ticket);
    this.saveFile();
    return ticket;
  }

  getLast() {
    return this.tickets[this.tickets.length - 1];
  }
  getAttending() {
    return this.attending;
  }

  attendTicket(desk) {
    if (this.tickets.length === 0) return { message: "No hay tickets en fila" };

    let ticket = this.tickets[0];
    ticket.desk = desk;

    this.tickets.shift(); //to delete first item
    this.attending.unshift(ticket); //add to attending array at first position
    if (this.attending.length > 4) this.attending.splice(-1, 1); //delete last

    this.saveFile();

    return ticket;
  }

  resetCount() {
    this.last = 0;
    this.tickets = [];
    this.attending = [];
    console.log("Sistema restablecido");
    this.saveFile();
  }

  saveFile() {
    let data = JSON.stringify({
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      attending: this.attending,
    });
    fs.writeFileSync("./server/data/data.json", data);
  }
}

module.exports = {
  TicketControl,
};
