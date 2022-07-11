import ReactDOM from 'react-dom/client'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import {screen, fireEvent, render} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"


import App from "../App.js"
import SignIn from '../views/sign_in/SignIn.js'
import Overview from '../views/overview/Overview.js'
import Lecture from '../views/lecture/Lecture.js'
import Admin from '../admin/Admin.js'
import NotFound from '../views/not_found/NotFound.js'


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


describe('Test rendering for views', () => {
  
  test("App", () => {
    
    act(() => {
      ReactDOM.createRoot(container).render(<App />)    
    })
    expect(container.textContent).toContain('TechnoMojo')
  })
  
  test("SignIn", () => {
    act(() => {
      ReactDOM.createRoot(container).render(
        <MemoryRouter> 
          <SignIn />
        </MemoryRouter>
      )
    })
    expect(container.textContent).toContain('Username:') 
  })
   
  test("Overview", () => {
    act(() => {
      ReactDOM.createRoot(container).render(
        <MemoryRouter>
          <Overview />
        </MemoryRouter>)
    })
    expect(container.textContent).toContain('Overall completion')
  }) 
  
  test("Admin", () => {
    act(() => {
      
      ReactDOM.createRoot(container).render(
        <MemoryRouter>
          <Admin />
        </MemoryRouter>)
    })
    expect(container.textContent).toContain('Click on the dropdown below to select a cohort:')
  }) 
  
  test("NotFound", () => {
    act(() => {
      
      ReactDOM.createRoot(container).render(
        <MemoryRouter initialEntries={[ '/bogus/fakeUrl/test' ]}>
          <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </MemoryRouter>)
    })
    expect(container.textContent).toContain('404')
  }) 
  
})