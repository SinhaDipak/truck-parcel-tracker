const router = require('express').Router();
const ParcelModel = require('../models/parcel');

router.put('/load', async (req, res) => {
    const { truckname, totalparcel, parcel } = req.body;

    //Check all required fields
    if (!truckname || !totalparcel || !parcel) {
        return res.status(422).send({ error: 'All fields truckname,totalparcel and parcel are required.' });
    }

    await ParcelModel.findOne({ truckname: truckname }, async function (err, data) {//Query first if existed then dont insert
        if (err) {
            console.log(err)
            return res.status(500).send({ error: 'Something went wrong.' });
        }

        if (data === null) {
            return res.status(404).send({ error: 'Truck Doesnt Exists In Our DB ' });
        } else {

            //construct Update Data object
            const updateData = {}
            updateData["truckname"] = data.truckname
            updateData["totalparcel"] = data.totalparcel
            updateData["parcel"] = data.parcel

            //if property exist then add prevoius parcel weight too else update new property
            for (const property in parcel) {
                if (updateData.parcel.hasOwnProperty(property)) {
                    updateData.parcel[property] += parcel[property]
                } else
                    updateData.parcel[property] = parcel[property]
            }

            //Recalculate totalparcel property in data
            updateData.totalparcel = Object.keys(updateData.parcel).length

            //Query database using _id property 
            await ParcelModel.updateOne({ _id: data._id }, updateData, { new: true })

                .then(doc => {
                    console.log(doc)
                    res.status(200).json({
                        success: true,
                        message: 'Data Updated successfully',
                        truckName: truckname,
                    });
                })
                .catch(err => {
                    console.log(err)
                    return res.status(500).send({ error: 'Something went wrong.' })
                })
        }
    })
});


module.exports = router;

