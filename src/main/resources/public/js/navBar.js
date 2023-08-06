let isOpen;
let navItems = document.getElementById("nav-items");
document.getElementById("toggle-nav").addEventListener("click", function (e) {
  if (!isOpen) {
    navItems.style.display = "block";
    isOpen = true;
    e.target.className = e.target.className.replace("fa-bars", "fa-times");

    setTimeout(function () {
      navItems.className = navItems.className.replace("opacity-0", "opacity-1");
    }, 100);
  } else {
	if (document.getElementById("app-settings")) {
		document.getElementById("app-settings").style.display = "none";
	}
    isOpen = false;
    e.target.className = e.target.className.replace("fa-times", "fa-bars");
    navItems.className = navItems.className.replace("opacity-1", "opacity-0");
    setTimeout(function () {
      navItems.style.display = "none";
    }, 500);
  }
});
