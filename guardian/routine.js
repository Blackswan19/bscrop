document.getElementById('startButton').addEventListener('click', function() {
    const goal = document.getElementById('goalInput').value;
    const time = document.getElementById('goalTime').value;

    if (goal) {
        const goals = JSON.parse(localStorage.getItem('userGoals')) || [];
        goals.push({ goal, time });
        localStorage.setItem('userGoals', JSON.stringify(goals));

        document.getElementById('goalInput').value = ''; // Clear input
        document.getElementById('goalTime').value = '12:00'; // Reset time input
        updateGoalList();
    } else {
        // alert("Enter a goal!");
    }
});
function updateGoalList() {
    const goals = JSON.parse(localStorage.getItem('userGoals')) || [];
    const goalList = document.getElementById('goalList');
    goalList.innerHTML = ''; // Clear previous goals

    goals.forEach((item, index) => {
        const goalItem = document.createElement('div');
        goalItem.classList.add('goal-item');

        const timeParts = item.time.split(':'); // Split the time string into hours and minutes
        const hours = parseInt(timeParts[0], 10); // Parse the hours as an integer
        const minutes = parseInt(timeParts[1], 10); // Parse the minutes as an integer

        let formattedTime;
        if (hours === 0) {
            formattedTime = `12:${minutes.toString().padStart(2, '0')} AM`; // Format as 12-hour format with AM/PM
        } else if (hours < 12) {
            formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} AM`;
        } else if (hours === 12) {
            formattedTime = `12:${minutes.toString().padStart(2, '0')} PM`;
        } else {
            formattedTime = `${(hours - 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} PM`;
        }

        goalItem.innerHTML = `
            <span>At : ${formattedTime} - ${item.goal}</span>
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