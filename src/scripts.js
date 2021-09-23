// *** import and variables ***

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image 
//(also need to link to it in the index.html)
import './images/turing-logo.png'

import { customerPromise, bookingsPromise, roomsPromise } from './apiCalls';
import Customer from './Customer'
import Booking from './Booking'
import Room from './Rooms'

let customerData, bookingsData, roomsData, customer;

// console.log('This is the JavaScript entry file - your code begins here.');

// *** query selectors ***



// *** event listeners ***


// *** event handlers ***
// * on load *
window.addEventListener('load', gatherData);

// *** data initialization ***
function gatherData() {
  let apiCustomerData = customerPromise()
    .then(data => data)
    .catch(error => console.log(`API customer error: ${error.message}`))
  let apiBookingsData = bookingsPromise()
    .then(data => data)
    .catch(error => console.log(`API booking error: ${error.message}`))
  let apiRoomsData = roomsPromise()
    .then(data => data)
    .catch(error => console.log(`API room error: ${error.message}`))
  Promise.all([apiCustomerData, apiBookingsData, apiRoomsData])
    .then(data => initData(data))
}

function initData(data) {
  customerData = data[0];
  bookingsData = data[1];
  roomsData = data[2];
  // console.log('Here is the promise data from scripts file:', data)

  // * instantiate the classes with this *
  // instantiateRandomUser();
  initCustomer();
  initRooms();
  initBookings();
}

function instantiateRandomUser() {
  let randomUser = customerData.customers[Math
    .round(Math.random() * customerData.customers.length)];
  // let randomUser = customerData.customers[5];
  // console.log('random user result:', randomUser)
  // domUpdates.displayUserName(currentUser);
}

function initCustomer() {
  customer = new Customer(customerData.customers[5]);
  customer.viewCustomerBookings(bookingsData.bookings)
  // console.log('instantiated customer', customer)
}

function initRooms() {
  let allRooms = [];
  roomsData.rooms.forEach(room => {
    let newRoom = new Room(room)
    allRooms.push(newRoom)
  })
  // console.log('roomData', roomsData)
  // console.log('instantiated rooms', allRooms)
  return allRooms;
}

// * do we need this?  Part of customer constructor *
function initBookings() {
  let allBookings = [];
  bookingsData.bookings.forEach(booking => {
    let newBooking = new Booking(booking)
    allBookings.push(newBooking)
  })
  // console.log('instantiated bookings', allBookings)
  return allBookings
}