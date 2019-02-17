var mockAddress = "0x5fEA73469eC15ee5feC1E27E651b40F80BeECa42";
var mockContract = null;
// -------- Visualizer Vars
var canvas, ctx, center_x, center_y, radius, bars,
    x_end, y_end, bar_height, bar_width,
    frequency_array, src;

src = "media/insomniac_olympics.flac";

bars = 200;
bar_width = 2;
// ------ End Visualizer Vars --------


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
			audio.play();
			animationLooper();
	});
	/* jPlayer! */
	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
		  $(this).jPlayer("setMedia", {
			mp3: src,
			oga: "audio/TEDxPhoenix-KelliAnderson-DisruptiveWonderforaChange.ogg"
		  });
		},
		swfPath: "./js",
		supplied: "mp3,oga"
	});

	$("#exchange").click(function() {
        window.radioContract.methods.convert().send({from: defaultAccount, value: 1000000000000000}, function(err, resp) {
            console.error(err);
            console.warn(resp);
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

function initPage(){

    audio = document.getElementById("");
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();

    audio.src = src; // the source path
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);


    frequency_array = new Uint8Array(analyser.frequencyBinCount);


	animationLooper();
}

function animationLooper(){

    // set to the size of device
    canvas = document.getElementById("renderer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");

    // find the center of the window
    center_x = canvas.width / 2;
    center_y = (canvas.height / 2) - 75;
    radius = 150;

    // style the background
    var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0,"rgba(35, 7, 77, 1)");
    gradient.addColorStop(1,"rgba(204, 83, 51, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //draw a circle
    ctx.beginPath();
    ctx.arc(center_x,center_y,radius,0,2*Math.PI);
    ctx.stroke();

    analyser.getByteFrequencyData(frequency_array);
    for(var i = 0; i < bars; i++){

        //divide a circle into equal parts
        rads = Math.PI * 2 / bars;

        bar_height = frequency_array[i]*0.7;

        // set coordinates
        x = center_x + Math.cos(rads * i) * (radius);
	y = center_y + Math.sin(rads * i) * (radius);
        x_end = center_x + Math.cos(rads * i)*(radius + bar_height);
        y_end = center_y + Math.sin(rads * i)*(radius + bar_height);

        //draw a bar
        drawBar(x, y, x_end, y_end, bar_width,frequency_array[i]);

    }
    window.requestAnimationFrame(animationLooper);
}

// for drawing a bar
function drawBar(x1, y1, x2, y2, width,frequency){

    var lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}
