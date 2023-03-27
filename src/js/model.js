export const woroutPHULplan = [
  {
    day: "Day 7",
    name: "Cardio",
    exercises: { name: "running", distance: "" },
  },
  {
    day: "Day 1",
    name: "Upper Power",
    exercises: [
      {
        ex_name: "Barbell Bench Press",
        sets: 3,
        reps: 5,
        weight: 20,
        icon: "src/img/icons/chest.png",
      },
      {
        ex_name: "Incline Dumbbell Bench Press",
        sets: 3,
        reps: 10,
        weight: 15,
        icon: "src/img/icons/chest.png",
      },
      {
        ex_name: "Bent Over Row",
        sets: 3,
        reps: 5,
        weight: 20,
        icon: "src/img/icons/bodybuilder.png",
      },
      {
        ex_name: "Lat Pull Down",
        sets: 3,
        reps: 10,
        weight: 15,
        icon: "src/img/icons/bodybuilder.png",
      },
      {
        ex_name: "Overhead Press",
        sets: 2,
        reps: 8,
        weight: 10,
        icon: "src/img/icons/shoulders.png",
      },
      {
        ex_name: "Barbell Curl",
        sets: 2,
        reps: 10,
        weight: 10,
        icon: "src/img/icons/biceps.png",
      },
      {
        ex_name: "Skullcrusher",
        sets: 2,
        reps: 10,
        weight: 10,
        icon: "src/img/icons/triceps.png",
      },
    ],
  },
  {
    day: "Day 2",
    name: "Lower Power",
    exercises: [
      {
        ex_name: "Squat",
        sets: 3,
        reps: 5,
        weight: 20,
        icon: "src/img/icons/leg.png",
      },
      {
        ex_name: "Deadlift",
        sets: 3,
        reps: 5,
        weight: 20,
        icon: "src/img/icons/leg.png",
      },
      {
        ex_name: "Leg Press",
        sets: 3,
        reps: 12,
        weight: 15,
        icon: "src/img/icons/leg.png",
      },
      {
        ex_name: "Leg Curl",
        sets: 3,
        reps: 10,
        weight: 10,
        icon: "src/img/icons/leg.png",
      },
      {
        ex_name: "Calf Exercise",
        sets: 4,
        reps: 10,
        weight: 10,
        icon: "src/img/icons/leg.png",
      },
    ],
  },
  {
    day: "Day 3",
    name: "Cardio",
    exercises: { name: "running", distance: "" },
  },
  {
    day: "Day 4",
    name: "Upper Hypertrophy",
    exercises: [
      {
        ex_name: "Incline Barbell Bench Press",
        sets: 3,
        reps: 12,
        weight: 15,
        icon: "src/img/icons/chest.png",
      },
      {
        ex_name: "Flat Bench Dumbbell Flye",
        sets: 3,
        reps: 12,
        weight: 10,
        icon: "src/img/icons/chest.png",
      },
      {
        ex_name: "Seated Cable Row",
        sets: 3,
        reps: 12,
        weight: 15,
        icon: "src/img/icons/bodybuilder.png",
      },
      {
        ex_name: "One Arm Dumbbell Row",
        sets: 3,
        reps: 12,
        weight: 10,
        icon: "src/img/icons/bodybuilder.png",
      },
      {
        ex_name: "Dumbbell Lateral Raise",
        sets: 3,
        reps: 12,
        weight: 10,
        icon: "src/img/icons/shoulders.png",
      },
      {
        ex_name: "Seated Incline Dumbbell Curl",
        sets: 3,
        reps: 12,
        weight: 10,
        icon: "src/img/icons/biceps.png",
      },
      {
        ex_name: "Cable Tricep Extension",
        sets: 3,
        reps: 12,
        weight: 10,
        icon: "src/img/icons/triceps.png",
      },
    ],
  },
  {
    day: "Day 5",
    name: "Lower Hypertrophy",
    exercises: [
      {
        ex_name: "Front Squat",
        sets: 3,
        reps: 12,
        weight: 15,
        icon: "src/img/icons/leg.png",
      },
      {
        ex_name: "Barbell Lunge",
        sets: 3,
        reps: 12,
        weight: 10,
        icon: "src/img/icons/leg.png",
      },
      {
        ex_name: "Leg Extension",
        sets: 3,
        reps: 12,
        weight: 15,
        icon: "src/img/icons/leg.png",
      },
      {
        ex_name: "Leg Curl",
        sets: 3,
        reps: 12,
        weight: 10,
        icon: "src/img/icons/leg.png",
      },
      {
        ex_name: "Seated Calf Raise",
        sets: 3,
        reps: 12,
        weight: 10,
        icon: "src/img/icons/leg.png",
      },
      {
        ex_name: "Calf Press",
        sets: 3,
        reps: 12,
        weight: 10,
        icon: "src/img/icons/leg.png",
      },
    ],
  },
  {
    day: "Day 6",
    name: "Cardio",
    exercises: { name: "running", distance: "" },
  },
];
export const today = new Date().getDay(); // Returns a number (0-6) representing the day of the week
// export const today = 5; // Returns a number (0-6) representing the day of the week

// export const tday = new Date().toLocaleDateString(); // create a new object, based on the cur day of the week

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
export const tday = `${year}/${month}/${day}`;

const storedValue = localStorage.getItem(`${today}/${tday}`);

// create an object to hold data from local storage
const localStorageData = {};

// iterate over local storage to populate localStorageData with the most recent data for each day of the week
for (let i = 0; i < 7; i++) {
  const localStorageKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith(i + "/")
  );

  if (localStorageKeys.length > 0) {
    const mostRecentKey = localStorageKeys.sort().reverse()[0];
    localStorageData[i] = JSON.parse(localStorage.getItem(mostRecentKey));
  }
}

for (let i = 0; i < woroutPHULplan.length; i++) {
  if (localStorageData[i]) {
    woroutPHULplan[i] = localStorageData[i].curDayPlan;
  }
}

export const todaysData =
  storedValue !== null
    ? JSON.parse(storedValue)
    : {
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        curDayPlan: woroutPHULplan[today] || "",
        bodyWeight: "",
      };

export const dataChart = function (curDay) {
  let indexesArray;
  let datesArray;
  const curDayLSkeys = Object.keys(localStorage).filter((key) =>
    key.startsWith(curDay + "/")
  );

  if (curDayLSkeys.length > 0) {
    const sortedCurDayLSkeys = curDayLSkeys.sort();

    const daysObjectsArray = sortedCurDayLSkeys.map((key) =>
      JSON.parse(localStorage.getItem(`${key}`))
    );

    indexesArray = daysObjectsArray.map((plan) => {
      let sum = 0;
      plan.curDayPlan.exercises.forEach((exercise) => {
        sum += exercise.reps * exercise.sets * exercise.weight;
      });
      return sum;
    });

    datesArray = daysObjectsArray.map((day) => day.date);
  }

  if (
    curDayLSkeys.length <= 0 &&
    woroutPHULplan[curDay].name.toLowerCase() !== "cardio"
  ) {
    indexesArray = [
      woroutPHULplan[curDay].exercises
        .map((exs) => exs.reps * exs.sets * exs.weight)
        .reduce((acc, cur) => acc + cur, 0),
    ];
    datesArray = [woroutPHULplan[curDay].day];
  }
  if (woroutPHULplan[curDay].name.toLowerCase() === "cardio") {
    indexesArray = "";
    datesArray = "";
  }

  return [indexesArray, datesArray];
};
