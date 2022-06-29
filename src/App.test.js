import React from "react"
import ReactDOM from 'react-dom/client'
import {MemoryRouter} from 'react-router-dom'
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import App from "./App.js"
import Overview from './views/overview/Overview.js'


let testUsername = 'KincannonW'
let testPswd = process.env.REACT_APP_TEST_USER_PASSWORD

let container = null
let root = null

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


describe('test rendering', () => {
  
  it("renders App", () => {
    act(() => {
      ReactDOM.createRoot(container).render(<App />)    
    })
    expect(container.textContent).toContain('TechnoMojo')
  })
   
  it("renders Overview", () => {
    act(() => {
      ReactDOM.createRoot(container).render(
        <MemoryRouter>
          <Overview />
        </MemoryRouter>)
    })
    expect(container.textContent).toContain('Overall completion')
  }) 
  
})

