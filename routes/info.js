const router = require('express').Router();
const ParcelModel = require('../models/parcel');

router.get('/total', async (req, res) => {
    ParcelModel
        .find({})
        .then(doc => {

            let truckDetails = []

            doc.forEach((item) => {

                const eachParcel = item.parcel
                let truckWeight = 0

                for (const property in eachParcel) {
                    truckWeight += eachParcel[property]
                }

                let eachTruck = {}
                eachTruck["truckname"] = item.truckname
                eachTruck["totalparcel"] = item.totalparcel
                eachTruck["truckweight"] = truckWeight

                truckDetails.push(eachTruck)

            })
            res.send(truckDetails)
        })
        .catch(err => {
            console.error(err)
        })
});

module.exports = router;