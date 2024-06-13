const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const functions = require('./functions');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculate', (req, res) => {
  const { gradesInput, attendanceInput } = req.body;

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

  res.json({ gradeChange, attendanceChange });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
