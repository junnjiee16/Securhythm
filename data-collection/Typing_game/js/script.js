const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
window.onload = window.localStorage.clear();
let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);


function duration(timestamps) {
    var last = timestamps.pop();
    var durations = [];
    while (timestamps.length) {
        durations.push(last - (last = timestamps.pop()));
    }
    return durations.reverse();
  }
  
  function display(mills) {
    if (mills > 1000)
        return (mills / 1000) + ' s';
    return mills + ' ms';
  }
  // Not perfect, but quickest to understand and build upon:
// Original https://www.sitepoint.com/community/t/javascript-how-to-make-laps-in-the-stopwatch/244936/2


    var hours = 00;
    var minutes = 00;
    var seconds = 00;
    var tens = 00;
    var aHours = document.getElementById("hours");
    var aMinutes = document.getElementById("minutes");
    var aSeconds = document.getElementById("seconds");
    var aTens = document.getElementById("tens");
    var Start = document.getElementById("start");
    var Stop = document.getElementById("stop");
    var reset = document.getElementById("reset");
    var clear = document.getElementById("clear");
    var Interval;
    var Lap = document.getElementById("lap");
    var Laps = document.getElementById("laps");
    var lapCount = 1;
    var lastLap = { hours: 0, minutes: 0, tens: 0, seconds: 0 };
  
    function leftPad(value) {
      return value < 10 ? "0" + value : value;
    }
    
    // localStorage detection
    function supportsLocalStorage() {
      return typeof(Storage)!== 'undefined';
    }
    
    $('#stop').hide();
  
    Start.onclick = function() {
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
      $('#stop').toggle();
      $('#start').toggle();
    };
  
    Stop.onclick = function() {
      clearInterval(Interval);
      $('#start').toggle();
      $('#stop').toggle();
    };
  
    reset.onclick = function() {
      clearInterval(Interval);
      hours = "00";
      minutes = "00";
      seconds = "00";
      tens = "00";
      aHours.innerHTML = hours;
      aMinutes.innerHTML = minutes;
      aSeconds.innerHTML = seconds;
      aTens.innerHTML = tens;
    };

    
    function startTimer() {
      
      tens++;
  
      if (tens < 9) {
        aTens.innerHTML = "0" + tens;
      }
  
      if (tens > 9) {
        aTens.innerHTML = tens;
      }
  
      if (tens > 99) {
        // console.log("seconds");
        seconds++;
        aSeconds.innerHTML = "0" + seconds;
        tens = 0;
        aTens.innerHTML = "0" + 0;
      }
  
      if (seconds > 9) {
        aSeconds.innerHTML = seconds;
      }
  
      if (seconds > 59) {
        // console.log("minutes");
        minutes++;
        aMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        aSeconds.innerHTML = "0" + 0;
        tens = 0;
        aTens.innerHTML = "0" + 0;
      }
  
      if (minutes > 9) {
        aMinutes.innerHTML = minutes;
      }
  
      if (minutes > 59) {
        // console.log("seconds");
        hours++;
        aHours.innerHTML = "0" + hours;
        minutes = 0;
        aMinutes.innerHTML = "0" + 0;
        seconds = 0;
        aSeconds.innerHTML = "0" + 0;
        tens = 0;
        aTens.innerHTML = "0" + 0;
      }
  
      if (hours > 9) {
        aHours.innerHTML = hours;
      }
    }
    
    
  
    // Run the support check
    if (!supportsLocalStorage()) {
      console.log('browser storage not supported')
      
      Lap.onclick = function() {
        var lapHours = hours - lastLap.hours;
        var lapMinutes = minutes - lastLap.minutes;
        if (lapMinutes < 0) {
          var lapMinutes = minutes - lastLap.minutes + 60;
        }
        var lapSeconds = seconds - lastLap.seconds;
        if (lapSeconds < 0) {
          var lapSeconds = seconds - lastLap.seconds + 60;
        }
        var lapTens = tens - lastLap.tens;
        if (lapTens < 0) {
          var lapTens = tens - lastLap.tens + 100;
        }
        lastLap = {
          tens: tens,
          seconds: seconds,
          minutes: minutes,
          hours: hours
        };
  
        Laps.innerHTML +=
          "<li>" +
          leftPad(lapHours) +
          ":" +
          leftPad(lapMinutes) +
          ":" +
          leftPad(lapSeconds) +
          ":" +
          leftPad(lapTens) +
          "</li>";
      };
      // Just clear laps list
      clear.onclick = function() {
        Laps.innerHTML = '';
      }
    } else {
  
      // HTML5 localStorage Support
      try {
        Lap.onclick = function() {
          var lapHours = hours - lastLap.hours;
          var lapMinutes = minutes - lastLap.minutes;
          if (lapMinutes < 0) {
            var lapMinutes = minutes - lastLap.minutes + 60;
          }
          var lapSeconds = seconds - lastLap.seconds;
          if (lapSeconds < 0) {
            var lapSeconds = seconds - lastLap.seconds + 60;
          }
          var lapTens = tens - lastLap.tens;
          if (lapTens < 0) {
            var lapTens = tens - lastLap.tens + 100;
          }
          lastLap = {
            tens: tens,
            seconds: seconds,
            minutes: minutes,
            hours: hours
          };
  
          Laps.innerHTML +=
            "<li>" +
            "Lap " + lapCount++ + " – " +
            leftPad(lapHours) +
            ":" +
            leftPad(lapMinutes) +
            ":" +
            leftPad(lapSeconds) +
            "." +
            leftPad(lapTens) +
            "</li>";
          
          localStorage.setItem('laps', JSON.stringify(Laps.innerHTML));
          // console.log(localStorage.getItem('laps'));
        };
  
        clear.onclick = function() {
          Laps.innerHTML = '';
          localStorage.removeItem('laps');
        }
      }
      
      catch (e) {
      
        // If any errors, catch and alert the user
        if (e == QUOTA_EXCEEDED_ERR) {
          alert('Quota exceeded!');
        }
      }
    
      if (localStorage.getItem('laps')) {
      
        // Retrieve the item
        var storedLaps = JSON.parse(localStorage.getItem('laps'));
        $('#laps').html(storedLaps);
        // console.log(localStorage.getItem('laps'));
      }
    }


  var durations = [];
  var timestamps = [];
  var words = [];
  //upon keypress start timer
  $(document).keypress(function(e) { Start.click(); });
  $(document).keypress(function(e) { Lap.click(); });
  $('#in').keydown(function (e) {
    //Second iteration keypress event
    
    durations.push($.now());
  }).keyup(function (e) {
    var current = durations;
    current.push($.now());
    durations = [];
    var timeElapsed = current[current.length - 1] - current[0];

    // find the interval between each press, current time - last key press time
    var time_interval = (duration(current)) 

    timestamps.push(time_interval);
    words.push(e.keyCode)
    console.log(time_interval)
    console.log([
        ['Key code:', e.keyCode].join(' '),
        ['Key hold length:', display(timeElapsed)].join(' '),
        ['Interval between each key press:', ].join(' ')
    ].join(' --- '));
    
  });

  function lap() {
    lapNow = `<div class="lap">${hours} : ${minutes} : ${seconds} : ${miliseconds}</div>`;
    words.innerHTML += lapNow;
  }
  