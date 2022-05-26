const router = require('express').Router();
const ParcelModel = require('../models/parcel');

router.post('/create', async (req, res) => {

    const { truckname, totalparcel, parcel } = req.body;

    //Check all required fields
    if (!truckname || !totalparcel || !parcel) {
        return res.status(422).send({ error: 'All fields truckname,totalparcel and parcel are required.' });
    }

    //Define Model
    let parcelData = new ParcelModel({
        truckname,
        totalparcel,
        parcel
    })

    //Query first if existed then dont insert
    await ParcelModel.find({ truckname: truckname }, async function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).send({ error: 'Something went wrong.' });
        }

        if (data.length !== 0) {
            res.status(409).send({ error: `Truck with name ${truckname} Already Existed` })
        } else {
            await parcelData.save()
                .then(doc => {
                    console.log(doc)
                    return res.status(201).json({
                        success: true,
                        message: 'Truck created successfully',
                        truckName: truckname,
                    });
                })
                .catch(err => {
                    return res.status(500).send({ error: 'Something went wrong.' })
                })
        }
    })
});


module.exports = router;

