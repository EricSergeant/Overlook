import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';
import customers from './test-data/customer-test-data';
import bookings from './test-data/bookings-test-data';
import rooms from './test-data/rooms-test-data';

let customer1, customer2;

describe('Customer', () => {
  beforeEach(() => {
    customer1 = new Customer(customers[0]);
    customer2 = new Customer(customers[1]);
  });
  it('Should be a function', () => {
    expect(Customer).to.be.a('function');
  });
  it('Should have a name', () => {
    expect(customer1.name).to.be.equal("Leatha Ullrich");
  });
  it('SHould have an id', () => {
    expect(customer2.id).to.equal(2);
  });
  it('Should have a default totalSpent of zero', () => {
    expect(customer1.totalSpent).to.equal(0);
    expect(customer2.totalSpent).to.equal(0);
  });
  it('Should record the totalSpent of customer', () => {
    customer2.calcCustomerTotalSpent(bookings, rooms);
    expect(customer2.totalSpent).to.equal(835.78)
  });
  it('Should record the totalSpent of customer', () => {
    let total = customer2.calcCustomerTotalSpent(bookings, rooms);
    expect(total).to.equal(835.78);
  });
  it('Should have an empty list of bookings by default', () => {
    expect(customer1.bookings.length).to.equal(0);
    expect(customer1.bookings).to.deep.equal([]);
  });
  it('Should record an array of all customer bookings', () => {
    customer1.createCustomerBookings(bookings);
    expect(customer1.bookings).to.deep.equal([bookings[4]]);
  });
  it('Should return the array of customer bookings', () => {
    let customerBookings = customer2.createCustomerBookings(bookings);
    expect(customerBookings).to.deep.equal([bookings[7], bookings[8]]);
  });
  it('Should have empty list of avaialble rooms by default', () => {
    expect(customer1.availableRoomNums.length).to.equal(0);
  });
  it('Should return available rooms only for booking date', () => {
    let roomCheck =
      customer2.filterUnavailableRoomsByDate("2020/02/06", bookings);
    expect(roomCheck).to.deep.equal([1]);
  });
  it('Should return a list of available rooms by room type', () => {
    let filteredType =
      customer1.filterRoomsByType(rooms, "single room");
    expect(filteredType).to.deep.equal([rooms[2], rooms[3]]);
  });
});