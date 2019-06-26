# ABOUT
A REST Service that can fetch bank details, using the data given in API's query parameters

# INSTALLATION

-Clone or Download
```
npm install dependencies
npm run start
```

# CURL SCRIPTS FOR ACCESSING API ENDPOINTS

## 1. Register user in database POST 

Request: email, password
Response: Success/Failure response

Syntax: curl -i -H "<headers>" <app_url>/api/register -d “<request_object>”

Eg: `curl -i -H "Content-Type: application/json" https://guarded-lake-68101.herokuapp.com/api/register -d "{\"email\":\"user@fyle.com\", \"password\":\"fyleABC\"}"`


## 2. Login user POST

Request: email, password
Response: JWT for GET APIs

Syntax: curl -i -H "<headers>" <app_url>/api/login -d "<request_object>"

Eg: `curl -i -H "Content-Type: application/json" https://guarded-lake-68101.herokuapp.com/api/login -d "{\"email\":\"user@fyle.com\", \"password\":\"fyleABC\"}"`


## 3.  Get branch details from bank name and city GET 

Request: bank_name, city, offset, limit, jwt-header
Response: All branches with given bank_name and city, within bounds specified by offset and limit

Syntax: curl -i -H "x-api-key: <jwt>"  -X GET <app_url>/api/branch/<formatted_bank_name>/<city>/<offset>/<limit>

Eg: `curl -i -H "x-api-key: insert-jwt-from-login"  -X GET https://guarded-lake-68101.herokuapp.com/api/branch/ABHYUDAYA%20COOPERATIVE%20BANK%20LIMITED/MUMBAI/10/2500`


## 4. Get Bank details from IFSC GET

Request: ifsc, offset, limit, jwt-header
Response: Bank with given ifsc, within bounds specified by offset and limit

Syntax: curl -i -H "x-api-key: <jwt>"  -X GET <app_url>/api/bank/<ifsc>/<offset>/<limit>
  
Eg: `curl -i -H "x-api-key: insert-jwt-from-login"  -X GET https://guarded-lake-68101.herokuapp.com/api/bank/ABHY0065013/0/10`
