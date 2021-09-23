const userMsg = document.getElementById('welcomeMsg');
const totalSpent = document.getElementById('totalSpent');


const domUpdates = {

  displayUserName(customer) {
    userMsg.innerText = `Greetings ${customer.name}!`
  },

  displayAmountSpent(customer) {
    if (customer.totalSpent === 0) {
      totalSpent.innerHTML +=
        `<p>Welcome first-time customer ${customer.name}!</p>`
    } else {
      // eslint-disable-next-line max-len
      totalSpent.innerHTML += `<p>You've spent $${customer.totalSpent} to date.  Thank you for returning to us!</p>`
    }
  },

  // displayUpcomingBookings

}

export default domUpdates;