let chatBox = document.getElementById("chat-box");
let interestAccountCard = document.getElementById("card-1");
let loanCard = document.getElementById("card-2");
let startConversationSpinner = document.getElementById(
  "start-conversation-spinner"
);
let startConversationWhite = document.getElementById(
  "start-conversation-white"
);

let contactSupport = document.getElementById("customer-support");
let supportStatus = document.getElementById("support-status");
let supportStatus2 = document.getElementById("support-status-2");

let fullNameEtx = document.getElementById("fullname-etx");
let mobileNumberEtx = document.getElementById("mobile-number-etx");
let addressLine1Etx = document.getElementById("address-line-1-etx");
let addressLine2Etx = document.getElementById("address-line-2-etx");
let accountTypeSel = document.getElementById("account-type-sel");
let daySel = document.getElementById("day-sel");
let monthSel = document.getElementById("month-sel");
let yearSel = document.getElementById("year-sel");
let ssnEtx = document.getElementById("ssn-etx");

let currentPasswordEtx = document.getElementById("current-password-etx");
let newPasswordEtx = document.getElementById("new-password-etx");
let confirmPasswordEtx = document.getElementById("confirm-password-etx");

let settingsSpinner = document.getElementById("settings-spinner");

let userEmail;
let addressDetails;
let accountType;
let userDetail;
let cryptos;
let cryptoUpdate = [];

getCryptoUpdate();

let isSettingsOpened = false;
let isAppSetingsOpened;

let getUserXhr = new XMLHttpRequest();
getUserXhr.open("GET", "/user", true);
getUserXhr.send();

getUserXhr.onreadystatechange = function () {
  if (this.status == 200 && this.readyState == 4) {
    let response = JSON.parse(this.response);
    userEmail = response.email;
    userDetail = response;
    if (response.accountNonLocked == false) {
      if (response.active == false) {
        location.replace("/get-started.html?status=verify");
      } else {
        location.replace(`/address.html?email=${response.email}`);
      }
    } else {
      let firstName = response.fullName.split(" ", 1);
      document.getElementById("firstname").innerText = firstName;
      document.getElementById("firstname-mobile").innerText = firstName;
      document.getElementById("firstname-customer-support").innerText =
        firstName;
      connect();
      getUserAddress();
      getAccount();
    }
  }
};
let spinner = document.getElementById("dashboard-spinner");
spinner.className = spinner.className.replace("opacity-1", "opacity-2");
document.getElementById("dashboard-container").style.display = "block";
setTimeout(function () {
  spinner.style.display = "block";
}, 300);

let conversationSpinner = document.getElementById("conversation-spinner");
let conversationWhite = document.getElementById("conversation-white");

let toEmail = "futurespaceinvestments@gmail.com";

let customerSupport = false;

chatBox.addEventListener("focusin", function (e) {
  typing(true);
});
chatBox.addEventListener("focusout", function (e) {
  typing(false);
});

document.body.addEventListener("click", function (e) {
  let targetId = e.target.id;

  if (targetId == "start-conversation") {
    supportStatus2.innerText = supportStatus.innerText;
    if (supportStatus.innerText == "Active") {
      document.getElementById("status-indicator").className = document
        .getElementById("status-indicator")
        .className.replace("green-background", "w3-blue");
    }
    subscribeToStatus();
    document.getElementById("start-conversation-card").style.display = "none";
    document.getElementById("conversation-card").style.display = "block";
    setTimeout(function () {
      conversationSpinner.className = conversationSpinner.className.replace(
        "opacity-1",
        "opacity-0"
      );
      setTimeout(function () {
        conversationWhite.className = conversationWhite.className.replace(
          "opacity-0",
          "opacity-1"
        );
        conversationSpinner.style.display = "none";
      }, 200);
    }, 500);
    console.log(conversationSpinner);
  } else if (targetId == "customer-support") {
    if (customerSupport == false) {
      customerSupport = true;
      document.getElementById("start-conversation-card").style.display =
        "block";

      e.target.className = e.target.className.replace(
        "fa fa-comment-alt",
        "fa fa-angle-down"
      );
      e.target.parentElement.style.padding = "16px 20px 12px";
      adminStatus();
    } else {
      customerSupport = false;
      startConversationWhite.className =
        startConversationWhite.className.replace("opacity-1", "opacity-2");
      startConversationSpinner.style.display = "block";
      startConversationSpinner.className =
        startConversationSpinner.className.replace("opacity-2", "opacity-1");
      console.log(startConversationSpinner);
      setTimeout(function () {
        startConversationSpinner.className =
          startConversationSpinner.className.replace("opacity-1", "opacity-0");

        setTimeout(function () {
          document.getElementById("start-conversation-card").style.display =
            "none";
          document.getElementById("conversation-card").style.display = "none";
        }, 1000);
      }, 500);
      e.target.className = e.target.className.replace(
        "fa fa-angle-down",
        "fa fa-comment-alt"
      );

      e.target.parentElement.style.padding = "18px 18px 14px";
      startConversationSpinner.className =
        startConversationSpinner.className.replace("opacity-2", "opacity-1");
    }
  } else if (targetId == "back-to-start-conversation-card") {
    adminStatus();
    conversationWhite.className = conversationWhite.className.replace(
      "opacity-1",
      "opacity-0"
    );
    conversationSpinner.style.display = "block";

    setTimeout(function () {
      conversationSpinner.className = conversationSpinner.className.replace(
        "opacity-0",
        "opacity-1"
      );

      setTimeout(function () {
        document.getElementById("conversation-card").style.display = "none";
        document.getElementById("start-conversation-card").style.display =
          "block";
      }, 1000);
    }, 500);
  } else if (targetId == "send-message") {
    prepareForSending();
  } else if (
    targetId == "open-fund-modal" ||
    targetId == "open-fund-modal-mobile"
  ) {
    document.getElementById("fund-modal").style.display = "block";
  } else if (targetId == "close-fund-modal") {
    document.getElementById("fund-modal").style.display = "none";
  } else if (
    targetId == "open-withdraw-modal" ||
    targetId == "open-withdraw-modal-mobile"
  ) {
    document.getElementById("withdraw-modal").style.display = "block";
  } else if (targetId == "close-withdraw-modal") {
    document.getElementById("withdraw-modal").style.display = "none";
  } else if (
    targetId == "open-trade-modal" ||
    targetId == "open-trade-modal-mobile"
  ) {
    document.getElementById("trade-modal").style.display = "block";
  } else if (targetId == "close-trade-modal") {
    document.getElementById("trade-modal").style.display = "none";
  } else if (
    targetId == "open-borrow-modal" ||
    targetId == "open-borrow-modal-mobile"
  ) {
    document.getElementById("borrow-modal").style.display = "block";
  } else if (targetId == "close-borrow-modal") {
    document.getElementById("borrow-modal").style.display = "none";
  } else if (targetId == "contact-support-trade") {
    document.getElementById("trade-modal").style.display = "none";
    customerSupport = true;
    document.getElementById("start-conversation-card").style.display = "block";
    setTimeout(function () {
      startConversationSpinner.className =
        startConversationSpinner.className.replace("opacity-2", "opacity-1");
      setTimeout(function () {
        startConversationWhite.className =
          startConversationWhite.className.replace("opacity-2", "opacity-1");
        startConversationSpinner.style.display = "none";
      }, 500);
    }, 500);
    contactSupport.className = contactSupport.className.replace(
      "fa fa-comment-alt",
      "fa fa-angle-down"
    );
    contactSupport.parentElement.style.padding = "16px 20px 12px";
  } else if (
    targetId == "refer-a-friend" ||
    targetId == "refer-a-friend-mobile"
  ) {
    document.getElementById("refer-modal").style.display = "block";
  } else if (targetId == "close-refer-modal") {
    document.getElementById("refer-modal").style.display = "none";
  } else if (targetId == "contact-support-borrow") {
    document.getElementById("borrow-modal").style.display = "none";

    customerSupport = true;
    adminStatus();
    document.getElementById("start-conversation-card").style.display = "block";
    setTimeout(function () {
      startConversationSpinner.className =
        startConversationSpinner.className.replace("opacity-2", "opacity-1");
      setTimeout(function () {
        startConversationWhite.className =
          startConversationWhite.className.replace("opacity-2", "opacity-1");
        startConversationSpinner.style.display = "none";
      }, 500);
    }, 500);
    contactSupport.className = contactSupport.className.replace(
      "fa fa-comment-alt",
      "fa fa-angle-down"
    );
    contactSupport.parentElement.style.padding = "16px 20px 12px";
  } else if (targetId == "firstname" || targetId == "firstname-mobile") {
    if (isAppSetingsOpened) {
      document.getElementById("app-settings").style.display = "none";
      isAppSetingsOpened = false;
    } else {
      if (isSettingsOpened) {
        isSettingsOpened = false;
        document.getElementById("settings").style.display = "none";
      } else {
        isSettingsOpened = true;
        document.getElementById("settings").style.display = "block";
      }
    }
  } else if (targetId == "profile-setting") {
    document.getElementById("settings").style.display = "none";
    isSettingsOpened = false;
    setTimeout(function () {
      document.getElementById("app-settings").style.display = "block";
      isAppSetingsOpened = true;
    }, 200);
    setUserDetailsSetting(addressDetails);
  } else if (targetId == "logout-setting") {
    document.location.href = "logout";
  } else if (targetId == "logo" || targetId == "logo-mobile") {
    if (isAppSetingsOpened) {
      document.getElementById("app-settings").style.display = "none";
      isAppSetingsOpened = false;
    }
  } else if (targetId == "profile") {
    settingSelector(e.target);
    settingDetailSelector("profile-options");
  } else if (targetId == "security") {
    settingSelector(e.target);
    settingDetailSelector("security-options");
  } else if (targetId == "wallet") {
    settingSelector(e.target);
  } else if (targetId == "interest") {
    settingSelector(e.target);
    settingDetailSelector("interest-options");
    arrangeInterest();
  } else if (targetId == "wire-details") {
    settingSelector(e.target);
  } else if (targetId == "save-profile") {
    updateUserProfile();
  } else if (targetId == "save-security") {
    updatePassword();
  } else if (e.target.classList.contains("change")) {
    e.target.parentElement.previousElementSibling.children[0].readOnly = false;
    e.target.parentElement.previousElementSibling.children[0].focus();
  } else if (
    e.target.id == "select-crypto" ||
    e.target.id == "select-crypto-2"
  ) {
    document.getElementById("crypto-deposit-option").style.display = "block";
  }
});

chatBox.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    prepareForSending();
    e.target.blur();
  }
});

var stompClient = null;
var stompClient2 = null;
var stompClient3 = null;

function connect() {
  var socket = new SockJS("/future-space-live");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    stompClient.subscribe("/user/topic/live-chat", function (message) {
      let div = document.createElement("div");
      div.innerHTML = displayMessage2(JSON.parse(message.body).message);
      document
        .getElementById("message-container")
        .insertBefore(
          div,
          document.getElementById("message-container").firstElementChild
        );
      removeAnimationFromChatBox();
    });
    getAllMessages();
  });

  var socket2 = new SockJS("/future-space-live");
  stompClient2 = Stomp.over(socket2);
  stompClient2.connect({}, function (frame) {
    stompClient2.subscribe("/user/topic/typing", function (condition) {
      console.log(JSON.parse(condition.body));
      if (JSON.parse(condition.body)) {
        supportStatus2.innerText = "Typing...";
      } else {
        supportStatus2.innerText = "Active";
      }
    });
  });
}

function getAllMessages() {
  let allMessageXhr = new XMLHttpRequest();
  allMessageXhr.open("GET", `/message/${userEmail}`, true);
  allMessageXhr.send();

  allMessageXhr.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      setUserStatus(true);
      let response = JSON.parse(this.response);

      document.getElementById("message-container").innerHTML = "";

      response.forEach(function (item) {
        if (item.fromUser.email == userEmail) {
          document.getElementById("message-container").innerHTML +=
            displayMessage(item.message);
        } else {
          document.getElementById("message-container").innerHTML +=
            displayMessage2(item.message);
        }
      });
      removeAnimationFromChatBox();
    }
  };
}

function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  console.log("Disconnected");
}

function subscribeToStatus() {
  var socket3 = new SockJS("/future-space-live");
  stompClient3 = Stomp.over(socket3);
  stompClient3.connect({}, function (frame) {
    stompClient3.subscribe("/topic/status", function (status) {
      let response = JSON.parse(status.body);
      console.log(response);
      if (response.online) {
        supportStatus2.innerText = "Active";
        supportStatus.innerText = "Active";
        document.getElementById("status-indicator").className = document
          .getElementById("status-indicator")
          .className.replace("green-background", "w3-blue");
      } else {
        let a = moment();
        let b = moment(response.date);
        let time = a.diff(b, "seconds");
        if (Math.round(time / 60) == 0) {
          supportStatus2.innerText = `Last seen ${a.diff(
            b,
            "seconds"
          )} Seconds ago`;
          supportStatus.innerText = `Last seen ${a.diff(
            b,
            "seconds"
          )} Seconds ago`;
          document.getElementById("status-indicator").className = document
            .getElementById("status-indicator")
            .className.replace("w3-blue", "green-background");
        } else if (Math.round(time / 3600) == 0) {
          supportStatus2.innerText = `Last seen ${Math.floor(
            a.diff(b, "seconds") / 60
          )} Minutes  ago`;
          supportStatus.innerText = `Last seen ${Math.floor(
            a.diff(b, "seconds") / 60
          )} Minutes  ago`;
          document.getElementById("status-indicator").className = document
            .getElementById("status-indicator")
            .className.replace("w3-blue", "green-background");
        } else if (Math.round(time / 86400) == 0) {
          supportStatus2.innerText = `Last seen ${Math.floor(
            a.diff(b, "seconds") / 3600
          )} Hours ago`;
          supportStatus.innerText = `Last seen ${Math.floor(
            a.diff(b, "seconds") / 3600
          )} Hours ago`;
          document.getElementById("status-indicator").className = document
            .getElementById("status-indicator")
            .className.replace("w3-blue", "green-background");
        } else {
          supportStatus2.innerText = `Last seen ${Math.floor(
            a.diff(b, "seconds") / 86400
          )} Hours ago`;
          supportStatus.innerText = `Last seen ${Math.floor(
            a.diff(b, "seconds") / 86400 + 1
          )} Hours ago`;
          document.getElementById("status-indicator").className = document
            .getElementById("status-indicator")
            .className.replace("w3-blue", "green-background");
        }
      }
    });
  });
}

function adminStatus() {
  startConversationSpinner.className =
    startConversationSpinner.className.replace("opacity-2", "opacity-1");
  let adminStatus = new XMLHttpRequest();
  adminStatus.open("GET", `/userstatus/${toEmail}`, true);
  adminStatus.send();

  adminStatus.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      if (response.online) {
        supportStatus.innerText = "Active";
      } else {
        let a = moment();
        let b = moment(response.date);
        let time = a.diff(b, "seconds");
        if (Math.round(time / 60) == 0) {
          supportStatus.innerText = `Last seen ${a.diff(
            b,
            "seconds"
          )} Seconds ago`;
        } else if (Math.round(time / 3600) == 0) {
          supportStatus.innerText = `Last seen ${Math.floor(
            a.diff(b, "seconds") / 60
          )} Minutes  ago`;
        } else if (Math.round(time / 86400) == 0) {
          supportStatus.innerText = `Last seen ${Math.floor(
            a.diff(b, "seconds") / 3600
          )} Hours ago`;
        } else {
          supportStatus.innerText = `Last seen ${Math.floor(
            a.diff(b, "seconds") / 86400 + 1
          )} Days ago`;
        }
      }
      setTimeout(function () {
        startConversationWhite.className =
          startConversationWhite.className.replace("opacity-2", "opacity-1");
        startConversationSpinner.style.display = "none";
      }, 500);
    }
  };
}

function sendMessage(message) {
  let payLoad = {
    toUser: {
      email: message.email,
    },
    message: message.content,
    date: moment(),
  };

  let messageXhr = new XMLHttpRequest();
  messageXhr.open("POST", `/send-message`, true);
  messageXhr.setRequestHeader("Content-type", "application/json");
  messageXhr.send(JSON.stringify(payLoad));

  messageXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let div = document.createElement("div");
      div.innerHTML = displayMessage(payLoad.message);

      document
        .getElementById("message-container")
        .insertBefore(
          div,
          document.getElementById("message-container").firstElementChild
        );
    }
  };
}

function typing(condition) {
  let typingXhr = new XMLHttpRequest();
  typingXhr.open("GET", `/typing/${toEmail}/${condition}`, true);
  typingXhr.send();

  typingXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(`User typing : ${condition}`);
    }
  };
}

function removeAnimationFromChatBox() {
  setTimeout(function () {
    let animatedChatBox = document
      .getElementById("message-container")
      .querySelectorAll(".w3-animate-zoom");
    animatedChatBox.forEach(function (item) {
      item.classList.remove("w3-animate-zoom");
    });
  }, 500);
}

function prepareForSending() {
  let message = chatBox.value;
  if (message != "") {
    let liveChatMessage = {
      email: toEmail,
      content: message,
    };
    chatBox.value = "";
    sendMessage(liveChatMessage);
  }
}

function setUserStatus(status) {
  console.log("setting user status");
  let setStatusXhr = new XMLHttpRequest();
  setStatusXhr.open(
    "GET",
    `/userstatus/${userEmail}/status/${status}/date/${moment()}`
  );
  setStatusXhr.send();

  setStatusXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
    }
  };
}

function getCryptoUpdate() {
  let cryptoUpdateXhr = new XMLHttpRequest();
  cryptoUpdateXhr.open(
    "GET",
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
    true
  );
  cryptoUpdateXhr.send();

  cryptoUpdateXhr.onreadystatechange = function () {
    document.getElementById("crypto-root").innerHTML = "";
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      response.forEach(function (crypto) {
        let sortedCrypto = {
          name: crypto.name,
          symbol: crypto.symbol,
          price: crypto.current_price,
          image: crypto.image,
        };
        cryptoUpdate.push(sortedCrypto);
      });
      cryptoUpdate.unshift({
        name: "Dollar",
        symbol: "usd",
        price: 1,
        image: "/images/dollar.png",
      });
      let allImages = document.querySelectorAll(".image-currency");
      allImages.forEach(function (image) {
        image.src = "";
        image.src = cryptoUpdate[0].image;
      });

      response.forEach(function (crypto) {
        let color;
        let plus = "";
        let direction;
        let letter = crypto.price_change_percentage_24h.toString();
        if (letter.indexOf("-") != -1) {
          color = "w3-text-red";
          direction = "down";
        } else {
          color = "green-text";
          plus = "+";
          direction = "up";
        }
        document.getElementById("crypto-root").innerHTML += displayCryptoUpdate(
          crypto,
          color,
          plus,
          direction
        );
        document.getElementById("crypto-root-mobile").innerHTML +=
          displayCryptoUpdateMobile(crypto, color, plus, direction);
      });
    }
  };
}

function bindCrypto(crypto) {
  return `<div class="w3-row" style="margin-top: 32px">
								<div class="w3-col s1">
									<input name="crypto" value="${crypto.cryptoId}" type="radio" />
								</div>
								<div class="w3-col s11">${crypto.crypto} (${crypto.symbol})</div>
							</div>`;
}

function arrangeInterest() {
  document.getElementById("crypto-root-2").innerHTML = "";
  cryptos.forEach(function (crypto) {
    document.getElementById("crypto-root-2").innerHTML += bindCrypto(crypto);
  });
}

function getAccount() {
  let account = userDetail.account;
  document.getElementById("available-to-withdraw").innerText = numberWithCommas(
    account.accountBalance.toFixed(1)
  );
  document.getElementById("account-balance").innerText = numberWithCommas(
    account.accountBalance.toFixed(1)
  );
  let spinner = document.getElementById("dashboard-spinner");
  spinner.className = spinner.className.replace("opacity-1", "opacity-2");
  document.getElementById("dashboard-container").style.display = "block";
  setTimeout(function () {
    spinner.style.display = "block";
  }, 100);
  getCryptos();

  let investmentXhr = new XMLHttpRequest();
  investmentXhr.open("GET", `/account/${account.accountId}/investment`, true);
  investmentXhr.send();

  investmentXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      if (response == null) {
        document.getElementById("interest-account").innerText = (0).toFixed(1);
        document.getElementById("accrued-interest").textContent = (0).toFixed(
          1
        );
        document.getElementById("paid-interest").textContent = (0).toFixed(1);
      } else {
      }
    }
  };
}

function getUserAddress() {
  let getUserAddressXhr = new XMLHttpRequest();
  getUserAddressXhr.open("GET", `/address/user/${userEmail}`, true);
  getUserAddressXhr.send();

  getUserAddressXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      addressDetails = response;
      let getAccountTypeXhr = new XMLHttpRequest();
      getAccountTypeXhr.open("GET", `/accounttype`, true);
      getAccountTypeXhr.send();

      getAccountTypeXhr.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
          let response = JSON.parse(this.response);
          accountType = response;
          setUserDetailsSetting(addressDetails);
        }
      };
    }
  };
}

function setUserDetailsSetting(userDetails) {
  console.log(userDetails);
  settingsSpinner.style.display = "none";
  document.getElementById("profile-options").style.display = "block";
  fullNameEtx.value = userDetails.user.fullName;
  mobileNumberEtx.value = userDetails.mobileNumber;
  addressLine1Etx.value = userDetails.addressLine1;
  addressLine2Etx.value = userDetails.addressLine2;
  accountTypeSel.innerHTML = "";
  accountType.forEach(function (accType) {
    let selected = "";
    if (userDetails.accountType.accountTypeId == accType.accountTypeId) {
      selected = "selected";
    }
    accountTypeSel.innerHTML += bindSelect(
      accType.accountTypeId,
      accType.accountType,
      selected
    );
  });
}

function settingSelector(currentSetting) {
  let options = document.querySelectorAll(".setting-option");
  options.forEach(function (option) {
    option.classList.remove("green-text");
    option.nextElementSibling.classList.replace("green-border", "grey-border");
  });
  currentSetting.classList.add("green-text");
  currentSetting.nextElementSibling.classList.replace(
    "grey-border",
    "green-border"
  );
}

function settingDetailSelector(currentSettingDetail) {
  currentSettingDetail = document.getElementById(currentSettingDetail);
  let settingDetails = document.querySelectorAll(".setting-option-detail");
  settingDetails.forEach(function (settingDetail) {
    settingDetail.style.display = "none";
  });
  currentSettingDetail.style.display = "block";
}

function updateUserProfile() {
  document.getElementById("profile-options").style.display = "none";
  settingsSpinner.style.display = "block";
  addressDetails.user.fullName = fullNameEtx.value;
  addressDetails.mobileNumber = mobileNumberEtx.value;
  addressDetails.addressLine1 = addressLine1Etx.value;
  addressDetails.addressLine2 = addressLine2Etx.value;
  addressDetails.accountType.accountTypeId = accountTypeSel.value;
  addressDetails.ssn = ssnEtx.value;

  let updateUserXhr = new XMLHttpRequest();
  updateUserXhr.open("PUT", `/address`, true);
  updateUserXhr.setRequestHeader("Content-type", "application/json");
  updateUserXhr.send(JSON.stringify(addressDetails));

  updateUserXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      getUserAddress();
    }
  };
}

function updatePassword() {
  if (currentPasswordEtx.value == addressDetails.user.password) {
    if (newPasswordEtx.value == confirmPasswordEtx.value) {
      userDetail.password = newPasswordEtx.value;
      let userPasswordXhr = new XMLHttpRequest();
      userPasswordXhr.open("PUT", "/user", true);
      userPasswordXhr.setRequestHeader("Content-type", "application/json");
      userPasswordXhr.send(JSON.stringify(userDetail));

      userPasswordXhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(this.response);
        }
      };
    }
  }
}

function getCryptos() {
  let cryptoXhr = new XMLHttpRequest();
  cryptoXhr.open("GET", "/cryptos", true);
  cryptoXhr.send();

  cryptoXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      console.log(response);
      cryptos = response;
    }
  };
}

function bindSelect(id, value, selected) {
  return `<option value="${id}" ${selected}>${value}</option>`;
}

function displayMessage(message) {
  return `<div
  class="w3-round green-background w3-animate-zoom"
  style="width: 50%; margin-left: 50%; margin-top: 8px; padding: 12px 4px;"
>
  <div class="w3-center">
    <p class="no-margin w3-center small">${message}</p>
  </div>
</div>`;
}

function displayMessage2(message) {
  return ` <div>
  <div class="w3-row" style="position: relative; width: 80%">
    <div class="w3-col s2 w3-padding-small">
     <img
        src="./images/paulius.png"
        alt=""
        style="
          width: 8%;
          border-radius: 50%;
          position: absolute;
          bottom: 4px;
        "
      />
    </div>
    <div class="w3-col s10">
      <div
        class="w3-round grey-background w3-animate-zoom"
        style="margin-top: 8px; padding: 12px 4px;"
      >
        <p class="no-margin small w3-center">${message}</p>
      </div>
    </div>
  </div>
  
</div>`;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayCryptoUpdateMobile(crypto, color, plus, direction) {
  return `<div class="w3-margin-bottom"><div class="w3-row">
  <div class="w3-col s1"><img src="${
    crypto.image
  }.png" style="width: 80%" ></div>
  <div class="w3-col s8">
    <p class="no-margin big">${crypto.name}</p>
    <p class="no-margin">(${crypto.symbol})</p>
  </div>
  <div class="w3-col s3">
    <p class="no-margin">$${crypto.current_price}</p>
    <p class="no-margin ${color}">${plus}${crypto.price_change_percentage_24h.toFixed(
    2
  )}%
    <span class="fa fa-angle-${direction} color"></span>
    </p>
  </div>

</div>
	<hr style="margin: 10px 5px; border-width: 2px">
</div>`;
}
function displayCryptoUpdate(crypto, color, plus, direction) {
  return `<div>
	<div class="w3-row">
							<div class="w3-col l6">
								<div class="w3-row">
									<div class="w3-col s1 w3-center">
									<img src="${crypto.image}.png" style="width: 50%" >
									</div>
									<div class="w3-col s11">	
									<p class="big">${crypto.name}</p>
									<p class="small" style="margin: -8px 0px 8px; text-transform: uppercase">${
                    crypto.symbol
                  }</p>
									</div>
								</div>
							</div>
							<div class="w3-col s2">
								<div>
									<p class="big" style="margin-bottom: 25px; font-weight: 500;">$${numberWithCommas(
                    crypto.current_price
                  )}</p>
								</div>
							</div>
							<div class="w3-col s2">
								<div>
									<p class="${color}" style="margin-bottom: 25px;">${plus}${crypto.price_change_percentage_24h.toFixed(
    2
  )}%
									<span class="w3-padding-small fa fa-angle-${direction} color"></span>
									</p>
								</div>

							</div>
							<div class="w3-col s2">
								<div>
									<p>$${numberWithCommas(crypto.market_cap)}
									</p>
								</div>

							</div>
						</div>
						<hr style="margin: 0px 50px 8px 10px; border-width: 2px">
						</div>`;
}
