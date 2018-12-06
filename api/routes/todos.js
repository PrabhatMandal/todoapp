const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = Promise;

const Todo = require("../models/todo");

router.get("/", (req, res, next) => {
  Todo.find()
    .exec()
    .then(docs => {
      //console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    completed: req.body.completed,
    completedAt:req.body.completedAt,
  });
  todo
    .save()
    .then(result => {
      //console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /todos",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:todoId", (req, res, next) => {
  const id = req.params.todoId;
  Todo.findById(id)
    .exec()
    .then(doc => {
      //console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:todoId", (req, res, next) => {
  const id = req.params.todoId;
  const updateOps = {};
  Todo.update({ _id: id }, { text: req.body.text,
    completed: req.body.completed,
    completedAt:req.body.completedAt })
    .exec()
    .then(result => {
      //console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:todoId", (req, res, next) => {
  const id = req.params.todoId;
  Todo.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
