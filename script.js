document.addEventListener('DOMContentLoaded', () => {
    const questions = {
        goal: document.getElementById('question-goal'),
        time: document.getElementById('question-time'),
        equipment: document.getElementById('question-equipment'),
        experience: document.getElementById('question-experience'),
        targetBodyPart: document.getElementById('question-target-body-part')
    };
    const recommendationDiv = document.getElementById('workout-recommendation');
    const workoutTextP = document.getElementById('workout-text');
    const startOverButton = document.getElementById('start-over');

    let userSelections = {
        goal: null,
        timeMoreThan30: null, // boolean
        hasEquipment: null, // boolean
        isBeginner: null, // boolean
        targetBodyPart: null
    };

    function hideAllQuestions() {
        for (const key in questions) {
            questions[key].classList.add('hidden');
        }
    }

    function showQuestion(questionId) {
        // Remove 'selected' class from all buttons in the question being shown
        const questionElement = questions[questionId];
        if (questionElement) {
            questionElement.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            questionElement.classList.remove('hidden');
        }
    }

    function resetApp() {
        userSelections = {
            goal: null,
            timeMoreThan30: null,
            hasEquipment: null,
            isBeginner: null,
            targetBodyPart: null
        };
        hideAllQuestions();
        recommendationDiv.classList.add('hidden');
        showQuestion('goal');
         // Remove 'selected' from all buttons everywhere just in case
        document.querySelectorAll('.question-block button').forEach(btn => btn.classList.remove('selected'));

    }

    function displayRecommendation(workout) {
        hideAllQuestions();
        workoutTextP.innerText = workout;
        recommendationDiv.classList.remove('hidden');
    }

    function getWorkout() {
        const { goal, timeMoreThan30, hasEquipment, isBeginner, targetBodyPart } = userSelections;

        // Rule 1: Time <= 30 mins -> Yoga
        if (!timeMoreThan30) {
            return "Yoga: Focus on gentle stretches and poses for 15-30 minutes.";
        }

        // At this point, timeMoreThan30 is true

        // Rule 2: Time > 30, No Equipment, Beginner -> Pilates
        if (!hasEquipment && isBeginner) {
            return "Pilates: Focus on core strength and control with bodyweight exercises.";
        }

        // Rule 3: Time > 30, No Equipment, Not Beginner -> Calisthenics
        if (!hasEquipment && !isBeginner) {
            return "Calisthenics Routine: Bodyweight squats (3 sets of 10-15), Push-ups (3 sets to failure or modified), Lunges (3 sets of 10-12 per leg), Plank (3 sets, hold for 30-60 seconds).";
        }

        // At this point, timeMoreThan30 is true AND hasEquipment is true

        // Rule 4: Time > 30, Equipment, Beginner -> Calisthenics (can use equipment for modifications or light assistance)
        if (hasEquipment && isBeginner) {
            return "Calisthenics (can use light equipment for assistance/variation): Bodyweight squats or Goblet Squats with light weight (3 sets of 10-12), Incline Push-ups or Knee Push-ups (3 sets of 8-12), Assisted Lunges (3 sets of 10 per leg), Plank (3 sets, hold for 20-45 seconds).";
        }

        // Rule 5: Time > 30, Equipment, Not Beginner -> Target Body Part
        if (hasEquipment && !isBeginner) {
            switch (targetBodyPart) {
                case 'full_body':
                    return "Full Body Workout: Squats (3x8-12), Bench Press or Push-ups (3x8-12), Deadlifts or Kettlebell Swings (1x5 or 3x10-15), Overhead Press (3x8-12), Rows (3x8-12).";
                case 'arms':
                    return "Target Arms: Bicep Curls (e.g., Hammer Curls, Dumbbell Curls - 3 sets of 10-15), Tricep Extensions (e.g., Overhead Dumbbell Extension, Dips - 3 sets of 10-15), Lateral Raises (3 sets of 12-15), Pull-ups or Lat Pulldowns (3 sets to failure or 8-12).";
                case 'abs':
                    return "Target Abs: Crunches (3 sets of 15-20), Russian Twists (3 sets of 15-20 per side), Plank (3 sets, hold for 45-90 seconds), Leg Raises (3 sets of 12-15).";
                case 'legs':
                    return "Target Legs: Goblet Squats (3 sets of 10-12), Lunges (3 sets of 10-12 per leg), Romanian Deadlifts (RDLs) (3 sets of 10-12), Calf Raises (3 sets of 15-20).";
                case 'stamina':
                    return "Target Stamina (Cardio): 25-45 minutes of sustained activity on Ellipticals, Treadmill (running/jogging), Cycling, or Rowing machine.";
                default:
                    return "Please select a body part to target."; // Should not happen if UI flow is correct
            }
        }
        return "We couldn't determine a workout. Please start over."; // Fallback
    }

    // Event Listeners
    questions.goal.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            userSelections.goal = e.target.dataset.goal;
            questions.goal.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            hideAllQuestions();
            showQuestion('time');
        }
    });

    questions.time.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            userSelections.timeMoreThan30 = e.target.dataset.time === 'yes';
            questions.time.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');

            if (!userSelections.timeMoreThan30) { // Less than or equal to 30 mins
                displayRecommendation(getWorkout());
            } else {
                hideAllQuestions();
                showQuestion('equipment');
            }
        }
    });

    questions.equipment.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            userSelections.hasEquipment = e.target.dataset.equipment === 'yes';
            questions.equipment.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            hideAllQuestions();
            showQuestion('experience');
        }
    });

    questions.experience.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            userSelections.isBeginner = e.target.dataset.experience === 'yes';
            questions.experience.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');

            if (!userSelections.hasEquipment && userSelections.isBeginner) { // Time > 30, No Equip, Beginner -> Pilates
                displayRecommendation(getWorkout());
            } else if (!userSelections.hasEquipment && !userSelections.isBeginner) { // Time > 30, No Equip, Not Beginner -> Calisthenics
                displayRecommendation(getWorkout());
            } else if (userSelections.hasEquipment && userSelections.isBeginner) { // Time > 30, Equip, Beginner -> Calisthenics
                displayRecommendation(getWorkout());
            } else if (userSelections.hasEquipment && !userSelections.isBeginner) { // Time > 30, Equip, Not Beginner -> Ask body part
                hideAllQuestions();
                showQuestion('targetBodyPart');
            }
        }
    });

    questions.targetBodyPart.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            userSelections.targetBodyPart = e.target.dataset.target;
            questions.targetBodyPart.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            displayRecommendation(getWorkout());
        }
    });

    startOverButton.addEventListener('click', resetApp);

    // Initial setup
    resetApp();
});