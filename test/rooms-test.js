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

});