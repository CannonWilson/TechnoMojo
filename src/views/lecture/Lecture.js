import Header from '../../shared/Header.js'
import { useSearchParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import './Lecture.css'
const lessonPlan = require("../../curriculum/lessonPlan.js")

export default function Lecture() {
	
	const navigate = useNavigate()
	
	
	/* KNOWN BUG: Sometimes, when a user is loading the lecture view 
	for the very first time ever, the view only partially loads, and 
	the video, lesson description, and exercise are not shown. The 
	following useEffect hook checks to see if the primary subtitle
	failed to be filled with text and refreshes the page if so. */
	useEffect( () => {
		setTimeout( () => {
			const subtitleElem = document.getElementsByClassName('lecture-primary-subtitle')[0]
			if (subtitleElem.textContent === "") {
				console.error('Page failed to load. Triggering hard refresh.')
				localStorage.setItem('reload', "true")
				refreshPageIfNeeded()
			}
		}, 100)
	}, [])
	
	
	/* The useSearchParams hook is used to get the value of 
	the request queries called moduleName and lessonName. They 
	are decoded and then used to lookup the correct video urls, 
	quiz info, etc. from /src/data/lessonPlan.js */
	const [searchParams] = useSearchParams()
	const moduleName = decodeURIComponent(searchParams.get('moduleName'))
	const lessonName = decodeURIComponent(searchParams.get('lessonName'))
	const lessonsInCurrentModule = decodeURIComponent(searchParams.get('lessonsInCurrentModule'))
	const currentModule = lessonPlan.find(module => module.moduleName === moduleName)
	const currentLesson = currentModule.lessons.find(lesson => lesson.lessonName === lessonName)
	const currentLessonIndex = lessonsInCurrentModule.split('-').indexOf(currentLesson.lessonName)
	const nextLessonName = currentLessonIndex === currentModule.lessons.length - 1 ? "" : currentModule.lessons[currentLessonIndex + 1].lessonName
	const nextLessonLink = `/lecture?moduleName=${encodeURIComponent(moduleName)}&lessonName=${encodeURIComponent(nextLessonName)}&lessonsInCurrentModule=${encodeURIComponent(lessonsInCurrentModule)}`
	
	
	/* If the nextLessonName variable is not an empty
	string, navigate the user to the next lesson and 
	prime the view to reload and reset this component's
	state. Otherwise, open the Overview view because the
	user has finished every lesson in the module. */
	function openNextLesson() {
		if (nextLessonName) {
			localStorage.setItem('reload', "true")
			navigate(nextLessonLink)
		}
		else navigate('/overview')
	}
	
	/* Reload the page to reset this component's state.
	Currently, the reload is handled by the Header 
	component since this is the only way I could 
	figure out how to prevent an infinite loop 
	of refreshes. This system could be improved. */
	function refreshPageIfNeeded() {
		if (localStorage.getItem('reload') === "true") {
			localStorage.setItem('reload', "false")
			window.location.reload()
		}
	}
	
	
	// Variables for quiz logic
	const [successMessage, setSuccessMessage] = useState("Nice! You got it right, please move on to the next question.")
	const finishedQuizMessage = "Great job! You completed the quiz."
	const [isQuizComplete, setIsQuizComplete] = useState(false)	
	const [showAnswer, setShowAnswer] = useState(false)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [chosenChoiceIndex, setChosenChoiceIndex] = useState(null)
	const [questionIndexesAnsweredCorrectly, setQuestionIndexesAnsweredCorrectly] = useState([])
	const [currentQuestionAnsweredCorrectly, setCurrentQuestionAnsweredCorrectly] = useState(false)
	const [questionFeedback, setQuestionFeedback] = useState("")
	
	
	/* Triggered when user clicks on one of the four choices in the quiz. 
	It only allows a new choice to be selected if the correct answer 
	has not yet been submitted for the current question */
	function choiceClicked(choiceNumber) {
		if (!currentQuestionAnsweredCorrectly) { 
			setChosenChoiceIndex(choiceNumber - 1)
			document.querySelectorAll(".choice").forEach(choice => {
				choice.classList.remove('clicked-choice')
			})
			document.querySelector(".choice" + choiceNumber).classList.add('clicked-choice')
		}
	}
	
	
	/* The following hook checks if the user has completed the quiz
	whenever the length of the questionIndexesAnsweredCorrectly
	array changes */
	useEffect(() => {
		if (currentLesson.quiz && questionIndexesAnsweredCorrectly.length === currentLesson.quiz.length) {
			setIsQuizComplete(true)
			setSuccessMessage(finishedQuizMessage)
			setQuestionFeedback(finishedQuizMessage)
		}
	}, [questionIndexesAnsweredCorrectly, currentLesson.quiz])
	
	
	/* This function is triggered whenever the user presses
	the button at the bottom of the quiz. It does nothing 
	if the user has not clicked on an answer choice or if 
	the user has already submitted the correct answer for 
	this question. If the choice is correct, it adds the 
	index of the current question to the array
	tracking correctly answered questions if that array 
	doesn't already hold that question index. */
	function submitChoiceButtonPressed() {
		
		if (chosenChoiceIndex === null || questionIndexesAnsweredCorrectly.includes(currentQuestionIndex)) return
		
		if (chosenChoiceIndex === currentLesson.quiz[currentQuestionIndex].correctAnswerIndex) {
			
			if (!questionIndexesAnsweredCorrectly.includes(currentQuestionIndex)) {
				setQuestionIndexesAnsweredCorrectly([...questionIndexesAnsweredCorrectly, currentQuestionIndex])
			}
			setQuestionFeedback(successMessage)
			setCurrentQuestionAnsweredCorrectly(true)
		}
		
		else {
			setQuestionFeedback("That is not correct, please try again.")
		}
	}
	
	
	/* Because changes to state variables in React don't happen immediately,
	the updates to the styling of the current question whenever one of the
	arrow keys is pressed must occur after the currentQuestionIndex value
	has finished updating */
	useEffect( () => {
		handleChoiceStylingOnCurrentQuestion()
	}, [currentQuestionIndex]) // eslint-disable-line react-hooks/exhaustive-deps
	
	
	/* By default, this function will clear out current styling 
	like the user has never seen the question before. But, if
	the currently shown question has already been answered correctly,
	it retrieves the correct answer, highlights that answer, and 
	prevent user interaction with choices */
	function handleChoiceStylingOnCurrentQuestion() {

		document.querySelectorAll(".choice").forEach(choice => {
			choice.classList.remove('clicked-choice')
		})
		setCurrentQuestionAnsweredCorrectly(false)
		setQuestionFeedback("")
		
		if (questionIndexesAnsweredCorrectly.includes(currentQuestionIndex)) {
			document.querySelector(".choice" + String(currentLesson.quiz[currentQuestionIndex].correctAnswerIndex + 1)).classList.add('clicked-choice')
			setCurrentQuestionAnsweredCorrectly(true)
			setQuestionFeedback(successMessage)
		}
	}
	
	
	/* Function triggered whenever either of the arrow 
	buttons is pressed. It updates the current 
	question index and resets the choice index if
	the question has not yet been answered. */
	function arrowPressed(increment) {
		let newIndex = (currentQuestionIndex + increment)
		if (newIndex < 0) newIndex = currentLesson.quiz.length - 1 // wrap around to the very last index if needed
		else newIndex = newIndex % currentLesson.quiz.length // wrap around to the first index if needed
		setCurrentQuestionIndex(newIndex)
		if (!questionIndexesAnsweredCorrectly.includes(newIndex)) {
			setChosenChoiceIndex(null)
		}
	}
	
	/* When the submit button is pressed, the user's input should be verified 
	(the current code only checks that the textarea can't be empty). Then, the
	user's input is URL encoded and passed to the backend to be recorded 
	in the database. */
	const [submitErrorMessage, setSubmitErrorMessage] = useState("")
	
	async function submitButtonPressed() {
		
		const userCode = encodeURIComponent(document.getElementById('submission-text-area').value)
		
		if (!isQuizComplete && userCode.length === 0) {
			setSubmitErrorMessage("You must type your code and complete the quiz before submitting.")
			return
		}
		else if (userCode.length === 0) {
			setSubmitErrorMessage("You must type your code before submitting.")
			return
		}
		else if (!isQuizComplete) {
			setSubmitErrorMessage("You must complete the quiz before submitting.")
			return
		}
		setSubmitErrorMessage("") // clear out the error message if everything is complete
	
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(
				{
					moduleName: currentModule.moduleName, 
					lessonName: currentLesson.lessonName, 
					userCode: userCode
				})
		}
		
		const username = localStorage.getItem("username")
		if (!username) {
			setSubmitErrorMessage('You are not logged in. Please save your work by copying and pasting your code into some other application before returning to the home screen of this portal to sign in.')
			console.error('User is not logged in')
		}
		try {
			const response = await fetch('https://technomojo.herokuapp.com/api/updateProgress?username=' + username, requestOptions)
			if (response.ok) {
				setShowAnswer(true)
			}
			else {
				throw new Error('Response from backend at /api/updateProgress unsuccessful')
			}
		}
		catch(err) {
			console.error(err)
			setSubmitErrorMessage("Something went wrong on our end. Please grab an instructor and we'll take a look.")
		}
	}
	
	
	return (
		<>
		
			{/* Begin header section (loads rightLink if there is a next lesson in the module) */}
			{nextLessonName !== "" && 
				<Header handleReload={refreshPageIfNeeded} leftText="← Overview" rightText={nextLessonName + " →"} leftLink="/overview" rightLink={nextLessonLink} />
			}
			
			{nextLessonName === "" &&
				<Header handleReload={refreshPageIfNeeded} leftText="← Overview" rightText="" leftLink="/overview" rightLink="#" />
			}
			{/* End header section */}
			
			
			<div className="flex-center">
				<div className="lecture-page-content">
					
					{/* Start title section*/}
					<h1 className="lecture-primary-title">{currentLesson.lessonName}</h1>
					<p className="lecture-primary-subtitle">{currentLesson.lessonDescription}</p>
					{/* End title section*/}
					
					
					{/* Start intro video */}
					<div style={{padding:'56.25% 0 0 0',position:'relative'}}>
						<iframe src={currentLesson.introVideoUrl} title="intro video" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}></iframe>
					</div>
					{/* End intro video */}
					
					
					{/* Start quiz section */}
					{currentLesson.quiz && <>
						<h2 className="lecture-secondary-title">Quiz</h2>
						<p className="lecture-secondary-subtitle">Please take this short quiz to demonstrate your understanding of this lesson's content. All questions are multiple-choice, and you can submit answers as many times as you need without being penalized for incorrect choices. You must select the correct answer on every question before you can submit your code from the exercise below.</p>
						<div className="quiz-wrapper">
						
							<div className="question-header flex-center">
								{currentLesson.quiz[currentQuestionIndex].question}
							</div>
							<div className="choice choice1" 
								onClick={() => choiceClicked(1)}
								onKeyDown={() => choiceClicked(1)}
								role="button"
								tabIndex="0">
								{currentLesson.quiz[currentQuestionIndex].answerChoices[0]}
							</div>
							<div className="choice choice2" 
								onClick={() => choiceClicked(2)}
								onKeyDown={() => choiceClicked(2)}
								role="button"
								tabIndex="0">
								{currentLesson.quiz[currentQuestionIndex].answerChoices[1]}
							</div>
							<div className="choice choice3" 
								onClick={() => choiceClicked(3)}
								onKeyDown={() => choiceClicked(3)}
								role="button"
								tabIndex="0">
								{currentLesson.quiz[currentQuestionIndex].answerChoices[2]}
							</div>
							<div className="choice choice4" 
								onClick={() => choiceClicked(4)}
								onKeyDown={() => choiceClicked(4)}
								role="button"
								tabIndex="0">
								{currentLesson.quiz[currentQuestionIndex].answerChoices[3]}
							</div>
							<div className="question-feedback flex-center">
								{questionFeedback}
							</div>
							<div className="submit-choice-btn-wrapper flex-center">
								<button className="default-button submit-choice-btn" onClick={submitChoiceButtonPressed}>Save answer</button>
							</div>
							<div className="quiz-left-arrow flex-center">
								<svg onClick={() => arrowPressed(-1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" className="lecture-arrow"><path d="M20 44 0 24 20 4 22.8 6.85 5.65 24 22.8 41.15Z"/></svg>
							</div>
							<div className="quiz-right-arrow flex-center">
								<svg onClick={() => arrowPressed(1)} data-testid="right-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" className="lecture-arrow"><path d="M15.2 43.9 12.4 41.05 29.55 23.9 12.4 6.75 15.2 3.9 35.2 23.9Z"/></svg>
							</div>
						</div>
					</>}
					{/* End quiz section */}
										
					
					{/* Start exercise section*/}
					<h2 className="lecture-secondary-title">Exercise</h2>
					<p className="lecture-secondary-subtitle">{currentLesson.exerciseDescription}</p>
					<iframe src={currentLesson.codeSandBoxUrl} title="code sandbox"
						 style={{width:'100%', height:'100vh', border:0, borderRadius: '4px', overflow: 'hidden'}}
						 sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
					   ></iframe>
					{/* End exercise section */}
					   
					
					
					{/* Start code submission section */}
					<h2 className="lecture-secondary-title">Paste Your Code</h2>
					<p className="lecture-secondary-subtitle">{currentLesson.submissionDescription}</p>
					<textarea id="submission-text-area" />
					{/* End code submission section */}
					
					
					
					{/* Start submit button */}
					<div>
						<p id="submit-error">{submitErrorMessage}</p>
						<button className="default-button lecture-submit-btn" onClick={submitButtonPressed}>Submit Code</button>
					</div>
					{/* End submit button*/}
					
					
					{/* Start answer section */}
					{showAnswer && 
						<div className="answer-section">
						
							<h1 className="lecture-primary-title">Awesome job!</h1>
							<p className="lecture-primary-subtitle">You completed this lesson. The solution video is below. Please watch it and feel free to resubmit your code after watching.</p>
							
							<div style={{padding:'56.25% 0 0 0',position:'relative'}}>
								<iframe src={currentLesson.answerVideoUrl} title="answer video" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}></iframe>
							</div>
							
							<button className="default-button lecture-submit-btn" onClick={openNextLesson}>Open next lesson</button>
						</div>
					}
					{/* End answer section */}
					
				</div>
			</div>
		</>
	)
}