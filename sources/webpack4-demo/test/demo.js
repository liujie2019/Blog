const Transaction = require('../Util/Transaction');

// 我们自定义的Transaction

function MyTransaction() {}

console.log(Transaction.Mixin);
Object.assign(MyTransaction.prototype, Transaction.Mixin, {
    getTransactionWrappers: function () {
        return [{
            initialize: function () {
                console.log('before method perform');
            },
            close: function () {
                console.log('after method perform');
            }
        }];
    }
});

const transaction = new MyTransaction();
const testMethod = function () {
    console.log('MyTransaction test');
};
transaction.perform(testMethod);
