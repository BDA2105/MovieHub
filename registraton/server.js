const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

mongoose.connect('mongodb+srv://ayazhan:Abaiaiazhan03@cluster0.jsqo5.mongodb.net/?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 7) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 7 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword ,email, country,date} = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (!country || typeof country !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 7 ) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be at least 7 characters. Please, try again!'
		})
	}
	if (plainTextPassword.search(/[0-9]/) == -1)  {
		return res.json({
			status: 'error',
			error: 'Password must have at least 1 digit. Please, try again!'
		})
	}
	if (plainTextPassword.search(/[a-z]/) == -1)  {
		return res.json({
			status: 'error',
			error: 'Password must have at least 1 lowercase character. Please, try again!'
		})
	}
	if (plainTextPassword.search(/[A-Z]/) == -1)  {
		return res.json({
			status: 'error',
			error: 'Password must have at least 1 uppercase character. Please, try again!'
		})
	}
	if (plainTextPassword.search(/[!\@\#\$\%\^\&\*\(\)\_\=\+\-\>\<\,\?]/) == -1)  {
		return res.json({
			status: 'error',
			error: 'Password must have at least 1 special character. Please, try again!'
		})
	}
	const password = await bcrypt.hash(plainTextPassword, 10)


	try {
		const response = await User.create({
			username,
			password,
			email,
			country,
			date
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})
