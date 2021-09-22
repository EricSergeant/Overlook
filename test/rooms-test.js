import chai from 'chai';
const expect = chai.expect;

import Rooms from '../src/Rooms';
import rooms from './test-data/rooms-test-data';

let room1, room2;

describe('Hotel Room', () => {
  beforeEach(() => {
    room1 = new Rooms(rooms[0]);
    room2 = new Rooms(rooms[1]);
  });
  it('Should be a function', () => {
    expect(Rooms).to.be.a('function');
  });
  it('Should have a room number', () => {
    expect(room1.roomNumber).to.equal(rooms[0].number);
  });
  it('Should have a room type', () => {
    expect(room2.roomType).to.equal(rooms[1].roomType);
  });
  it('Should list whether it includes a bidet', () => {
    expect(room1.bidet).to.equal(true);
    expect(room2.bidet).to.equal(false);
  });
  it('Should list the bed size', () => {
    expect(room1.bedSize).to.equal(rooms[0].bedSize);
    expect(room1.bedSize).to.equal('queen')
  });
  it('Should list the number of beds', () => {
    expect(room2.numBeds).to.equal(rooms[1].numBeds);
    expect(room2.numBeds).to.equal(2);
  });
  it('Should list the cost per night for room', () => {
    expect(room1.costPerNight).to.equal(rooms[0].costPerNight);
    expect(room2.costPerNight).to.equal(477.38);
  });

});