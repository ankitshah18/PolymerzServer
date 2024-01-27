const mongoose = require("mongoose");

const { Schema } = mongoose;

const addTruckSchema = new Schema(
  {
    truckNo: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    grade: { type: String, required: true },
    polymerDetails: { type: Object },
    stepNo: { type: Number },
    stepName: { type: String },
    isCompleted: { type: Boolean },
    lastUpdated: { type: Date },
  },
  { timestamps: true }
);

const Truck = new mongoose.model("Truck", addTruckSchema);
module.exports = Truck;
