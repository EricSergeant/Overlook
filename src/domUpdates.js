const userMsg = document.getElementById('welcomeMsg');
const totalSpent = document.getElementById('totalSpent');
const pastBookings = document.getElementById('pastStays');
const noPastBookings = document.getElementById('noPastStays');
const upComingStays = document.getElementById('upcomingStays');
const noUpComingStays = document.getElementById('noUpcomingStays');
const availableToBook = document.getElementById('available-rooms');
const availableRooms = document.getElementById('availableRooms');

const domUpdates = {

  displayUserName(customer) {
    userMsg.innerText = `Greetings ${customer.name}!`
  },

  displayAmountSpent(customer) {
    if (customer.totalSpent === 0) {
      totalSpent.innerHTML +=
        `<p>Welcome first-time customer ${customer.name}!</p>`
    } else {
      // eslint-disable-next-line max-len
      totalSpent.innerHTML += `<p>You've spent $${customer.totalSpent} to date.  Thank you for returning to us!</p>`
    }
  },

  displayPastBookings(customer) {
    pastBookings.innerHTML = '';
    noPastBookings.innerHTML = '';
    noUpComingStays.innerHTML = `
    <p>You have no upcoming stays with us.</p>`

    if (customer.bookings.length === 0) {
      noPastBookings.innerHMTL = `
      <article class="no-booking-card">
      <p>You have no past stays.</p>
      </article>
      `;
    }

    // console.log('roomInfo in domUpdates:\n', customer.roomInfo)
    // console.log('bookings in domUpdates:\n', customer.bookings)
    customer.roomInfo.forEach(myRooms => {
      pastBookings.innerHTML += `
      <article class="past-booking-card">
      <div class="room-image">
      </div>
      <div class="room-info">
      <p id="roomDate">${myRooms.date}</p>
      <p id="roomType">${myRooms.room.roomType}</p>
        <p id="roomBeds">${myRooms.room.numBeds} ${myRooms.room.bedSize}</p>
        <p id="room-cost">$${myRooms.room.costPerNight} per night</p>
      </div>
      </article>
      `;
    })

  },

  displayUpcomingBookings(customer) {
    upComingStays.innerHTML = '';
    noUpComingStays.innerHTML = '';

    if (customer.bookings.length === 0) {
      noPastBookings.innerHMTL = `
      <article class="no-booking-card">
      <p>You have no past stays.</p>
      </article>
      `;
    }
    customer.roomInfo.forEach(myRooms => {
      pastBookings.innerHTML += `
      <article class="past-booking-card">
      <div class="room-image">
      </div>
      <div class="room-info">
        <p id="roomBeds">${myRooms.room.roomType}</p>
        <p id="roomBeds">${myRooms.room.numBeds} ${myRooms.room.bedSize}</p>
        <p id="room-cost">$${myRooms.room.costPerNight} per night</p>
      </div>
      </article>
      `;
    })
  },

  displayMessage(element, info) {
    element.innerHTML = '';
    element.innerText = info;
  },

  displayRoomsAvailable(customer) {
    availableRooms.innerHTML = '';

    // console.log('customer in DOM', customer)
    // console.log('available room data:', rooms)
    console.log('available in DOM:', customer.filteredType)
    if (!customer.filteredType.length) {
      availableRooms.innerHTML += `
      <p class="error-no-rooms">
      So sorry, there are no more rooms available for that date/type.  Please adjust your search and try again.</p>
      `
    } else {

      // let holding = [];

      customer.filteredType.forEach(openRooms => {
        // holding.push(openRooms.number)
        availableRooms.innerHTML += `
        <article class="available-booking-card" id="room-${openRooms.number}">
        <div class="room-image">
        </div>
        <div class="room-info">
        <p id="roomBeds">${openRooms.roomType}</p>
        <p id="roomBeds">${openRooms.numBeds} ${openRooms.bedSize}</p>
        <p id="room-cost">$${openRooms.costPerNight} per night</p>
        <button class="booking-button" id="bookingButton-${openRooms.number}">Click this room to book it!</button>
        </div>
        </article>
        `;
      })
    }
    /* old version:
    customer.availableRooms.forEach(openRooms => {
      openRooms.forEach(item => {
        // console.log('item in dom:', item.costPerNight)
        availableRooms.innerHTML += `
        <article class="past-booking-card">
        <div class="room-image">
        </div>
        <div class="room-info">
          <p id="roomBeds">${item.roomType}</p>
          <p id="roomBeds">${item.numBeds} ${item.bedSize}</p>
          <p id="room-cost">$${item.costPerNight} per night</p>
        </div>
        </article>
        `;
      })
    })
    */

  }



}

export default domUpdates;