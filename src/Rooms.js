class Rooms {
  constructor(roomData) {
    this.roomNumber = roomData.number;
    this.roomTtype = roomData.roomType;
    this.bidet = roomData.bidet;
    this.bedsize = roomData.bedSize;
    this.numBeds = roomData.numBeds;
    this.costPerNight = roomData.costPerNight;
  }
}

export default Rooms;