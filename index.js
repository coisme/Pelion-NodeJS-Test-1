var dateformat = require('dateformat');
var MbedCloudSDK = require("mbed-cloud-sdk");
var ping = require('ping');

var connect = new MbedCloudSDK.ConnectApi({
    apiKey: "<< Your API Key >>"
});

var deviceId = "<< Your Device ID >>"; // Endpoint Name
var resourceURI = "/3200/0/5501";  // Button Count, which changes every 5 seconds by the remote IoT device.

// Print log header
console.log("# Ping, Timestamp(Call), Timestamp(Response), ToF (ms), Button Count");

var callTime = new Date();
var isGetResourceValueFinished = true;   // Flag for checking if getResourceValue() is finished.

var period = 5000; // ms

var timer = setInterval(() => {
    if(isGetResourceValueFinished) {
        isGetResourceValueFinished = false;
        callTime = new Date();
        // Check ping before the function call 
        ping.promise.probe('api.us-east-1.mbedcloud.com')
        .then(res => process.stdout.write((res.alive ? "PING_OK" : "PING_NG") + ","))
        .then(() => {
            // Call getResourceValue()
            process.stdout.write(dateformat(callTime, 'isoTime') + ",");
            connect.getResourceValue(deviceId, resourceURI)
            .then(data =>{
                // Response
                let resTime = new Date();
                console.log(dateformat(resTime, 'isoTime') + "," +
                    (resTime.valueOf() - callTime.valueOf()) + "," + data);
                isGetResourceValueFinished = true;
            })
            .catch(error =>{
                console.log("Error: " + error);
            });

        })
        .catch(error => {
            // try again
            isGetResourceValueFinished = true;
        });
    }
    else {
        // If getResourceValue() doesn't return long time, show metadata of the last API call.
        const timeout = 60000; // ms
        var now = new Date();
        var duration = now.valueOf() - callTime.valueOf();
        if(duration > timeout) {
            process.stdout.write(dateformat(new Date(),'isoTime') + ",NO_RESP,");
            // Show metadata of the last API call
            connect.getLastApiMetadata()
            .then(data => console.log(JSON.stringify(data)));
        }
    }
}, period);
