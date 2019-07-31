### Package Installation:

**with npm:** npm install<br>
**with yarn:** yarn install


### Fake REST:

* install json server globally.<br>
**with npm:**   npm install -g json-server<br>
**with yarn:**  yarn global add json-server

* edit the parameter **REACT_APP_API_URL** exist in ProjectDir/**.env** file with your chosen fake json api **IP**.
* launch: <br>
json-server --watch src/db.json --routes src/routes.json --host **YOUR_API_IP** -p **YOUR_API_PORT_NUMBER**

>please don't forget to allow in your firewall both your fake api ip/port_number and your react app ip/port_number.

### Launch project

**with npm:**   npm start<br>
**with yarn:**:  yarn start

### Login:
**login:** admin@admin.com<br>
**password:** GMAdmin2019