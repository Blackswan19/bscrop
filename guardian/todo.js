const punishments = [
    "Drink 2 bottles of water.",
    "Read a book for 30 minutes.",
    "Take a 10-minute walk.",
    "Organize your wardrobe.",
    "Write a gratitude journal for 10 minutes.",
    "Do 15 minutes of yoga or stretching.",
    "Clean your room for 30 minutes.",
    "Stay away from mobile devices for 2 hours.",
    "Write 1,000 words on a random topic.",
    "Spend 1 hour learning a new skill.",
    "Take a 2-hour walk.",
    "Do 50 squats.",
    "Go for a 30-minute jog or run.",
    "Take a cold shower for 5 minutes.",
    "Wake up at 4:30 AM tomorrow."
];

function getPunishmentForToday() {
    const startDate = new Date(2024, 0, 1);
    const today = new Date();
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const punishmentIndex = Math.floor(diffDays / 2) % punishments.length;
    return punishments[punishmentIndex];
}

function showPunishment() {
    const punishmentText = getPunishmentForToday();
    const lastCompletedPunishment = localStorage.getItem('lastCompletedPunishment');

    if (lastCompletedPunishment === punishmentText) {
        document.getElementById('punishment').innerText = "Completed";
        document.getElementById('doneButton').style.display = 'none';
    } else {
        document.getElementById('punishment').innerText = punishmentText;
        document.getElementById('doneButton').style.display = 'inline-block';
    }
}

document.getElementById('doneButton').addEventListener('click', function() {
    const currentPunishment = getPunishmentForToday();
    document.getElementById('punishment').innerText = "Completed";
    document.getElementById('doneButton').style.display = 'none';
    localStorage.setItem('lastCompletedPunishment', currentPunishment);
});

showPunishment();

document.getElementById('startButton').addEventListener('click', function() {
const goal = document.getElementById('goalInput').value;

if (goal) {
const goals = JSON.parse(localStorage.getItem('userGoals')) || [];
const startDate = Date.now(); // Store the start date as a timestamp
goals.push({ goal, startDate });
localStorage.setItem('userGoals', JSON.stringify(goals));

document.getElementById('goalInput').value = ''; // Clear input
updateGoalList();
} else {
alert("Please enter a goal before starting!");
}
});

function updateGoalList() {
const goals = JSON.parse(localStorage.getItem('userGoals')) || [];
const goalList = document.getElementById('goalList');
goalList.innerHTML = ''; // Clear previous goals

goals.forEach((item, index) => {
const today = Date.now(); // Get the current timestamp
const start = item.startDate; // Retrieve the start date timestamp
const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24)); // Calculate the difference in days
const goalItem = document.createElement('div');
goalItem.classList.add('goal-item');

goalItem.innerHTML = `
    <span>Goal: "${item.goal}" | No.of days: ${diffDays}</span>
    <button class="btn-delete" onclick="deleteGoal(${index})">X</button>
`;

goalList.appendChild(goalItem);
});
}

function deleteGoal(index) {
    const goals = JSON.parse(localStorage.getItem('userGoals')) || [];
    goals.splice(index, 1); // Remove the goal at the given index
    localStorage.setItem('userGoals', JSON.stringify(goals));
    updateGoalList(); // Refresh the goal list
}

function initializeGoalTracker() {
    updateGoalList();
}

initializeGoalTracker();
