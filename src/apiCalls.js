export const customerPromise = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
};

export const bookingsPromise = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json())
};

export const roomsPromise = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
};

export const postData = (userID, date, roomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    // eslint-disable-next-line max-len
    body: JSON.stringify({
      "userID": userID,
      "date": date,
      "roomNumber": roomNumber
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
}
