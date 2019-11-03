$(document).ready(function () {

    $("#startButton").on("click", function () {
        nextQuestion();
    });


    var questions = [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            answers: ["scripting", "script", "javascript", "js"],
            correctAnswer: 1
        },
        {
            question: "What is the syntax for creating a function in JavaScript",
            answers: ["function = myFunction()", "function myFunction()", "function := myFunction()", "function : myFunction()"],
            correctAnswer: 1
        },
        {
            question: "How is the function called in JavaScript?",
            answers: ["call myFunction();", "call function myFunction();", "myFunction();", "function myFunction();"],
            correctAnswer: 2
        },
        {
            question: "What is the JavaScript syntax for printing values in Console?",
            answers: ["console.log(5);", "console.print(5);", "print.console(5);", "print(5)"],
            correctAnswer: 0
        },
        {
            question: " How to initialize an array in JavaScript?",
            answers: ["var arr= 1, 2, 3", "var arr= (1, 2, 3)", "var arr= {1, 2, 3}", "var arr= [1, 2, 3]"],
            correctAnswer: 3
        },
        {
            question: "What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?",
            answers: ["strip()", "trim()", "stripped()", "trimmed()"],
            correctAnswer: 1
        },
        {
            question: "Which of the following is an advantage of using JavaScript?",
            answers: ["Increased interactivity", "Less server interaction", "Immediate feedback", "All of the above"],
            correctAnswer: 3
        },
        {
            question: "Which function of an Array object calls a function for each element in the array?",
            answers: ["every()", "forEvery()", "forEach()", "each()"],
            correctAnswer: 2
        },
        {
            question: "What is the proper syntax to increase a variable by one",
            answers: ["i+", "i++", "i+++", "i++++"],
            correctAnswer: 1
        },
        {
            question: "What is the first index of an array",
            answers: ["0", "1", "2", "10"],
            correctAnswer: 0
        },
    ];

    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        ranNums = [],
        i = nums.length,
        j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
    }
    var qCount = 0;
    var currQuestion = 0;
    var time = 30;
    var interval;
    var score = 0;
    var name = "";

    function nextQuestion() {
        // console.log("Current Question index" + ranNums[qCount]);
        currQuestion = ranNums[qCount];
        $("#question").text(questions[currQuestion].question);
        $("#start").remove();
        $("#startButton").remove();
        startTimer();
            for (i = 0; i < questions[currQuestion].answers.length; i++) {
                $("#answer").remove();
                $(".buttonRow").remove();
            }
        for (i = 0; i < questions[currQuestion].answers.length; i++) {
            var rowButton = $("<div>");
            var answerButton = $("<button>");
            rowButton.addClass("row buttonRow");
            answerButton.attr("id", "answer");
            answerButton.attr("question-num", currQuestion);
            answerButton.attr("value", questions[currQuestion].answers.indexOf(questions[currQuestion].answers[i]));
            answerButton.addClass("btn btn-info btn-sm col-md-2 offset-md-3 mb-2");
            answerButton.html(questions[currQuestion].answers[i]);
            $(".container").append(rowButton);
            $(rowButton).append(answerButton);
        }
        qCount++;
    };
    function checkAnswer(answer){
        // console.log("Current Question index" + currQuestion);
        // console.log("Chosen answer " + answer);
        // console.log("Correct answer: " + questions[currQuestion].correctAnswer);
        if(parseInt(answer) === parseInt(questions[currQuestion].correctAnswer)){
            // alert("Correct!");
            score += time;
            console.log(score);
        }
        else
        {
            // alert("Wrong");
        }
    }
    $(document).on("click", "#answer", function () {
        checkAnswer(this.value);
        console.log(qCount);
        if (qCount > 9){
            scoreScreen();
            clearInterval(interval);
        }
        else
        {
            nextQuestion();
        }
    });
    function scoreScreen(){
        for (i = 0; i < questions[currQuestion].answers.length; i++) {
            $("#answer").remove();
            $(".buttonRow").remove();
        }
        $("#question").text("Complete!")
        var finalScore = $("<div>");
        var name = $("<label>")
        var input = $("<input>");
        var submit = $("<button>")
        finalScore.text("Your final score is: " + score);
        name.text("Please Enter your initials: ")
        name.addClass("name");
        input.addClass("ml-3")
        submit.addClass("btn btn-info btn-sm col-md-2 offset-md-3 mb-2 submit");
        submit.text("Submit");
        $(".container").append(finalScore);
        $(".container").append(name);
        $(".container").append(input);
        $(".container").append(submit);
    }
    function setTime(){
        $("#timer").text("Time: 30")
        time = 30;
    }
    function startTimer() {
        clearInterval(interval);
        setTime();
        interval = setInterval(function() {
          time--;
          $("#timer").text("Time: " + time);
          if (time < 1){
              nextQuestion();
          }
        }, 1000);
      }
      $(document).on("click", "#submit", function () {
          name = $(".name").value;
        storeScore(score, name);
      });
      function storeScore(score, name){
          localStorage.setItem("score", score);
          localStorage.setItem("name", name);
      }
      $(".highscores").on("click", function(){
        highscoreScreen();
      });

      function highscoreScreen(){

      }
});
