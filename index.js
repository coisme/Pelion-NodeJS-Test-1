var dateformat = require('dateformat');
var MbedCloudSDK = require("mbed-cloud-sdk");

var connect = new MbedCloudSDK.ConnectApi({
    apiKey: "<< Your API Key >>"
});

var deviceId = "<< Your Device Id >>"; // Endpoint Name
var resourceURI = "3200/0/5501";  // Button Count

var period = 5000; // ms

var callCount = 0;
var retCount = 0;

function getDeviceResource(){
    callCount += 1;
    console.log(dateformat(new Date(), 'isoTime') + ", Call, Num=" + callCount);
    connect.getResourceValue(deviceId, resourceURI)
    .then(data =>{
        retCount += 1;
        console.log(dateformat(new Date(), 'isoTime') + ",  Ret, Num=" + retCount + ", btnCnt=" + JSON.stringify(data));
    })
    .catch(error =>{
        console.log(error);
    });
}

// Set up the notification channel (pull notifications)
connect.startNotifications(function(error) {
    if (error) throw error;
    else {
        console.log('startNotification()');
    }
});

setInterval(function(){getDeviceResource()}, period);
