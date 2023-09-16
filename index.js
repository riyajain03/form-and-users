const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 4001;

var router = express.Router();

router.use(function (req, res, next) {
  if (
    req.query.token ===
    "0ub0j3y8R3MD0fWKgY4h6yRyteJaijFwu25FGQQ9P4lUDbu2vDuE4CnjPiKFXsl2"
  ) {
    console.log("logged in", req.query.token);
    next();
  } else {
    res.status(400).send({
      Error: "Not authenticated",
    });
  }
});

const sequelize = new Sequelize("user_details", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const User = sequelize.define("users", {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/status", router, (req, res) => {
  res.send("heu");
});

app.post("/insert", router, async (req, res) => {
  try {
    console.log(req.body)
    if (!req.body.name || !req.body.email || !req.body.password) {
      console.log(req);
      return res.status(400).json({
        error: "Please insert all details",
      });
    }
    const sync = await sequelize.sync();

    const userExists = await User.findAll({
      where: { user_name: req.body.name },
    });
    if (userExists.length >=1) {
      return res.status(401).json({
        error: "user already exists",
        user: userExists,
      });
    } else {
      const userResponse = await User.create({
        user_name: req.body.name,
        user_email: req.body.email,
        user_password: req.body.password,
        user_image: req.body.image
          ? req.body.image
          : "https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg",
      });

      if (userResponse) {
        return res.json({
          success: "Successfully Created User",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
  }
});

app.get("/details", router, async (req, res) => {
  if (!req.query.user_id) {
    return res.status(400).json({
      error: "please pass user id",
    });
  }

  try {
    await sequelize.sync();
    const users = await User.findAll({ where: { id: req.query.user_id } });

    if (users.length >= 1) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});


app.get("/allusers", router, async (req, res) => {

  try {
    await sequelize.sync();
    const users = await User.findAll();

    if (users.length >= 1) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json({
        message: "No users available",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});

app.get("/image", router, async (req, res) => {
  if (!req.query.user_id) {
    return res.status(400).json({
      error: "please pass user id",
    });
  }

  try {
    await sequelize.sync();
    const users = await User.findOne({ where: { id: req.query.user_id } });

    if (users) {
      return res.json({ user_image: users.user_image });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});

app.delete("/delete", router, async (req, res) => {
  if (!req.query.user_id) {
    return res.status(400).json({
      error: "please pass user id",
    });
  }

  try {
    await sequelize.sync();
    const users = await User.findOne({ where: { id: req.query.user_id } });

    if (users) {
      await User.destroy({ where: { id: req.query.user_id } });
      return res.json({ message: "Successfully deleted the user" });
    } else {
      return res
        .status(400)
        .send({ message: `User with id ${req.query.user_id} does not exist` });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});

app.put("/update", router, async (req, res) => {
  try {
    if (
      !req.body.id
    ) {
      return res.status(400).json({
        message: "Please pass user id",
      });
    }
    await sequelize.sync();
    const users = await User.findOne({ where: { id: req.body.id } });

    if (users) {
      await User.update(
        {
          user_name: req.body.name===""?users.user_name:req.body.name,
          user_email: req.body.email===""?users.user_email:req.body.email,
          user_password: req.body.password===""?users.user_password:req.body.password,
          user_image: req.body.image===""?users.user_image:req.body.image,
        },
        { where: { id: req.body.id } }
      );
      return res.json({ message: "Successfully updated user details" });
    } else {
      return res
        .status(400)
        .send({ message: `User with id ${req.body.id} does not exist` });
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});
