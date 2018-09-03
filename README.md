# Pelion-NodeJS-Test-1

## Prerequisite

Run the firmware of [Quick Connect](https://cloud.mbed.com/quick-start) on your target board. Get your device ID (Endpoint Name, at the last line in the example output below).

```
Starting Simple Mbed Cloud Client example
Connecting to the network using Ethernet...
Connected to the network successfully. IP address: 10.128.4.85
[Simple Cloud Client] Autoformatting the storage.
[Simple Cloud Client] Reset storage to an empty state.
[Simple Cloud Client] Starting developer flow
Initialized Mbed Cloud Client. Registering...
Connected to Mbed Cloud. Endpoint Name: 0165885edb66000000000001001002ef
```

## Setup Application

`$ git clone https://github.com/coisme/Pelion-NodeJS-Test-1.git`

`$ cd Pelion-NodeJS-Test-1`

`$ npm install`

Set your API key and device ID (Endpoint Name) in `index.js`.

## Run

`$ node index.js`
