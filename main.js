

let quizData = [
    {
        question: "HTML stands for _________",
        options: ["Hyper text makeup language", "Hyper tranfer machine language","Hyper text markup langauage","Hyper text language"],
        correct: "Hyper text markup langauage",
    },
    {
        question: "Which approach focuses on quality content, relevant keyword, and natural link building to improve search engine rankings?",
        options: ["Black hat SEO", "Gray hat SEO","White hat SEO","Shadow hat SEO"],
        correct: "White hat SEO",
    },
    {
        question: "Which of the following CSS selector are used to specify a group of elements?",
        options: ["tag", "id","class","None"],
        correct: "class",
    },
    {
        question: "Which HTML element is commonly used for grouping and structuring?",
        options: ["section", "div","span","article"],
        correct: "div",
    },
    {
        question: "Which of the folloing is true about FUNCTION",
        options: ["It is block of code", "Its is Independent","It is sequence of instruction","All of these"],
        correct: "It is block of code",
    },
    {
        question: "An example of a client in the client server model is_____",
        options: ["Web browser", "Web server","Database serrver router","Network"],
        correct: "Web browser",
    },
    {
        question: "Which one of the following is not a Java feature?",
        options: ["Object-oriented", "Use of pointers"," Portable","Dynamic and Extensible"],
        correct: "Object-oriented",
    },
    {
        question: "Which of the following is not an OOPS concept in Java?",
        options: ["Polymorphism", "Inheritance","Compilation","Encapsulation"],
        correct: "Compilation",
    },
    {
        question: "In order to upload a HTML file to a web server, you use",
        options: ["HTTP", "SMTP","TCP","FTP"],
        correct: "HTTP",
    },
    {
        question: "What is the tag for an inline frame?",
        options: ["iframe", "inframe","frame","inlineframe"],
        correct: "iframe",
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

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
    for(i = 0; i < MAX_QUESTIONS; i++){
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();



const checkAnswer = (e) =>{
    let userAnswer = e.target.textContent;
    if (userAnswer === quizData[questionNumber].correct){
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
    question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData
        [questionNumber].question}`;

    const shuffledOptions = shuffleArray(quizData[questionNumber].options)


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
    quizData = shuffleArray(quizData);
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
        const correctAnswer = quizData[i].correct;

        let answeredCorrectly = userAnswer === correctAnswer;

        if (!answeredCorrectly){
            resultItem.classList.add("incorrect");
        }





        resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
            quizData[i].question

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
    } else{
        console.error("nextBtn not found!");
    }
});
