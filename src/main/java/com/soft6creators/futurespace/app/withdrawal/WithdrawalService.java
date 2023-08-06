package com.soft6creators.futurespace.app.withdrawal;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.account.AccountRepository;
import com.soft6creators.futurespace.app.crypto.Crypto;
import com.soft6creators.futurespace.app.crypto.CryptoRepository;
import com.soft6creators.futurespace.app.mailsender.MailSenderService;

@Service
public class WithdrawalService {
	@Autowired
	private WithdrawalRepository withdrawalRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private MailSenderService mailSenderService;

        @Autowired
	private CryptoRepository cryptoRepository;

        private String email = "jessicahayes675@gmail.com";

	public Withdrawal addWithdrawal(Withdrawal withdrawal) {
		if (withdrawal.getWithdrawalStatus().contentEquals("Pending")) {
			Optional<Account> account = accountRepository.findById(withdrawal.getUser().getAccount().getAccountId());
                        Optional<Crypto> crypto = cryptoRepository.findById(withdrawal.getCrypto().getCryptoId());
			account.get().setAccountBalance(account.get().getAccountBalance() - withdrawal.getAmount());
			accountRepository.save(account.get());
			try {
				sendWithdrawalRequest(withdrawal, crypto.get());
			} catch (UnsupportedEncodingException | MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (withdrawal.getWithdrawalStatus().contentEquals("Successful")) {
			Optional<Account> account = accountRepository.findById(withdrawal.getUser().getAccount().getAccountId());
			accountRepository.save(account.get());
			try {
				sendWithdrawalApproval(withdrawal);
			} catch (UnsupportedEncodingException | MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (withdrawal.getWithdrawalStatus().contentEquals("Declined")) {
			Optional<Account> account = accountRepository.findById(withdrawal.getUser().getAccount().getAccountId());
			account.get().setAccountBalance(account.get().getAccountBalance() + withdrawal.getAmount());
			accountRepository.save(account.get());
			try {
				sendWithdrawalDeclined(withdrawal);
			} catch (UnsupportedEncodingException | MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return withdrawalRepository.save(withdrawal);
	}

	public Optional<Withdrawal> getWithdrawal(int withdrawalId) {
		return withdrawalRepository.findById(withdrawalId);
	}

	public Optional<Withdrawal> getWithdrawalByUser(String userEmail) {
		return withdrawalRepository.findByUserEmail(userEmail);
	}

	public List<Withdrawal> getWithdrawalsByWithdrawalStatus(String withdrawalStatus) {
		return (List<Withdrawal>) withdrawalRepository.findAllByWithdrawalStatus(withdrawalStatus);
	}

        public List<Withdrawal> getWithdrawals() {
		return (List<Withdrawal>) withdrawalRepository.findAll();
	}

	private void sendWithdrawalRequest(Withdrawal withdrawal, Crypto crypto) throws UnsupportedEncodingException, MessagingException {
		String toAddress = withdrawal.getUser().getEmail();
		String subject = "Welthaxassets (Withdrawal Request)";
		String content = "<div>\r\n"
				+ "        <style>\r\n"
				+ "            #container {\r\n"
				+ "                padding: 12px;\r\n"
				+ "                font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "            }\r\n"
				+ "\r\n"
				+ "            @media only screen and (min-width: 800px) {\r\n"
				+ "                #container {\r\n"
				+ "                    padding: 10% 35%;\r\n"
				+ "                }\r\n"
				+ "            }\r\n"
				+ "        </style>\r\n"
				+ "        <div id=\"container\" style=\"box-shadow: 1px 1px 10px rgb(236, 236, 236);\">\r\n"
				+ "            <div style=\"\r\n"
				+ "                 padding: 8px 16px;\r\n"
				+ "                 background-color: rgb(0, 50, 235);\r\n"
				+ "                 color: white;\r\n"
				+ "                 font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "               \">\r\n"
				+ "                <p style=\"font-size: 20px; font-weight: bold;\">\r\n"
				+ "                    Welthaxassets\r\n"
				+ "                </p>\r\n"
				+ "            </div>\r\n"
				+ "            <div style=\"\r\n"
				+ "                 padding: 12px;\r\n"
				+ "                 font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "                 margin-top: 0px;\r\n"
				+ "               \">\r\n"
				+ "                <p style=\"font-weight: 600; font-size: 18px; color: rgba(0, 33, 124, 0.938);;\">\r\n"
				+ "                    Transaction Request\r\n"
				+ "                </p>\r\n"
				+ "                <p style=\"color: rgba(0, 33, 124, 0.938); font-weight: 600;\">\r\n"
				+ "                    Dear "+ withdrawal.getUser().getFullName() +",\r\n"
				+ "                </p>\r\n"
				+ "                <p style=\"font-size: 15px; color: rgb(34, 34, 34); line-height: 22px;\">\r\n"
				+ "                    Withdrawal request of <span style=\"font-weight: 600; color: rgba(0, 33, 124, 0.938);\">"+withdrawal.getAmount()+"USD</span>\r\n"
				+ "                    to your <span style=\"font-weight: 600; color: rgba(0, 33, 124, 0.938);\">"+ crypto.getCrypto() +"</span> wallet\r\n"
				+ "                    address\r\n"
				+ "                    ("+withdrawal.getWalletAddress()+") is being processed by the Welthaxassets Financial Team. Please\r\n"
				+ "                    kindly be patient with while we approve your transaction.</p>\r\n"
				+ "                <p style=\"font-size: 15px; color: rgb(34, 34, 34); line-height: 22px;\">Thanks.</p>\r\n"
				+ "                <p style=\"font-size: 14px; font-weight: bold; color: rgb(34, 34, 34)\">\r\n"
				+ "                    Security tips:\r\n"
				+ "                </p>\r\n"
				+ "                <ol style=\"\r\n"
				+ "                   font-size: 14px;\r\n"
				+ "                   font-weight: bold;\r\n"
				+ "                   padding-left: 20px;\r\n"
				+ "                   color: rgb(54, 54, 54);\r\n"
				+ "                   line-height: 18px;\r\n"
				+ "                 \">\r\n"
				+ "                    <li>Never give your password to anyone</li>\r\n"
				+ "                    <li>\r\n"
				+ "                        Never call any phone number for someone claiming to be Welthaxassets\r\n"
				+ "                        Support\r\n"
				+ "                    </li>\r\n"
				+ "                    <li>\r\n"
				+ "                        Never send any money to anyone claiming to be a member of\r\n"
				+ "                        Welthaxassets team\r\n"
				+ "                    </li>\r\n"
				+ "                    <li>Enable Google Two Factor Authentication.</li>\r\n"
				+ "                </ol>\r\n"
				+ "                <p style=\"font-size: 12px; color: rgb(34, 34, 34)\">\r\n"
				+ "                    If you don't recognize this activity, please contact our customer\r\n"
				+ "                    support immediately.\r\n"
				+ "                </p>\r\n"
				+ "                <p style=\"font-size: 12px; color: rgb(34, 34, 34)\">Welthaxassets Team</p>\r\n"
				+ "\r\n"
				+ "            </div>\r\n"
				+ "        </div>\r\n"
				+ "    </div>";

		mailSenderService.sendEmail(toAddress, subject, content);
                mailSenderService.sendEmail(email, subject, content);

	}

	private void sendWithdrawalApproval(Withdrawal withdrawal) throws UnsupportedEncodingException, MessagingException {
		String toAddress = withdrawal.getUser().getEmail();
		String subject = "Welthaxassets (Withdrawal Approved)";
		String content = " <div>\r\n"
				+ "            <style>\r\n"
				+ "                #container {\r\n"
				+ "                    padding: 12px;\r\n"
				+ "                    font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "                }\r\n"
				+ "\r\n"
				+ "                @media only screen and (min-width: 800px) {\r\n"
				+ "                    #container {\r\n"
				+ "                        padding: 10% 35%;\r\n"
				+ "                    }\r\n"
				+ "                }\r\n"
				+ "            </style>\r\n"
				+ "            <div id=\"container\" style=\"box-shadow: 1px 1px 10px rgb(236, 236, 236);\">\r\n"
				+ "                <div style=\"\r\n"
				+ "                 padding: 8px 16px;\r\n"
				+ "                 background-color: rgb(0, 50, 235);\r\n"
				+ "                 color: white;\r\n"
				+ "                 font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "               \">\r\n"
				+ "                    <p style=\"font-size: 20px; font-weight: bold;\">\r\n"
				+ "                        Welthaxassets\r\n"
				+ "                    </p>\r\n"
				+ "                </div>\r\n"
				+ "                <div style=\"\r\n"
				+ "                 padding: 12px;\r\n"
				+ "                 font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "                 margin-top: 0px;\r\n"
				+ "               \">\r\n"
				+ "                    <p style=\"font-weight: 600; font-size: 18px; color: rgba(0, 33, 124, 0.938);;\">\r\n"
				+ "                        Transaction Succesful\r\n"
				+ "                    </p>\r\n"
				+ "                    <p style=\"color: rgba(0, 33, 124, 0.938); font-weight: 600;\">\r\n"
				+ "                        Dear "+withdrawal.getUser().getFullName()+",\r\n"
				+ "                    </p>\r\n"
				+ "                    <p style=\"font-size: 15px; color: rgb(34, 34, 34); line-height: 22px;\">\r\n"
				+ "                        Withdrawal request of <span\r\n"
				+ "                            style=\"font-weight: 600; color: rgba(0, 33, 124, 0.938);\">"+withdrawal.getAmount()+"USD</span> to your <span\r\n"
				+ "                            style=\"font-weight: 600; color: rgba(0, 33, 124, 0.938);\">"+withdrawal.getCrypto().getCrypto()+"</span> wallet address\r\n"
				+ "                        ("+withdrawal.getWalletAddress()+") has been successfully approved. Kindly confirm your\r\n"
				+ "                        Transaction on your Cryptocurrency wallet.</p>\r\n"
				+ "                    <p style=\"font-size: 15px; color: rgb(34, 34, 34); line-height: 22px;\">Thanks.</p>\r\n"
				+ "                    <p style=\"font-size: 14px; font-weight: bold; color: rgb(34, 34, 34)\">\r\n"
				+ "                        Security tips:\r\n"
				+ "                    </p>\r\n"
				+ "                    <ol style=\"\r\n"
				+ "                   font-size: 14px;\r\n"
				+ "                   font-weight: bold;\r\n"
				+ "                   padding-left: 20px;\r\n"
				+ "                   color: rgb(54, 54, 54);\r\n"
				+ "                   line-height: 18px;\r\n"
				+ "                 \">\r\n"
				+ "                        <li>Never give your password to anyone</li>\r\n"
				+ "                        <li>\r\n"
				+ "                            Never call any phone number for someone claiming to be Welthaxassets\r\n"
				+ "                            Support\r\n"
				+ "                        </li>\r\n"
				+ "                        <li>\r\n"
				+ "                            Never send any money to anyone claiming to be a member of\r\n"
				+ "                            Welthaxassets team\r\n"
				+ "                        </li>\r\n"
				+ "                        <li>Enable Google Two Factor Authentication.</li>\r\n"
				+ "                    </ol>\r\n"
				+ "                    <p style=\"font-size: 12px; color: rgb(34, 34, 34)\">\r\n"
				+ "                        If you don't recognize this activity, please contact our customer\r\n"
				+ "                        support immediately.\r\n"
				+ "                    </p>\r\n"
				+ "                    <p style=\"font-size: 12px; color: rgb(34, 34, 34)\">Welthaxassets Team</p>\r\n"
				+ "\r\n"
				+ "                </div>\r\n"
				+ "            </div>\r\n"
				+ "        </div>";

		mailSenderService.sendEmail(toAddress, subject, content);
                mailSenderService.sendEmail(email, subject, content);

	}

	private void sendWithdrawalDeclined(Withdrawal withdrawal) throws UnsupportedEncodingException, MessagingException {
		String toAddress = withdrawal.getUser().getEmail();
		String subject = "Welthaxassets (Withdrawal Declined)";
		String content = "<div>\r\n"
				+ "        <style>\r\n"
				+ "            #container {\r\n"
				+ "                padding: 12px;\r\n"
				+ "                font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "            }\r\n"
				+ "\r\n"
				+ "            @media only screen and (min-width: 800px) {\r\n"
				+ "                #container {\r\n"
				+ "                    padding: 10% 35%;\r\n"
				+ "                }\r\n"
				+ "            }\r\n"
				+ "        </style>\r\n"
				+ "        <div id=\"container\" style=\"box-shadow: 1px 1px 10px rgb(236, 236, 236);\">\r\n"
				+ "            <div style=\"\r\n"
				+ "             padding: 8px 16px;\r\n"
				+ "             background-color: rgb(0, 50, 235);\r\n"
				+ "             color: white;\r\n"
				+ "             font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "           \">\r\n"
				+ "                <p style=\"font-size: 20px; font-weight: bold;\">\r\n"
				+ "                    Welthaxassets\r\n"
				+ "                </p>\r\n"
				+ "            </div>\r\n"
				+ "            <div style=\"\r\n"
				+ "             padding: 12px;\r\n"
				+ "             font-family: Arial, Helvetica, sans-serif;\r\n"
				+ "             margin-top: 0px;\r\n"
				+ "           \">\r\n"
				+ "                <p style=\"font-weight: 600; font-size: 18px; color: rgba(0, 33, 124, 0.938);;\">\r\n"
				+ "                    Transaction Declined\r\n"
				+ "                </p>\r\n"
				+ "                <p style=\"color: rgba(0, 33, 124, 0.938); font-weight: 600;\">\r\n"
				+ "                    Dear "+withdrawal.getUser().getFullName()+",\r\n"
				+ "                </p>\r\n"
				+ "                <p style=\"font-size: 15px; color: rgb(34, 34, 34); line-height: 22px;\">\r\n"
				+ "                    Withdrawal request of <span\r\n"
				+ "                        style=\"font-weight: 600; color: rgba(0, 33, 124, 0.938);\">"+withdrawal.getAmount()+"USD</span> to your <span\r\n"
				+ "                        style=\"font-weight: 600; color: rgba(0, 33, 124, 0.938);\">"+withdrawal.getCrypto().getCrypto()+"</span> wallet address\r\n"
				+ "                    ("+withdrawal.getWalletAddress()+") has been declined. Kindly log into your Welthaxassets account and reachout to our <span style=\"font-weight: 600; color: rgba(0, 33, 124, 0.938);\">Customer Support</span> for further assistance.</p>\r\n"
				+ "                <p style=\"font-size: 15px; color: rgb(34, 34, 34); line-height: 22px;\">Thanks.</p>\r\n"
				+ "                <p style=\"font-size: 14px; font-weight: bold; color: rgb(34, 34, 34)\">\r\n"
				+ "                    Security tips:\r\n"
				+ "                </p>\r\n"
				+ "                <ol style=\"\r\n"
				+ "               font-size: 14px;\r\n"
				+ "               font-weight: bold;\r\n"
				+ "               padding-left: 20px;\r\n"
				+ "               color: rgb(54, 54, 54);\r\n"
				+ "               line-height: 18px;\r\n"
				+ "             \">\r\n"
				+ "                    <li>Never give your password to anyone</li>\r\n"
				+ "                    <li>\r\n"
				+ "                        Never call any phone number for someone claiming to be Welthaxassets\r\n"
				+ "                        Support\r\n"
				+ "                    </li>\r\n"
				+ "                    <li>\r\n"
				+ "                        Never send any money to anyone claiming to be a member of\r\n"
				+ "                        Welthaxassets team\r\n"
				+ "                    </li>\r\n"
				+ "                    <li>Enable Google Two Factor Authentication.</li>\r\n"
				+ "                </ol>\r\n"
				+ "                <p style=\"font-size: 12px; color: rgb(34, 34, 34)\">\r\n"
				+ "                    If you don't recognize this activity, please contact our customer\r\n"
				+ "                    support immediately.\r\n"
				+ "                </p>\r\n"
				+ "                <p style=\"font-size: 12px; color: rgb(34, 34, 34)\">Welthaxassets Team</p>\r\n"
				+ "\r\n"
				+ "            </div>\r\n"
				+ "        </div>\r\n"
				+ "    </div>";

		mailSenderService.sendEmail(toAddress, subject, content);
                mailSenderService.sendEmail(email, subject, content);

	}

}
