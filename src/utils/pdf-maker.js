const PDFDocument = require('pdfkit');
const fs = require('fs');

function makePdf(flightData){
let doc = new PDFDocument();

// Set the font and font size
doc.fontSize(20).text('Flight Ticket', {align: 'center'});

// Add flight details to the document
doc.fontSize(12).text(`Passenger Name: ${flightData.Name}`, {align: 'center'});
doc.fontSize(12).text(`Total Seats : ${flightData.noOfSeats}`,{align: 'center'})
doc.fontSize(12).text(`Flight Number: ${flightData.flightNumber}`, {align: 'center'});
doc.fontSize(12).text(`Departure: ${flightData.departureAirportId}`, {align: 'center'});
doc.fontSize(12).text(`Destination: ${flightData.arrivalAirportId}`, {align: 'center'});
doc.fontSize(12).text(`Departure Time: ${flightData.departureTime}`, {align: 'center'});
doc.fontSize(12).text(`Arrival Time: ${flightData.arrivalTime}`, {align: 'center'});
doc.fontSize(17).text(`Price: ${flightData.price}`, {align: 'center'});

// Output the PDF to a file
doc.pipe(fs.createWriteStream(`./src/utils/tickets/flightTickets${flightData.userId}.pdf`));
doc.end();
}

// makePdf({
//     flightNumber:"UK12",
//     departureAirportId:"DELHI",
//     arrivalAirportId:"PATNA",
//     departureTime:"2pm",
//     arrivalTime:"1pm",
//     passengerName:"ANSHUMAN",
//     price:"123421",
//     noOfSeats:"2"
// })


module.exports = makePdf;