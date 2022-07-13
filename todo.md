#TODO:

---

General:

• Create shared email and associate it with MongoDB cluster

---


/server.js:

• Add try/catch block to handle when connection to db fails
• Add more nuanced sendStatus behavior in '/api/updateProgress'

---

/src:

• Make font sizes responsive
• Add tests and comments
• Remove testid attributes from production code

---

/src/Lecture.js:

• Make data persist on the page if user clicks submit on the quiz or the textarea and then refreshes (implement a saveCodeButtonPressed function)
• Retrieve user's submitted code and completed quiz from the db if they have already completed the lecture
• Quiz changes to red on incorrect answers