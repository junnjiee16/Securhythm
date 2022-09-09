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
interval = []
var durations = [];
var key_hold_duration = []
var words = [];
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

var last;
var output = $('#output');
$('#in').on('input', function() {
    var n = new Date()
    output.text((last - n) + ' ms')
    value = last-n
    last = n
    interval.push((value))
});

  //upon keypress start time
  $('#in').keydown(function (e) {               
    //Second iteration keypress event
    
    durations.push($.now());
  }).keyup(function (e) {
    if (e.keyCode == 16 || e.keyCode==20){
        console.log("Irregal")
    }
    else{
        words.push(e.keyCode)
        var current = durations;
        current.push($.now());
        durations = [];
        var timeElapsed = current[current.length - 1] - current[0];
        console.log(words)
        
        // find the interval between each press, current time - last key press time
        key_hold_duration.push(display(timeElapsed))    
        console.log(key_hold_duration)
        console.log(interval)
    }


    // console.log([
    //     ['Key code:', e.keyCode].join(' '),
    //     ['Key hold length:', display(timeElapsed)].join(' ')
    // ].join(' --- '));
    
  });


  