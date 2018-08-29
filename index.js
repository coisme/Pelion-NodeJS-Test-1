var dateformat = require('dateformat');
var MbedCloudSDK = require("mbed-cloud-sdk");

var connect = new MbedCloudSDK.ConnectApi({
    apiKey: "<< Your API key >>"
});

var deviceId = "<< Your Device ID >>";
var resourceURI = "3200/0/5501";  // Button Count

var period = 5000; // ms

var retCount = 0;

function getDeviceResource(){
    connect.getResourceValue(deviceId, resourceURI)
    .then(data =>{
        retCount += 1;
        console.log(dateformat(new Date(), 'isoTime') + ", cnt " + retCount + ", btn " + data);
    })
    .catch(error =>{
        console.log(error);
    });
}

connect.startNotifications()
.then(() => {
    setInterval(function(){getDeviceResource()}, period);
})
.catch(error => {
    console.log(error);
});

