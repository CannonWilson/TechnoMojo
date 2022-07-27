# TODO:

---

## General:

• Create shared email and associate it with MongoDB cluster and Heroku account

• Deploy with Docker

• Test site with screen reader

## /src:

• Add data for remaining modules in curriculum directory

• Styling (spice up the gray and white color scheme)

• Blue text on mobile

• Fine-tune responsive font sizes

• Remove testid attributes from production code

## /src/Lecture.js:

• KNOWN BUG: Sometimes, when a user is loading the lecture view for the very first time ever, 
the view only partially loads, and the video, lesson description, and exercise are not shown.
Refreshing the page causes the view to load correctly.

• Retrieve user's submitted code and completed quiz from the db if they have already completed the lecture

• Change background color of choice to red on incorrect answers