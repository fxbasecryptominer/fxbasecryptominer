let userEmail = new URLSearchParams(window.location.search).get("email");
let hasStatus = new URLSearchParams(window.location.search).has("status");
let interestAccountCard = document.getElementById("card-1");
let loanCard = document.getElementById("card-2");

let confirmModal = document.getElementById("confirm-modal");

let paymentInfos = document.querySelectorAll(".payment-info");

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

let withdrawEtx = document.getElementById("withdraw-etx");
let withdrawBtn = document.getElementById("withdraw-btn");

let settingsSpinner = document.getElementById("settings-spinner");

let btcImage = document.getElementById("btc-image");
let ethImage = document.getElementById("eth-image");
let bnbImage = document.getElementById("bnb-image");

let btcAddr = document.getElementById("btc-addr");
let ethAddr = document.getElementById("eth-addr");
let bnbAddr = document.getElementById("bnb-addr");

let usdtSelector = document.getElementById("usdt");
let chat = document.getElementById("chat");

let addressDetails;
let accountType;
let userDetail;
let cryptos;
let cryptoUpdate = [];
let hasInvestment;
let totalAmountNew = 0;

getCryptoUpdate();

let isSettingsOpened = false;
let isAppSetingsOpened;

let canWithdraw;

let getUserXhr = new XMLHttpRequest();
getUserXhr.open("GET", `/user/email/${userEmail}`, true);
getUserXhr.send();

getUserXhr.onreadystatechange = function () {
  if (this.status == 200 && this.readyState == 4) {
    let response = JSON.parse(this.response);
    userEmail = response.email;
    userDetail = response;
    if (response.accountNonLocked == false) {
      if (response.active == false) {
        location.replace(
          `/get-started.html?status=verify&useremail=${response.email}`
        );
      } else {
        location.replace(`/address.html?email=${response.email}`);
      }
    } else {
      let firstName = response.fullName.split(" ", 1);
      document.getElementById("firstname").innerText = firstName;
      document.getElementById("fullname").innerText = response.fullName;
      document.getElementById("firstname-mobile").innerText = firstName;

      let spinner = document.getElementById("dashboard-spinner");
      spinner.children[0].className = spinner.className.replace(
        "opacity-1",
        "opacity-0"
      );
      document.getElementById("dashboard-container").style.display = "block";
      setTimeout(function () {
        spinner.style.display = "none";
      }, 1000);

      getUserAddress();
      getAccount();
    }
  }
};

paymentInfoSelection(document.getElementById("usd-info"));

document.body.addEventListener("input", function (e) {
  if (
    withdrawEtx.value <= userDetail.account.accountBalance &&
    withdrawEtx.value.length != 0 &&
    userDetail.account.accountBalance > 500 &&
    hasInvestment == false
  ) {
    withdrawBtn.classList.replace(
      "blue-background-inactive",
      "blue-background"
    );
    canWithdraw = true;
  } else {
    withdrawBtn.classList.replace(
      "blue-background",
      "blue-background-inactive"
    );
    canWithdraw = false;
  }
});

document.body.addEventListener("click", function (e) {
  let targetId = e.target.id;

  if (targetId == "start-conversation") {
  } else if (targetId == "customer-support") {
  } else if (targetId == "back-to-start-conversation-card") {
  } else if (targetId == "send-message") {
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
    // document.getElementById("withdraw-modal").style.display = "block";
    location.href = `withdrawal.html?email=${userEmail}`
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
  } else if (
    targetId == "refer-a-friend" ||
    targetId == "refer-a-friend-mobile"
  ) {
    document.getElementById("refer-modal").style.display = "block";
  } else if (targetId == "close-refer-modal") {
    document.getElementById("refer-modal").style.display = "none";
  } else if (targetId == "contact-support-borrow") {
    tidioChatApi.open();
  } else if (targetId == "firstname") {
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
  } else if (targetId == "firstname-mobile") {
    document.getElementById("settings").style.display = "none";
    isSettingsOpened = false;
    setTimeout(function () {
      document.getElementById("app-settings").style.display = "block";
      isAppSetingsOpened = true;
    }, 200);
    setUserDetailsSetting(addressDetails);
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
    settingDetailSelector("wallet-options");
  } else if (targetId == "withdrawals") {
    settingSelector(e.target);
    settingDetailSelector("withdrawal-options");
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
  } else if (e.target.id == "usd") {
    document.getElementById("fund-heading").textContent = "Fund";
    document.getElementById("crypto-deposit-option").style.display = "none";
    document.getElementById("select-crypto").textContent =
      "Select Crypto or USD";
    paymentInfoSelection(document.getElementById("usd-info"));
  } else if (e.target.id == "btc") {
    document.getElementById("fund-heading").textContent = "Bitcoin Deposit";
    document.getElementById("crypto-deposit-option").style.display = "none";
    document.getElementById("select-crypto").textContent = "Bitcoin (BTC)";
    paymentInfoSelection(document.getElementById("btc-info"));
  } else if (e.target.id == "eth") {
    document.getElementById("fund-heading").textContent = "BSC Deposit";
    document.getElementById("crypto-deposit-option").style.display = "none";
    document.getElementById("select-crypto").textContent = "BSC (BSC)";
    paymentInfoSelection(document.getElementById("eth-info"));
  } else if (e.target.id == "usdt") {
    document.getElementById("fund-heading").textContent =
      "USDT Deposit (TRC 20)";
    document.getElementById("crypto-deposit-option").style.display = "none";
    document.getElementById("select-crypto").textContent = "USD Token (USDT)";
    paymentInfoSelection(document.getElementById("usdt-info"));
  } else if (e.target.id == "xpr") {
    document.getElementById("fund-heading").textContent =
      "XPR Deposit (BEP 20)";
    document.getElementById("crypto-deposit-option").style.display = "none";
    document.getElementById("select-crypto").textContent = "XPR Token (XPR)";
    paymentInfoSelection(document.getElementById("xpr-info"));
  } else if (e.target.id == "apply-for-loan") {
    tidioChatApi.open();
  } else if (e.target.id == "loan-history") {
    tidioChatApi.open();
  } else if (e.target.id == "learn-more") {
    tidioChatApi.open();
  } else if (e.target.id == "bnb") {
    document.getElementById("fund-heading").textContent = "BNB Deposit";
    document.getElementById("crypto-deposit-option").style.display = "none";
    document.getElementById("select-crypto").textContent = "Binance (BNB)";
    paymentInfoSelection(document.getElementById("bnb-info"));
  } else if (e.target.classList.contains("copy")) {
    e.target.parentElement.previousElementSibling.children[0].select();
    e.target.parentElement.previousElementSibling.children[0].setSelectionRange(
      0,
      99999
    );
    navigator.clipboard.writeText(
      e.target.parentElement.previousElementSibling.children[0].value
    );
    e.target.innerText = "COPIED";
    e.target.classList.add("w3-text-green");
  } else if (e.target.id == "contact-support-otp") {
    tidioChatApi.open();
  } else if (e.target.id == "withdraw-btn") {
    if (canWithdraw) {
      withdraw();
    }
  } else if (
    e.target.id == "open-trade-room-modal" ||
    e.target.id == "open-trade-room-modal-2" ||
    e.target.id == "open-trade-room-modal-3"
  ) {
    //    document.getElementById("trade-room-modal").style.display = "block";
    location.href = `./trading-room.html?email=${userEmail}`;
  } else if (e.target.id == "close-trade-room-modal") {
    document.getElementById("trade-room-modal").style.display = "none";
  } else if (
    e.target.id == "open-trade-history-modal" ||
    e.target.id == "open-trade-history-modal-2"
  ) {
    document.getElementById("trade-history-room-modal").style.display = "block";
  } else if (e.target.id == "close-trade-history-modal") {
    document.getElementById("trade-history-room-modal").style.display = "none";
  } else if (e.target.classList.contains("invest-now")) {
    document.getElementById("investment-plan-modal").style.display = "none";
    document.getElementById("fund-modal").style.display = "block";
  } else if (e.target.id == "close-investment-plan-modal") {
    document.getElementById("investment-plan-modal").style.display = "none";
  } else if (e.target.id == "add-wallet") {
    document.getElementById("add-wallet-modal").style.display = "block";
  } else if (e.target.id == "close-add-wallet-modal") {
    document.getElementById("add-wallet-modal").style.display = "none";
  } else if (e.target.id == "save-wallet") {
    saveWallet();
  } else if (e.target.id == "select-crypto-wallet") {
    console.log("Selected");
    document.getElementById("add-wallet-modal").style.display = "block";
  } else if (
    e.target.id == "open-invest-modal-1" ||
    e.target.id == "open-invest-modal-2"
  ) {
    console.log("Yeah");
    document.getElementById("investment-plan-modal").style.display = "block";
  } else if (e.target.id == "select-wire-payment") {
    tidioChatApi.open();
  } else if (e.target.id == "copy-referral") {
    e.target.previousElementSibling.select();
    e.target.previousElementSibling.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(
      location.origin +
        "/get-started.html?referral=" +
        e.target.previousElementSibling.value
    );
    e.target.classList.add("w3-text-green");
  }
});

if (hasStatus) {
  document.getElementById("fund-modal").style.display = "block";
}

function saveWallet() {
  let walletName = document.getElementById("choose-crypto").value;
  let walletAddress = document.getElementById("wallet-address").value;

  document.getElementById(
    "select-crypto-wallet"
  ).innerText = `${walletName} - ${walletAddress}`;
  document.getElementById("add-wallet-modal").style.display = "none";
}

function withdraw() {
  document.getElementById("withdraw-container").style.visibility = "hidden";
  document.getElementById("withdraw-spinner").style.display = "block";

  setInterval(function () {
    showWithdrawalOTP();
  }, 2000);

  let withdrawalPayload = {
    user: userDetail,
    amount: withdrawEtx.value,
    withdrawalStatus: "Pending",
    crypto: { cryptoId: document.getElementById("choose-crypto").value },
    walletAddress: document.getElementById("wallet-address").value,
    date: moment(),
  };

  let withdrawalXhr = new XMLHttpRequest();
  withdrawalXhr.open("POST", "/withdrawal", true);
  withdrawalXhr.setRequestHeader("Content-Type", "application/json");
  console.log(withdrawalPayload);
  withdrawalXhr.send(JSON.stringify(withdrawalPayload));

  withdrawalXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      location.reload();
    }
  };
}

function showWithdrawalOTP() {
  document.getElementById("withdraw-spinner").style.display = "none";
  document.getElementById("withdraw-container").style.display = "none";

  document.getElementById("otp-container").style.display = "block";
}

function paymentInfoSelection(info) {
  paymentInfos.forEach(function (item) {
    item.style.display = "none";
  });
  info.style.display = "block";
}

getCryptoUpdate();

function getCryptoUpdate() {
  let cryptoUpdateXhr = new XMLHttpRequest();
  cryptoUpdateXhr.open(
    "GET",
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false",
    true
  );
  cryptoUpdateXhr.send();

  cryptoUpdateXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      console.log(response[0].current_price)
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
  document.getElementById("account-balance").innerText = numberWithCommas(
    account.accountBalance);
  totalAmountNew = account.accountBalance.toFixed(1);
  let spinner = document.getElementById("dashboard-spinner");
  spinner.className = spinner.className.replace("opacity-1", "opacity-2");
  document.getElementById("dashboard-container").style.display = "block";
  setTimeout(function () {
    spinner.style.display = "block";
  }, 100);
  getCryptos();

  let investmentXhr = new XMLHttpRequest();
  investmentXhr.open(
    "GET",
    `/account/${account.accountId}/investment`,
    true
  );
  investmentXhr.send();

  investmentXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      if (response == null) {
        
      } else {
        document.getElementById("interest-account").innerText = numberWithCommas(response.investedAmount)
        document.getElementById('account-level').innerText = response.investmentPlan;
      }document.getElementById("btc-price").innerText = response.account.accountBalance / 34195;
    }
  };
}

function investmentComplete(investment, expectedAmount) {
  console.log(expectedAmount);
  if (investment.active) {
    let investmentCompleteXhr = new XMLHttpRequest();
    investmentCompleteXhr.open(
      "GET",
      `/investment/${investment.investmentId}/roi/${expectedAmount}`,
      true
    );
    investmentCompleteXhr.send();

    investmentCompleteXhr.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        let response = JSON.parse(this.response);
        location.reload();
      }
    };
  } else {
  }
}

function getUserAddress() {
  let getUserAddressXhr = new XMLHttpRequest();
  getUserAddressXhr.open(
    "GET",
    `/address/user/${userEmail}`,
    true
  );
  getUserAddressXhr.send();

  getUserAddressXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      addressDetails = response;
      document.tidioIdentify = {
        distinct_id: response.user.email, // Unique visitor ID in your system
        email: response.user.email, // visitor email
        name: response.user.fullName, // Visitor name
        phone: response.mobileNumber, //Visitor phone
      };
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
  document.getElementById("referral-id").value = userDetails.user.referralId;
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
      response.forEach(function (item, index) {
        if (index == 0) {
        } else {
          document.getElementById("choose-crypto").innerHTML +=
            bindChooseCrypto(item);
        }
      });

      cryptos = response;
    }
  };
}

function bindSelect(id, value, selected) {
  return `<option value="${id}" ${selected}>${value}</option>`;
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

function bindWithdrawal(withdrawal, index) {
  return `
    <div class="w3-row w3-padding-large w3-round" style="margin-top: 24px; background-color: rgb(248, 248, 248);">
                  <div class="w3-col s1">
                    ${index}.
                  </div>
                  <div class="w3-col s2">
                    <p class="no-margin">BITCOIN</p>
                  </div>
                  <div class="w3-col s6">
                    bc1qn8j4sj0zr0m8jg3ccc6ufw8as7hmfysfcncmx2
                  </div>
                  <div class="w3-col s1">
                    $500
                  </div>
                  <div class="w3-col s2">
                    20th March 2022
                  </div>
                </div>
    `;
}

function bindWallet(wallet, index) {
  return `
    <div class="w3-row w3-padding-large w3-round" style="margin-top: 24px; background-color: rgb(248, 248, 248);">
                  <div class="w3-col s1">
                    ${index}.
                  </div>
                  <div class="w3-col s2">
                    <p class="no-margin">BITCOIN</p>
                  </div>
                  <div class="w3-col s8">
                    <p class="no-margin">
                      bc1qn8j4sj0zr0m8jg3ccc6ufw8as7hmfysfcncmx2
                    </p>
                    
                  </div>
                  <div class="w3-col s1">
                    <span class="fa fa-times w3-text-red w3-center"></span>
                  </div>
                </div>
    `;
}

function bindWithdrawalHeaderRoot() {
  return `
	<div class="w3-row w3-padding-large"
								style="margin-top: 24px;">
								<div class="w3-col s1">
									<p class="x-big no-margin blue-text-dash">No</p>

								</div>
								<div class="w3-col s2">
									<p class="no-margin blue-text-dash x-big" style="font-weight: 500;">Wallet Name</p>
								</div>
								<div class="w3-col s6">
									<p class="no-margin blue-text-dash x-big" style="font-weight: 500;">Wallet Address</p>

								</div>
								<div class="w3-col s1">
									<p class="no-margin blue-text-dash x-big" style="font-weight: 500;">USD</p>

								</div>
								<div class="w3-col s2">
									<p class="no-margin blue-text-dash x-big" style="font-weight: 500;">Date</p>

								</div>
							</div>
	`;
}

function bindWalletHeaderRoot() {
  return `
		<div class="w3-row w3-padding-large"
							style="margin-top: 24px;">
							<div class="w3-col s1">
								<p class="x-big no-margin blue-text-dash" style="font-weight: 500;">No</p>

							</div>
							<div class="w3-col s2">
								<p class="no-margin blue-text-dash x-big" style="font-weight: 500;">Wallet Name</p>
							</div>
							<div class="w3-col s9">
								<p class="no-margin blue-text-dash x-big" style="font-weight: 500;">Wallet Address</p>

							</div>

						</div>
	`;
}

function bindChooseCrypto(crypto) {
  return `
	<option value="${crypto.cryptoId}">${crypto.crypto}</option>
	`;
}
