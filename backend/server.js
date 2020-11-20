const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const choreRoutes = express.Router();
const path = require('path')
const PORT = process.env.PORT || 4000;

let Chore = require("./chore.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://tre1238:c4t0ugCOi411boy1@trecluster-e058a.mongodb.net/chore-db.chores?retryWrites=true&w=majority", { /*  Old "mongodb://127.0.0.1:27017/choreDb"  */
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

choreRoutes.route("/").get(function(req, res) {
  Chore.find(function(err, chores) {
    if (err) {
      console.log(err);
    } else {
      res.json(chores);
    }
  });
});

choreRoutes.route("/:id").get(function(req, res) {
    let id = req.params.id;
    Chore.findById(id, function(err, chore) {
      res.json(chore);
    });
});

choreRoutes.route("/addchore").post((req, res) => {
  let chore = new Chore(req.body)
  
  chore.choreTitle = req.body.choreTitle
  chore.chorePerson = req.body.chorePerson
  chore.choreCompleted = req.body.choreCompleted
    
  chore.save()
    .then(chore => {
      res.status(200).json({'chore': 'chore added successfully'})
    })
    .catch(err => {
      res.status(400).send('adding new chore')
    })
    console.log(chore.body)
})

choreRoutes.route("/:id").delete((req, res) => {
  Chore.findByIdAndDelete(req.params.id)
    .then(() => res.json('Chore deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
})


app.use("/chores", choreRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}

app.listen(PORT, function() {
  console.log("Server is running on port " + PORT);
});
