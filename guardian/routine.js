document.getElementById('addButton').addEventListener('click', function() {
    const routine = document.getElementById('routineInput').value;
    const time = document.getElementById('routineTime').value;

    if (routine) {
        const routines = JSON.parse(localStorage.getItem('userRoutines')) || [];
        routines.push({ routine, time });
        localStorage.setItem('userRoutines', JSON.stringify(routines));

        document.getElementById('routineInput').value = ''; // Clear input
        document.getElementById('routineTime').value = '08:00'; // Reset time input
        updateRoutineList();
    } else {
        // alert("Enter a routine!");
    }
});

function updateRoutineList() {
    const routines = JSON.parse(localStorage.getItem('userRoutines')) || [];
    const routineList = document.getElementById('routineList');
    routineList.innerHTML = ''; // Clear previous routines

    routines.forEach((item, index) => {
        const routineItem = document.createElement('div');
        routineItem.classList.add('routine-item');

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

        routineItem.innerHTML = `
            <span>At : ${formattedTime} - ${item.routine}</span>
            <button class="btn-remove" onclick="removeRoutine(${index})">X</button>
        `;

        routineList.appendChild(routineItem);
    });
}

function removeRoutine(index) {
    const routines = JSON.parse(localStorage.getItem('userRoutines')) || [];
    routines.splice(index, 1); // Remove the routine at the given index
    localStorage.setItem('userRoutines', JSON.stringify(routines));
    updateRoutineList(); // Refresh the routine list
}

function initializeRoutineTracker() {
    updateRoutineList();
}

initializeRoutineTracker();

// Add a button to navigate to the check-in page

checkInButton.onclick = function() {
    window.location.href = 'checkin.html'; // Change this path if needed
};
document.querySelector('.daily-routine-section').appendChild(checkInButton);
