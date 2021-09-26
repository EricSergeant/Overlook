class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.totalSpent = 0;
    this.bookings = [];
    this.roomInfo = [];
    this.unavailableRooms = [];
    this.availableRoomNums = [];
    this.availableRoomTypes = [];
    this.availableRooms = [];
    this.filteredType = [];
  }

  createCustomerBookings(bookings) {
    let myBookings = bookings
      .filter(booking => booking.userID === this.id)
    this.bookings = myBookings;
    return myBookings;
  }

  createCustomerRooms(rooms) {
    // console.log('all rooms:', rooms);
    let myRoomInfo = rooms.reduce((roomsBooked, room) => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          roomsBooked.push({ room, date: booking.date })
        }
      })
      return roomsBooked;
    }, []);
    // console.log('myRoomInfo:', myRoomInfo);
    this.roomInfo = myRoomInfo;
    return myRoomInfo;
  }


  calcCustomerTotalSpent(bookings, rooms) {
    // this.viewCustomerBookings(bookings, rooms);
    return this.totalSpent = rooms.reduce((total, room) => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          total += room.costPerNight;
        }
      })
      return total;
    }, 0).toFixed(2)
  }

  filterUnavailableRoomsByDate(date, bookings) {
    this.unavailableRooms = bookings.filter(booking => booking.date === date)
      .map(booking => booking.roomNumber)
    console.log('unavailable rooms:', this.unavailableRooms)
    return this.unavailableRooms;
  }

  filterRoomsByType(rooms, roomType) {
    let availableRooms = this.getAvailableRooms(rooms);
    this.filteredType = availableRooms
      .filter(roomObj => roomObj.roomType === roomType)
    this.availableRoomTypes = this.filteredType.map(room => room.number)
    console.log('room num by type', this.filteredType)
    return this.filteredType
  }

  getAvailableRooms(rooms) {
    return rooms.filter(room => !this.availableRoomNums.includes(room.number))
  }


  /* original try:
  filterAvailableRoomsByDate(date, rooms, bookings) {
    // console.log('rooms in customer start filter:', rooms)
    let available = rooms.map(room => {
      if (room.number === bookings.roomNumber
        && bookings.date !== date) {
        return room.number
      }
    })
    this.availableRoomNums = available
    this.availableRooms.push(rooms)
    console.log('available in cutomer end filter1:', this.availableRooms)
  }

  filterAvailableRoomsByType(roomType) {
    console.log('filter2 is firing this:', roomType)
    if (roomType === 'all') {
      return
    } else {
      console.log('avilable in filter2 by type:', this.availableRooms)

      let results = this.availableRooms
        .filter(room => {
          return room.roomType === roomType
        })
      console.log('results of filter2', results)

      // let results = this.availableRooms
      //   .forEach(room => {
      //     room.filter(item => {
      //       return item.roomType === roomType
      //     })
      //   })
      this.availableRooms = results
      // console.log('available rooms at end:', this.availableRooms)

    }

    // let availableRooms = rooms
    //   .filter(room => !this.availableRoomNums.includes(room.number));
    // // console.log('available rooms:', availableRooms);
    // let filteredType = availableRooms
    //   .filter(room => room.roomType === roomType);
    // // console.log('filteredType:', filteredType)
    // this.availableRoomTypes = filteredType.map(room => room.number);
    // // console.log('available room types', availableRooms)
    // return filteredType;

  }
  */

}

export default Customer;