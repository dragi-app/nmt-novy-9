// Mini-game 9: Final Duel with the Old Orthographer

// Generate stars for the dynamic background
function createStars(count) {
  const container = document.getElementById('star-container');
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDelay = (Math.random() * 4) + 's';
    container.appendChild(star);
  }
}

// Define the tasks for the final duel
const tasks = [
  {
    question:
      'Виберіть правильний варіант для половини острова:',
    options: ['півострова', 'пів острова'],
    correct: 1,
    explanation:
      'Коли йдеться про половину чогось, «пів» пишемо окремо: «пів острова». Разом пишемо, коли маємо на увазі ціле поняття, наприклад «півострів».',
  },
  {
    question: 'Як слід написати: половина міста:',
    options: ['півміста', 'пів міста'],
    correct: 1,
    explanation:
      'Половину міста передаємо словосполученням «пів міста»: «пів» вживаємо окремо від іменника.',
  },
  {
    question: 'Виберіть правильний варіант: частина світу – це…',
    options: ['півкуля', 'пів куля'],
    correct: 0,
    explanation:
      'Цілісне поняття пишемо разом: «півкуля». Якщо мова про половину кулі, то «пів кулі».',
  },
  {
    question: 'Яке написання правильне за новим правописом:',
    options: ['міні-спідниця', 'мініспідниця'],
    correct: 1,
    explanation:
      'Новий правопис рекомендує писати слова з першими компонентами міні-, максі-, віце-, веб- разом: «мініспідниця», «вебдизайн»【717812115751750†L115-L127】.',
  },
  {
    question: 'Правильний варіант написання:',
    options: ['віце-президент', 'віцепрезидент'],
    correct: 1,
    explanation:
      'Перші компоненти віце-, екс-, міні- та інші пишемо разом із наступним словом: «віцепрезидент»【717812115751750†L115-L127】.',
  },
  {
    question: 'Родовий відмінок слова «радість» – які форми є правильними?',
    options: [
      'обидві форми (радості та радости)',
      'лише «радості»',
      'лише «радости»',
    ],
    correct: 0,
    explanation:
      'У новому правописі припускаються обидва закінчення -і та -и в родовому відмінку для деяких іменників: «радості / радости»【552749316055334†L200-L206】.',
  },
  {
    question: 'Назва міста у родовому відмінку: Лондона чи Лондону?',
    options: ['обидві форми', 'лише «Лондона»', 'лише «Лондону»'],
    correct: 0,
    explanation:
      'Іменники чоловічого роду на -он у родовому відмінку можуть мати закінчення -а і -у: «Лондона» й «Лондону»【552749316055334†L200-L206】.',
  },
  {
    question: 'Виберіть правильне написання:',
    options: ['фойє', 'фоє'],
    correct: 1,
    explanation:
      'Подвоєне «й» у словах іншомовного походження скасовано: правильно «фоє», «мая», «Феєрбах»【909614211959312†L570-L594】.',
  },
  {
    question: 'Правильне написання прізвища англійського письменника:',
    options: ['Діккенс', 'Дікенс'],
    correct: 1,
    explanation:
      'Комбінація -ck- у прізвищах іншомовного походження передає один звук [к], тому пишемо одну «к»: «Дікенс»【329601089395828†L32-L35】.',
  },
  {
    question: 'Який варіант правильний:',
    options: ['священик', 'священник'],
    correct: 1,
    explanation:
      'Коли збігаються однакові приголосні основи та суфікса, подвоєння зберігається: «священник», «письменник»【375968656368826†L19-L22】.',
  },
  {
    question: 'Виберіть правильний варіант запису:',
    options: ['Я побачив це у TikTok', 'Я побачив це у тіктоці'],
    correct: 1,
    explanation:
      'Назви соцмереж пишемо з малої літери, транслітеруємо та відмінюємо: «у тіктоці», «у фейсбуці»【891436941313645†L0-L18】.',
  },
  {
    question: 'Правильний варіант:',
    options: ['проект', 'проєкт'],
    correct: 1,
    explanation:
      'Звук [je] у запозичених словах передаємо літерою «є», тому правильно: «проєкт»【501493046740655†L96-L105】.',
  },
  {
    question: 'Як правильно звернутися до людини:',
    options: ['Шановний пане Ігоре', 'Шановний пане Ігорю'],
    correct: 1,
    explanation:
      'За новим правописом ім’я «Ігор» у кличному та давальному відмінках має форму «Ігорю», тож правильно писати «Шановний пане Ігорю!»【710138360636224†L77-L81】.',
  },
];

// Game state variables
let currentIndex = 0;
const totalTasks = tasks.length;
let hpLeft = totalTasks;
let correctCount = 0;
const playerLivesCount = 2;
let livesLeft = playerLivesCount;

// DOM elements
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const hpFill = document.querySelector('.hp-fill');
const currentTaskSpan = document.getElementById('current-task');
const totalTasksSpan = document.getElementById('total-tasks');
const questionArea = document.getElementById('question-area');
const optionsArea = document.getElementById('options-area');
const explanationEl = document.getElementById('explanation');
const finishScreen = document.getElementById('finish-screen');
const generalProgressFill = document.querySelector('.general-progress-fill');
const generalProgressText = document.querySelector('.general-progress-text');
const playerLivesContainer = document.getElementById('player-lives');
const gameOverScreen = document.getElementById('game-over-screen');
const retryBtn = document.getElementById('retry-btn');

// Initialize environment on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  createStars(80);
  totalTasksSpan.textContent = totalTasks;
  updateLives();
});

// Start the duel when clicking the button
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  // Set HP bar full
  hpLeft = totalTasks;
  updateHpBar();
  // Reset state variables
  currentIndex = 0;
  correctCount = 0;
  // Reset player lives
  livesLeft = playerLivesCount;
  updateLives();
  // Show first task
  showTask();
});

// Display the current task
function showTask() {
  if (currentIndex >= totalTasks) {
    finishGame();
    return;
  }
  const task = tasks[currentIndex];
  // Update task progress
  currentTaskSpan.textContent = currentIndex + 1;
  // Set question text
  questionArea.textContent = task.question;
  questionArea.classList.remove('correct', 'incorrect');
  // Clear options
  optionsArea.innerHTML = '';
  // Hide explanation initially
  explanationEl.classList.add('hidden');
  // Build array of option objects with correctness flag
  const optionObjects = task.options.map((text, idx) => {
    return { text: text, isCorrect: idx === task.correct };
  });
  // Shuffle options to randomize correct answer position
  for (let i = optionObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionObjects[i], optionObjects[j]] = [optionObjects[j], optionObjects[i]];
  }
  // Create buttons for shuffled options
  optionObjects.forEach((optObj) => {
    const btn = document.createElement('button');
    btn.textContent = optObj.text;
    btn.classList.add('option-btn');
    btn.addEventListener('click', () => handleOptionSelection(optObj.isCorrect));
    optionsArea.appendChild(btn);
  });
}

// Handle user selection
function handleOptionSelection(isCorrect) {
  const task = tasks[currentIndex];
  // Disable all buttons
  const buttons = optionsArea.querySelectorAll('button');
  buttons.forEach((b) => {
    b.disabled = true;
  });
  // Mark question area style and adjust HP/lives
  if (isCorrect) {
    questionArea.classList.add('correct');
    hpLeft--;
    correctCount++;
    updateHpBar();
  } else {
    questionArea.classList.add('incorrect');
    // Reduce player lives
    livesLeft--;
    if (livesLeft < 0) livesLeft = 0;
    updateLives();
  }
  // Show explanation
  explanationEl.textContent = task.explanation;
  explanationEl.classList.remove('hidden');
  // After delay decide next step
  setTimeout(() => {
    if (livesLeft <= 0) {
      gameOver();
    } else {
      currentIndex++;
      if (hpLeft <= 0 || currentIndex >= totalTasks) {
        finishGame();
      } else {
        showTask();
      }
    }
  }, 2500);
}

// Update HP bar width
function updateHpBar() {
  const percent = (hpLeft / totalTasks) * 100;
  hpFill.style.width = percent + '%';
}

// Render player lives (hearts)
function updateLives() {
  playerLivesContainer.innerHTML = '';
  for (let i = 0; i < playerLivesCount; i++) {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.textContent = '❤';
    if (i >= livesLeft) {
      heart.classList.add('lost');
    }
    playerLivesContainer.appendChild(heart);
  }
}

// Finish game and show final screen
function finishGame() {
  // Hide game container
  gameContainer.classList.add('hidden');
  // Show finish overlay
  finishScreen.classList.remove('hidden');
  // Set general progress bar to 9/9
  const percent = (9 / 9) * 100;
  generalProgressFill.style.width = percent + '%';
  generalProgressText.textContent = '9 / 9';
}

// Show game over screen when lives run out
function gameOver() {
  // Hide game container and finish screen if visible
  gameContainer.classList.add('hidden');
  finishScreen.classList.add('hidden');
  // Show game over overlay
  gameOverScreen.classList.remove('hidden');
}

// Retry handler to restart the duel
if (retryBtn) {
  retryBtn.addEventListener('click', () => {
    // Hide game over screen
    gameOverScreen.classList.add('hidden');
    // Reset lives and HP for new round via start screen
    // Show start screen to allow user to start again
    startScreen.classList.remove('hidden');
  });
}