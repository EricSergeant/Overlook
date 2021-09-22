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


});