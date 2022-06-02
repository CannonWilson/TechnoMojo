const express = require('express')
const app = express()
const port = process.env.PORT || 43023

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()

const {MongoClient} = require('mongodb')
const url = process.env.MONGO_CONNECTION_URI
const client = new MongoClient(url)


app.get('/api/signIn', (req, res) => {
	const usernameInput = req.query.username
	const passwordInput = req.query.password
	
	async function checkUserInfo() {
		await client.connect()
		const collection = client.db('technomojo').collection('test')
		
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
		await client.connect()
		const collection = client.db('technomojo').collection('test')
		
		const userInfoDoc = await collection.findOne({username: usernameInput})
		if (userInfoDoc) { // userInfoDoc is not null, user was found
			console.log('userInfoDoc', userInfoDoc)
			console.log('sending userInfoDoc.progress', userInfoDoc.progress)
			res.send(userInfoDoc.progress) // send progress array to frontend
		}
		else { // userInfoDoc is null, user not found
			res.sendStatus(404)
		}
	}
	
	checkUserInfo()
	
})

app.put('/api/updateProgress', (req, res) => {
	console.log("reached the backend. Submitting code!")
	console.log('req.body', req.body)
	console.log('username: ', req.query.username)
	
	
	const username = req.query.username
	const module = req.body.moduleName
	const lesson = req.body.lessonName
	const code = req.body.userCode
	
	async function updateProgress() {
		await client.connect()
		const collection = client.db('technomojo').collection('test')

		const result = await collection.updateOne(
			{
				username: username, 
				"progress.moduleName": module,
				"progress.lessonName": lesson
			},
			{
				$set: {"progress.$.userCode": code}
			}
		)
		if (result.modifiedCount === 0) { // nothing was modified, no array entry was found. Push a new entry onto the array instead
			const insertResult = await collection.updateOne({username: username}, {$push: {progress: req.body}})
		}
		console.log('result on backend', result)
		res.sendStatus(201)
	}
	
	updateProgress()
	
})

app.get('/api/allStudentProgress', (req, res) => {
	
	async function getStudentProgress() {
		await client.connect()
		const collection = client.db('technomojo').collection('test')
		
		const result = await collection.find().project({username: 1, progress: 1, _id: 0}).sort({username: -1}).toArray()
		await client.close()
		res.send(result)
	}
	
	getStudentProgress()
	
})



app.listen(port)