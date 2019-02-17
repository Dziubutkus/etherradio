var mockAddress = "0x0f138740e225f0DA140e32F1594DD4257CEaf036";
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


/*
// Checking if user have existing web3 provider
//if (typeof web3 !== 'undefined') {
    //web3.eth.defaultAccount = web3.currentProvider.selectedAddress;

    // Join Smart Contract
    var mockABI = $.getJSON("json/MockABI.json", function(contractABI) {
        window.lotteryContract = new web3.eth.Contract(contractABI, window.mockAddress);
        // window.lotteryContract = lotteryContractABI.at(window.lotteryAddress);
    });

//}
*/
// Website on load processes
jQuery(document).ready(function ($) {
    "use strict";
	/*
    // Add information in website from MetaMask
    if (typeof web3 !== 'undefined') {
        console.warn("asdsad")

        setTimeout(function () {
            $('.w_address').html(web3.currentProvider.selectedAddress);
            web3.eth.getBalance(web3.currentProvider.selectedAddress, function (err, resp) {
                var balance = web3.utils.fromWei(resp, 'ether');
                $('.w_balance').html(balance + ' ETH');
            });
        }, 50);
    } else {
        $('.metamask-info').hide();
        $('.w_address, .w_balance').html('Error');
    }
	alert("Outside of jplayer");
	*/
	/* jPlayer! */
	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
		  $(this).jPlayer("setMedia", {
			mp3: "media/insomniac_olympics.flac",
			oga: "audio/TEDxPhoenix-KelliAnderson-DisruptiveWonderforaChange.ogg"
		  });
		},
		swfPath: "./js",
		supplied: "mp3,oga"
	});
	
});

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
