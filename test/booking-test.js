import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/Booking';
import bookings from './test-data/bookings-test-data';

let booking1, booking2;

describe('Booking', () => {
  beforeEach(() => {
    booking1 = new Booking(bookings[0]);
    booking2 = new Booking(bookings[1]);
  });
  it('Should be a function', () => {
    expect(Booking).to.be.a('function');
  });
  it('Should have value of booking ID', () => {
    expect(booking1.id).to.equal(bookings[0].id);
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6t5");
  });
  it('Should have the user ID', () => {
    expect(booking1.userID).to.equal(9);
    expect(booking2.userID).to.equal(bookings[1].userID);
  });
  it('Should have booking date', () => {
    expect(booking1.date).to.equal(bookings[0].date);
    expect(booking2.date).to.equal("2020/01/24");
  });

});
