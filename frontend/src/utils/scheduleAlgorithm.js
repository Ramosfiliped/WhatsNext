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
          else if (k != planning[j].length - 1 && timeDifference(planning[j][k+1].timeBegin, planning[j][k].timeEnd) >= task.duration &&
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

function insertTask(planning, task) {
  task.weekDays.forEach((day, i) => {
    const currTask = Object.assign(task, {});
    if (day) {
      let j = indexToWeekDay(i)

      if (planning[j].length == 0) {
        planning[j].push(currTask)
        currTask.timeBegin = [currTask.dispBegin[0], currTask.dispBegin[1]]
        currTask.timeEnd = calcTimeEnd(currTask.timeBegin, currTask.duration);
        return;
      } else {
        for (let k = 0; k < planning[j].length; k++){

          if (k == planning[j].length - 1) {
            const timeBegin = [17,52];
            currTask.timeBegin = timeBegin;
            currTask.timeEnd = calcTimeEnd(currTask.timeBegin, currTask.duration);
            planning[j].push(currTask)
            return;
          }
          
          else if (timeDifference(planning[j][k+1].dispBegin, planning[j][k].dispEnd >= currTask.duration)) {
            planning[j].splice(k+1, 0, currTask);
            currTask.timeBegin = [planning[j][k].timeEnd[0], planning[j][k].timeEnd[1]]
            currTask.timeEnd = calcTimeEnd(currTask.timeBegin, currTask.duration);
            return;
          }
        }
      }
    }
  });


}

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

export default scheduleAlgorithm;
