

let quizcss = [
    //CSS questions

    {
        question: "Which of the following tag is used to embed CSS in an HTML page?",
        options: ["style", "css", "script", "link"],
        correct: "style"
    },
    {
        question: "Which of the following has introduced text, list, box, margin, border, color, and background properties?",
        options: ["HTML", "CSS", "JavaScript", "PHP"],
        correct: "CSS"
    },
    {
        question: "Which of the following CSS selectors are used to specify a group of elements?",
        options: ["ID Selector", "Class Selector", "Universal Selector", "Group Selector"],
        correct: "Group Selector"
    },
    {
        question: "Which of the following CSS selector is used to specify a rule to bind a particular unique element?",
        options: ["ID Selector", "Class Selector", "Universal Selector", "Element Selector"],
        correct: "ID Selector"
    },
    {
        question: "Which of the following CSS property is used to make the text bold?",
        options: ["font-weight", "text-style", "text-decoration", "bold"],
        correct: "font-weight"
    },
    {
        question: "Which of the following is the correct syntax to link an external style sheet in the HTML file?",
        options: ["link rel='stylesheet' href='style.css'", "style src='style.css'", "script href='style.css'", "css-link='style.css'"],
        correct: "link rel='stylesheet' href='style.css'"
    },
    {
        question: "Which of the following is the correct way to apply CSS Styles?",
        options: ["Inline CSS", "Internal CSS", "External CSS", "All of the above"],
        correct: "All of the above"
    },
    {
        question: "Which of the following CSS property sets the font size of text?",
        options: ["text-size", "font-style", "font-size", "size"],
        correct: "font-size"
    },
    {
        question: "Which of the following CSS property controls how an element is positioned?",
        options: ["position", "display", "float", "align"],
        correct: "position"
    },
    {
        question: "Which of the following property is used to align the text in a table?",
        options: ["text-align", "table-align", "align", "position"],
        correct: "text-align"
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

quizcss = shuffleArray(quizcss);

const resetLocalStorage = () => {
    for(i = 0; i < MAX_QUESTIONS; i++){
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();



const checkAnswer = (e) =>{
    let userAnswer = e.target.textContent;
    if (userAnswer === quizcss[questionNumber].correct){
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
    question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizcss
        [questionNumber].question}`;

    const shuffledOptions = shuffleArray(quizcss[questionNumber].options)


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
    quizcss = shuffleArray(quizcss);
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
        const correctAnswer = quizcss[i].correct;

        let answeredCorrectly = userAnswer === correctAnswer;

        if (!answeredCorrectly){
            resultItem.classList.add("incorrect");
        }





        resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
            quizcss[i].question

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