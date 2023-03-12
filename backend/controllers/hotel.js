import Hotel from "../models/Hotel.js";

export const createHotel= async (req,res,next)=>{

    // console.log(req.body);
    const newHotel= new Hotel(req.body);

    try {
        const saveHotel=await newHotel.save();
        res.status(200).json(saveHotel);
    } catch (error) {
        next(err);
    }
}

export const updateHotel= async (req,res,next)=>{

    // console.log(req.body);

    try {
        const updatedHotel=Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(err);
    }
}
export const deleteHotel=async (req,res)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).send('delete hotel')
        
    }catch(err){
        next(err);
    }
}
export const getHotel= async (req,res,next)=>{

    try{
        const hotel=await Hotel.findById(req.params.id);
        res.status(200).send(hotel);
    }
    catch(err){
        next(err)
    }
}

export const getHotels=async (req,res,next)=>{

    const {min,max,limit,...other}=req.query;

    try{
        const hotels=await Hotel.find({
            ...other,
            cheapestPrice:{$gt:min|| 1 , $lt:max|| 1500}
        }).limit(limit);

        res.status(200).send(hotels);
    }
    catch(err){
        next(err);
    }
}
export const countByCity=async (req,res,next)=>{

    const cities=req.query.cities.split(",");
    console.log(cities);
    try{
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).send(list);
    }
    catch(err){
        next(err);
    }
    
}
export const countByType=async (req,res,next)=>{

    
    try{
        // const hotelCount=await Hotel.countDocuments({type:"hotel"});
        // const apartmentCount=await Hotel.countDocuments({type:"apartment"});
        // const resortCount=await Hotel.countDocuments({type:"resort"});
        // const villaCount=await Hotel.countDocuments({type:"villa"});
        // const cabinCount=await Hotel.countDocuments({type:"cabin"});
        const hotelCount=12;
        const apartmentCount=10;
        const resortCount=24;
        const villaCount=8;
        const cabinCount=45;
        
        res.status(200).json([
            {"type":"hotel",count:hotelCount},
            {"type":"apartment",count:apartmentCount},
            {"type":"resort",count:resortCount},
            {"type":"villa",count:villaCount},
            {"type":"cabin",count:cabinCount}
        ])
    }
    catch(err){
        next(err);
    }
    
}