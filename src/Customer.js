class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.totalSpent = 0;
    this.bookings = [];
    this.availableRoomNums = [];
    this.availableRoomTypes = [];
  }

}

export default Customer;