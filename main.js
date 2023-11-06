document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const pomodoroDurationElement = document.getElementById("pomodoro-duration");
  const breakDurationElement = document.getElementById("break-duration");
  const startButton = document.getElementById("start");
  const resetButton = document.getElementById("reset");
  const decreasePomodoroButton = document.getElementById("decrease-pomodoro");
  const increasePomodoroButton = document.getElementById("increase-pomodoro");
  const decreaseBreakButton = document.getElementById("decrease-break");
  const increaseBreakButton = document.getElementById("increase-break");
  const timerCircle = document.getElementById("timer-circle");
  const timerSVG = document.getElementById("timer-svg");

  let countdown;
  let timerRunning = false;
  let isPomodoro = true; // To track if it's a Pomodoro or a break
  let remainingTime = 25 * 60; // Initial Pomodoro time (25 minutes)
  let pomodoroDuration = 25;
  let breakDuration = 5;
  const circleRadius = timerCircle.getAttribute("r");

  // Function to start the timer
  function startTimer(duration) {
    const startTime = Date.now();
    countdown = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const timeLeft = duration - elapsedTime;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        timerRunning = false;
        startButton.textContent = "Start";
        if (isPomodoro) {
          // If it's a Pomodoro, start the short break
          isPomodoro = false;
          remainingTime = breakDuration * 60;
          timerCircle.style.stroke = "green"; // Change circle color
        } else {
          // If it's a break, start the next Pomodoro
          isPomodoro = true;
          remainingTime = pomodoroDuration * 60;
          timerCircle.style.stroke = "red"; // Change circle color
        }
      }

      updateTimerDisplay(timeLeft);
      drawCircle(timeLeft, duration);
    }, 1000);
  }

  // Function to update the timer display
  function updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }

  // Function to draw the circle timer
  function drawCircle(timeLeft, duration) {
    const circlePercentage = (timeLeft / duration) * 100;
    const circumference = 2 * Math.PI * circleRadius;
    const offset = ((100 - circlePercentage) / 100) * circumference;
    timerCircle.style.strokeDashoffset = offset;
  }

  // Event listener for the "Start" button
  startButton.addEventListener("click", () => {
    if (!timerRunning) {
      startTimer(remainingTime);
      timerRunning = true;
      startButton.textContent = "Pause";
    } else {
      clearInterval(countdown);
      timerRunning = false;
      startButton.textContent = "Resume";
    }
  });

  // Event listener for the "Reset" button
  resetButton.addEventListener("click", () => {
    clearInterval(countdown);
    timerRunning = false;
    startButton.textContent = "Start";
    if (isPomodoro) {
      remainingTime = pomodoroDuration * 60;
    } else {
      remainingTime = breakDuration * 60;
    }
    updateTimerDisplay(remainingTime);
    drawCircle(remainingTime, remainingTime);
  });

  // Event listeners for customizing Pomodoro and break durations
  decreasePomodoroButton.addEventListener("click", () => {
    if (pomodoroDuration > 1) {
      pomodoroDuration--;
      pomodoroDurationElement.textContent = pomodoroDuration;
      if (isPomodoro) {
        remainingTime = pomodoroDuration * 60;
        updateTimerDisplay(remainingTime);
      }
    }
  });

  increasePomodoroButton.addEventListener("click", () => {
    pomodoroDuration++;
    pomodoroDurationElement.textContent = pomodoroDuration;
    if (isPomodoro) {
      remainingTime = pomodoroDuration * 60;
      updateTimerDisplay(remainingTime);
    }
  });

  decreaseBreakButton.addEventListener("click", () => {
    if (breakDuration > 1) {
      breakDuration--;
      breakDurationElement.textContent = breakDuration;
      if (!isPomodoro) {
        remainingTime = breakDuration * 60;
        updateTimerDisplay(remainingTime);
      }
    }
  });

  increaseBreakButton.addEventListener("click", () => {
    breakDuration++;
    breakDurationElement.textContent = breakDuration;
    if (!isPomodoro) {
      remainingTime = breakDuration * 60;
      updateTimerDisplay(remainingTime);
    }
  });
});