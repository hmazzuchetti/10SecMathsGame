$(document).ready(function(){
    var currentQuestion;
    var interval;
    var timeLeft = 10;
    var score = 0;
    
    var updateTimeLeft = function (amount) {
      timeLeft += amount;
      $('#time-left').text(timeLeft);
    };
    
    var updateScore = function (amount) {
      score += amount;
      $('#score').text(score);
    };
    
    var startGame = function () {
      if (!interval) {
        if (timeLeft === 0) {
          updateTimeLeft(10);
          updateScore(-score);
        }
        interval = setInterval(function () {
          updateTimeLeft(-1);
          if (timeLeft === 0) {
            clearInterval(interval);
            interval = undefined;
          }
        }, 1000);  
      }
    };
    
    var randomNumberGenerator = function (size) {
      return Math.ceil(Math.random() * size);
    };
    
    var questionGenerator = function () {
      var question = {};
      var num1 = randomNumberGenerator(10);
      var num2 = randomNumberGenerator(10);
      
      question.answer = num1 + num2;
      question.equation = String(num1) + " + " + String(num2);
      
      return question;
    };

    var questionGeneratorMinus = function () {
      var question = {};
      var num1 = randomNumberGenerator(10);
      var num2 = randomNumberGenerator(10);

      var bigger = Math.max(num1, num2);
      var minor = Math.min(num1, num2);
      
      question.answer = bigger - minor;
      question.equation = String(bigger) + " - " + String(minor);
      
      return question;
    };

    var questionGeneratorDivision = function () {
      var question = {};
      var divisor = Math.floor(Math.random() * 9) + 1;
      var quotient = Math.floor(Math.random() * 10) + 1;
      var dividend = divisor * quotient;
      
      question.answer = dividend / divisor;
      question.equation = String(dividend) + " / " + String(divisor);
      
      return question;
    };

    var questionGeneratorMultiplication = function () {
      var question = {};
      var num1 = randomNumberGenerator(10);
      var num2 = randomNumberGenerator(10);
      
      question.answer = num1 * num2;
      question.equation = String(num1) + " * " + String(num2);
      
      return question;
    };
    
    var renderNewQuestion = function () {
      if(btnMinor) {
        currentQuestion = questionGeneratorMinus();
      } else if (btnDivision) {
        currentQuestion = questionGeneratorDivision();
      } else if (btnMultiplication) {
        currentQuestion = questionGeneratorMultiplication();
      } else {
        currentQuestion = questionGenerator();
      }
      $('#equation').text(currentQuestion.equation);  
    };
    
    var checkAnswer = function (userInput, answer) {
      if (userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
      }
    };

    var btnMinor = false;
    var btnDivision = false;
    var btnMultiplication = false; 

    $(document).on('click', '#minor', function () {
      btnMinor = true;
      btnDivision = false; 
      btnMultiplication = false;
      renderNewQuestion();
     });

     $(document).on('click', '#division', function () {
      btnMinor = false;
      btnDivision = true; 
      btnMultiplication = false;
      renderNewQuestion();
     });

     $(document).on('click', '#multiplication', function () {
      btnMinor = false;
      btnDivision = false; 
      btnMultiplication = true;
      renderNewQuestion();
     });

     $(document).on('click', '#sum', function () {
      btnMinor = false;
      btnDivision = false; 
      btnMultiplication = false;
      renderNewQuestion();
     });
    
    $('#user-input').on('keyup', function () {
      startGame();
      checkAnswer(Number($(this).val()), currentQuestion.answer);
    });
    
    renderNewQuestion();
  });