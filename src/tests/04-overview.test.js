import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils"
 
import Overview from '../views/overview/Overview.js'
import Lecture from '../views/lecture/Lecture.js'


const testUsername = 'KincannonW'
let container = null
const lessonPlan = require('../curriculum/lessonPlan.js')

beforeEach(() => {
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
  
})

afterEach(() => {
  // cleanup on exiting
  container.remove()
  container = null
  localStorage.removeItem('username')
})
 
 
describe('Test student clicking on module', () => {
  
  
  test("First module and first lesson", async () => {
		
		const module = lessonPlan[0]
		const moduleHeader = screen.queryByText(module.moduleName)
		
		await act( async () => {
			await userEvent.click(moduleHeader)
			await new Promise(r => setTimeout(r, 300)) // wait for animation to play
		})
		const firstLessonComp = screen.queryByText(module.lessons[0].lessonName)
		expect(firstLessonComp).toBeInTheDocument()
		
		await act( async () => {
			await userEvent.click(firstLessonComp)
			await new Promise(r => setTimeout(r, 1000)) // wait for Lecture component to load
		})
		expect(screen.queryByText(module.lessons[0].exerciseDescription)).toBeInTheDocument()
	
  })
  
  test("Last module and last lesson", async () => {
		  
		  const module = lessonPlan[lessonPlan.length - 1]
		  const moduleHeader = screen.queryByText(module.moduleName)
		  
		  await act( async () => {
			  await userEvent.click(moduleHeader)
			  await new Promise(r => setTimeout(r, 300)) // wait for animation to play
		  })
		  const lastLessonIdx = module.lessons.length - 1
		  const lastLessonComp = screen.queryByText(module.lessons[lastLessonIdx].lessonName)
		  expect(lastLessonComp).toBeInTheDocument()
		  
		  await act( async () => {
			  await userEvent.click(lastLessonComp)
			  await new Promise(r => setTimeout(r, 1000)) // wait for Lecture component to load
		  })
		  expect(screen.queryByText(module.lessons[lastLessonIdx].exerciseDescription)).toBeInTheDocument()
	  
	})
  
})