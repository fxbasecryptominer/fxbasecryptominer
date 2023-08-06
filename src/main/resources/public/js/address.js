let email = new URLSearchParams(window.location.search).get("email");

let country = document.getElementById("country");
let state = document.getElementById("state");
let city = document.getElementById("city");
let addressLine1 = document.getElementById("address-line-1");
let addressLine2 = document.getElementById("address-line-2");
let postalCode = document.getElementById("postal-code");

let mobileNumber = document.getElementById("mobile-number");

let addressCard = document.getElementById("card-address");
let mobileNumberCard = document.getElementById("card-mobile-number");
let sourceCard = document.getElementById("card-source");

let addressValidated;
let mobileNumberValidated;
let sourceValidated;

let addressSpinner = document.getElementById("address-spinner");
let addressDesc = document.getElementById("address-desc");

let source = [];

let countryXhr = new XMLHttpRequest();
countryXhr.open("GET", "/country", true);
countryXhr.send();

countryXhr.onreadystatechange = function() {
	if (this.status == 200 && this.readyState == 4) {
		let response = JSON.parse(this.response);

		response.forEach(function(country) {
			document.getElementById("country").innerHTML += bindCountries(country);
		});
		getStateByCountry(response[0].countryId);
	}
};

document.body.addEventListener("change", function(e) {
	let targetId = e.target.id;
	if (targetId == "country") {
		addressDesc.className = addressDesc.className.replace(
			"opacity-1",
			"opacity-0"
		);
		addressSpinner.style.display = "block";
		addressSpinner.className = addressSpinner.className.replace(
			"opacity-0",
			"opacity-1"
		);

		getStateByCountry(e.target.value);
	}
	setTimeout(function() {
		validate(document.getElementById("proceed-address"));
	}, 500);
});

document.body.addEventListener("input", function(e) {
	let targetId = e.target.id;
	if (targetId == "address-line-1" || targetId == "postal-code") {
		validate(document.getElementById("proceed-address"));
	}
	if (targetId == "mobile-number") {
		validate2(document.getElementById("proceed-mobile-number"));
	}
});

document.body.addEventListener("click", function(e) {
	let targetId = e.target.id;
	if (targetId == "proceed-address") {
		if (addressValidated) {
			e.target.classList.remove("blue-background-light");
			e.target.innerHTML =
				"<span class='fa fa-spinner fa-spin w3-large blue-text'></span>";
			changeCard(addressCard, mobileNumberCard);
		}
	} else if (targetId == "proceed-mobile-number") {
		if (mobileNumberValidated) {
			e.target.classList.remove("blue-background-light");
			e.target.innerHTML =
				"<span class='fa fa-spinner fa-spin w3-large blue-text'></span>";
			changeCard(mobileNumberCard, sourceCard);
		}
	} else if (targetId == "proceed-source") {
		if (sourceValidated) {
			e.target.classList.remove("blue-background-light");
			e.target.innerHTML =
				"<span class='fa fa-spinner fa-spin w3-large blue-text'></span>";
			addAddress();
		}
	}
	let targetClass = e.target.classList;
	if (targetClass.contains("source")) {
		if (targetClass.contains("pointer-fill")) {
			targetClass.replace("pointer-fill", "blue-background");
			source.push(e.target.innerText);
			console.log(e.target);
		} else {
			let sourceNo = source.indexOf(e.target.innerText);
			source.splice(sourceNo, 1);
			targetClass.replace("blue-background", "pointer-fill");
		}
		if (source.length != 0) {
			document.getElementById("proceed-source").className = document
				.getElementById("proceed-source")
				.className.replace("blue-background-inactive", "blue-background-light");
			sourceValidated = true;
		} else {
			document.getElementById("proceed-source").className = document
				.getElementById("proceed-source")
				.className.replace("blue-background-light", "blue-background-inactive");
			sourceValidated = false;
		}
	}
});

function addAddress() {
	let address = {
		user: {
			email: email
		},
		country: {
			countryId: country.value,
		},
		state: {
			stateId: state.value,
		},
		city: city.value,
		addressLine1: addressLine1.value,
		addressLine2: addressLine2.value,
		isCitizen: true,
		zipCode: postalCode.value,
		mobileNumber: mobileNumber.value,
		source: source.toLocaleString()
	};
	let addAddressXhr = new XMLHttpRequest();
	addAddressXhr.open("POST", "/address", true);
	addAddressXhr.setRequestHeader("Content-type", "application/json");
	addAddressXhr.send(JSON.stringify(address));

	addAddressXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			if (response.addressId != null) {
				location.replace(`dashboard.html?email=${email}`);
			}
		}
	};
}

function changeCard(first, second) {
	setTimeout(function() {
		first.classList.add("opacity-0");
		setTimeout(function() {
			first.style.display = "none";
			second.style.display = "block";
			second.classList.add("opacity-1");
		}, 500);
	}, 1000);
}

function validate(button) {
	if (
		country.value != "" &&
		state.value != "" &&
		city.value != "" &&
		addressLine1.value != "" &&
		postalCode.value != ""
	) {
		addressValidated = true;
		button.className = button.className.replace(
			"blue-background-inactive",
			"blue-background-light"
		);
	} else {
		button.className = button.className.replace(
			"blue-background-light",
			"blue-background-inactive"
		);
		addressValidated = false;
	}
}

function validate2(button) {
	if (mobileNumber.value != "") {
		button.className = button.className.replace(
			"blue-background-inactive",
			"blue-background-light"
		);
		mobileNumberValidated = true;
	} else {
		button.className = button.className.replace(
			"blue-background-light",
			"blue-background-inactive"
		);
		mobileNumberValidated = false;
	}
}

function validate3(button) { }

function getCityByCountry(countryId) {
	let cityXhr = new XMLHttpRequest();
	cityXhr.open("GET", `/country/${countryId}/city`, true);
	cityXhr.send();

	cityXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			document.getElementById("city").innerHTML = "";
			response.forEach(function(city) {
				document.getElementById("city").innerHTML += bindCity(city);
			});

			addressSpinner.className = addressSpinner.className.replace(
				"opacity-1",
				"opacity-0"
			);
			addressDesc.className = addressDesc.className.replace(
				"opacity-0",
				"opacity-1"
			);

			setTimeout(function() {
				addressSpinner.style.display = "none";
			}, 1000);
		}
	};
}

function getStateByCountry(countryId) {
	let stateXhr = new XMLHttpRequest();
	stateXhr.open("GET", `/country/${countryId}/state`, true);
	stateXhr.send();

	stateXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			document.getElementById("state").innerHTML = "";
			response.forEach(function(state) {
				document.getElementById("state").innerHTML += bindState(state);
			});
		}
	};

	getCityByCountry(countryId);
}

function bindState(state) {
	return `<option value="${state.stateId}">${state.stateName}</option>`;
}

function bindCity(city) {
	return `<option value="${city.cityId}">${city.cityName}</option>`;
}

function bindCountries(country) {
	return `<option value="${country.countryId}">${country.countryName}</option>`;
}
