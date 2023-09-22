
const Course = require('../models/course'); 
const Semester = require('../models/semester'); 
const User = require('../models/user_details');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create a new course
module.exports.createCourse = async (req, res) => {
  try {
    const { name } = req.body;

    const course = new Course({ name });

    await course.save();

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve all courses
module.exports.getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new semester
module.exports.createSem = async (req, res) => {
  try {
    const { name } = req.body;

    const semester = new Semester({ name });

    await semester.save();

    res.status(201).json({ message: 'Semester created successfully', semester });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve all semesters
module.exports.getSem = async (req, res) => {
  try {
    const semesters = await Semester.find();
    res.status(200).json(semesters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Create a new user with random ID, and associate with an existing course and semester
module.exports.createUser = async (req, res) => {
  try {
    const { name, courseName, semesterName, attendance, gpa, status, applicationStatus } = req.body;

    function generateRandomId() {
      return Math.floor(Math.random() * 1000000); 
    }

    const userId = generateRandomId();

    // Find the course and semester based on their names
    const [course, semester] = await Promise.all([
      Course.findOne({ name: courseName }),
      Semester.findOne({ name: semesterName }),
    ]);

    if (!course || !semester) {
      return res.status(400).json({ message: 'Course or semester not found' });
    }

    // Create the user
    const user = new User({
      id: userId,
      name,
      course: course._id, 
      semester: semester._id, 
      attendance,
      gpa,
      status,
      applicationStatus,
    });

    // Save the user to the database
    await user.save();

    // Retrieve the user with populated course and semester names
    const populatedUser = await User.findOne({ _id: user._id })
      .populate('course', 'name')
      .populate('semester', 'name')
      .exec();

    res.status(201).json({ message: 'User created successfully', user: populatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve all users with associated course and semester details
module.exports.getUser = async (req, res) => {
  try {
    const users = await User.find()
      .populate('course', 'name') 
      .populate('semester', 'name'); 

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

