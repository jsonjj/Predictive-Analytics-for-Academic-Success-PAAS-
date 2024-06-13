function stringToGrades(str) {
  const lines = str.split('\n');
  const result = [];
  let currentArray = [];
  for (let i = 0; i < lines.length; i++) {
    const line = Number(lines[i].trim());
    if (line === '') {
      if (currentArray.length > 0) {
        result.push(currentArray);
      }
      currentArray = [];
    } else {
      currentArray.push(line);
    }
  }
  if (currentArray.length > 0) {
    result.push(currentArray);
  }
  return result;
}

function stringToAttendance(str) {
  const lines = str.split('\n');
  let currentArray = [];
  for (let i = 0; i < lines.length; i++) {
    const line = Number(lines[i].trim());
    currentArray.push(line);
  }
  return currentArray;
}

function calculateStats(arr, minMax = true) {
  // Calculate mean
  let mean = 0;
  let ct = 0;

  for (let num of arr) {
    ct++;
    mean += num;
  }

  mean /= ct;

  // Calculate median
  arr.sort();
  let median;
  if (arr.length % 2 === 0) {
    median = (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;
  } else {
    median = arr[Math.floor(arr.length / 2)];
  }

  // Calculate mode
  let max = 1;
  let mode = mean;
  for (let num of arr) {
    let ct = 0;
    for (let num2 of arr) {
      if (num === num2) {
        ct++;
      }
    }
    if (ct > max) {
      max = ct;
      mode = num;
    }
  }

  // Calculate min/max
  let extreme;
  if (minMax) {
    extreme = arr[1];
  } else {
    extreme = arr[arr.length - 1];
  }

  return [Math.round(mean), median, mode, extreme];
}

function calculateDrasticChange(val, currentTardies, grade=false) {
  let mean = val[0];
  let median = val[1];
  let mode = val[2];
  let max = val[3];
  // Calculate the percentage changes compared to each metric
  const meanChange = ((currentTardies - mean) / mean) * 100;
  const medianChange = ((currentTardies - median) / median) * 100;
  const modeChange = ((currentTardies - mode) / mode) * 100;
  const maxChange = ((currentTardies - max) / max) * 100;

  // Ensure the change is not negative
  const drasticChange = (meanChange + 0.5 * medianChange + 1.5 * modeChange + 2 * maxChange) / 4;
  
  return (grade) ? Math.round(-drasticChange) + 80 : Math.round(drasticChange) + 80;
}


module.exports = {
  stringToGrades,
  stringToAttendance,
  calculateStats,
  calculateDrasticChange
};
