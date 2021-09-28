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
    this.roomInfo = myRoomInfo;
    // console.log('myRoomInfo:', this.roomInfo);
    return myRoomInfo;
  }


  calcCustomerTotalSpent(bookings, rooms) {
    // this.viewCustomerBookings(bookings, rooms);
    // console.log('booking spent:', bookings.filter(booking => booking.userID === 2))
    return this.totalSpent = rooms.reduce((total, room) => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number &&
          booking.userID === this.id) {
          // console.log('checking', booking.roomNumber)
          total += room.costPerNight;
          // console.log("checking total", booking.roomNumber, total)
        }
      })
      return total;
    }, 0).toFixed(2)
  }

  filterUnavailableRoomsByDate(date, bookings) {
    // console.log('date in filter rooms', date)
    // console.log('fixed date in customer', date.split("-").join("/"))
    // console.log('booking room number', bookings.map(obj => obj.date))
    this.unavailableRooms = bookings.filter(booking => booking.date === date.split("-").join("/"))
      .map(booking => booking.roomNumber)
    // console.log('unavailable rooms:', this.unavailableRooms)
    return this.unavailableRooms;
  }

  filterRoomsByType(rooms, roomType) {
    // console.log('room type in customer:', roomType)
    if (roomType === 'all') {
      this.filteredType = this.getAvailableRooms(rooms)
    } else {
      let availableRooms = this.getAvailableRooms(rooms);
      this.filteredType = availableRooms
        .filter(roomObj => roomObj.roomType === roomType)
      this.availableRoomTypes = this.filteredType.map(room => room.number)
      // console.log('room num by type', this.filteredType)
      return this.filteredType
    }
  }

  getAvailableRooms(rooms) {
    // * original below *
    // return rooms.filter(room => !this.availableRoomNums.includes(room.number))
    return rooms.filter(room => !this.unavailableRooms.includes(room.number))
  }

}

export default Customer;