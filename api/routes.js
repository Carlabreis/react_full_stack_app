const express = require("express");
const router = express.Router();

// import models
const { User } = require("./models");
const { Course } = require("./models");

// import middleware functions
const { asyncHandler } = require("./middleware/asyncHandler");
const { authenticateUser } = require("./middleware/auth-user");

/**** USERS ROUTES ***/

// READ currently authenticated user's properties and values
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;

    // filter response to show only id, first and last name and email
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    });
  })
);

// CREATE a new user and set the 'Location' header to '/'
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).location("/").end();
    } catch (error) {
      console.log(error);
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

/**** COURSES ROUTES ****/

// READ all courses including the User associated with each courses
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "emailAddress"],
        },
      ],
    });
    res.status(200).json(courses);
  })
);

// READ the corresponding course including the User associated with that course
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName", "emailAddress"],
      },
    });
    if (course) {
      res.status(200).json(course);
    } else {
      res.sendStatus(404);
    }
  })
);

// CREATE a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content
router.post(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.create(req.body);
      res.status(201).location(`/courses/${course.id}`).end();
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// UPDATE the corresponding course and return a 204 HTTP status code and no content
router.put(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.findByPk(req.params.id);
      if (course) {
        const courseOwner = course.userId;
        if (courseOwner == req.currentUser.id) {
          await course.update(req.body);
          res.status(204).location(`/courses/${course.id}`).end();
        } else {
          res.status(403).end();
        }
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// DELETE the corresponding course and return a 204 http status code and no content
router.delete(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const courseOwner = course.userId;
      if (courseOwner == req.currentUser.id) {
        await course.destroy();
        res.status(204).end();
      } else {
        res.status(403).end();
      }
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
