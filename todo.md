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

• Make responsive
• Remove testid attributes from production code
• Go back through tests and perform cleanup (correct syntax, use of act, etc.)
• Accessibility

---

/src/Lecture.js:

• Retrieve user's submitted code and completed quiz from the db if they have already completed the lecture
• Choice changes to red on incorrect answers