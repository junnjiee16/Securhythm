const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
window.onload = window.localStorage.clear();
let timer,
maxTime = 200,
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
        console.log("Finished")
        console.log(words)
        console.log(key_hold_duration)
        console.log(interval)
        //make csv using arrays

        function toCsvRows(headers, columns) {
            const output = [headers]
            const numRows = columns.map(col => col.length)
              .reduce((a, b) => Math.max(a, b))
          
            for (let row = 0; row < numRows; row++) {
              output.push(columns.map(c => c[row] || ''))
            }
          
            return output
          }
          
          function toCsvString(data) {
            let output = ''
            data.forEach(row => output += row.join(',') + '\n')
            return output
          }
          
          function csvConstructor(headers, columns) {
            return toCsvString(toCsvRows(headers, columns))
          }


            const headers = ['words', 'key_hold_duration', 'interval']
            const columns = [words, key_hold_duration, interval]
            const csv = csvConstructor(headers, columns)
            console.log(csv)
            //save csv as file using file saver
            a=document.createElement('a');
            a.textContent='download';
            a.download="myFileName.csv";
            a.href='data:text/csv;charset=utf-8,'+escape(csv);
            document.body.appendChild(a);


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

    var interval = [];
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
    }   
    // Run the support check
    if (!supportsLocalStorage()) {
      console.log('browser storage not supported')
      
      Lap.onclick = function() {
        var lapTens = tens - lastLap.tens;
        if (lapTens < 0) {
          var lapTens = tens - lastLap.tens + 100;
        }
        lastLap = {
          tens: tens
        }

        console.log(interval)
        Laps.innerHTML +=
          "<li>" +
          leftPad(lapTens) +
          "</li>";
      }
      
      // Just clear laps list
      clear.onclick = function() {
        Laps.innerHTML = '';
      }
    } else {
  
      // HTML5 localStorage Support
      try {
        Lap.onclick = function() {
          var lapTens = tens - lastLap.tens;
          if (lapTens < 0) {
            var lapTens = tens - lastLap.tens + 100;
          }
          lastLap = {
            tens: tens
          };
          
          interval.push([
          leftPad(lapTens)])
          
          Laps.innerHTML +=
            "<li>" +
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
  var key_hold_duration = []
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
    console.log(words)
    console.log(key_hold_duration)
    console.log(interval)
    // find the interval between each press, current time - last key press time
    var time_interval = (duration(current)) 
    if(e.keyCode==8 || e.keyCode==16){
        console.log("backspace/shift")
    }
    else{
        words.push(e.keyCode)
        key_hold_duration.push(display(timeElapsed))
    }
    // console.log([
    //     ['Key code:', e.keyCode].join(' '),
    //     ['Key hold length:', display(timeElapsed)].join(' ')
    // ].join(' --- '));
    
  });

  function lap() {
    lapNow = `<div class="lap">${hours} : ${minutes} : ${seconds} : ${miliseconds}</div>`;
    words.innerHTML += lapNow;
  }
  