$(document).ready(function () {

    $("#startButton").on("click", function () {
        nextQuestion();
    });


    var questions = [
        {
            question: "This is the first question",
            answers: ["Q1answer1", "Q1answer2", "Q1answer3", "Q1answer4"],
            correctAnswer: 0
        },
        {
            question: "This is the second question",
            answers: ["Q2answer1", "Q2answer2", "Q2answer3", "Q2answer4"],
            correctAnswer: 1
        },
        {
            question: "This is the third question",
            answers: ["Q3answer1", "Q3answer2", "Q3answer3", "Q3answer4"],
            correctAnswer: 2
        },
        {
            question: "This is the fourth question",
            answers: ["Q4answer1", "Q4answer2", "Q4answer3", "Q4answer4"],
            correctAnswer: 3
        },
        {
            question: "This is the fifth question",
            answers: ["Q5answer1", "Q5answer2", "Q5answer3", "Q5answer4"],
            correctAnswer: 0
        },
        {
            question: "This is the sixth question",
            answers: ["Q6answer1", "Q6answer2", "Q6answer3", "Q6answer4"],
            correctAnswer: 0
        },
        {
            question: "This is the seventh question",
            answers: ["Q7answer1", "Q7answer2", "Q7answer3", "Q7answer4"],
            correctAnswer: 0
        },
        {
            question: "This is the eighth question",
            answers: ["Q8answer1", "Q8answer2", "Q8answer3", "Q8answer4"],
            correctAnswer: 0
        },
        {
            question: "This is the nineth question",
            answers: ["Q9answer1", "Q9answer2", "Q9answer3", "Q9answer4"],
            correctAnswer: 0
        },
        {
            question: "This is the tenth question",
            answers: ["Q10answer1", "Q10answer2", "Q10answer3", "Q10answer4"],
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
});
