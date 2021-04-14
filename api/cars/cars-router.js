const router = require('express').Router();
const Cars = require('./cars-model');
const mw = require('./cars-middleware');

//get all
router.get('/' , async (req, res, next)=>{
    try{
        const data = await Cars.getAll()
        res.status(200).json(data);
    }catch(err){
        next(err)
    }
});

//getbyid
router.get('/:id' , mw.checkCarId, (req, res)=>{
    res.status(200).json(req.car)
});

//create
router.post('/' , mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique, (req, res)=>{
    
});

router.use((err, req, res, next) =>{
    res.status(500).json({message: err.message})
});

module.exports = router;


