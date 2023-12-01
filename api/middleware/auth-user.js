"use strict";

// basic-auth npm package to do all of the user credential parsing for us.
const auth = require("basic-auth");
// A library to help you hash passwords bcrypt
const bcrypt = require("bcrypt");
const { User } = require("../models");

// Middleware to authenticate the request using Basic Authentication.
exports.authenticateUser = async (req, res, next) => {
  let message;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  if (credentials) {
    // Attempt to retrieve the user from the data store by their email address
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
    });
    if (user) {
      // Use the bcrypt npm package to compare the user's password to the user's password that was retrieved from the data store
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(
          `Authentication successful for email address: ${user.emailAddress}`
        );
        // Store the retrieved user object on the Request object.
        req.currentUser = user;
      } else {
        message = `Authentication failure for email address: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for email address: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }

  // If user authentication failed...
  if (message) {
    // Return a response with a 401 Unauthorized HTTP status code.
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    // Or if user authentication succeeded...
    // Call the next() method.
    next();
  }
};
