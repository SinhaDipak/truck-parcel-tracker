const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parcelSchema = new Schema({
    truckname: { type: String, required: true },
    totalparcel: { type: Number, required: true },
    parcel:{type:Object,required:true}
});

module.exports = mongoose.model('Parcel', parcelSchema);