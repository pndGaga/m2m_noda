const { getAll,
        createDevice,
        addToGroup,
        updateDeviceType
    } = require('./devices.services');

const { validateDevice, 
    } = require('./devices.validators');


async function getAllDevices(req, res, next) {
        res.json(await getAll());
}

async function addDevice(req, res, next) {
    try {
        let newDeviceType = req.body.device;
    
        if(!newDeviceType){
            console.log(`device type: \n${newDeviceType}\n\n`)
            throw new Error('In request must be device');
        }
        const { userId } = req.payload
  
        //console.log(station.userId)
        await validateDevice(newDeviceType)
        let a = await createDevice(newDeviceType);
            
        console.log(a);
    
        res.json(a);
    } catch (err) {
        next(err);
    }
    
}

async function addDeviceToGroup(req, res, next){
    try{
        const {deviceId, groupId} = req.body
        res.json(await addToGroup(deviceId, groupId))    
    }
    catch(err){
        next(err)
    }
}

async function changeDeviceType(req, res, next){
    try{
        res.json(await updateDeviceType(req.body.device))
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getAllDevices,
    addDevice,
    addDeviceToGroup,
    changeDeviceType
}