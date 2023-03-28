const { db } = require('../../../utils/db');

async function createSensor(sensor, settings, stationId) {
    
    sensor.stationId = stationId;

    let created_sensor = await db.sensor.create({
        data: sensor,
    });

    settings.sensorId = created_sensor.id;

    await db.sensorSettings.create({
        data: settings,
    });

    return created_sensor.id;
}

async function findSensorById(id) {
    return await db.sensor.findUnique({
        where: { 
            id,
        },
    });
}

async function updateSensorById(id, sensor) {
    return await db.sensor.update({
        where: {
            id,
        },
        data: sensor,
    });
}

async function deleteSensorById(id) {
    return await db.sensor.delete({
        where: {
            id,
        },
    });
}

module.exports = {
    createSensor,
    findSensorById,
    updateSensorById,
    deleteSensorById,
}