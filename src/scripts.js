// *** import and variables ***

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image 
//(also need to link to it in the index.html)
import './images/turing-logo.png'

import domUpdates from './domUpdates'
import { customerPromise, bookingsPromise, roomsPromise, postData } from './apiCalls';
import Customer from './Customer'
import Booking from './Booking'
import Room from './Rooms'

// eslint-disable-next-line max-len
let customerData, bookingsData, roomsData, allBookings, allRooms, customer, parsedDate, username;
let today = "2021/09/25";
let date = new Date();
let dd = String(date.getDate()).padStart(2, '0')
let mm = String(date.getMonth() + 1).padStart(2, '0')
let yyyy = date.getFullYear()
date = yyyy + '/' + mm + '/' + dd

// console.log('This is the JavaScript entry file - your code begins here.');

// *** query selectors ***
const viewRooms = document.getElementById('submit-search');
const bookBtn = document.getElementById('availableRooms')

const profileBtn = document.getElementById('navProfile');
const bookingBtn = document.getElementById('navBooking');
const logoutBtn = document.getElementById('navLogout');

const submitLogin = document.getElementById('login-form-submit');
const loginForm = document.getElementById('login-form');
const clearSearch = document.getElementById('type-filter');

const chosenDate = document.querySelector('#date-picker');
const chosenType = document.querySelector('select');
const dateError = document.querySelector('#date-error')
const selectType = document.querySelector('#type-filter');



// *** event listeners ***
// eslint-disable-next-line max-len
viewRooms.addEventListener('click', () => showAvailableRooms(chosenDate.value, chosenType.value, customer))
bookBtn.addEventListener('click', bookRoom)
profileBtn.addEventListener('click', domUpdates.profileView)
bookingBtn.addEventListener('click', domUpdates.bookingView)
logoutBtn.addEventListener('click', domUpdates.logout)
submitLogin.addEventListener('click', (e) => {
  e.preventDefault();
  username = loginForm.username.value;
  const password = loginForm.password.value;

  if (username === "customer50" && password === "overlook2021") {
    console.log('successful login')
    // location.reload();
  } else {
    console.log('wrong login attempt')
  }
  username = username.slice(8, 10)
  console.log('sliced number login:', username)
  gatherData();
  domUpdates.login();
})


// *** event handlers ***
// * on load *

// window.addEventListener('load', gatherData);

// *** login ***
// function checkLogin(event) {
//   if (!username.value && !password.value) {
//     preventDefault(event)
//     console.log('no login info provided')
//   } else if (password.value !== "overlook2021") {
//     preventDefault(event)
//     console.log('wrong password entered')
//   } else if (username.value !== "customer50") {
//     preventDefault(event)
//     console.log('wrong username entered')
//   } else {
//     preventDefault(event)
//     confirmedUser(username.value)
//   }
// }

// function confirmedUser(username) {
//   usernameID = username.slice(8, 10)
//   usernameID = Number.parseInt(usernameID)
// }

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
// function instantiateRandomUser() {
//   let randomUser = customerData.customers[Math
//     .round(Math.random() * customerData.customers.length)];
//   // let randomUser = customerData.customers[5];
//   // console.log('random user result:', randomUser)
//   // domUpdates.displayUserName(currentUser);
// }

function initCustomer() {
  // ** testing version:
  // customer = new Customer(customerData.customers[5]);
  // ** final, live version:
  customer = new Customer(customerData.customers[username - 1]);
  console.log('customer on scripts:', customer)
  customer.createCustomerBookings(bookingsData.bookings)
  customer.createCustomerRooms(roomsData.rooms)
  customer.calcCustomerTotalSpent(bookingsData.bookings, roomsData.rooms)
  // console.log('instantiated customer', customer)
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
  domUpdates.displayPastBookings(customer)
  domUpdates.dipslayUpcomingBookings(customer)

  // console.log('check bookings here:', customer.bookings)
  let bookingsType = customer.bookings.forEach(booking => {
    // console.log('booking.date:', booking.date)
    // console.log('date compare:', booking.date < date)

    if (booking.date < date) {
      domUpdates.displayPastBookings(customer)
    } else {
      if (booking.date > date) {
        // console.log('upcoming booking:', booking)
        domUpdates.dipslayUpcomingBookings(customer)
      }
    }


  })
  return bookingsType
}


function showAvailableRooms(date, type, customer) {
  event.preventDefault()
  parsedDate = date.split("-").join("/");
  // console.log('customer entry to f:', customer)
  // console.log('parsed date:', parsedDate)
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

    customer.filterUnavailableRoomsByDate(date, bookingsData.bookings);
    customer.filterRoomsByType(roomsData.rooms, selectType.value)
    domUpdates.displayRoomsAvailable(customer)

  }
}


function bookRoom() {
  // console.log('hit it')
  // let closeButton = bookARoom.closest('button')
  let userIDPost = customer.id;
  let datePost = parsedDate;
  // let roomNumberPost = bookingButton.srcElement.id;
  let roomNumberPost = event.target.closest('.available-booking-card').id.split("-")[1];
  let fixedRoom = Number(roomNumberPost)
  // console.log('booking room info:', userIDPost, datePost, roomNumberPost)
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
    .catch(err => {
      console.log('POST error thrown:', err)
    })
}

function renderPost() {
  // console.log("ready to render, add re-fetch")
  console.log('posted data', allBookings)
  gatherData();
}

