import "./SignIn.css"
import {Link, useNavigate} from 'react-router-dom'

export default function SignIn() {
	
	const navigate = useNavigate();
	
	
	/* The following function makes a GET request to the
	backend to see if the user exists. If they exist, the
	user is signed in and redirected to their overview page.
	If the user does not exist, an error message is shown. */
	async function signInUser() {
		
		const usernameInput = document.getElementById('usernameInputElem').value
		const passwordInput = document.getElementById('passwordInputElem').value
		const errorElem = document.getElementById('signInError')
		
		try {

			const response = await fetch(`http://localhost:4000/api/signIn?username=${usernameInput}&password=${passwordInput}`)
			
			if (response.ok) { // user was found, move to /overview if they aren't an admin
				localStorage.setItem('username', usernameInput)
				if (usernameInput !== "admin") {
					navigate('/overview');
				}
				else {
					navigate('/admin')
				}
			}
			else { // user not found
				errorElem.textContent = "No user found"
			}
			
		}
		catch (err) {
			console.error(err)
			errorElem.textContent = 'Uh oh, it looks like something went wrong on our side. '
		}
		
	}

		
	
	return (
		<>
			<div className="signInPageWrapper">
			
				{/* Start title and caption */}
				<h1 className="signInTitle">Sign in to continue</h1>
				<p className="signInTitleCaption">It's members only beyond this point. If you want to get in touch, please <a>contact us</a>. If you're ready to start your coding journey with us, <a>sign up now</a>.
				</p>
				{/* End title and caption */}
				
				{/* Start login box */}
				<div className="logInBox">
				
					<div className="usernameBlock">
						<label htmlFor="usernameInput" id="usernameLabel">Username: </label>
						<input name="usernameInput" id="usernameInputElem" placeholder="Username"/>
					</div>
					
					<div className="passwordBlock">
						<label htmlFor="passwordInput" id="passwordLabel">Password: </label>
						<input name="passwordInput" id="passwordInputElem" placeholder="Password"/>
					</div>
					
					<p id="signInError"></p>
					
					<button id="logInButton" onClick={signInUser}>Log in</button>
				</div>
				{/* End login box */}
				
			</div>
		</>
	)
}