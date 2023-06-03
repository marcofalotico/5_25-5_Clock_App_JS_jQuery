/* Uso jQuery per rendere manipolabili e modificabili le variabili dei vari timer.
Prima imposto la document ready function, che esegue ciò che sta al suo interno dopo che è stato compilato tutto il codice */
$(document).ready(function () {
	// Global variables
	let breakCtr = 5;
	let sessionCtr = 25;
	let tmp = "";
	let isPlay = false;
	let dispVal = 0;
	let dispValMin = 0;
	let dispValSec = 0;
	let setInt_ID = 0;
	let isBreak = false;

	// Code start
	$("#break-length").text(breakCtr);
	$("#session-length").text(sessionCtr);
	tmp = sessionCtr + ":" + "00";
	$("#time-left").text(tmp);

	// Aumento e decremento con i bottoni SOLO quando il timer è spento (isPlay===false), aumentando solo fino max 60 e min 1
	if (isPlay === false) {
		$("#break-increment").click(() => {
			if (breakCtr < 60) {
				breakCtr += 1;
				$("#break-length").text(breakCtr);
			}
		});
		$("#break-decrement").click(() => {
			if (breakCtr > 1) {
				breakCtr -= 1;
				$("#break-length").text(breakCtr);
			}
		});
		$("#session-increment").click(() => {
			if (sessionCtr < 60) {
				sessionCtr += 1;
				$("#session-length").text(sessionCtr);
			}
			tmp = sessionCtr + ":" + "00";
			$("#time-left").text(tmp);
		});
		$("#session-decrement").click(() => {
			if (sessionCtr > 1) {
				sessionCtr -= 1;
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
        dispValMin < 10 ? min = "0" + dispValMin : min = dispValMin;
        dispValSec < 10 ? sec = "0" + dispValSec : sec = dispValSec;
        // aggiorno quindi il display del timer con il nuovo formato
        $("#time-left").text(min + ":" + sec);
    }

	const updateTimer = () => {
		if (isBreak === false) {
			// countdown session length
			if (dispValMin >= 1 && dispValSec === 0) {
				dispValSec = 59;
				dispValMin -= 1;
				updateDisplay();
			} else if (dispValMin >= 0 && dispValSec !== 0) {
				dispValSec -= 1;
				updateDisplay();
			} else if (dispValMin === 0 && dispValSec === 0) {
				isBreak = true;
				dispValMin = breakCtr;
				dispValSec = 0;
				$("#timer-label").text("Break");
				document.getElementById("beep").play();
				document.getElementById("beep").muted = false;
				updateDisplay();
			}
		} else if (isBreak) {
			// countdown break length, uguale al precedente se non per l'ultimo else if statement
			if (dispValMin >= 1 && dispValSec === 0) {
				dispValSec = 59;
				dispValMin -= 1;
				updateDisplay();
			} else if (dispValMin >= 0 && dispValSec !== 0) {
				dispValSec -= 1;
				updateDisplay();
			} else if (dispValMin === 0 && dispValSec === 0) {
				isBreak = false;
				dispValMin = sessionCtr;
				dispValSec = 0;
				$("#timer-label").text("Session");
				document.getElementById("beep").play();
				document.getElementById("beep").muted = false;
				updateDisplay();
			}
		}
	};

	// quando clicco play/stop
	$("#start_stop").click(function () {
		dispVal = $("#time-left").text().split(":");
		dispValMin = parseInt(dispVal[0]);
		dispValSec = parseInt(dispVal[1]);

		if (isPlay === false) {
			// start timer...
			// setInterval (funzione callback, intervallo di tempo in ms)
			isPlay = true;
			setInt_ID = setInterval(updateTimer, 1000);
		} else {
			// stop timer...
			// clearInterval(ID)
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
        tmp = sessionCtr + ":" + "00";
        $("#time-left").text(tmp);
        $("#time-label").text("Session");
        clearInterval(setInt_ID);
        isPlay = false;
        isBreak = false;
        let clip = document.getElementById("beep");
        clip.pause();
        clip.currentTime = 0;
    });
});
