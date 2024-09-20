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

                routineItem.innerHTML = `
                    <span>At : ${item.time} - ${item.routine}</span>
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
