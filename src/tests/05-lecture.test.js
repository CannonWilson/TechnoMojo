import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter, BrowserRouter, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils"
 
import Overview from '../views/overview/Overview.js'
import Lecture from '../views/lecture/Lecture.js'


const testUsername = 'KincannonW'
let container = null
let existingUserCode = FetchUserExistingCodeForLastLesson()
const lessonPlan = require('../curriculum/lessonPlan.js')
const lastModule = lessonPlan[lessonPlan.length - 1]
const lastLesson = lastModule.lessons[lastModule.lessons.length - 1]


async function FetchUserExistingCodeForLastLesson() {
	
	const response = await fetch('https://technomojo.herokuapp.com/api/userProgress?username=' + testUsername)
	const json = await response.json()
	const found = json.find(doc => doc.moduleName === lastModule.moduleName && doc.lessonName === lastLesson.lessonName)
	if (found) return found.userCode
	return ""
}


beforeEach(async () => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
  localStorage.setItem('username', testUsername) // log in user
  
  act(() => {
	  ReactDOM.createRoot(container).render(
		<MemoryRouter initialEntries={['/overview']}>
			<Routes>
				<Route path="/overview" element={<Overview />} />
				<Route path="/lecture" element={<Lecture />} />
			</Routes>
		</MemoryRouter>
	  )
  })
  
  	/* The following code clicks on the last lesson in the last module 
	  in order to load the Lecture component with the right data. This
	  code was taken almost verbatim from 04-overview.test.js */
	const moduleHeader = screen.queryByText(lastModule.moduleName)
	
	await act( async () => {
		await userEvent.click(moduleHeader)
		await new Promise(r => setTimeout(r, 300)) // wait for animation to play
	})
	const lastLessonComp = screen.queryByText(lastLesson.lessonName)
	
	await act( async () => {
		await userEvent.click(lastLessonComp)
		await new Promise(r => setTimeout(r, 1000)) // wait for Lecture component to load
	})

})

afterEach(() => {
  // cleanup on exiting
  container.remove()
  container = null
  localStorage.removeItem('username') // log out user
})
 
 
describe('Lecture functionality', () => {
  
  test("Complete quiz and submit code", async () => {
		
		// Make sure the component was correctly loaded with the last lesson
		expect(screen.queryByText(lastLesson.exerciseDescription)).toBeInTheDocument()
		
		const rightArrow = screen.getByTestId('right-arrow')
		const submitChoiceBtn = screen.getByText('Save answer')
		
		// Complete the quiz
		for (const [index, q] of lastLesson.quiz.entries()) {
			const correctChoice = container.getElementsByClassName('choice' + (q.correctAnswerIndex + 1))[0]
				await userEvent.click(correctChoice)
				await new Promise(r => setTimeout(r, 50))
				await userEvent.click(submitChoiceBtn)
				await new Promise(r => setTimeout(r, 50))
				if (index < lastLesson.quiz.length - 1) {
					expect(screen.queryByText('Nice! You got it right, please move on to the next question.')).toBeInTheDocument()
				}
				await userEvent.click(rightArrow)
				await new Promise(r => setTimeout(r, 50))
		}
		expect(screen.queryByText('Great job! You completed the quiz.')).toBeInTheDocument()
  })
  
  
})