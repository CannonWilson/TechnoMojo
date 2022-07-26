import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils"

import Admin from '../admin/Admin.js'

const adminUsername = process.env.REACT_APP_ADMIN_USERNAME
let container = null
const lessonPlan = require('../curriculum/lessonPlan.js')
const lastModule = lessonPlan[lessonPlan.length - 1]
const lastLesson = lastModule.lessons[lastModule.lessons.length - 1]


beforeEach(() => {
  
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
  localStorage.setItem('username', adminUsername) // log in admin
  
  act(() => {
	  ReactDOM.createRoot(container).render(
		<MemoryRouter initialEntries={['/admin']}>
			<Routes>
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</MemoryRouter>
	  )
  })

})

afterEach(() => {
  container.remove()
  container = null
  localStorage.removeItem('username') // log out user
})

describe('Admin tests', () => {
	
	test('Check main accordian', async () => {
		
		expect(screen.getByText('Click on the dropdown below to select a cohort:')).toBeInTheDocument() // make sure view has loaded
		
		await act(async () => {
			await userEvent.click(screen.getByText(lastModule.moduleName))
			await new Promise(r => setTimeout(r, 300))
			
			await userEvent.click(screen.getByText(lastLesson.lessonName, {exact: false}))	
			await new Promise(r => setTimeout(r, 500))
		})
		
		// Both <b>Finished:</b> and <b>Unfinished</b> should now appear:
		expect(screen.getAllByText('finished', {exact: false})).toHaveLength(2)
	})
	
	test('Check student modal', async () => {
		
		const studentCard = container.querySelector('.admin-student-section').firstChild
		expect(studentCard).toBeInTheDocument()
		
		// Click on the student's name (in the card header) and make sure modal appears
		await userEvent.click(studentCard.firstChild)
		await new Promise(r => setTimeout(r, 50))
		expect(screen.getByText('Overall completion:', {exact: false})).toBeInTheDocument()
		
		// Click on the last module and expect to find the last lesson's name
		await userEvent.click(screen.getAllByText(lastModule.moduleName)[1]) // There will now be two elements on the screen with the same text of the last module's name. The second one is in the student modal
		await new Promise(r => setTimeout(r, 50))
		expect(screen.getByText(lastLesson.lessonName)).toBeInTheDocument()

	})
	
})