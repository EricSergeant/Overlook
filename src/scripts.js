// *** import and variables ***

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image 
//(also need to link to it in the index.html)
import './images/turing-logo.png'

import domUpdates from './domUpdates'
import { customerPromise, bookingsPromise, roomsPromise } from './apiCalls';
import Customer from './Customer'
import Booking from './Booking'
import Room from './Rooms'

let customerData, bookingsData, roomsData, allBookings, allRooms, customer;
let today = "2021/09/25";
let date = new Date();
let dd = String(date.getDate()).padStart(2, '0')
let mm = String(date.getMonth() + 1).padStart(2, '0')
let yyyy = date.getFullYear()
date = yyyy + '/' + mm + '/' + dd

// console.log('This is the JavaScript entry file - your code begins here.');

// *** query selectors ***

const viewRooms = document.getElementById('submit-search');


const chosenDate = document.querySelector('#date-picker');
const chosenType = document.querySelector('select');
const dateError = document.querySelector('#date-error')
const typeAvailability = document.querySelector('#type-availability')
const selectType = document.querySelector('#type-filter');



// *** event listeners ***
viewRooms.addEventListener('click', () => showAvailableRooms(chosenDate.value, chosenType.value, customer))

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
  renderUserDisplay();
}

// * note: not using this function, hardcoded user on following function *
function instantiateRandomUser() {
  let randomUser = customerData.customers[Math
    .round(Math.random() * customerData.customers.length)];
  // let randomUser = customerData.customers[5];
  // console.log('random user result:', randomUser)
  // domUpdates.displayUserName(currentUser);
}

function initCustomer() {
  customer = new Customer(customerData.customers[5]);
  customer.createCustomerBookings(bookingsData.bookings)
  customer.createCustomerRooms(roomsData.rooms)
  customer.calcCustomerTotalSpent(bookingsData.bookings, roomsData.rooms)
  // console.log('instantiated customer', customer)
  // let expenses = customer.calcCustomerTotalSpent(bookingsData, roomsData)
}

function initRooms() {
  allRooms = [];
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
  allBookings = [];
  bookingsData.bookings.forEach(booking => {
    let newBooking = new Booking(booking)
    allBookings.push(newBooking)
  })
  // console.log('instantiated bookings', allBookings)
  return allBookings
}

function renderUserDisplay() {
  domUpdates.displayUserName(customer)
  domUpdates.displayAmountSpent(customer)
  let bookingsType = customer.bookings.filter(booking => {
    if (booking.date < date) {
      domUpdates.displayPastBookings(customer)
    } else {
      domUpdates.dipslayUpcomingBookings(customer)
    }
  })
  return bookingsType
}


function showAvailableRooms(date, type, customer) {
  event.preventDefault()
  let parsedDate = date.split("-").join("/");
  // console.log('customer entry to f:', customer)
  console.log('parsed date:', parsedDate)
  // console.log('today:', today)
  // console.log('allbookings:', allBookings)
  if (!date) {
    // eslint-disable-next-line max-len
    return domUpdates.displayMessage(dateError, "Please choose a date in order to view available rooms.")
  } else if (parsedDate < today) {
    return domUpdates.displayMessage(dateError, "Cannot book rooms in the past. Please pick a valid date.")
  } else {
    // console.log('customer in show:', customer.
    // filterAvailableRoomsByDate(parsedDate, allBookings))
    // eslint-disable-next-line max-len
    domUpdates.displayMessage(dateError, "These are the available rooms for that date:")

    /* original on hold:
    customer.filterAvailableRoomsByDate(parsedDate, allRooms, allBookings)
    customer.filterAvailableRoomsByType(selectType.value)
    */
    // customer.filterUnavailableRoomsByDate('2020/04/22', bookingsData.bookings); // TEST VERSION
    customer.filterUnavailableRoomsByDate(date, bookingsData.bookings);
    customer.filterRoomsByType(roomsData.rooms, selectType.value)
    domUpdates.displayRoomsAvailable(customer)  //cut allRooms
  }
}

function showIndividualRoom(event) {
  event.preventDefault();

  let individualRoom = event.target.closest('article').id;
  let currentRoom = findIndividualRoom(individualRoom.pop())
  domUpdates.show()
}
