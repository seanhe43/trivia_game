
document.addEventListener("DOMContentLoaded", () => {
    let test_cheat = "";
    //console.log(questions);

    let ind = 0;
    let score = 0;
    
    function showNextQuestion() {
        const answerContainer = document.getElementById("answer-container");
        answerContainer.innerHTML = "";
        if (ind < questions.length) {
            const question_text = "<div>" + questions[ind].question + "</div>";
            document.getElementById("question-container").innerHTML = question_text;
            let answers = questions[ind].incorrect_answers;
            let insert = Math.floor(Math.random() * answers.length + 1);
            answers.splice(insert, 0, questions[ind].correct_answer + test_cheat);
            //console.log(answers);
            for (let i = 0; i < answers.length; i++) {
                let label = document.createElement("label");
                let radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "options";
                radio.value = answers[i];

                label.innerHTML = '<input type="radio" name="options" value="' + answers[i] + '"> ' + answers[i];
                answerContainer.appendChild(label);
                answerContainer.appendChild(document.createElement("br"));
            }
            document.getElementById("question-count").innerText = `${ind+1}.`;
            document.getElementById("scorebox").innerText = `Score: ${score}/${ind}`;
        }
        else { //Game over
            document.getElementById("question-container").innerHTML = `Thanks for playing! <br>You scored ${score}/${ind} <br><a href="/score?score=${score}&total=${ind}">Play again?</a>`;
            document.getElementById("question-count").style.display = "none";
            document.getElementById("scorebox").style.display = "none";
            document.getElementById("submit-answer").style.display = "none";
            
        }
        
    }

    async function buttonClicked() {
        document.getElementById("submit-answer").disabled = true;
        let radios = document.getElementsByName("options");
        let val = "";
        for (let i = 0; i < radios.length; i++) {
            if(radios[i].checked) {
                val = radios[i].value;
                break;
            }
        }
        if(!(val === "")){
            if(val === questions[ind].correct_answer + test_cheat) {
                var res = "Correct!";
                score++;
            }
            else {
                var res = `Incorrect! The correct answer was: <strong>${questions[ind].correct_answer}.</strong>`;
            }
            
            document.getElementById("result").innerHTML = res;
            await new Promise(r => setTimeout(r, 1500));
            document.getElementById("result").innerHTML = "";
            ind++;
            showNextQuestion();
        }
        document.getElementById("submit-answer").disabled = false;
    }

    document.getElementById("submit-answer").addEventListener("click", buttonClicked);
    showNextQuestion();
    
});

