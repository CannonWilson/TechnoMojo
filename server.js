const logger = require('winston') // this is a logger that makes messages show up in heroku logs

const path = require('path');
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()

const {MongoClient} = require('mongodb')
const url = process.env.MONGO_CONNECTION_URI
let collection
const client = new MongoClient(url)

client.connect(function(err) {
  if(err) throw err;
  
  collection = client.db('technomojo').collection('test');
  app.listen(port);
  logger.log('Connected to DB. Listening on port ' + port);
});


app.get('/api/signIn', (req, res) => {
	const usernameInput = req.query.username
	const passwordInput = req.query.password
	
	async function checkUserInfo() {

		const userInfoDoc = await collection.findOne({username: usernameInput, password: passwordInput})
		logger.log('userInfoDoc in signIn: ', userInfoDoc)
		if (userInfoDoc) { // userInfoDoc is not null, user was found
			res.sendStatus(200)
		}
		else { // userInfoDoc is null, user not found
			res.sendStatus(404)
		}
		
	}
	
	checkUserInfo()
	
})

app.get('/api/userProgress', (req, res) => {
	
	const usernameInput = req.query.username
	
	async function checkUserInfo() {
		
		const userInfoDoc = await collection.findOne({username: usernameInput})
		logger.log('userInfoDoc in userProgress: ', userInfoDoc)
		if (userInfoDoc) { // userInfoDoc is not null, user was found
			res.send(userInfoDoc.progress) // send progress array to frontend
		}
		else { // userInfoDoc is null, user not found
			res.sendStatus(404)
		}
		
	}
	
	checkUserInfo()
	
})

app.put('/api/updateProgress', (req, res) => {
	
	const username = req.query.username
	const module = req.body.moduleName
	const lesson = req.body.lessonName
	const code = req.body.userCode
	
	async function updateProgress() {
		
		const result = await collection.updateOne(
			{
				username: username, 
				"progress.lessonName": lesson
			},
			{
				$set: {"progress.$.userCode": code}
			}
		)
		logger.log('result in /updateProgress: ', result)
		if (result.modifiedCount === 0) { // nothing was modified, no array entry was found. Push a new entry onto the array instead
			const insertResult = await collection.updateOne({username: username}, {$push: {progress: req.body}})
		}
		res.sendStatus(201)
	}
	
	updateProgress()
	
})


app.get('/api/allStudentProgress', (req, res) => {
		
	async function getStudentProgress() {
		const result = await collection.find({cohort: req.query.cohort}).project({username: 1, progress: 1, _id: 0}).sort({username: -1}).toArray()
		logger.log('GOT STUDENT PROGRESS: ', result)
		res.send(result)
	}
	
	getStudentProgress()
	
})

// Serve up the frontend
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})