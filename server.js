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
  
  if(err) throw err
  
  collection = client.db('technomojo').collection('test')
  app.listen(port)
  console.log('Connected to DB. Listening on port ' + port)
  
})


app.get('/api/signIn', (req, res) => {
	const usernameInput = req.query.username
	const passwordInput = req.query.password
	
	async function checkUserInfo() {

		const userInfoDoc = await collection.findOne({username: usernameInput, password: passwordInput})
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
		if (result.modifiedCount === 0 && result.matchedCount === 0) { // nothing was modified and no array entry was found. Push a new entry onto the array instead
			await collection.updateOne({username: username}, {$push: {progress: req.body}})
		}
		res.sendStatus(201)
	}
	
	if (code) { // only try to update progress if the code field is not an empty string or null
		updateProgress()
	}
	else res.sendStatus(400)
	
})


app.get('/api/allStudentProgress', (req, res) => {
		
	async function getStudentProgress() {
		const result = await collection.find({cohort: req.query.cohort}).project({username: 1, progress: 1, _id: 0}).sort({username: -1}).toArray()
		res.send(result)
	}
	
	getStudentProgress()
	
})

// Serve up the frontend
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})