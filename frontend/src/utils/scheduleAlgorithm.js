import Task from './Task';

// Novas adições

// Removes all tasks thats starts with the specified id
function removeSubTasks(task, planning, id){
    task.weekDays.forEach((day, i) => {
        if (day) {
            let j = indexToWeekDay(i);
            
            for (let k = 0; k < planning[j].length; k++){

                if(planning[j][k].id.startsWith(id)){
                    planning[j].splice(k, 1); // remover task
                }

            }
        }
    });

    return planning;
}

// Returns the original task with the specified id
function recreateOriginalTask(task, planning, id){
    let newTask = new Task();

    // Setting attributes of the original task
    task = searchTask(planning, id);

    newTask.setId(id);
    newTask.setDescription(task.description);
    newTask.setDuration(task.duration);
    newTask.setDispBegin(task.dispBegin);
    newTask.setDispEnd(task.dispEnd);
    newTask.setIsDone(false);

    let weekDays = joinWeekDays(planning, id);
    newTask.setWeekDays(weekDays);

    return newTask;

}

// Search and returns the first task that has an id that starts with the specified id. Returns null if no tasks are found.
function searchTask(task, planning, id){
    task.weekDays.forEach((day, i) => {

        if (day) {
            let j = indexToWeekDay(i);
            
            for (let k = 0; k < planning[j].length; k++){

                if(planning[j][k].id.startsWith(id)){
                    return planning[j][k];
                }

            }
        }
    });

    return null;
}

// Search all subtasks of a planning, with the same id, and returns an array with all week days of those subtasks
function joinWeekDays(task, planning, id){
    let weekDays = [false, false, false, false, false, false, false];
    task.weekDays.forEach((day, i) => {
        if (day) {
            let j = indexToWeekDay(i);
            
            for (let k = 0; k < planning[j].length; k++){

                if(planning[j][k].id.startsWith(id)){
                    weekDays[j] = true;
                }

            }
        }
    });

    return weekDays;
}

// Creates a new task, with only one week day, and that has an id of ther original task, concatenated with '_sub'
function createNewSubTask(task, weekDay){
    let newTask = new Task();

    // Setting ID
    let id = task.id; //Isso tem que ser uma string nova, ao invés de apontar pra string da task original
    id = id + '_sub';
    newTask.setId(id);

    // Setting Other Attributes
    newTask.setDescription(task.description);
    newTask.setDuration(task.duration);
    newTask.setDispBegin(task.dispBegin);
    newTask.setDispEnd(task.dispEnd);
    newTask.setIsDone(false);
    newTask.setColor(task.color);

    // Setting the Week Day
    if (weekDay == 'sunday'){
        newTask.setWeekDays([true, false, false, false, false, false, false]);
    }
    else if (weekDay == 'monday'){
        newTask.setWeekDays([false, true, false, false, false, false, false]);
    }
    else if (weekDay == 'tuesday'){
        newTask.setWeekDays([false, false, true, false, false, false, false]);
    }
    else if (weekDay == 'wednesday'){
        newTask.setWeekDays([false, false, false, true, false, false, false]);
    }
    else if (weekDay == 'thursday'){
        newTask.setWeekDays([false, false, false, false, true, false, false]);
    }
    else if (weekDay == 'friday'){
        newTask.setWeekDays([false, false, false, false, false, true, false]);
    }
    else {
        newTask.setWeekDays([false, false, false, false, false, false, true]);
    }

    return newTask;
}

//////////////////////////////////

function indexToWeekDay(i) {
    let days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  return days[i];
}

function timeGTE(time1, time2) {
    if (time1[0] > time2[0]) {
    return 1;
  } else if (time1[0] == time2[0] && time1[1] >= time2[1]) {
    return 1;
  } else {
    return 0;
  }
}

function timeLTE(time1, time2) {
    if (time1[0] < time2[0]) {
    return 1;
  } else if (time1[0] == time2[0] && time1[1] <= time2[1]) {
    return 1;
  } else {
    return 0;
  }
}

function timeContained(window1, window2) {
    return timeGTE(window2[0], window1[0]) && timeLTE(window2[1], window1[1]);
}

function insertIsValid(planning, task) {
  let allEmpty = 1;

  for (let i = 0; i < 7; i++) {
    if (task.weekDays[i] == true) {
      let j = indexToWeekDay(i)
  
      if (planning[j].length > 0) {
        allEmpty = 0
        for(let k = 0; k < planning[j].length; k++){
        
          if (k == 0 &&
            timeDifference(planning[j][k].timeBegin, [0, 0]) >= task.duration &&
            timeContained([[0, 0], planning[j][k].timeBegin], [task.dispBegin, task.dispEnd])) {
              return true;
          }

          if (k == planning[j].length - 1 &&
            timeDifference([23, 59], planning[j][k].timeEnd) >= task.duration &&
            timeContained([planning[j][k].timeEnd, [23, 59]], [min2vet(vet2min(task.dispBegin) + task.duration), task.dispEnd]) &&
            timeGTE(min2vet(timeDifference(task.dispEnd, min2vet(task.duration))), planning[j][k].timeEnd)) {
              return true;
          }
          
          if (k != planning[j].length - 1 && timeDifference(planning[j][k+1].timeBegin, planning[j][k].timeEnd) >= task.duration &&
            timeContained([planning[j][k].timeEnd, planning[j][k+1].timeBegin], [task.dispBegin, task.dispEnd])) {
            return true;
          }
        }
      } 
    }
  }

  if (allEmpty) {
    return true;
  }
  
  return false;
}

function timeDifference(time1, time2) {
  let result = [0, 0];
  let diff = (time1[0]*60 + time1[1]) - (time2[0]*60 + time2[1]);

  while (diff > 60) {
    result[0] += 1;
    diff -= 60;
  }
  result[1] = diff;

  return vet2min(result);
}

function vet2min(vet) {
  return vet[0] * 60 + vet[1];
}

function min2vet(min) {
  return [Math.floor(min / 60), min % 60];
}

function calcTimeEnd(timeBegin, duration) {
  const totalDuration = timeBegin[0] * 60 + timeBegin[1] + duration;
  const timeEnd = [Math.floor(totalDuration / 60), totalDuration % 60];

  return timeEnd;
}

// Mudanças aqui também -> para cada dia da semana de uma task, uma nova subtask é criada
function insertTask(planning, task) {
  task.weekDays.forEach((day, i) => {
    const currTask = Object.assign(task, {});
    if (day) {
      let j = indexToWeekDay(i)
      let newTask = createNewSubTask(currTask, j)

      if (planning[j].length == 0) {
        planning[j].push(newTask)
        newTask.timeBegin = [newTask.dispBegin[0], newTask.dispBegin[1]]
        newTask.timeEnd = calcTimeEnd(newTask.timeBegin, newTask.duration);
        return;
      } else {
        for (let k = 0; k < planning[j].length; k++){

          if (k == planning[j].length - 1) {
            newTask.timeBegin = [planning[j][k].timeEnd[0], planning[j][k].timeEnd[1]];
            newTask.timeEnd = calcTimeEnd(newTask.timeBegin, newTask.duration);
            planning[j].push(newTask)
            return;
          }
          
          else if (timeDifference(planning[j][k+1].dispBegin, planning[j][k].dispEnd >= newTask.duration)) {
            planning[j].splice(k+1, 0, newTask);
            newTask.timeBegin = [planning[j][k].timeEnd[0], planning[j][k].timeEnd[1]]
            newTask.timeEnd = calcTimeEnd(newTask.timeBegin, newTask.duration);
            return;
          }
        }
      }
    }
  });


}

//////////////////////////////////

function scheduleAlgorithm(planning) {
  planning.toBeAllocated.forEach(task => {
    const valid = insertIsValid(planning, task);
    if (valid) {
      insertTask(planning, task)
    } else {
      planning.nonAllocated.push(task)
    }
  });
  
  planning.toBeAllocated = [];
  return planning;
}

export { scheduleAlgorithm, removeSubTasks };
