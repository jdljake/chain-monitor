const fetch = require('node-fetch');
const threshhold = 50;
var bigNumArray = [];
var labels = [];

console.log("\n");

fetch('https://blockchain.info/latestblock')
    .then(res => res.json())
    .then(json => inspectBlock(json));

function inspectBlock(json){
    var newBlockHash = json.hash;
    var url = 'https://blockchain.info/rawblock/' + newBlockHash;
    fetch(url)
    .then(res => res.json())
    .then(json => searchTransactions(json.tx));
}

function searchTransactions(transactionsArray){
    for(i in transactionsArray){
        var currentTransaction = transactionsArray[i];
        if(getOutput(currentTransaction) > threshhold){
            transactionSummary(currentTransaction);
        }
    }
    order();
}

function getOutput(json){
    // console.log(json.out);
    var total = 0;
    for(i in json.out){
        total += json.out[i].value;
    }
    total /= 100000000;
    // console.log(total);
    return total;
}

function transactionSummary(transaction){
    console.log(transaction.hash);
    console.log(getOutput(transaction));
    bigNumArray.push(getOutput(transaction));
}

function order(){
    console.log("\n");
    var labels = [];
    bigNumArray = bigNumArray.sort();
    for(i in bigNumArray){
        labels.push("Orange");
        console.log(bigNumArray[i]);
    }
    console.log(labels);
    console.log(bigNumArray);
}