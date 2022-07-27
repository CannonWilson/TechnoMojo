# TechnoMojo Student Portal v1

---

Made by [@CannonWilson](https://github.com/CannonWilson). 
This is the first version of the student portal for the instruction
of web development at the Innovation Outpost in Amarillo, Texas. It
is fully operational and deployed on Heroku [here](https://technomojo.herokuapp.com). 
Updates will continue to be made to this application, but not in this repo 
(I am no longer involved with the project or working at the Innovation Outpost).

## Overview

This app uses a React frontend with an Express backend that communicates with a 
cluster in MongoDB Atlas to store student data.

Students can sign in with their assigned username and password in order to view
every module in the curriculum laid out in an accordion. Clicking on the name 
of a module will reveal every lesson in that module. The student can then 
click on the name of the lesson they wish to take. Then, a new view appears 
that shows all of the details for the lesson, as well as a Vimeo video to watch, 
a quiz to take, and a coding exercise to complete. An answer video appears after 
the quiz is finished and the code for the exercise is submitted.

## Highlights

• UI created with React

• Backend created with Express & MongoDB Atlas

• Packages managed with npm

• Responsiveness and animations with CSS

• Created 14 tests across 6 test suites using Jest and React Testing Library

• Linting with ESLint

• Accessibility auditing with jsx-a11y

## What's not Included

If you clone this project, you will need to install the node modules by running the 
`npm install` command. There is also a `.env` file that stores sensitive data such as
the MongoDB connection URL and the admin username that is not stored in this repo. 

## Modifying the Curriculum

The file at /src/curriculum/lessonPlan.js serves as the single source of truth for 
the entirety of the TechnoMojo curriculum. It gets imported all across the application, 
so any edits made to this file will change the content for the rest of the app with 
no further changes needed. It is currently represented as a JavaScript array stored 
inside the project. This choice was made to speed up edits and take advantage of 
code analysis.

To change any of the content in a module, open that module's file and make any edits 
you wish. Just make sure to test your changes before deploying!

To add a new module, create a new file in the /src/curriculum/modules directory. Export an 
object from that file that contains the module's name and an array with all of the information 
about that module's lessons. Please look at an existing module (such as 07-APIs.js) for an 
example.

## Adding New Students

The easiest way to add new students to the app is to open up the collection inside MongoDB
Atlas. Click on the 'Insert Document' button on the right and then click on the button with 
the curly braces. Then, you can paste the following text into the window, making sure to edit 
each value besides the empty progress array. You can add as many documents to the collection 
as you wish using this method, just add a new object below the two shown here and separate those 
objects with commas.
```
[
  {
	  "username": "FirstL",
	  "password": "0000",
	  "progress": [],
	  "cohort": "2022-02"
  },
  {
	"username": "FirstL",
	"password": "0000",
	"progress": [],
	"cohort": "2022-02"
  }
]
```

If you start a new cohort in the database, make sure that you add a new entry to the `cohorts` 
array in /src/admin/Admin.js so that the students in the new cohort are visible on the admin 
side of the site. 

## Admin Functionality

Users enter the admin portion of the site when they log in with the specific admin 
username and password. This username and password has been shared internally, and 
it can be given to other employees as needed. The goal of this portion of the site 
is to give all instructors insight into student progress, participation, and grades as 
the course progresses. Success coaches, administrators, and other staff will also 
benefit from having access to this portion of the site.

## Testing

The React components in this project have all received tests that assert on their output. These 
tests can be found in /src/tests. These tests can be run with the `npm test` command. It's a good 
idea to run all of these tests before deploying a change.

However, these tests were written with the current project in mind. As the app changes, these 
tests might need to be updated as well in order to continue being useful.

These tests attempt to emulate the real application as closely as possible. As such, they actually make 
HTTP requests to the deployed backend. This behavior was desirable in the development phase, as it
tested the real backend and revealed bugs. But, the tradeoff is that the tests can be flaky and run slower. 
As such, tests that make API calls should be run a few times before being considered failed.
At some point, it may be desirable to move to [mocking requests](https://reactjs.org/docs/testing-recipes.html#data-fetching) 
instead of making real API calls.

## What's Next

There is still much exciting work to do for this project! I have gathered all of what I 
feel are the most important things to work on in the `todo.md` file. Please feel free 
to reach out to me on Discord as work on this project continues.