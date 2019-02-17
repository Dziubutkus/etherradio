var mockAddress = "0x9a6cD521EE8d43A17Be8138f962793385Cee158E";
var mockContract = null;

// Declare web3 library
//if (typeof web3 !== 'undefined') {
    //web3 = new Web3(web3.currentProvider);
//} else {
    // web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/ef4aee25daf64b56904871052a066b2b"));
//}


const portis = new Portis('77564852-ff04-44f9-96f8-568084ee641d', 'rinkeby');
const web3 = new Web3(portis.provider);
portis.provider.enable().then(console.log)

let defaultAccount;
portis.onLogin((walletAddress, email) => {
    $('.w_address').html(walletAddress);
    defaultAccount = walletAddress;
});


// Checking if user have existing web3 provider
if (typeof web3 !== 'undefined') {
    web3.eth.defaultAccount = web3.currentProvider.selectedAddress;
    console.log("lox");
    var mockABI = $.getJSON("json/MockABI.json", function(contractABI) {
        window.radioContract = new web3.eth.Contract(contractABI, window.mockAddress);
        //window.lotteryContract = lotteryContractABI.at(window.lotteryAddress);
    });

}

// Website on load processes
jQuery(document).ready(function ($) {
    "use strict";

    $('#play').click(function() {
        console.log(defaultAccount);
        window.radioContract.methods.listen().send({from: defaultAccount}, function(err, resp) {
            console.error(err);
            console.warn(resp);
        })
            .on('transactionHash', function (hash) {
                alert('Please wait, you will get your ticket soon!');
            })
            .on('receipt', function (receipt) {
                alert('Your ticket arrived!');
                //getAndUpdateInfoFromSC();
            });
    });
    // Add information in website from MetaMask
    /*
    if (typeof web3 !== 'undefined') {
        console.warn("asdsad")

        setTimeout(function () {
            $('.w_address').html(web3.currentProvider.selectedAddress);
            web3.eth.getBalance(web3.currentProvider.selectedAddress, function (err, resp) {
                var balance = web3.utils.fromWei(resp, 'ether');
                $('.w_balance').html(balance + ' ETH');
            });
        }, 50);
    }
    */
});
/*
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();

    if (hour < 10) 	hour = '0'+hour;
    if (min < 10) 	min = '0'+min;
    if (sec < 10) 	sec = '0'+sec;

    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}
*/