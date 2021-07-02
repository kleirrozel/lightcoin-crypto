let balance = 500.00;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance () {
    let balance = 0;
    for (let t of this.transactions)  {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
  	this.transactions.push(transaction);
  }
}


class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed())
    return false;

    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}


class Deposit extends Transaction {
  get value() {
    return this.amount
  }

  isAllowed() {
    return true;
  }
}


class Withdrawal extends Transaction {

  get value() {
    return -this.amount
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

myAccount = new Account("Elvis Bun");

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
console.log(t1.commit());

const t2 = new Withdrawal(50.00, myAccount);
console.log(t2.commit());

const t3 = new Withdrawal(80.00, myAccount);
console.log(t3.commit()); // EXPERIMENT: SHOULD NOT PRINT bc false (80 is more than what you have left in the account)

const t4 = new Deposit(40.00, myAccount);
console.log(t4.commit());

console.log('Ending Balance: ', myAccount.balance);

console.log('Account Transaction History: ', myAccount.transactions);


// Circular reference  -- when I run it, transactions: [Circular *1] -- don't worry about it
