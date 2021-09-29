const userMsg = document.getElementById('welcomeMsg');
const totalSpent = document.getElementById('totalSpent');
const pastBookings = document.getElementById('pastStays');
const noPastBookings = document.getElementById('noPastStays');
const upComingStays = document.getElementById('upcomingStays');
const noUpComingStays = document.getElementById('noUpcomingStays');
const availableRooms = document.getElementById('availableRooms');

const profilePage = document.getElementById('profile-page');
const findRoom = document.getElementById('new-book-view')
const logOut = document.getElementById('login-page')
const navMenu = document.getElementById('allNavButtons')

const domUpdates = {

  displayUserName(customer) {
    userMsg.innerText = `Greetings ${customer.name}!`
  },

  displayAmountSpent(customer) {
    totalSpent.innerHTML = '';
    if (customer.totalSpent === 0) {
      totalSpent.innerHTML +=
        `<p>Welcome first-time customer ${customer.name}!</p>`
    } else {
      totalSpent.innerHTML +=
        `<p>You've spent $${customer.totalSpent} to date.
        Thank you for returning to us!</p>`
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

    customer.roomInfo.forEach(myRooms => {
      if (myRooms.date < "2021/09/29") {
        pastBookings.innerHTML += `
          <article class="past-booking-card">
          <div class="room-info">
            <div class="room-image">
              <img src="./images/Overlook_room.jpg" 
              alt="interior view of Overlook hotel room" 
              height="75%" width="75%">
            </div>
          <p id="roomDate">${myRooms.date}</p>
          <p id="roomType">${myRooms.room.roomType}</p>
            <p id="roomBeds">${myRooms.room.numBeds} ${myRooms.room.bedSize}</p>
            <p id="room-cost">$${myRooms.room.costPerNight} per night</p>
          </div>
          </article>
          `;
      }
    })
  },

  dipslayUpcomingBookings(customer) {
    availableRooms.innerHTML = '';
    upComingStays.innerHTML = '';
    noUpComingStays.innerHTML = '';

    if (customer.length === 0) {
      noUpComingStays.innerHMTL = `
      <article class="no-booking-card">
      <p>You have no upcoming stays.</p>
      </article>
      `;
    }
    customer.roomInfo.forEach(myRooms => {
      if (myRooms.date > "2021/09/28") {
        upComingStays.innerHTML += `
      <article class="upcoming-booking-card">
      <div class="room-info">
        <div class="room-image">
          <img src="./images/Overlook_room.jpg" 
          alt="interior view of Overlook hotel room" height="75%" width="75%">
        </div>
        <p id="roomDate">Your upcoming visit for ${myRooms.date}</p>
        <p id="roomBeds">${myRooms.room.roomType}</p>
        <p id="roomNum">Room Number ${myRooms.room.number}</p>
        <p id="roomBeds">${myRooms.room.numBeds} ${myRooms.room.bedSize}</p>
        <p id="room-cost">$${myRooms.room.costPerNight} per night</p>
      </div>
      </article>
      `;
      }
    })
  },

  displayMessage(element, info) {
    element.innerHTML = '';
    element.innerText = info;
  },

  displayRoomsAvailable(customer) {
    availableRooms.innerHTML = '';
    if (!customer.filteredType.length) {
      availableRooms.innerHTML += `
      <p class="error-no-rooms">
      So sorry, there are no more rooms available for that date/type.  
      Please adjust your search and try again.</p>
      `
    } else {
      customer.filteredType.forEach(openRooms => {
        availableRooms.innerHTML += `
        <article class="available-booking-card" id="room-${openRooms.number}">
        <div class="room-info">
        <div class="room-image">
          <img src="./images/Overlook_room.jpg" 
          alt="interior view of Overlook hotel room" height="75%" width="75%">
        </div>
        <p id="roomBeds">${openRooms.roomType}</p>
        <p id="roomBeds">${openRooms.numBeds} ${openRooms.bedSize}</p>
        <p id="room-cost">$${openRooms.costPerNight} per night</p>
        <button class="booking-button" id="bookingButton-${openRooms.number}">
        Click this room to book it!</button>
        </div>
        </article>
        `;
      })
    }
  },

  profileView() {
    profilePage.classList.remove('hidden')
    findRoom.classList.add('hidden')
  },

  bookingView() {
    findRoom.classList.remove('hidden')
    profilePage.classList.add('hidden')
  },

  navView() {
    navMenu.classList.remove('hidden')
  },

  logout() {
    logOut.classList.remove('hidden')
    findRoom.classList.add('hidden')
    profilePage.classList.add('hidden')
    navMenu.classList.add('hidden')
    location.reload();
  },

  login() {
    navMenu.classList.remove('hidden')
    profilePage.classList.remove('hidden')
    logOut.classList.add('hidden')
  },

  show(element) {
    element.classList.remove('hidden')
  },

  hide(element) {
    element.classList.add('hidden')
  }

}

export default domUpdates;