let userEmail = new URLSearchParams(window.location.search).get("email");
let withdrawalContainers = document.querySelectorAll(".withdrawal-container");

let walletAddress = document.getElementById("btc");
let paypal = document.getElementById("paypal");
let bankName = document.getElementById("bank-name");
let accountName = document.getElementById("account-name");
let accountNumber = document.getElementById("account-number");
let swift = document.getElementById("swift");
let amount = document.getElementById("amount");

let userDetail;
let hasInvestment = false;
let totalAmount = 0;
let btcPrice;

let getUserXhr = new XMLHttpRequest();
getUserXhr.open("GET", `/user/email/${userEmail}`, true);
getUserXhr.send();

getUserXhr.onreadystatechange = function () {
  if (this.status == 200 && this.readyState == 4) {
    let response = JSON.parse(this.response);
    userDetail = response;
    let firstName = response.fullName.split(" ", 1);

    getAccount();
  }
};

function getAccount() {
  let investmentXhr = new XMLHttpRequest();
  investmentXhr.open(
    "GET",
    `/account/${userDetail.account.accountId}/investment`,
    true
  );
  investmentXhr.send();

  investmentXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      if (response == null) {
        document.getElementById("account-balance").innerText = (0).toFixed(1);
        document.getElementById("account-level").innerText = "NONE";
      } else {
        hasInvestment = response.active;
        let startTime = moment(response.startDate);
        let currentTime = moment();
        let endTime = moment(response.endDate);
        let elapsedTime = currentTime.diff(startTime, "hours");
        let totalTime;
        let expectedAmount;

        totalTime = endTime.diff(startTime, "hours");
        expectedAmount = (response.investedAmount * response.percentage) / 100;
        document.getElementById("account-level").innerText =
          response.investmentPlan;

        if (endTime.diff(currentTime, "minutes") <= 0) {
          document.getElementById("account-balance").innerText =
            response.account.accountBalance.toFixed(1);
          totalAmount = response.account.accountBalance.toFixed(1);
        } else {
          let currentPercent = (100 * elapsedTime) / totalTime;

          console.log("expected amount", expectedAmount);
          console.log("elapsed time", elapsedTime);
          console.log("total time", totalTime);

          let accruedInterest = (
            (expectedAmount * elapsedTime) /
            totalTime
          ).toFixed(2);

          totalAmount = (
            parseFloat(response.account.accountBalance) +
            parseFloat(accruedInterest)
          ).toFixed(1);
          document.getElementById("account-balance").innerText =
            numberWithCommas(totalAmount);
        }
      }
      let spinner = document.getElementById("withdrawal-spinner");
      spinner.children[0].className = spinner.children[0].className.replace(
        "opacity-1",
        "opacity-0"
      );
      document.getElementById("withdrawal-container").style.display = "block";
      setTimeout(function () {
        spinner.style.display = "none";
      }, 1000);
    }
  };
}

function withdraw() {
  let spinner = document.getElementById("withdrawal-spinner");
  spinner.style.display = "flex";
  spinner.children[0].className = spinner.children[0].className.replace(
    "opacity-0",
    "opacity-1"
  );
  document.getElementById("withdrawal-container").style.display = "none";

  let withdrawalPayload = {
    user: userDetail,
    amount: amount.value,
    withdrawalStatus: "Pending",
    crypto: { cryptoId: 2 },
    date: moment(),
  };
  if (amount.value <= totalAmount) {
    createWithdrawal(withdrawalPayload);
  }
}

function createWithdrawal(withdrawalPayload) {
  let withdrawalXhr = new XMLHttpRequest();
  withdrawalXhr.open("POST", "/withdrawal", true);
  withdrawalXhr.setRequestHeader("Content-Type", "application/json");
  withdrawalXhr.send(JSON.stringify(withdrawalPayload));

  withdrawalXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      let spinner = document.getElementById("withdrawal-spinner");
      spinner.children[0].className = spinner.children[0].className.replace(
        "opacity-1",
        "opacity-0"
      );
      let withdrawalModal = document.getElementById(
        "withdrawal-processing-modal"
      );
      withdrawalModal.style.display = "block";
      setTimeout(function () {
        location.replace(`dashboard.html?email=${userEmail}`);
      }, 5000);
    }
  };
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
      document.getElementById("btc-balance").innerText = (totalAmount / response[0].current_price).toFixed(8)
    }
  };
}

document.body.addEventListener("click", function (e) {
  let targetId = e.target.id;
  if (targetId == "proceed") {
    if (hasInvestment || totalAmount < 100) {
      alert(
        "Withdrawal Request cannot be made until investment cycle is complete"
      );
    } else {
      withdraw();
    }
  }
});

document.body.addEventListener("change", function (e) {
  let targetId = e.target.id;
  if (targetId == "withdrawal-method") {
    withdrawalContainers.forEach(function (withdrawalContainer) {
      withdrawalContainer.style.display = "none";
    });
    document.getElementById(`${e.target.value}-container`).style.display =
      "block";
  }
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
