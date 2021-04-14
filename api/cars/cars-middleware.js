const Cars = require('./cars-model')
var vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try{
    const car = await Cars.getById(req.params.id)
    if(car){
      req.car = car;
      next()
    }else{
      res.status(404).json({ message: "car with id <car id> is not found" })
    }
  }catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  if(!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage){
    res.status(400).json({ message: "Vin, make, model, or mileage is missing" })
  }else{
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  if(vinValidator.validate(req.body.vin)){
    next()
  }else{
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = (
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
)