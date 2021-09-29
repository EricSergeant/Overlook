// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import './css/base.scss';

import './images/The_Overlook_Hotel_outside.jpg'
import './images/Overlook_lobby.jpg'
import './images/Overlook_room.jpg'

import domUpdates from './domUpdates'
import {
  customerPromise, bookingsPromise, roomsPromise,
  postData
} from './apiCalls';
import Customer from './Customer'
import Booking from './Booking'
import Room from './Rooms'


let customerData, bookingsData, roomsData, allBookings,
  allRooms, customer, parsedDate, username;
let date = new Date();
let dd = String(date.getDate()).padStart(2, '0')
let mm = String(date.getMonth() + 1).padStart(2, '0')
let yyyy = date.getFullYear()
date = yyyy + '/' + mm + '/' + dd
let today = date;


// *** query selectors ***
const viewRooms = document.getElementById('submit-search');
const bookBtn = document.getElementById('availableRooms')

const profileBtn = document.getElementById('navProfile');
const bookingBtn = document.getElementById('navBooking');
const logoutBtn = document.getElementById('navLogout');

const submitLogin = document.getElementById('login-form-submit');
const loginForm = document.getElementById('login-form');
const clearSearch = document.getElementById('type-filter');
const loginError = document.getElementById('login-error');

const chosenDate = document.querySelector('#date-picker');
const chosenType = document.querySelector('select');
const dateError = document.querySelector('#date-error')
const selectType = document.querySelector('#type-filter');



// *** event listeners ***
viewRooms.addEventListener('click', () =>
  showAvailableRooms(chosenDate.value, chosenType.value, customer))
bookBtn.addEventListener('click', bookRoom)
profileBtn.addEventListener('click', domUpdates.profileView)
bookingBtn.addEventListener('click', domUpdates.bookingView)
logoutBtn.addEventListener('click', domUpdates.logout)

// *** on login ***
submitLogin.addEventListener('click', (e) => {
  e.preventDefault();
  username = loginForm.username.value;
  const password = loginForm.password.value;

  if (username === "customer50" && password === "overlook2021") {
    username = username.slice(8, 10)
    gatherData();
    domUpdates.login();
  } else {
    loginError.innerHTML = `
    <p>Incorrect login information, please try again.</p>
    `
  }
})

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

  initCustomer();
  initRooms();
  initBookings();
  renderUserDisplay();
}

function initCustomer() {
  // ** testing version:
  // customer = new Customer(customerData.customers[6]);
  // ** final, live version:
  customer = new Customer(customerData.customers[username - 1]);
  customer.createCustomerBookings(bookingsData.bookings)
  customer.createCustomerRooms(roomsData.rooms)
  customer.calcCustomerTotalSpent(bookingsData.bookings, roomsData.rooms)
}

function initRooms() {
  allRooms = [];
  roomsData.rooms.forEach(room => {
    let newRoom = new Room(room)
    allRooms.push(newRoom)
  })
  return allRooms;
}

function initBookings() {
  allBookings = [];
  bookingsData.bookings.forEach(booking => {
    let newBooking = new Booking(booking)
    allBookings.push(newBooking)
  })
  return allBookings
}

function renderUserDisplay() {
  domUpdates.displayUserName(customer)
  domUpdates.displayAmountSpent(customer)
  domUpdates.displayPastBookings(customer)
  domUpdates.dipslayUpcomingBookings(customer)

  let bookingsType = customer.bookings.forEach(booking => {
    if (booking.date < date) {
      domUpdates.displayPastBookings(customer)
    } else {
      if (booking.date > date) {
        domUpdates.dipslayUpcomingBookings(customer)
      }
    }
  })
  return bookingsType
}


function showAvailableRooms(date, type, customer) {
  event.preventDefault()
  parsedDate = date.split("-").join("/");
  if (!date) {
    return domUpdates.displayMessage(dateError,
      "Please choose a date in order to view available rooms.")
  } else if (parsedDate < today) {
    return domUpdates.displayMessage(dateError,
      "Cannot book rooms in the past. Please pick a valid date.")
  } else {
    domUpdates.displayMessage(dateError,
      "These are the available rooms for that date:")

    customer.filterUnavailableRoomsByDate(date, bookingsData.bookings);
    customer.filterRoomsByType(roomsData.rooms, selectType.value)
    domUpdates.displayRoomsAvailable(customer)
  }
}

function bookRoom() {
  let userIDPost = customer.id;
  let datePost = parsedDate;
  let roomNumberPost = event.target
    .closest('.available-booking-card').id.split("-")[1];
  let fixedRoom = Number(roomNumberPost)
  domUpdates.profileView();
  clearSearch.selectedIndex = 0;
  postBooking(userIDPost, datePost, fixedRoom);
}

function postBooking(userID, date, roomNumber) {
  postData(userID, date, roomNumber)
    .then((response) => {
      if (!response.ok) {
        console.log('POST ERROR')
      } else {
        console.log('rendering POST')
        renderPost()
      }
    })
    .then(console.log('posted data', initBookings()))
    .catch(err => {
      console.log('POST error thrown:', err)
    })
}

function renderPost() {
  gatherData();
}

