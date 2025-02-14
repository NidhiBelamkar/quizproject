//JAVA question
let quizjava = [

    {
        question: "Who invented Java Programming?",
        options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
        correct: "James Gosling"
    },
    {
        question: "Which statement is true about Java?",
        options: ["Java is a compiled language", "Java is an interpreted language", "Java is both compiled and interpreted", "Java is neither compiled nor interpreted"],
        correct: "Java is both compiled and interpreted"
    },
    {
        question: "Which one of the following is not a Java feature?",
        options: ["Object-Oriented", "Portable", "Use of pointers", "Robust"],
        correct: "Use of pointers"
    },
    {
        question: "Which of these cannot be used for a variable name in Java?",
        options: ["_variable", "123variable", "$variable", "myVariable"],
        correct: "123variable"
    },
    {
        question: "What is the extension of Java code files?",
        options: [".java", ".class", ".js", ".py"],
        correct: ".java"
    },
    {
        question: "Which environment variable is used to set the Java path?",
        options: ["JAVA_HOME", "JAVA_PATH", "JAVAC", "CLASSPATH"],
        correct: "JAVA_HOME"
    },
    {
        question: "Which of the below is not a Java Profiler?",
        options: ["JProfiler", "Eclipse MAT", "JConsole", "VisualVM"],
        correct: "Eclipse MAT"
    },
    {
        question: "Which of these are selection statements in Java?",
        options: ["if", "switch", "if and switch", "for and while"],
        correct: "if and switch"
    },
    {
        question: "What is the extension of compiled Java classes?",
        options: [".class", ".java", ".exe", ".jar"],
        correct: ".class"
    },
    {
        question: "Which of the following is not an OOPS concept in Java?",
        options: ["Encapsulation", "Polymorphism", "Exception Handling", "Abstraction"],
        correct: "Exception Handling"
    },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const optionsElement = document.querySelector(".quiz-container .options") || document.createElement("div");

const nextBtn = document.querySelector(".quiz-conatiner .next-btn");
const submitBtn = document.querySelector(".submit-btn");
const quizResult = document.querySelector(".quiz-result"); 

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 10;
const shuffleArray = (array) =>{
    return array.slice().sort(() => Math.random() - 0.5)
};
let timerInterval;

quizjava = shuffleArray(quizjava);

const resetLocalStorage = () => {
    for(i = 0; i < MAX_QUESTIONS; i++){
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();



const checkAnswer = (e) =>{
    let userAnswer = e.target.textContent;
    if (userAnswer === quizjava[questionNumber].correct){
        score++;
        e.target.classList.add("correct");

    }else{
        e.target.classList.add("incorrect");
    }

    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);


    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach(o => {
        o.classList.add("disabled");
    });
};

const createQuestion = () => {
    clearInterval(timerInterval);

    let secondsLeft = 9;
    const timerDisplay = document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");

    timerDisplay.textContent = `Time Left: 10 seconds`;

    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Time Left: ${secondsLeft.toString().padStart(2,'0')} seconds`;
        secondsLeft--;

        if (secondsLeft < 3){
            timerDisplay.classList.add("danger");
        }

        if (secondsLeft < 0){
            clearInterval(timerInterval);
            displayNextQuestion();
        }


    },1000);

    

    optionsElement.innerHTML = "";
    question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizjava
        [questionNumber].question}`;

    const shuffledOptions = shuffleArray(quizjava[questionNumber].options)


    shuffledOptions.forEach(o => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) =>{
            checkAnswer(e);
        });
        optionsElement.appendChild(option);
    });
};


const retakeQuiz = () => {
    questionNumber = 0;
    score =0;
    quizjava = shuffleArray(quizjava);
    resetLocalStorage();

    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
};



const displayQuizResult = () =>{
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);

    for (let i = 0; i < MAX_QUESTIONS; i++) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`)
        const correctAnswer = quizjava[i].correct;

        let answeredCorrectly = userAnswer === correctAnswer;

        if (!answeredCorrectly){
            resultItem.classList.add("incorrect");
        }





        resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
            quizjava[i].question

        }</div>
            <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
            <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

            quizResult.appendChild(resultItem);
    }

    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = 'Retake Quiz';
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);

};

createQuestion();

const displayNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1) {
        displayQuizResult();
        return;
    }

    questionNumber++;
    createQuestion();
    
};


document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.querySelector(".next-btn");

    if (nextBtn) {
        // Using an anonymous function
        nextBtn.addEventListener("click", () => {
            displayNextQuestion();  // Executes when clicked
        });
    } else {
        console.error("nextBtn not found!");
    }
});