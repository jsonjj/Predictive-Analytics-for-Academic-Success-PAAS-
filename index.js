const fs = require('fs');
const functions = require('./functions');

const maxDays = 180;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter grades (separated by commas): ', (gradesInput) => {
  readline.question('Enter number of tardies: ', (attendanceInput) => {
    const gradeContents = fs.readFileSync('./grades.txt').toString();
    const attendanceContents = fs.readFileSync('./attendance.txt').toString();
    
    const grades = functions.stringToGrades(gradeContents);
    const attendance = functions.stringToAttendance(attendanceContents);
    
    let gradeStats = functions.calculateStats(grades.flat());
    let attendanceStats = functions.calculateStats(attendance, false);
    
    let attendanceChange = functions.calculateDrasticChange(attendanceStats, Number(attendanceInput));
    let gradeChange = 0;
    let count = 0;
    for (let gradeInput of gradesInput.split(',')) {
      count++;
      gradeChange += functions.calculateDrasticChange(gradeStats, Number(gradeInput), true);
    }
    gradeChange /= count;
    console.log(gradeChange);
    console.log(attendanceChange);
    readline.close();
  });
});
