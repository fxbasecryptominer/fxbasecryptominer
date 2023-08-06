let propertyId = new URLSearchParams(window.location.search).get("id");
PROPERTIES.forEach(function(property) {
    if (property.id == propertyId) {
        document.getElementById("property-name").innerText = property.name;
        document.getElementById("property-image").src = `./images/${property.images[0]}`;
        document.getElementById("id").innerText = property.id;
        document.getElementById("location").innerText = property.name;
        document.getElementById("area").innerText =  property.area;
        document.getElementById("beds").innerText = property.beds;
        document.getElementById("baths").innerText = property.baths;
        document.getElementById("garage").innerText = property.garages;
        document.getElementById("description-root").textContent = property.description;
    }
})
