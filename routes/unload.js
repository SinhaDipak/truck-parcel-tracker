const router = require('express').Router();
const ParcelModel = require('../models/parcel');

router.put('/unload', async (req, res) => {

    const { truckname, totalparcel, unload } = req.body;

    //Check all required fields
    if (!truckname || !totalparcel || !unload) {
        return res.status(422).send({ error: 'All fields truckname,totalparcel and unload are required.' });
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

            //if property exist in unload array then just delete it
            unload.forEach(function (item) {
                if (updateData.parcel.hasOwnProperty(item)) {
                    delete updateData.parcel[item]
                }
            });

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
                    return res.status(500).send({ error: 'Something went wrong.' })
                    // console.error(err)
                })
        }
    })
});


module.exports = router;

