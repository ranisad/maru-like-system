const router = require('express').Router();
const DBData = require("./../dal/index");
let dbData = new DBData();

router.get('/drivers', (req, res) => {
    dbData.getDriver().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
})

router.get('/city', (req, res) => {
    dbData.getCity().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.post('/assign-slot', (req, res) => {
    let obj = req.body;
    dbData.assignSlot(obj).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
})

router.get("/dashboardByCity",(req,res)=>{
    let cityId = req.query.cityId;

    dbData.getDashboardDataByCityId(cityId).then(data => {
        res.json(data[0 ]);
    }).catch(err => {
        res.json(err);
    })
})

router.get("/dashboardByDriver",(req,res)=>{
    let driverId = req.query.driverId;

    dbData.getDashboardDataByDriverId(driverId).then(data => {
        res.json(data[0]);
    }).catch(err => {
        res.json(err);
    })
})

module.exports = router;