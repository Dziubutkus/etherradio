var mockAddress = "0xEc301A8516e5FadE516e01929d56E30a9CfbD8ae";
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

    $('#jp-play').click(function() {
        console.log(defaultAccount);
        window.radioContract.methods.listen().send({from: defaultAccount}, function(err, resp) {
            console.error(err);
            console.warn(resp);
            console.log("dsankjfhsakjfn")

        })
            .on('transactionHash', function (hash) {
                console.log("asdasklflaskfmklamflkasmf")
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

            })
            .on('receipt', function (receipt) {
                /* jPlayer! */

            });
    });

    $(".portis-button").click(function() {
        $("#jquery_jplayer_1").jPlayer("play");
    })


    /*
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
     */
	
});

