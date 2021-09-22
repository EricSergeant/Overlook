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

});
