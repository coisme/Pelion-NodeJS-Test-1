var MbedCloudSDK = require("mbed-cloud-sdk");

var connect = new MbedCloudSDK.ConnectApi({
    apiKey: "<< Your API Key >>"
});

var deviceId = "<< Your device id >>";
var resourceURI = "3200/0/5501";  // Button Count

var period = 5000; // ms

function getDeviceResource(){
    console.log("getResourceValue()");
    connect.getResourceValue(deviceId, resourceURI)
    .then(data =>{
        console.log(data);
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

