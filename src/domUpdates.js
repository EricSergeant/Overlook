const userMsg = document.getElementById('welcomeMsg');

const domUpdates = {

  displayUserName(customer) {
    userMsg.innerText = `Greetings ${customer.name}!`
  }

}

export default domUpdates;