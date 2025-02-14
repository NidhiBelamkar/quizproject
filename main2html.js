

let quizhtml = [
    //HTML questions

{
    question: "What tag is used to define a hyperlink in HTML",
    options: ["a", "link","href","hyperlink"],
    correct: "a",
},
{
    question: "What is the purpose of break tag?",
    options: ["It makes text bold", "It creates a new paragraph","It inserts a line break. ","It adds a horizontal line"],
    correct: "It inserts a line break. ",
},
{
    question: "How do you add an image to a webpage?",
    options: ["img src=image.jpg","image src=image", "picture src=image.jpg","img href=image.jpg"],
    correct: "img src=image.jpg",
},
{
    question: "Which HTML tag is used to define a table cell?",
    options: ["td", "tr","th","table"],
    correct: "td",
},
{
    question: "Which attribute specifies the URL in an anchor tag for linking?",
    options: ["href", "link","src","None of these"],
    correct: "",
},
{
    question: "What HTML element is used for a top-level heading?",
    options: ["h1", "h6","header","title"],
    correct: "h1",
},
{
    question: "Which tag is used to make text bold?",
    options: ["b", "strong","Both a and b","em"],
    correct: "Both a and b",
},

{
    question: "How is document type initialized in HTML5?",
    options: ["!DOCTYPE html", "DOCTYPE", "HTML5", "!HTML"],
    correct: "!DOCTYPE html"
},
{
    question: "Which of the following refers to a formatting tag?",
    options: ["b", "p", "i", "div"],
    correct: "b"
},
{
    question: "HTML stands for?",
    options: ["HyperText Markup Language", "Hyper Transfer Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language"],
    correct: "HyperText Markup Language"
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

quizhtml = shuffleArray(quizhtml);

const resetLocalStorage = () => {
    for(i = 0; i < MAX_QUESTIONS; i++){
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();



const checkAnswer = (e) =>{
    let userAnswer = e.target.textContent;
    if (userAnswer === quizhtml[questionNumber].correct){
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
    question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizhtml
        [questionNumber].question}`;

    const shuffledOptions = shuffleArray(quizhtml[questionNumber].options)


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
    quizhtml = shuffleArray(quizhtml);
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
        const correctAnswer = quizhtml[i].correct;

        let answeredCorrectly = userAnswer === correctAnswer;

        if (!answeredCorrectly){
            resultItem.classList.add("incorrect");
        }





        resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
            quizhtml[i].question

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
