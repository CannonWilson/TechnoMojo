#TODO:

---

general:

• Add more documentation, comments, and tests
• Make the system more robust by adding cohort names to each student entry in the database
• Make a shared Module component
• Remove React Fragments where they aren't needed

---

/server.js:

• Add documentation to routes
• Add try/catch block to handle when connection to db fails
• Add more nuanced sendStatus behavior in '/api/updateProgress'

/data/lessonPlan.js:

• Break each 'lessons' array into its own file to make 
things easier to read
• Add tests so that we can make sure edits are correct

---

/src:

• File organization, use more folders
• Delete default tests
• Make font sizes responsive
• Add tests and comments

---

/src/SignIn.js:

• Add functionality to the links in the title caption
• Edit url in signInUser function
• Make links work to sign up for a cohort or contact us

---

/src/Overview.js:

• Change url in retrieveUserProgress function
• Change link text and path in Header

---

/src/Lecture.js:

• Add dots at the bottom of the question carousel
• Clean up CSS to remove redundant code by consolidating classes
• Make data persist on the page if user clicks submit on the quiz or the textarea and then refreshes (implement saveCodeButtonPressed function)
• Retrieve user's submitted code and completed quiz from the db if they have already completed the lecture
• Change fetch URI in submitCodeButtonPressed function
• Quiz changes to red on incorrect answers
• Add styling on quiz
• When you've completed the lecture, show some message instead of auto redirect
• Create modal that pops up once answer is submitted

---

/src/Admin.js:

• Change fetch URI in retrieveStudentProgress
• Consider using data structure other than arrays