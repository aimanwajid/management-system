#! /usr/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option:/n ",
        choices: ["Enroll a student", "Show student status"]
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please Enter your name:"
        });
        let trimmedstudentName = (studentName.ans).trim().loLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimmedstudentName) === false) {
            if (trimmedstudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("Your account has been created");
                console.log(`Welcome, ${trimmedstudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a course",
                    choices: ["IT", "English", "Cooking"]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "English":
                        courseFees = 500;
                        break;
                    case "Cooking":
                        courseFees = 6000;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course"
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimmedstudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("You have enrolled in this course");
                }
            }
            else {
                console.log("invalied Name");
            }
        }
        else {
            console.log("this name is already exists");
        }
    }
    else if (action.ans === "Show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "please select namr",
                choices: studentNameCheck
            });
            let foundStudent = students.find(student => student.name === selectedStudent.ans);
            console.log("Student information");
            console.log(foundStudent);
            console.log("/n");
        }
        else {
            console.log("Record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
