"use strict";
import * as model from "./model.js";

let curDay = model.today;

const daysContainer = document.querySelector(".trening-day");
const days = document.querySelectorAll(".day");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const workout = document.getElementById("workout");
const historyContainer = document.querySelector(".history");

// Slider
const slider = function () {
  const maxDay = days.length;
  let touchStartX = null;
  let isTouching = false;

  const goToDay = function (day) {
    days.forEach(
      (d, i) => (d.style.transform = `translateX(${100 * (i - day)}%)`)
    );
  };

  const updateChart = function () {
    let dataChart = model.dataChart(curDay);
    let indexs = dataChart[0];
    let dates = dataChart[1];
    window.myChart.data.datasets[0].data = indexs;
    window.myChart.data.labels = dates;
    window.myChart.update();
  };
  updateChart();

  const nextDay = function () {
    curDay === maxDay - 1 ? (curDay = 0) : curDay++;
    goToDay(curDay);
    genetatePlan(curDay);
    updateChart();
    genetateHistory();
    return curDay;
  };

  const prevDay = function () {
    curDay === 0 ? (curDay = maxDay - 1) : curDay--;
    goToDay(curDay);
    genetatePlan(curDay);
    updateChart();
    genetateHistory();
    return curDay;
  };
  goToDay(curDay);

  // Event handlers
  btnRight.addEventListener("click", nextDay);
  btnLeft.addEventListener("click", prevDay);

  //  Touch handlers
  daysContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    isTouching = true;
  });

  daysContainer.addEventListener("touchmove", (e) => {
    if (!isTouching) {
      return;
    }

    const touchMoveX = e.touches[0].clientX;
    const distance = touchMoveX - touchStartX;
    days.forEach((d) => (d.style.transform = `translateX(${distance}px)`));
    e.preventDefault();
  });

  daysContainer.addEventListener("touchend", (e) => {
    if (!isTouching) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchEndX - touchStartX;

    if (distance > 50) {
      prevDay();
    } else if (distance < -50) {
      nextDay();
    } else {
      goToDay(curDay);
    }

    touchStartX = null;
    isTouching = false;
  });
};

// Generate Workout
const genetatePlan = function () {
  let html = "";
  let curData;
  // const storedValue = localStorage.getItem(`${model.today}/${model.tday}`);
  const generateMurkup = function (exercise) {
    return `
    <tr class="exercise">
      <td>
        <img class="inline w-4 max-w-full" src=${exercise.icon} />${exercise.ex_name}
      </td>
      <td class="cursor-pointer" data-exercise="${exercise.ex_name}" data-type="sets">${exercise.sets}</td>
      <td class="cursor-pointer" data-exercise="${exercise.ex_name}" data-type="reps">${exercise.reps}</td>
      <td class="cursor-pointer" data-exercise="${exercise.ex_name}" data-type="weight">${exercise.weight}</td>
    </tr>
    `;
  };
  if (curDay === model.today && ![0, 3, 6].includes(curDay)) {
    curData = model.todaysData.curDayPlan;
    curData.exercises.forEach((exercise) => {
      html += generateMurkup(exercise);
    });
  }
  if (curDay !== model.today && ![0, 3, 6].includes(curDay)) {
    curData = model.woroutPHULplan[curDay];
    curData.exercises.forEach((exercise) => {
      html += generateMurkup(exercise);
    });
  }
  if ([0, 3, 6].includes(curDay)) {
    html = "";
  }

  const exercises = document.querySelectorAll(".exercise");

  exercises.forEach((exercise) => {
    exercise.style.opacity = "0";
    exercise.style.transition = "opacity 0.5s ease-in-out";
  });

  setTimeout(() => {
    workout.innerHTML = html;
    exercises.forEach((exercise) => {
      exercise.style.opacity = "1";
      exercise.style.transition = "opacity 0.5s ease-in-out";
    });
  }, 500); // The delay should match the transition duration

  return html;
};

const newHTML = genetatePlan();
workout.insertAdjacentHTML("beforeend", newHTML);

//  Chart
const initChart = function () {
  const chart = document.getElementById("myChart");
  window.myChart = new Chart(chart, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Progress Index",
          data: [],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
initChart();
slider();

// Input event

const renderExerciseData = function (e) {
  const workoutEl = e.target.closest(".exercise td:not(:first-child)");
  if (workoutEl && curDay === model.today) {
    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.value = workoutEl.textContent.trim();
    inputElement.classList.add("w-12");
    workoutEl.replaceWith(inputElement);
    inputElement.focus();

    const replaceInput = function (e) {
      const newTd = document.createElement("td");
      newTd.textContent = inputElement.value;

      // Update todaysData with the new value
      const exerciseName = workoutEl.dataset.exercise;
      const dataType = workoutEl.dataset.type;
      model.todaysData.curDayPlan.exercises.forEach((exercise) => {
        if (exercise.ex_name === exerciseName) {
          exercise[dataType] = Number(inputElement.value);
        }
      });
      const jsonString = JSON.stringify(model.todaysData);
      localStorage.setItem(`${model.today}/${model.tday}`, jsonString);
      inputElement.removeEventListener("blur", replaceInput);
      inputElement.removeEventListener("keydown", handleKeyDown);

      inputElement.replaceWith(newTd);
    };

    const handleKeyDown = function (e) {
      if (e.key === "Enter") {
        replaceInput();
      }
    };

    inputElement.addEventListener("blur", replaceInput);
    inputElement.addEventListener("keydown", handleKeyDown);
  }
};

workout.addEventListener("click", renderExerciseData);

// History

const genetateHistory = function () {
  let dataChart = model.dataChart(curDay);

  let indexes = dataChart[0];
  let dates = dataChart[1];
  let html = "";
  historyContainer.innerHTML = "";

  for (let i = 0; i < indexes.length; i++) {
    html += `
    <div class="bg-lime-700/50 text-xl font-medium p-4 m-4 rounded-2xl">
            <ul class="flex justify-around opacity-1">
              <li>${dates[i]}</li>
              <li>${indexes[i]}</li>
            </ul>
          </div>
  `;
  }
  historyContainer.insertAdjacentHTML("beforeend", html);
};
genetateHistory();
