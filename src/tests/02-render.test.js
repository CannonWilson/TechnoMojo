import ReactDOM from 'react-dom/client'
import {MemoryRouter, Routes, Route} from 'react-router-dom'
import {screen} from '@testing-library/react'
import { act } from "react-dom/test-utils"
import '@testing-library/jest-dom'

import App from "../App.js"
import SignIn from '../views/sign_in/SignIn.js'
import Overview from '../views/overview/Overview.js'
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
    expect(screen.queryByText('TechnoMojo')).toBeInTheDocument()
  })
  
  test("SignIn", () => {
    act(() => {
      ReactDOM.createRoot(container).render(
        <MemoryRouter> 
          <SignIn />
        </MemoryRouter>
      )
    })
    expect(screen.queryByText('Username:')).toBeInTheDocument()
  })
   
  test("Overview", () => {
    act(() => {
      ReactDOM.createRoot(container).render(
        <MemoryRouter>
          <Overview />
        </MemoryRouter>)
    })
    expect(screen.queryByText('Overall completion', {exact: false})).toBeInTheDocument()
  }) 
  
  test("Admin", () => {
    act(() => {
      
      ReactDOM.createRoot(container).render(
        <MemoryRouter>
          <Admin />
        </MemoryRouter>)
    })
    expect(screen.queryByText('Click on the dropdown below to select a cohort:')).toBeInTheDocument()
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
    expect(screen.queryByText('404')).toBeInTheDocument()
  }) 
  
})