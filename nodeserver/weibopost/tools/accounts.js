/**
 * Date: 2013.01.31
 * To change this template use File | Settings | File Templates.
 */


var accounts = {};
var redis = require("redis");
var client = redis.createClient();

var globaldata = root.globaldata;

accounts.initializeAccounts = function () {
    globaldata.accounts = {};
    client.hgetall("weibo_tools_accounts", function (err, accountsStr) {
        for (accountName in accountsStr) {
            globaldata.accounts[accountName] = JSON.parse(accountsStr[accountName]);
        }
        console.log("accounts initialized.")
    });
};

accounts.addAccount = function (accountName, password, response) {
    if (globaldata.accounts[accountName] == null) {
        var account = {
            "accountName":accountName,
            "password":password,
            "ownedWeibo":{}
        }
        client.hset(["weibo_tools_accounts", account.accountName, JSON.stringify(account)], redis.print);
        globaldata.accounts[accountName] = account;
        response.write(JSON.stringify({"提示信息":"账户注册成功"}));
    }
    else {
        response.write(JSON.stringify({"提示信息":"账户名已被占用"}));
    }
}

accounts.addAccountOwnedWeibo = function (accountName, ownedWeibo, response) {
    var account = globaldata.accounts[accountName];
    if (account == null) {
        response.write(JSON.stringify({"提示信息":"账户权限错误"}));
    }
    else {
        if (account.ownedWeibo[ownedWeibo] == null) {
            account.ownedWeibo[ownedWeibo] = "true"
            client.hset(["weibo_tools_accounts", account.accountName, JSON.stringify(account)], redis.print);
            response.write(JSON.stringify({"提示信息":"添加授权管理微博账号成功"}));
        }
        else {
            response.write(JSON.stringify({"提示信息":"授权管理微博账号已添加，请勿重复操作"}));
        }
    }
}

module.exports = accounts;