<h1> The Overlook Hotel </h1>

## Table of Contents
  - <a href="#overview">Overview</a>
  - <a href="#setup-instructions">Setup Instructions</a>
  - <a href="#technologies-used">Technologies Used</a>
  - <a href="#contributors">Contributors</a>
  - <a href="#challenges-and-wins">Challenges and Wins</a>
  - <a href="#future-additions">Future Additions</a>

## <a id="#overview">Overview</a>
This one-week project is the final solo challenge in Module 2 of the Turing School of Software and Design Front-End program. THe goal of this project was to build a hotel booking app that demonstrates the use of Object Oriented Programming, APIs to send and receive data, a solid code review process, and robust testing suites to test all functionality.  The app allows users to log in and see past and upcoming bookings, track the total amount they've spent, as well as create new bookings. 

Login screen for The Overlook Hotel, which requires the user to enter a username and password to access the app:
![image of login](https://user-images.githubusercontent.com/79122599/135187645-5005284c-9a39-41c5-9654-1b00d22a5a61.png "loging in to the Overlook")

After loging in, users will see a dashboard of their total spending, upcoming booked rooms, and previous booked rooms.  Users can also book new rooms, and are able to sort all available rooms by date and room type: 
![gif of booking room](https://user-images.githubusercontent.com/79122599/135188760-c32272b7-4be1-4600-a960-e34970611859.gif "booking a room at the Overlook")


## <a id="#setup-instructions">Setup Instructions</a>
### Set up the API
First, open a Terminal window and clone down the following API repo:   .  Then, in the terminal, type `npm install` and `npm start` to start the API.
### Set up the App
Second, open a new Terminal window and clone down this repo.  Then type `npm install` and `npm start` to get the app running.
### In the Browser
Third, in your web browser, visit `http://localhost:8080/` to use the Overlook Hotel App. 

Log in with the following information:
- Username: customer50 
- Password: overlook2021

## <a id="#technologies-used">Technologies Used</a>
- HTML
- Sass/CSS
- JavaScript
- Webpack
- Mocha/Chai
- fetch API to GET and POST data
- VS Code
- Lighthouse and WAVE via Chrome

## <a id="#contributors">Contributors</a>
[Eric Sergeant](https://github.com/EricSergeant)  
[Will McGuire](https://github.com/wmcguire18) Code review
[Hannah Hudson](https://github.com/hannahhch) Project Managment

## <a id="#challenges-and-wins">Challenges and Wins</a>
This was the first solo project to use fetch to both retrieve data from the API and update the API with information flowing back to it.  It was also challenging to keep track of the various class constructors, the methods of each, and the ways they all interacted with each other.  This was also my introduction to SCSS, which was it's own learning curve.

Overall, I was able to successfully implement the MVP for this project, including the new challenging material such as GET/POST and SCSS.  I was also able to get a fully-tabable page with 100% Lighthouse accesssibility and no ARIA errors/issue.  Using project and issue tracking on GitHub, I was able to keep track of all iterations, user stories, and bugs to successfully complete the project in a very limited amount of time.  

## <a id="#future-additions">Future Additions</a>
- Refactoring: Since this was only a week-long project, there are opportunities for improvement.  Specificaly, I would like to improve the general layout and design of the app.  I would also like to move from `innerHTML` adjustments to using `Node.appendChild()` instead.
- Manager login: Adding a manager login, along with the ability to delete bookings via the API.
