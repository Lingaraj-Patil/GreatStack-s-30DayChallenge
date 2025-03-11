const Quiz = [
    {
        question: "What is the capital city of Karnataka?",
        options: ["Mysuru", "Bengaluru", "Hubli", "Mangalore"],
        correctAnswer: "Bengaluru",
    },
    {
        question: "Which famous river originates in the Western Ghats of Karnataka?",
        options: ["Godavari", "Krishna", "Kaveri", "Tungabhadra"],
        correctAnswer: "Kaveri",
    },
    {
        question: "What is the official language of Karnataka?",
        options: ["Kannada", "Telugu", "Malayalam", "Tamil"],
        correctAnswer: "Kannada",
    },
    {
        question: "Which city in Karnataka is known as the 'Silicon Valley of India'?",
        options: ["Mangalore", "Bengaluru", "Belgaum", "Mysuru"],
        correctAnswer: "Bengaluru",
    },
    {
        question: "What is the name of the UNESCO World Heritage site in Karnataka famous for its temples?",
        options: ["Belur", "Halebidu", "Hampi", "Pattadakal"],
        correctAnswer: "Hampi",
    },
];

const questionElement = document.getElementById("question");
const optionElement = document.getElementById("answer-buttons");
const nextElement = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState(); 
    const currentQuestion = Quiz[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, currentQuestion.correctAnswer));
        optionElement.appendChild(button);
    });
}

function resetState() {
    nextElement.style.display = "none";
    while (optionElement.firstChild) {
        optionElement.removeChild(optionElement.firstChild);
    }
}

function selectAnswer(selectedButton, correctAnswer) {
    const isCorrect = selectedButton.innerHTML === correctAnswer;
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }


    Array.from(optionElement.children).forEach((button) => {
        button.disabled = true;
        if (button.innerHTML === correctAnswer) {
            button.classList.add("correct");
        }
    });

    nextElement.style.display = "block";
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Quiz.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${Quiz.length}!`;
    nextElement.innerHTML = "Restart Quiz";
    nextElement.style.display = "block";
    nextElement.addEventListener("click", startQuiz);
}

nextElement.addEventListener("click", () => {
    if (currentQuestionIndex < Quiz.length) {
        showNextQuestion();
    } else {
        startQuiz();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    startQuiz();
});
