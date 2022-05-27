const express = require('express')
const app = express()
const port = process.env.PORT || 43023

const cors = require('cors')
app.use(cors())

const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://kwilson2:ZQKH6Ln1ZwpKVnxT@cluster0.pnvyu.mongodb.net/?retryWrites=true&w=majority'
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

app.listen(port)