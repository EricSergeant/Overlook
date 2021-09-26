class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.totalSpent = 0;
    this.bookings = [];
    this.roomInfo = []; //new try
    this.availableRoomNums = [];
    this.availableRoomTypes = [];
    this.availableRooms = [];
  }

  createCustomerBookings(bookings) {
    let myBookings = bookings
      .filter(booking => booking.userID === this.id) // original

    this.bookings = myBookings; //original
    // console.log('myBookings', myBookings)
    return myBookings; //original
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

  // sortBookings(bookings) {
  //   return bookings.sort((a, b) => {
  //     return a.date - b.date
  //   })
  // }

  // filterAvailableRoomsByDate(date, bookings) {
  //   this.availableRoomNums = bookings.filter(booking => booking.date !== date)
  //     .map(booking => booking.roomNumber)
  //   return this.availableRoomNums;
  // }

  filterAvailableRoomsByDate(date, rooms, bookings) {
    // console.log('rooms here in customer:', rooms)
    let available = rooms.map(room => {
      if (room.number === bookings.roomNumber
        && bookings.date !== date) {
        return room.number
      }
    })
    this.availableRoomNums = available
    this.availableRooms.push(rooms)
    console.log('available rooms in customer:', this.availableRooms)
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