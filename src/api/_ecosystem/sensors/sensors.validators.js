const Ajv = require("ajv");
const { json } = require("express");
const ajv = new Ajv();

/*
    SENSOR VALIDATION
*/
async function validateSensor(data) {
    const schema = {
        type: "object",
        properties: {
            mac: { type: "string" },
            deviceId: { type: "string" },
            elementId: { type: "string" },
        },
        required: ["mac", "deviceId", "elementId"],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);

    const valid = validate(data);
    if (!valid) {
        const valErr = validate.errors;
        throw new Error(`${valErr[0]["instancePath"]} ${valErr[0]["message"]}`);
    }
}

/*
    SETTINGS VALIDATION
*/
async function validateSensorSettings(data) {
    const schema = {
        type: "object",
        properties: {
            name: { type: "string" },
            versionId: { type: "string" },
        },
        required: ["name", "versionId"],
        additionalProperties: false
    };
    const validate = ajv.compile(schema);

    const valid = validate(data);
    if (!valid) {
        const valErr = validate.errors;
        throw new Error(`${valErr[0]["instancePath"]} ${valErr[0]["message"]}`);
    }
    return valid;
}

async function settingsUpdating(data) {
    const schema = {
        type: "object",
        properties: {
            version: { type: "string" },
            name: { type: "string" }
        },
        required: ["version", "name"],
        additionalProperties: false
    };

    const validate = ajv.compile(schema);

    const valid = validate(data);

    return valid;
}



module.exports = {
    validateSensor,
    validateSensorSettings,
    settingsUpdating,
}