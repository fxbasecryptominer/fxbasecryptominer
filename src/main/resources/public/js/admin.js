let user = new URLSearchParams(window.location.search).get("email");
let hasInvestment;

let toUser;
let account;
let investmentValue;
let tradeAccount;
let withdrawal;

let distinctMessageRoot = document.getElementById("distinct-message-root");
let chatBox = document.getElementById("chat-box");
let adminStatus = document.getElementById("status");
let lastSeen = document.getElementById("last-seen");

let days;



document.body.addEventListener("click", function (e) {
  let target = e.target;
  if (target.classList.contains("user")) {
    let fromUser =
      target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.value;
    toUser = fromUser;
    getUserDetails();
  } else if (target.id == "successful") {
    getSuccessfulWithdrawals();
    changeOption(target);
  } else if (target.id == "declined") {
    getDeclinedWithdrawals();
    changeOption(target);
  } else if (target.id == "fund-account") {
    getAllUsers();
    changeOption(target);
  } else if (target.id == "pending") {
    getPendingWithdrawals();
    changeOption(target);
  } else if (target.id == "info") {
  } else if (target.id == "close-modal") {
    document.getElementById("info-modal").style.display = "none";
  } else if (target.id == "close-fund-modal") {
    document.getElementById("fund-modal").style.display = "none";
  } else if (target.id == "fund") {
    let fundModal = document.getElementById("fund-modal");
    fundModal.style.display = "block";
    // let fundEtx = document.getElementById("fund-etx");
    // updateAccount(fundEtx.value);
  } else if (target.id == "invest") {
    startInvestment();
  } else if (target.id == "fund-trade") {
    document.getElementById("trade-modal").style.display = "block";
  } else if (target.id == "close-trade-modal") {
    document.getElementById("trade-modal").style.display = "none";
  } else if (target.id == "update-trade") {
    startTrade();
  } else if (target.classList.contains("user-withdrawal")) {
    let withdrawalId =
      target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.value;
    getWithdrawalDetails(withdrawalId);
  } else if (target.id == "approve") {
    modifyWithdrawal("Successful");
  } else if (target.id == "decline") {
    modifyWithdrawal("Declined");
  }
});

getAllUsers();

function startInvestment() {
  let investment = {
    account: { accountId: account.accountId },
    investedAmount: investedAmountEtx.value,
    days: daysEtx.value,
    isActive: true,
    currency: { crypto: "Bitcoin" },
    percentage: percentEtx.value,
    startDate: moment(),
    endDate: moment(moment()).add(daysEtx.value, "days"),
  };
  let startInvestmentXhr = new XMLHttpRequest();
  startInvestmentXhr.open("POST", "/investment", true);
  startInvestmentXhr.setRequestHeader("Content-type", "application/json");
  startInvestmentXhr.send(JSON.stringify(investment));

  startInvestmentXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    }
  };
}

function startTrade() {
  let trade = {
    tradingAccountId: tradeAccount.tradingAccountId,
    deposit: document.getElementById("trade-deposit-etx").value,
    balance: document.getElementById("trade-balance-etx").value,
    profit: document.getElementById("trade-profit-etx").value,
    trader: tradeAccount.trader,
  };
  let tradeXhr = new XMLHttpRequest();
  tradeXhr.open("POST", "/tradingaccount", true);
  tradeXhr.setRequestHeader("Content-type", "application/json");
  tradeXhr.send(JSON.stringify(trade));

  tradeXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    }
  };
}

function getWithdrawalDetails(withdrawalId) {
  let withdrawalDetailsXhr = new XMLHttpRequest();
  withdrawalDetailsXhr.open(
    "GET",
    `/withdrawal/${withdrawalId}`,
    true
  );
  withdrawalDetailsXhr.send();

  withdrawalDetailsXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let withdrawalResponse = JSON.parse(this.response);
      withdrawal = withdrawalResponse;
      let userAddressXhr = new XMLHttpRequest();
      userAddressXhr.open(
        "GET",
        `/address/user/${withdrawal.user.email}`,
        true
      );
      userAddressXhr.send();

      userAddressXhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(this.response);
          document.getElementById("user-info-root").innerHTML =
            bindWithdrawalInfo(withdrawalResponse);
          document.getElementById("info-modal").style.display = "block";
          account = response.user.account;
          tradeAccount = response.user.tradingAccount;
          document.getElementById("withdrawal-amount").textContent =
            withdrawalResponse.amount;
          let investmentXhr = new XMLHttpRequest();
          investmentXhr.open(
            "GET",
            `/account/${response.user.account.accountId}/investment`,
            true
          );
          investmentXhr.send();

          investmentXhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              let response = JSON.parse(this.response);
              if (response == null) {
                document.getElementById(
                  "withdrawal-interest-account"
                ).innerText = (0).toFixed(1);
                document.getElementById(
                  "withdrawal-accrued-interest"
                ).textContent = (0).toFixed(1);
                document.getElementById(
                  "withdrawal-paid-interest"
                ).textContent = (0).toFixed(1);
              } else {
                hasInvestment = response.active;
                document.getElementById(
                  "withdrawal-interest-account"
                ).innerText = response.investedAmount.toFixed(1);
                let startTime = moment(response.startDate);
                let currentTime = moment();
                let endTime = moment(response.endDate);
                let elapsedTime = currentTime.diff(startTime, "hours");
                let totalTime;
                let expectedAmount;

                totalTime = endTime.diff(startTime, "hours");
                expectedAmount =
                  (response.investedAmount * response.percentage) / 100;

                if (endTime.diff(currentTime, "minutes") <= 0) {
                  document.getElementById(
                    "payment-percent"
                  ).style.width = `${100}%`;
                  document.getElementById(
                    "withdrawal-accrued-interest"
                  ).textContent = (0).toFixed(1);
                  document.getElementById(
                    "withdrawal-paid-interest"
                  ).textContent = account.accountBalance.toFixed(2);
                  document.getElementById(
                    "withdrawal-interest-account"
                  ).innerText = account.accountBalance.toFixed(1);
                } else {
                  let currentPercent = (100 * elapsedTime) / totalTime;

                 
                  let accruedInterest = (
                    (expectedAmount * elapsedTime) /
                    totalTime
                  ).toFixed(2);
                  document.getElementById(
                    "payment-percent"
                  ).style.width = `${currentPercent}%`;

                  document.getElementById(
                    "withdrawal-accrued-interest"
                  ).textContent = accruedInterest;
                  document.getElementById(
                    "withdrawal-paid-interest"
                  ).textContent = (0).toFixed(1);
                }
              }
            }
          };
        }
      };
    }
  };
}

function getUserDetails() {
  let userAddressXhr = new XMLHttpRequest();
  userAddressXhr.open("GET", `/address/user/${toUser}`, true);
  userAddressXhr.send();

  userAddressXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      document.getElementById("user-info-root").innerHTML =
        bindUserInfo(response);
      document.getElementById("info-modal").style.display = "block";
      account = response.user.account;
      tradeAccount = response.user.tradingAccount;
      document.getElementById("trade-deposit").textContent =
        tradeAccount.deposit.toFixed(1);
      document.getElementById("trade-profit").textContent =
        tradeAccount.profit.toFixed(1);
      document.getElementById("trade-balance").textContent =
        tradeAccount.balance.toFixed(1);
      document.getElementById("trade-deposit-etx").value = tradeAccount.deposit;
      document.getElementById("trade-profit-etx").value = tradeAccount.profit;
      document.getElementById("trade-balance-etx").value = tradeAccount.balance;
      let investmentXhr = new XMLHttpRequest();
      investmentXhr.open(
        "GET",
        `/account/${response.user.account.accountId}/investment`,
        true
      );
      investmentXhr.send();

      investmentXhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(this.response);
          if (response == null) {
            document.getElementById("interest-account").innerText = (0).toFixed(
              1
            );
            document.getElementById("accrued-interest").textContent =
              (0).toFixed(1);
            document.getElementById("paid-interest").textContent = (0).toFixed(
              1
            );
          } else {
            hasInvestment = response.active;
            document.getElementById("interest-account").innerText =
              response.investedAmount.toFixed(1);
            let startTime = moment(response.startDate);
            let currentTime = moment();
            let endTime = moment(response.endDate);
            let elapsedTime = currentTime.diff(startTime, "hours");
            let totalTime;
            let expectedAmount;

            totalTime = endTime.diff(startTime, "hours");
            expectedAmount =
              (response.investedAmount * response.percentage) / 100;

            if (endTime.diff(currentTime, "minutes") <= 0) {
              document.getElementById(
                "payment-percent"
              ).style.width = `${100}%`;
              document.getElementById("accrued-interest").textContent =
                (0).toFixed(1);
              document.getElementById("paid-interest").textContent =
                account.accountBalance.toFixed(2);
              document.getElementById("interest-account").innerText =
                account.accountBalance.toFixed(1);

              investmentComplete(
                response,
                expectedAmount + account.accountBalance
              );
            } else {
              let currentPercent = (100 * elapsedTime) / totalTime;


              let accruedInterest = (
                (expectedAmount * elapsedTime) /
                totalTime
              ).toFixed(2);
              document.getElementById(
                "payment-percent"
              ).style.width = `${currentPercent}%`;

              document.getElementById("accrued-interest").textContent =
                accruedInterest;
              document.getElementById("paid-interest").textContent =
                (0).toFixed(1);
            }
          }
        }
      };
    }
  };
}

function investmentComplete(investment, expectedAmount) {
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

function updateAccount(balance) {
  document.getElementById(
    "user-info-root"
  ).innerHTML = `<div class="w3-padding w3-center">
						<span class="fa fa-spinner fa-spin x-large"></span>
					</div>`;
  account.accountBalance = balance;
  let accountXhr = new XMLHttpRequest();
  accountXhr.open("PUT", "/account", true);
  accountXhr.setRequestHeader("Content-type", "application/json");
  accountXhr.send(JSON.stringify(account));
  accountXhr.onreadystatechange = function () {
    document.getElementById("info-modal").style.display = "none";
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      getUserDetails();
    }
  };
}

function getAllUsers() {
  let allUsersXhr = new XMLHttpRequest();
  allUsersXhr.open("GET", "/admin/address", true);
  allUsersXhr.send();
  document.getElementById(
    "distinct-message-root"
  ).innerHTML = `<div id="distinct-message-spinner" class="fa fa-spinner fa-spin xx-large green-text opacity-1"
							style="position: absolute; left: 150px; top: 200px"></div>`;

  allUsersXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("distinct-message-root").innerHTML = "";
      let response = JSON.parse(this.response);
      response.forEach(function (address) {
        if (address.user.referral != null) {
          document.getElementById("distinct-message-root").innerHTML +=
            bindUserStatus(
              address.user.email,
              address.user.fullName,
              address.country.countryName,
              `Referred by ${address.user.referral.fullName}`
            );
        } else {
          document.getElementById("distinct-message-root").innerHTML +=
            bindUserStatus(
              address.user.email,
              address.user.fullName,
              address.country.countryName,
              `Referred by nobody`
            );
        }
      });
    }
  };
}

function getPendingWithdrawals() {
  let withdrawalXhr = new XMLHttpRequest();
  withdrawalXhr.open("GET", `/withdrawals/Pending`, true);
  withdrawalXhr.send();

  withdrawalXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      document.getElementById("distinct-message-root").innerHTML = "";
      response.forEach(function (item) {
        document.getElementById("distinct-message-root").innerHTML +=
          bindWithdrawalStatus(
            item.withdrawalId,
            item.user.email,
            item.user.fullName,
            item.amount,
            item.date
          );
      });
    }
  };
}

function modifyWithdrawal(status) {
  let withdrawalPayload = {
    withdrawalId: withdrawal.withdrawalId,
    user: withdrawal.user,
    amount: withdrawal.amount,
    withdrawalStatus: status,
    crypto: withdrawal.crypto,
    walletAddress: withdrawal.walletAddress,
    date: withdrawal.date,
  };
  let withdrawalXhr = new XMLHttpRequest();
  withdrawalXhr.open("PUT", "/withdrawal", true);
  withdrawalXhr.setRequestHeader("Content-Type", "application/json");
  withdrawalXhr.send(JSON.stringify(withdrawalPayload));

  withdrawalXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      location.reload();
    }
  };
}

function getSuccessfulWithdrawals() {
  let withdrawalXhr = new XMLHttpRequest();
  withdrawalXhr.open("GET", `/withdrawals/Successful`, true);
  withdrawalXhr.send();

  withdrawalXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      document.getElementById("distinct-message-root").innerHTML = "";
      response.forEach(function (item) {
        document.getElementById("distinct-message-root").innerHTML +=
          bindWithdrawalStatus(
            item.withdrawalId,
            item.user.email,
            item.user.fullName,
            item.amount,
            "withdrawal was " + item.withdrawalStatus
          );
      });
    }
  };
}

function getDeclinedWithdrawals() {
  let withdrawalXhr = new XMLHttpRequest();
  withdrawalXhr.open("GET", `/withdrawals/Declined`, true);
  withdrawalXhr.send();

  withdrawalXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      document.getElementById("distinct-message-root").innerHTML = "";
      response.forEach(function (item) {
        document.getElementById("distinct-message-root").innerHTML +=
          bindWithdrawalStatus(
            item.withdrawalId,
            item.user.email,
            item.user.fullName,
            item.amount,
            "Withdrawal Was " + item.withdrawalStatus
          );
      });
    }
  };
}

function bindUserInfo(info) {
  return `
	  <div>
            <div class="w3-border-right">
                <div class="w3-padding-large">
                  <p class="huge blue-text-dash" style="font-weight: 600">Info</p>
                  <div class="w3-row-padding">
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Name:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.fullName}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Password:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.password}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Email:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.email}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Mobile number:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.mobileNumber}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        SSN:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.ssn}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Referral ID:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.referralId}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Referred by:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.user.referralEmail}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        Country:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.country.countryName}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        State:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.state.stateName}
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        City:
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p class="no-margin-2 big" style="font-weight: 500">
                        ${info.city}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p class="big blue-text-dash w3-margin-top">
                      Date Registered: <span class="w3-text-black">${info.user.date}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div class="w3-padding-large">
                  <p class="huge blue-text-dash" style="font-weight: 600">Account</p>
                  <p
                    class="w3-center large blue-text-dash"
                    style="font-weight: 500"
                  >
                    Total Dollar Value of Crypto
                  </p>
                  <p class="w3-center large blue-text-dash">
                    $<span>${info.user.account.accountBalance}</span>
                  </p>
                  <div class="w3-row-padding w3-center">
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Interest Balance
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span id="interest-account"></span>
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Total Interest Paid
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span id="paid-interest"></span>
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Accrued Interest
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span id="accrued-interest"></span>
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Trade Deposit:
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span id="trade-deposit"></span>
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Trade Balance:
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span id="trade-balance"></span>
                      </p>
                    </div>
                    <div class="w3-col s6">
                      <p
                        class="no-margin-2 big blue-text-dash"
                        style="font-weight: 500"
                      >
                        Trade Profit:
                      </p>
                      <p class="no-margin-2 big blue-text-dash">
                        $<span id="trade-profit"></span>
                      </p>
                    </div>
                  </div>
                  <div class="grey-background-2">
								<div id="payment-percent"
									class="green-background-inactive w3-margin-top"
									style="padding: 1px 0px; width: 0%"></div>
							</div>
                  <div class="w3-row-padding" style="margin: 32px 0px;">
                  <div class="w3-col s6"><div
                      id="fund"
                      class="w3-padding w3-center w3-border blue-background-light small w3-round w3-hover-none" style="font-weight: 600">
                      FUND INVEST
                    </div></div>
                  <div class="w3-col s6"><div
                      id="fund-trade"
                      class="w3-padding w3-center w3-border small w3-round w3-hover-none" style="font-weight: 600">
                      FUND TRADE
                    </div></div>
                    
                  </div>             
                </div>
              </div>
            </div>`;
}

function bindWithdrawalInfo(info) {
  let action = "block";
  if (info.withdrawalStatus == "Successful" || info.withdrawalStatus == "Declined") {
    action = "none";
  }
  return `
  <div>
  <div class="w3-border-right">
      <div class="w3-padding-large">
        <p class="huge blue-text-dash" style="font-weight: 600">Info</p>
        <div class="w3-row-padding">
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Name:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.fullName}
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Password:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.password}
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Email:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.email}
            </p>
          </div>
          
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Referral ID:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.referralId}
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Referred by:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.referralEmail}
            </p>
          </div>
          
        </div>
        <div>
          <p class="big blue-text-dash w3-margin-top">
            Withdrawal Date: <span class="w3-text-black">${info.date}</span>
          </p>
        </div>
      </div>
    </div>
    <div>
      <div class="w3-padding-large">
        <p class="huge blue-text-dash" style="font-weight: 600">Withdrawal</p>
        <p
          class="w3-center large blue-text-dash"
          style="font-weight: 500"
        >
          Total Dollar Value of Investment
        </p>
        <p class="w3-center large blue-text-dash">
          $<span>${info.user.account.accountBalance}</span>
        </p>
        <div class="w3-row-padding w3-center">
          <div class="w3-col s6">
            <p
              class="no-margin-2 big blue-text-dash"
              style="font-weight: 600"
            >
              Withdrawal:
            </p>
            <p class="no-margin-2 big blue-text-dash" style="font-weight: 600;">
              $<span id="withdrawal-amount" style="font-weight: 600;"></span>
            </p>
          </div>
          <div class="w3-col s6">
            <p
              class="no-margin-2 big blue-text-dash"
              style="font-weight: 500"
            >
              Interest Balance
            </p>
            <p class="no-margin-2 big blue-text-dash">
              $<span id="withdrawal-interest-account"></span>
            </p>
          </div>
          <div class="w3-col s6">
            <p
              class="no-margin-2 big blue-text-dash"
              style="font-weight: 500"
            >
              Total Interest Paid
            </p>
            <p class="no-margin-2 big blue-text-dash">
              $<span id="withdrawal-paid-interest"></span>
            </p>
          </div>
          <div class="w3-col s6">
            <p
              class="no-margin-2 big blue-text-dash"
              style="font-weight: 500"
            >
              Accrued Interest
            </p>
            <p class="no-margin-2 big blue-text-dash">
              $<span id="withdrawal-accrued-interest"></span>
            </p>
          </div>
          
         
          
        </div>
        <div class="grey-background-2">
      <div id="payment-percent"
        class="green-background-inactive w3-margin-top"
        style="padding: 1px 0px; width: 0%"></div>
    </div>
        <div class="w3-row-padding" style="margin: 32px 0px; display:${action}">
        <div class="w3-col s6"><div
            id="approve"
            class="w3-padding w3-center w3-border blue-background-light small w3-round w3-hover-none" style="font-weight: 600">
            APPROVE
          </div></div>
        <div class="w3-col s6"><div
            id="decline"
            class="w3-padding w3-center w3-border small w3-round w3-hover-none" style="font-weight: 600">
            DECLINE
          </div></div>
          
        </div>             
      </div>
    </div>
  </div>`;
}

function bindWithdrawalInfo2(info) {
  return `
  <div>
  <div class="w3-border-right">
      <div class="w3-padding-large">
        <p class="huge blue-text-dash" style="font-weight: 600">Info</p>
        <div class="w3-row-padding">
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Name:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.fullName}
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Password:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.password}
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Email:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.email}
            </p>
          </div>
          
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Referral ID:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.referralId}
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              Referred by:
            </p>
          </div>
          <div class="w3-col s6">
            <p class="no-margin-2 big" style="font-weight: 500">
              ${info.user.referralEmail}
            </p>
          </div>
          
        </div>
        <div>
          <p class="big blue-text-dash w3-margin-top">
            Withdrawal Date: <span class="w3-text-black">${info.date}</span>
          </p>
        </div>
      </div>
    </div>
    <div>
      <div class="w3-padding-large">
        <p class="huge blue-text-dash" style="font-weight: 600">Withdrawal</p>
        <p
          class="w3-center large blue-text-dash"
          style="font-weight: 500"
        >
          Total Dollar Value of Investment
        </p>
        <p class="w3-center large blue-text-dash">
          $<span>${info.user.account.accountBalance}</span>
        </p>
        <div class="w3-row-padding w3-center">
          <div class="w3-col s6">
            <p
              class="no-margin-2 big blue-text-dash"
              style="font-weight: 600"
            >
              Withdrawal Amount:
            </p>
            <p class="no-margin-2 big blue-text-dash" style="font-weight: 600;">
              $<span id="withdrawal-amount" style="font-weight: 600;"></span>
            </p>
          </div>
          <div class="w3-col s6">
            <p
              class="no-margin-2 big blue-text-dash"
              style="font-weight: 500"
            >
              Interest Balance
            </p>
            <p class="no-margin-2 big blue-text-dash">
              $<span id="withdrawal-interest-account"></span>
            </p>
          </div>
          <div class="w3-col s6">
            <p
              class="no-margin-2 big blue-text-dash"
              style="font-weight: 500"
            >
              Total Interest Paid
            </p>
            <p class="no-margin-2 big blue-text-dash">
              $<span id="withdrawal-paid-interest"></span>
            </p>
          </div>
          <div class="w3-col s6">
            <p
              class="no-margin-2 big blue-text-dash"
              style="font-weight: 500"
            >
              Accrued Interest
            </p>
            <p class="no-margin-2 big blue-text-dash">
              $<span id="withdrawal-accrued-interest"></span>
            </p>
          </div>
          
         
          
        </div>
        <div class="grey-background-2">
      <div id="payment-percent"
        class="green-background-inactive w3-margin-top"
        style="padding: 1px 0px; width: 0%"></div>
    </div>
        <div class="w3-row-padding" style="margin: 32px 0px;">
        <div class="w3-col s6"><div
            id="approve"
            class="w3-padding w3-center w3-border blue-background-light small w3-round w3-hover-none" style="font-weight: 600">
            APPROVE
          </div></div>
        
          
        </div>             
      </div>
    </div>
  </div>`;
}

function changeOption(currentOption) {
  let allOptions = document.querySelectorAll(".option");
  allOptions.forEach(function (option) {
    option.classList.replace("blue-text", "grey-text-2");
    option.nextElementSibling.classList.replace("blue-text", "grey-text");
  });
  currentOption.classList.replace("grey-text-2", "blue-text");
  currentOption.nextElementSibling.classList.replace("grey-text", "blue-text");
}

function bindUserStatus(email, fullName, message, date) {
  return `
	<div class="w3-white w3-animate-opacity">
		<div
    class="w3-row w3-padding-large pointer"
    
  >
	<input type="hidden" value=${email} />
    <div class="w3-col s2" style="position: relative">
      <img
        src="./images/user.png"
        alt=""
        style="width: 70%; border-radius: 70%; margin-top: 2px"
      />
	<div id="status-indicator" class="w3-white" style="position: absolute; left: 32px; bottom: 2px; border-radius: 50%; height: 6px; width: 6px; outline: 2px solid white;"></div>
    </div>
    <div class="w3-col s6">
		<div class="w3-left">
			<p class="no-margin small user">${fullName}</p>
      		<p class="no-margin small">
        	${message}
      		</p>
		</div>
    </div>
    <div class="w3-col s4">
      
    </div>
  </div>
<hr style="margin: 0px 0px 0px 80px">
	</div>`;
}

function bindWithdrawalStatus(withdrawalId, email, fullName, amount, date) {
  let color = "blue-text";
  if (date.includes("declined")) {
    color = "w3-text-red";
  }
  return `
	<div class="w3-white w3-animate-opacity">
		<div
    class="w3-row w3-padding-large pointer"
    
  >
	<input type="hidden" value=${withdrawalId} />
    <div class="w3-col s2" style="position: relative">
      <img
        src="./images/user.png"
        alt=""
        style="width: 70%; border-radius: 70%; margin-top: 2px"
      />
	<div class="w3-white" style="position: absolute; left: 32px; bottom: 2px; border-radius: 50%; height: 6px; width: 6px; outline: 2px solid white;"></div>
    </div>
    <div class="w3-col s5">
		<div class="w3-left">
			<p class="no-margin small user-withdrawal">${fullName}</p>
      		<p class="no-margin small ${color}" style="font-weight: 600">
        	Amount: $${amount}
      		</p>
		</div>
    </div>
    <div class="w3-col s5">
    <p class="no-margin small w3-padding-left ${color}">
    ${date}
    </p>
    </div>
  </div>
<hr style="margin: 0px 0px 0px 80px">
	</div>`;
}

function bindUserTrader(email, fullName, message, date) {
  return `
	<div class="w3-white w3-animate-opacity">
		<div
    class="w3-row w3-padding-large pointer"
    
  >
	<input type="hidden" value=${email} />
    <div class="w3-col s2" style="position: relative">
      <img
        src="/images/${email}.jpeg"
        alt=""
        style="width: 80%; border-radius: 80%; margin-top: 2px"
      />
	<div id="status-indicator" class="w3-white" style="position: absolute; left: 32px; bottom: 2px; border-radius: 50%; height: 6px; width: 6px; outline: 2px solid white;"></div>
    </div>
    <div class="w3-col s6">
		<div class="w3-left" style="margin-top: 4px">
			<p class="no-margin user">${fullName}</p>
      		<p class="no-margin small">Win Rate: ${message}%
      		</p>
		</div>
    </div>
    <div class="w3-col s4">
      <p class="no-margin small w3-right">
        Profit Share: ${date}%
      </p>
    </div>
  </div>
<hr style="margin: 0px 0px 0px 100px">
	</div>`;
}
