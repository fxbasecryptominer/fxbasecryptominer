let emailParam = new URLSearchParams(window.location.search).get("email");
let statusParam = new URLSearchParams(window.location.search).get("status");
let userEmail = new URLSearchParams(window.location.search).get("useremail");
let hasReferral = new URLSearchParams(window.location.search).has("referral");

let signUpCard = document.getElementById("sign-up-card");
let signInPromptCard = document.getElementById("sign-in-prompt-card");
let signInDesc = document.getElementById("sign-in-desc");
let signUpDesc = document.getElementById("sign-up-desc");
let signInFormDesc = document.getElementById("sign-in-form-desc");
let signUpFormDesc = document.getElementById("sign-up-form-desc");

let fullName = document.getElementById("full-name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let referral = document.getElementById("referral");

let email2 = document.getElementById("email-2");
let password2 = document.getElementById("password-2");

let verificationCode = document.getElementById("verification-code");

let firstCard = document.getElementById("first");
let secondCard = document.getElementById("second");
let thirdCard = document.getElementById("third");

let validated;
let verified;
let signedIn;
let resend;

let countdown = 60;

if (emailParam != null) {
	email2.value = emailParam;
	switchCards(
		signUpCard,
		signInPromptCard,
		signInDesc,
		signUpDesc,
		signUpFormDesc,
		signInFormDesc
	);
}
if (statusParam == "signin") {
	switchCards(
		signUpCard,
		signInPromptCard,
		signInDesc,
		signUpDesc,
		signUpFormDesc,
		signInFormDesc
	);
} else if (statusParam == "verify") {
	changeCard(firstCard, secondCard);
	startTimer();
} else if (statusParam == "failure") {
	switchCards(
		signUpCard,
		signInPromptCard,
		signInDesc,
		signUpDesc,
		signUpFormDesc,
		signInFormDesc
	);
	document.getElementById("incorrect-password").style.display = "block";
}

if (hasReferral) {
  referral.value = new URLSearchParams(window.location.search).get("referral");
}

document.body.addEventListener("input", function(e) {
	if (
		fullName.value != "" &&
		email.value != "" &&
		password.value != "" &&
		password.value == confirmPassword.value
	) {
		validated = true;
		let signUpBtn = document.getElementById("sign-up");
		signUpBtn.className = signUpBtn.className.replace(
			"blue-background-inactive",
			"blue-background-light"
		);
	} else {
		validated = false;
		let signUpBtn = document.getElementById("sign-up");
		signUpBtn.className = signUpBtn.className.replace(
			"blue-background-light",
			"blue-background-inactive"
		);
	}
	if (verificationCode.value != "") {
		verified = true;
		let verifiyBtn = document.getElementById("verify");
		verifiyBtn.className = verifiyBtn.className.replace(
			"blue-background-inactive",
			"blue-background-light"
		);
	} else {
		verified = false;
		let verifiyBtn = document.getElementById("verify");
		verifiyBtn.className = verifiyBtn.className.replace(
			"blue-background-light",
			"blue-background-inactive"
		);
	}
	if (email2.value != "" && password2.value != "") {
		signedIn = true;
		let signInButton = document.getElementById("sign-in");
		signInButton.className = signInButton.className.replace(
			"blue-background-inactive",
			"blue-background-light"
		);
	} else {
		signedIn = false;
		let signInButton = document.getElementById("sign-in");
		signInButton.className = signInButton.className.replace(
			"blue-background-light",
			"blue-background-inactive"
		);
	}
});

document.body.addEventListener("click", function(e) {
	let targetId = e.target.id;
	if (targetId == "sign-in-prompt" || targetId == "sign-in-prompt-mobile") {
		switchCards(
			signUpCard,
			signInPromptCard,
			signInDesc,
			signUpDesc,
			signUpFormDesc,
			signInFormDesc
		);
	} else if (
		targetId == "sign-up-prompt" ||
		targetId == "sign-up-prompt-mobile"
	) {
		switchCards2(
			signInPromptCard,
			signUpCard,
			signUpDesc,
			signInDesc,
			signInFormDesc,
			signUpFormDesc
		);
	} else if (targetId == "sign-up") {
		if (validated) {
			e.target.classList.remove("blue-background-light");
			e.target.innerHTML =
				"<span class='fa fa-spinner fa-spin w3-large'></span>";
			signUp();
			startTimer();
		}
	} else if (targetId == "verify") {
		if (verified) {
			e.target.classList.remove("blue-background-light");
			e.target.innerHTML =
				"<span class='fa fa-spinner fa-spin w3-large'></span>";
			verify();
		}
	} else if (targetId == "sign-in") {
		if (signedIn) {
			e.target.classList.remove("blue-background-light");
			e.target.innerHTML =
				"<span class='fa fa-spinner fa-spin w3-large'></span>";
			signIn(email2.value.toLowerCase(), password2.value, e.target);
		}
	} else if (targetId == "back-to-sign-in") {
		document.location.replace(`get-started.html?email=${email.value}`);
	}
	else if (targetId == "resend") {
		if (resend) {
			resendVerificationCode();
		}
	}
});

function verify() {
	let verificationCode = document.getElementById("verification-code").value;
	let verificationXhr = new XMLHttpRequest();
	verificationXhr.open("GET", `/verify/${verificationCode}`, true);
	verificationXhr.send();

	verificationXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			if (response) {
				changeCard(second, third);
			} else {
				document.getElementById("wrong-verification").style.display = "block";
				document
					.getElementById("verify")
					.classList.add("blue-background-inactive");
				document.getElementById("verify").innerHTML = "Verify";
				verified = false;
			}
		}
	};
}

function resendVerificationCode() {
	let resendXhr = new XMLHttpRequest();
	resendXhr.open("GET", `/user/${userEmail}/resend`, true);
	resendXhr.send();
	
	resendXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			document.getElementById("resend-container").classList.replace("green-background", "grey-background");
			countdown = 60;
			startTimer();
		}
	}
}

function startTimer() {
	resend = false;
	let timer = document.getElementById("timer");
	console.log("Start Timer");
		let interval = setInterval(function() {
			if (countdown > 0) {
				countdown--;
			}
			else {
				document.getElementById("resend-container").classList.replace("grey-background", "green-background");
				resend = true;
				clearInterval(interval);
			}
			timer.textContent = countdown;
		}, 1000)
}

function signUp() {
	let referralValue = {};
	if (referral.value != "") {
		referralValue = { referralId: referral.value };
	} else {
		referralValue = null;
	}

	let payLoad = {
		fullName: fullName.value,
		email: email.value.toLowerCase(),
		password: password.value,
		referral: referralValue,
		date: moment(),
	};
	payLoad = JSON.stringify(payLoad);
	console.log(payLoad);
	let signUpXhr = new XMLHttpRequest();
	signUpXhr.open("POST", "/user", true);
	signUpXhr.setRequestHeader("Content-type", "application/json");
	signUpXhr.send(payLoad);

	signUpXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			console.log(response);
			if (response.email != null) {
				changeCard(firstCard, secondCard);
				userEmail = response.email;
			} else if (response.email == null && response.referral != null) {
				document.getElementById("wrong-referral").style.display = "block";
				document
					.getElementById("sign-up")
					.classList.add("blue-background-inactive");
				document.getElementById("sign-up").innerHTML = "SIGN UP";
				validated = false;
			} else {
				document.getElementById("already-registered").style.display = "block";
				document
					.getElementById("sign-up")
					.classList.add("blue-background-inactive");
				document.getElementById("sign-up").innerHTML = "SIGN UP";
				validated = false;
			}
		}
	};
}

function signIn(email, password, target) {
	let signInXhr = new XMLHttpRequest();
	signInXhr.open("GET", `/signin/email/${email}/password/${password}`);
	signInXhr.send();

	signInXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			if (response.email != null) {
				if (response.role == "USER") {
					location.replace(`./dashboard.html?email=${response.email}`);
				}
				else {
					location.replace(`./admin.html?email=${response.email}`);
				}
				
			}
			else {
				target.classList.add("blue-background-light");
				target.innerHTML =
					"Sign In";
					document.getElementById("incorrect-password").style.display = "block";
			}
		}
	}

}

function changeCard(first, second) {
	second.style.display = "block";
	second.classList.add("opacity-1");
	first.classList.add("opacity-0");
	setTimeout(function() {
		first.style.display = "none";
	}, 500);
}

function switchCards(
	firstCard,
	secondCard,
	firstDesc,
	secondDesc,
	firstFormDesc,
	secondFormDesc
) {
	firstCard.classList.add("card-form-animate");
	secondCard.classList.add("card-prompt-animate");
	firstDesc.classList.add("sign-in-desc-animate");
	secondDesc.classList.add("sign-up-desc-animate");
	firstFormDesc.classList.add("sign-up-form-desc-animate");
	secondFormDesc.classList.add("sign-in-form-desc-animate");
	setTimeout(function() {
		firstCard.classList.remove("card-form-animate-2");
		secondCard.classList.remove("card-prompt-animate-2");
		firstDesc.classList.remove("sign-in-desc-animate-2");
		secondDesc.classList.remove("sign-up-desc-animate-2");
		firstFormDesc.classList.remove("sign-up-form-desc-animate-2");
		secondFormDesc.classList.remove("sign-in-form-desc-animate-2");
	}, 300);
}

function switchCards2(
	secondCard,
	firstCard,
	secondDesc,
	firstDesc,
	secondFormDesc,
	firstFormDesc
) {
	firstCard.classList.add("card-form-animate-2");
	secondCard.classList.add("card-prompt-animate-2");
	firstDesc.classList.add("sign-in-desc-animate-2");
	secondDesc.classList.add("sign-up-desc-animate-2");
	firstFormDesc.classList.add("sign-up-form-desc-animate-2");
	secondFormDesc.classList.add("sign-in-form-desc-animate-2");

	setTimeout(function() {
		firstCard.classList.remove("card-form-animate");
		secondCard.classList.remove("card-prompt-animate");
		firstDesc.classList.remove("sign-in-desc-animate");
		secondDesc.classList.remove("sign-up-desc-animate");
		firstFormDesc.classList.remove("sign-up-form-desc-animate");
		secondFormDesc.classList.remove("sign-in-form-desc-animate");
	}, 300);
}
