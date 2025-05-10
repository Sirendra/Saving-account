package com.bank.savingaccount.service;

import com.bank.savingaccount.model.Customer;
import com.bank.savingaccount.model.Transaction;
import com.bank.savingaccount.repository.TransactionRepository;
import com.bank.savingaccount.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Transactional
    public void recordTransaction(Customer customer, String transactionCode, Double amount, Double balance, String channel, String type, String remark) {
        Transaction transaction = new Transaction();
        transaction.setAccountNumber(customer.getAccountNumber());
        transaction.setTransactionCode(transactionCode);
        transaction.setDateTime(new Date());  // Current date and time
        transaction.setAmount(amount);
        transaction.setBalance(balance);
        transaction.setChannel(channel);
        transaction.setType(type);
        transaction.setRemark(remark);

        transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsForMonth(String accountNumber, int month, int year) {
        Calendar start = Calendar.getInstance();
        start.set(Calendar.YEAR, year);
        start.set(Calendar.MONTH, month - 1); // 0-based in Java
        start.set(Calendar.DAY_OF_MONTH, 1);
        start.set(Calendar.HOUR_OF_DAY, 0);
        start.set(Calendar.MINUTE, 0);
        start.set(Calendar.SECOND, 0);
        start.set(Calendar.MILLISECOND, 0);

        Calendar end = (Calendar) start.clone();
        end.add(Calendar.MONTH, 1);
        Sort sort = Sort.by(Sort.Direction.DESC, "dateTime");
        return transactionRepository.findByAccountNumberAndDateTimeBetween(
                accountNumber,
                start.getTime(),
                end.getTime(),
                sort
        );
    }


}
