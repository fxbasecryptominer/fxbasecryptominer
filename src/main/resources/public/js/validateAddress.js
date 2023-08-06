let userXhr = new XMLHttpRequest();
userXhr.open("GET", "/user", true);
userXhr.send();

userXhr.onreadystatechange = function() {
	if (this.status == 200 && this.readyState == 4) {
		let response = JSON.parse(this.response);
		console.log(response.email);
		if (response.fullName == null) {
			location.replace(`/address.html?email=${response.email}`);
		}
	}
};