PROPERTIES.forEach(function(property) {
    document.getElementById("properties-root").innerHTML += bindProperties(property)
})





function bindProperties(property) {
    return `<div class="w3-col s12 l4 w3-padding-32 w3-padding-small">
    <a href="./view-property.html?id=${property.id}">
      <div class="card">
        <div style="position: relative;">
          <div class="w3-padding" style="position: absolute; bottom: 8px;">
            <p class="no-margin bold huge" style="color: rgb(255, 255, 255); text-shadow: 1px 1px 10px black;">${property.name}</p>
            <div class="w3-padding-small bold w3-round-xlarge w3-margin-top"
              style="color: white; border: 1px solid rgb(255, 255, 255); width: fit-content;">RENT | $5,000</div>
          </div>
          <img src="./images/${property.images[0]}" alt="" style="width: 100%;">
        </div>
        <div class=" w3-padding blue-background-light-2">
          <div class="w3-row w3-center">
            <div class="w3-col s3">
              <p class="no-margin bold">Area</p>
            </div>
            <div class="w3-col s3">
              <p class="no-margin bold">Beds</p>
            </div>
            <div class="w3-col s3">
              <p class="no-margin bold">Baths</p>
            </div>
            <div class="w3-col s3">
              <p class="no-margin bold">Garages</p>
            </div>
          </div>
          <div class="w3-row w3-center">
            <div class="w3-col s3">
              <p class="no-margin bold">${property.area}sqfts <sup>2</sup></p>
            </div>
            <div class="w3-col s3">
              <p class="no-margin bold">${property.beds}</p>
            </div>
            <div class="w3-col s3">
              <p class="no-margin bold">${property.baths}</p>
            </div>
            <div class="w3-col s3">
              <p class="no-margin bold">${property.garages}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>`
}