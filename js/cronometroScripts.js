var tempo;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        tempo = seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          alert("O tempo acabou");
          contaPontuacao(0);
          window.location.replace("./telaDeEsperaResultadoCR.html");
            timer = duration;
        }
    }, 1000);
}

function getTempo(){
    return tempo;
}

window.onload = function () {
    var fiveMinutes = (60 * .5),
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};