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
  let info = {
    "userID": userID,
    "date": date,
    "roomNumber": roomNumber
  }
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      'Content-type': 'application/json'
    }
  })
}

// let sendingData = (sentData, url) => {
//   return fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(sentData),
//     headers: { 'Content-Type': 'application/json' },
//   })
//     .then(response => response.json())
//     .then(json => console.log("json post in apiCalls", json))
//     .catch(err => {
//       console.log('error in POST:', err)
//     });
// }

// let postData = (postedData) => {
//   return Promise.all([sendingData(postableData, 'http://localhost:3001/api/v1/bookings')]);
// }

//export const postNewData