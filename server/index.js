const express = require("express");
const app = express();

const Truck = require("../server/models/addForm");
const cors = require("cors");
const connectDB = require("../server/utils/db");
app.use(express.json());

// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET, POST , DELETE, PUT, PTACH",
//   credentials: true,
// };

app.use(cors());

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

app.post("/addTruck", async (req, res) => {
  try {
    const { truckNo, from, to, grade } = req.body;
    const stepNo = 1;
    const stepName = "Inquiry From Buyer";
    const isCompleted = false;

    const newTruck = await Truck.create({
      truckNo,
      from,
      to,
      grade,
      stepNo,
      stepName,
      isCompleted,
    });
    res.send("Added New truck");
    console.log(`New truck added : ${newTruck}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all truck
app.get("/trucks", async (req, res) => {
  try {
    const trucks = await Truck.find({});
    return res.status(200).json({
      count: trucks.length,
      data: trucks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//get one truck
app.get("/trucks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const truck = await Truck.findById(id);

    if (!truck) {
      return res.status(404).json({ message: "Truck Not Found" });
    }

    return res.status(200).json(truck);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//update the truck
app.put("/trucks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Truck.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Truck Not Found" });
    }

    return res.status(200).send({ message: "Truck Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//delete the truck
app.delete("/trucks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Truck.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Truck Not Found" });
    }

    return res.status(200).send({ message: "Truck Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
