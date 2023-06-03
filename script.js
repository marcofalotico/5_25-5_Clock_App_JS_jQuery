/* Uso jQuery per rendere manipolabili e modificabili le variabili dei vari timer.
Prima imposto la document ready function, che esegue ciò che sta al suo interno dopo che è stato compilato tutto il codice */
$(document).ready(function () {
	//Global Variables
	let breakCtr = 5;
	let sessionCtr = 25;
	let tmp = "";
	let isPlay = false;
	let dispVal;
	let dispValMin = 0;
	let dispValSec = 0;
	let setInt_ID = 0;
	let isBreak = false;

	//Code start
	$("#break-length").text(breakCtr);
	$("#session-length").text(sessionCtr);
	tmp = sessionCtr + ":" + "00";
	$("#time-left").text(tmp);

	// Aumento e decremento con i bottoni SOLO quando il timer è spento (isPlay===false), aumentando solo fino max 60 e min 1
	if (isBreak === false) {
		$("#break-increment").click(function () {
			if (breakCtr < 60) {
				breakCtr++;
				$("#break-length").text(breakCtr);
			}
		});
		$("#break-decrement").click(function () {
			if (breakCtr > 1) {
				breakCtr--;
				$("#break-length").text(breakCtr);
			}
		});
		$("#session-increment").click(function () {
			if (sessionCtr < 60) {
				sessionCtr++;
				$("#session-length").text(sessionCtr);
			}
			tmp = sessionCtr + ":" + "00";
			$("#time-left").text(tmp);
		});

		$("#session-decrement").click(function () {
			if (sessionCtr > 1) {
				sessionCtr--;
				$("#session-length").text(sessionCtr);
			}
			tmp = sessionCtr + ":" + "00";
			$("#time-left").text(tmp);
		});
	}

	// aggiorno il display del timer con il formato mm:ss
	const updateDisplay = () => {
		let min = "";
		let sec = "";
		if (dispValSec < 10) {
			sec = "0" + dispValSec;
		} else sec = dispValSec;
		if (dispValMin < 10) {
			min = "0" + dispValMin;
		} else min = dispValMin;
		// aggiorno quindi il display del timer con il nuovo formato
		$("#time-left").text(min + ":" + sec);
	};

	const updateTimer = () => {
		// countdown session length
		if (isBreak === false) {
			if (dispValMin >= 1 && dispValSec === 0) {
				//to update and display timer
				dispValSec = 59;
				dispValMin--;
				updateDisplay();
			} else if (dispValMin >= 0 && dispValSec !== 0) {
				//to update and display timer
				dispValSec--;
				updateDisplay();
			} else if (dispValMin === 0 && dispValSec === 0) {
				isBreak = true;
				dispValMin = breakCtr;
				dispValSec = 0;
				$("#timer-label").text("Break");
				updateDisplay();
				document.getElementById("beep").play();
				document.getElementById("beep").muted = false;
			}
		} else if (isBreak === true) {
			// countdown break length, uguale al precedente se non per l'ultimo else if statement
			if (dispValMin >= 1 && dispValSec === 0) {
				//to update and display timer
				dispValSec = 59;
				dispValMin--;
				updateDisplay();
			} else if (dispValMin >= 0 && dispValSec !== 0) {
				//to update and display timer
				dispValSec--;
				updateDisplay();
			} else if (dispValMin === 0 && dispValSec === 0) {
				isBreak = false;
				dispValMin = sessionCtr;
				dispValSec = 0;
				$("#timer-label").text("Session");
				updateDisplay();
				document.getElementById("beep").play();
				document.getElementById("beep").muted = false;
			}
		}
	};

	// quando clicco play/stop
	$("#start_stop").click(function () {
		dispVal = $("#time-left").text().split(":");
		dispValMin = parseInt(dispVal[0]);
		dispValSec = parseInt(dispVal[1]);

		if (isPlay === false) {
			//start the timer...
			isPlay = true;
			setInt_ID = setInterval(updateTimer, 1000);
		} else if (isPlay === true) {
			//stop the timer...
			isPlay = false;
			clearInterval(setInt_ID);
		}
	});

	// quando clicco il reset
	$("#reset").click(function () {
		breakCtr = 5;
		sessionCtr = 25;
		$("#break-length").text(breakCtr);
		$("#session-length").text(sessionCtr);
		clearInterval(setInt_ID);
		tmp = sessionCtr + ":" + "00";
		$("#time-left").text(tmp);
		$("#timer-label").text("Session");
		isPlay = false;
		isBreak = false;
		let clip = document.getElementById("beep");
		clip.pause();
		clip.currentTime = 0;
	});
});
