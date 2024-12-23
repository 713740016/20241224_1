// 題目資料
const questions = [
    {
        question: "電腦開機時，我們應該先按下哪個按鈕？",
        options: [
            "螢幕上的按鈕",
            "電腦主機的開機鍵",
            "滑鼠上的滾輪",
            "鍵盤上的空白鍵"
        ],
        answer: 1
    },
    {
        question: "在電腦上，輸入文字主要使用什麼工具？",
        options: [
            "滑鼠",
            "耳機",
            "鍵盤",
            "印表機"
        ],
        answer: 2
    },
    {
        question: "當我們在網路上搜尋資料時，應該注意什麼？",
        options: [
            "確認資料來源是否正確",
            "點擊所有跳出來的廣告",
            "隨便相信任何網頁的內容",
            "下載所有圖片"
        ],
        answer: 0
    },
    {
        question: "要關閉電腦，我們應該怎麼做？",
        options: [
            "按螢幕上的關機按鈕",
            "直接拔掉電源線",
            "按鍵盤上的任意按鍵",
            "使用系統的「開始」功能選擇「關機」"
        ],
        answer: 3
    },
    {
        question: "電腦的作用是什麼？",
        options: [
            "玩遊戲和看影片",
            "寫作業和查資料",
            "進行計算和學習新知識",
            "以上皆是"
        ],
        answer: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

// 初始化測驗
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    const nextButton = document.getElementById('next-btn');
    const submitButton = document.getElementById('submit-btn');
    
    nextButton.addEventListener('click', handleNextButton);
    submitButton.addEventListener('click', handleSubmitButton);
    
    showQuestion();
}

// 顯示當前題目
function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestion = questions[currentQuestionIndex];
    
    const questionHTML = `
        <div class="question">
            <h2>第 ${currentQuestionIndex + 1} 題</h2>
            <p>${currentQuestion.question}</p>
            <div class="options">
                ${currentQuestion.options.map((option, index) => `
                    <div class="option">
                        <input type="radio" id="option${index}" name="answer" value="${index}">
                        <label for="option${index}">${option}</label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    questionContainer.innerHTML = questionHTML;
    updateButtons();
}

// 處理下一題按鈕
function handleNextButton() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('請選擇一個答案！');
        return;
    }
    
    if (parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
        score++;
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
}

// 處理提交按鈕
function handleSubmitButton() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('請選擇一個答案！');
        return;
    }
    
    if (parseInt(selectedOption.value) === questions[currentQuestionIndex].answer) {
        score++;
    }
    
    showResults();
}

// 更新按鈕顯示狀態
function updateButtons() {
    const nextButton = document.getElementById('next-btn');
    const submitButton = document.getElementById('submit-btn');
    
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.classList.add('hide');
        submitButton.classList.remove('hide');
    } else {
        nextButton.classList.remove('hide');
        submitButton.classList.add('hide');
    }
}

// 顯示結果
function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('message');
    
    const percentageScore = (score / questions.length) * 100;
    
    quizContainer.classList.add('hide');
    resultsContainer.classList.remove('hide');
    scoreElement.textContent = `${percentageScore}分`;
    
    if (percentageScore === 100) {
        messageElement.textContent = '很厲害！';
    } else if (percentageScore < 60) {
        messageElement.textContent = '再加油！';
    }
}

// 當頁面載入完成時初始化測驗
document.addEventListener('DOMContentLoaded', initQuiz);