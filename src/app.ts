require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
