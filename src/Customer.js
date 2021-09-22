class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.totalSpent = 0;
    this.bookings = [];
    this.availableRoomNums = [];
    this.availableRoomTypes = [];
  }

  viewCustomerBookings(bookings) {
    let myBookings = bookings.filter(booking => booking.userID === this.id);
    this.bookings = myBookings;
    return myBookings;
  }

  calcCustomerTotalSpent(bookings, rooms) {
    this.viewCustomerBookings(bookings);
    return this.totalSpent = rooms.reduce((total, room) => {
      this.bookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          total += room.costPerNight;
        }
      })
      return total;
    }, 0)
  }

  filterAvailableRoomsByDate(date, bookings) {
    this.availableRoomNums = bookings.filter(booking => booking.date === date)
      .map(booking => booking.roomNumber)
    return this.availableRoomNums;
  }

  filterAvailableRoomsByType(rooms, roomType) {
    let availableRooms = rooms
      .filter(room => !this.availableRoomNums.includes(room.number));
    // console.log('available rooms:', availableRooms);
    let filteredType = availableRooms
      .filter(room => room.roomType === roomType);
    // console.log('filteredType:', filteredType)
    this.availableRoomTypes = filteredType.map(room => room.number);
    // console.log('available room types', availableRooms)
    return filteredType;
  }

}

export default Customer;