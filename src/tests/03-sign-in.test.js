import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils"
 
import SignIn from '../views/sign_in/SignIn.js'
import Overview from '../views/overview/Overview.js'
 

const testUsername = 'KincannonW'
const testPswd = process.env.REACT_APP_TEST_USER_PASSWORD

const lessonPlan = require('../curriculum/lessonPlan.js')
let container = null

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  container.remove()
  container = null
})
 
 
describe('Test sign in', () => {
  
  test("Bad username and password input", async () => {
	  
	act(() => {
	  	ReactDOM.createRoot(container).render(
			<MemoryRouter>
		  		<SignIn />
			</MemoryRouter>
	  	)
  	})
	  const usernameElem = screen.queryByTestId('username-input')
	  const passwordElem = screen.queryByTestId('password-input')
	  await userEvent.type(usernameElem, "Monkey")
	  await userEvent.type(passwordElem, "Banana")
	  const loginButton = screen.queryByTestId('log-in-button')
	  await userEvent.click(loginButton)
	  
	  // Wait 1 second for request to be made to backend in SignIn component
	  await new Promise(r => setTimeout(r, 2000))
	  expect(screen.queryByText("No user found")).toBeInTheDocument()
  })
  
  
  test("Good username and password input", async () => {
	  
	  	act(() => {
			ReactDOM.createRoot(container).render(
			  <MemoryRouter>
				  <Routes>
					  <Route path="/" element={<SignIn />} />
					  <Route path="/overview" element={<Overview />} />
				  </Routes>
			  </MemoryRouter>
			)
		})
		  
  		const usernameElem = screen.queryByTestId('username-input')
  		const passwordElem = screen.queryByTestId('password-input')
  		await userEvent.type(usernameElem, testUsername)
  		await userEvent.type(passwordElem, testPswd)
  		const loginButton = screen.queryByTestId('log-in-button')
		 
		/* State gets changed in the Module component, so act is needed here.
		Click the login button and wait for the request to be made to backend 
		in SignIn component. After, the name of the first module should be
		visible in the document since the Overview view should load  */
	  	await act( async () => { 
	  		await userEvent.click(loginButton)
	  		await new Promise(r => setTimeout(r, 2000))  
	  	})
	  	expect(screen.queryByText(lessonPlan[0].moduleName)).toBeInTheDocument()
  })
  
})