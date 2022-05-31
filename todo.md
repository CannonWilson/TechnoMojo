#TODO:

---

/data/lessonPlan.js:

• Break each 'lessons' array into its own file to make 
things easier to read
• Add tests so that we can make sure edits are correct

---

/src:

• File organization, use more folders
• Delete default tests
• Add tests and comments

---

/src/SignIn.js:

• Add localStorage so that users stay signed in
• Automatically redirect to the overview page if 
the user is already signed in
• Add functionality to the links in the title caption
• Edit url in signInUser function
• Make font sizes responsive

---

/src/Overview.js:

• Change url in retrieveUserProgress function

---

/src/Lecture.js:

• Add dots at the bottom of the question carousel
• Clean up CSS to remove redundant code by consolidating classes
• Make data persist on the page if user clicks submit on the quiz or the textarea and then refreshes
• Retrieve user's submitted code and completed quiz from the db if they have already completed the lecture