const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const port = 7070;
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
let namesArray = ["yosi", "yoni", "znavo", "netanel", "eldad"];
let students = [
  { id: 3, fNmae: "yos", lName: "bala", age: 23 },
  { id: 4, fNmae: "yosss", lName: "balaa", age: 23 },
  { id: 22, fNmae: "yoni", lName: "yiz", age: 22 },
  { id: 4, fNmae: "zna", lName: "erad", age: 26 },
  { id: 8, fNmae: "neta", lName: "tes", age: 24 },
];
let courses = [
  { id: 7, courseName: "css", description: "learning css", img: "fsdhfsd" },
  { id: 4, courseName: "HTML", description: "learning html", img: "dsf" },
  {
    id: 9,
    courseName: "javascript",
    description: "learning javascript",
    img: "jhds",
  },
  { id: 2, courseName: "node.js", description: "learning node js", img: "sdd" },
];
app.get("/", (req, res) => {
  res.send("the server is working");
});
app.get("/names", (req, res) => {
  res.send({ massage: "success", namesArray });
});
app.post("/newName", (req, res) => {
  namesArray.push(req.body.name);
  res.send("new name added");
});
app.get("/students", (req, res) => {
  res.send({ massage: "success", students });
});
app.post("/newStudent", (req, res) => {
  students.push(req.body.student);
  res.send("student added");
});
// app.get("/students/:id", (req, res) => {
//   res.send(students[req.params.id]);
// });
app.get("/students/:id", (req, res) => {
  const studentId = students.find((student) => student.id == req.params.id);
  studentId ? res.send(studentId) : res.send("not found");
});
app.post("/addTeacher", (req, res) => {
  fs.appendFile(
    "teachers.json",
    JSON.stringify(req.body.teacher),
    (error, data) => {
      if (error) return res.send(error);
      res.send(data);
    }
  );
});
app.get("/teachers", (req, res) => {
  fs.readFile("teachers.json", "utf8", (error, data) => {
    if (error) return res.send(error);
    res.send(data);
  });
});
function findStudentIndex(req) {
  const studentItem = students.find((student) => student.id == req.params.id);
  const startIndex = students.indexOf(studentItem);
  return startIndex;
}
app.put("/student/update/:id", (req, res) => {
  const studentIndex = findStudentIndex(req);
  if (studentIndex > -1) {
    students[studentIndex] = req.body.student;
    return res.send("success");
  }
  res.send("student not found");
});
app.delete("/students/deleteStudent/:id", (req, res) => {
  const studentIndex = findStudentIndex(req);
  if (studentIndex > -1) {
    students.splice(studentIndex, 1);
    return res.send("success");
  }
  res.send("student not deleted");
});
app.get("/courses", (req, res) => {
  res.send({ massage: "success", courses });
});
app.post("/courses/createNewCourse", (req, res) => {
  courses.push(req.body.course);
  res.send("course added");
});
function findCourseIndex(req) {
  const courseItem = courses.find((course) => course.id == req.params.id);
  const startIndex = courses.indexOf(courseItem);
  return startIndex;
}
app.put("/courses/edit/:id", (req, res) => {
  const courseIndex = findCourseIndex(req);
  if (courseIndex > -1) {
    courses[courseIndex] = req.body.course;
    return res.send("success");
  }
  res.send("course not found");
});

app.delete("/courses/removeCourse/:id",(req,res)=>{
    const courseIndex= findCourseIndex(req);
    courses.splice(courseIndex,1)
    res.send("course deleted")
})
app.get("/courses/:id",(req,res)=>{
    const courseItem = courses.find(course=>course.id==req.params.id);
    res.send({massage:"course found",courseItem})
})
app.listen(port, () => {
  console.log(`server is up and listening on port:${port}`);
});
