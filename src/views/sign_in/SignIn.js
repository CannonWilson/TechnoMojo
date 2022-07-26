import {useNavigate} from 'react-router-dom'
import Header from '../../shared/Header.js'
import "./SignIn.css"

export default function SignIn() {
	
	const navigate = useNavigate()
	
	
	/* The following function makes a GET request to the
	backend to see if the user exists. If they exist, the
	user is signed in and redirected to their overview page.
	If the user does not exist, an error message is shown. */
	async function signInUser() {
		
		const usernameInput = document.getElementById('username-input-elem').value
		const passwordInput = document.getElementById('password-input-elem').value
		const errorElem = document.getElementById('sign-in-error')
		
		try {

			const response = await fetch(`https://technomojo.herokuapp.com/api/signIn?username=${usernameInput}&password=${passwordInput}`)
			
			if (response.ok) { // user was found, move to /overview or /admin
				localStorage.setItem('username', usernameInput)
				if (usernameInput !== process.env.REACT_APP_ADMIN_USERNAME) {
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
		
			{/* Start Header */}
			<Header leftText="" rightText="" leftLink="#" rightLink="#"/>
			{/* End Header */}
			
			
			{/* Start sign in view wrapper */}
			<div className="flex-center">
			
			
				{/* Start title and caption */}
				<h1 className="sign-in-title">Sign in to continue</h1>
				<p className="sign-in-title-caption">It's members only beyond this point. If you want to get in touch, please <a className="sign-in-link" href="https://www.innovationoutpost.com/career-accelerator"> contact us</a>. If you're ready to start your coding journey with us, <a className="sign-in-link" href="https://www.actx.edu/forms/amarillo-codes/application_full_stack.php">apply now</a>.
				</p>
				{/* End title and caption */}
				
				
				{/* Start login box */}
				<div className="log-in-box flex-center">
				
					<div className="username-block">
						<label htmlFor="username-input" id="username-label">Username: </label>
						<input name="username-input" id="username-input-elem" placeholder="Username" data-testid="username-input"/>
					</div>
					
					<div className="password-block">
						<label htmlFor="password-input" id="password-label">Password: </label>
						<input name="password-input" id="password-input-elem" placeholder="Password" data-testid="password-input"/>
					</div>
					
					<p className="default-error-msg" id="sign-in-error"></p>
					
					<button className="default-button" id="log-in-button" onClick={signInUser} data-testid="log-in-button">Log in</button>
				</div>
				{/* End login box */}
				
				
			</div>
			{/* End sign in view wrapper */}
		</>
	)
}