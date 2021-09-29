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
    let myRoomInfo = rooms.reduce((roomsBooked, room) => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          roomsBooked.push({ room, date: booking.date })
        }
      })
      return roomsBooked;
    }, []);
    this.roomInfo = myRoomInfo;
    return myRoomInfo;
  }

  calcCustomerTotalSpent(bookings, rooms) {
    return this.totalSpent = rooms.reduce((total, room) => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number &&
          booking.userID === this.id) {
          total += room.costPerNight;
        }
      })
      return total;
    }, 0).toFixed(2)
  }

  filterUnavailableRoomsByDate(date, bookings) {
    this.unavailableRooms = bookings.filter(booking => booking
      .date === date.split("-").join("/"))
      .map(booking => booking.roomNumber)
    return this.unavailableRooms;
  }

  filterRoomsByType(rooms, roomType) {
    if (roomType === 'all') {
      this.filteredType = this.getAvailableRooms(rooms)
    } else {
      let availableRooms = this.getAvailableRooms(rooms);
      this.filteredType = availableRooms
        .filter(roomObj => roomObj.roomType === roomType)
      this.availableRoomTypes = this.filteredType.map(room => room.number)
      return this.filteredType
    }
  }

  getAvailableRooms(rooms) {
    return rooms.filter(room => !this.unavailableRooms.includes(room.number))
  }

}

export default Customer;