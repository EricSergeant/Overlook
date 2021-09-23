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
