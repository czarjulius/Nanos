[![Build Status](https://travis-ci.org/czarjulius/Nanos.svg?branch=main)](https://travis-ci.org/czarjulius/Nanos)

# Nanos
Nanos is based in Switzerland, and is hence required by laws to charge an additional VAT on the total price for any client from Switzerland - irrespective of what the client’s nationality is.

### Installing
- Install Node js
- Clone the repository `https://github.com/czarjulius/Nanos.git`
- Navigate to the location of the folder
- Run `npm install` to install dependencies
- Run `npm run mig` to create the tables and seed the initial datas
- Run `npm run dev` to get the app started on your local machine

## Running the tests 
### Server Side
To run tests for the server side
- Navigate to the location of the folder in your terminal
- Run `npm run test` to run app tests

# API Endpoints

- 1. | Method | Description | Endpoints      |
     | ------ | ----------- | -------------- |
     | GET |Get a single client by Id| /api/v1/client/:client_id|

- Input `http://localhost:9000/api/v1/client/1`

- Output
```
{
    "status": 200,
    "message": "Client fetched successfully",
    "data": {
        "id": 1,
        "name": "Julius Ngwu",
        "country": "switzerland",
        "vat_number": "CHE-4534800-TEST",
        "stripe_customer_id": "cus_IokscW9UPbH3xm"
    }
}
```
- 2. | Method | Description | Endpoints      |
     | ------ | ----------- | -------------- |
     | GET |Get a single campaign by Id |  /api/v1/campaign/:campaign_id|

 - Input `http://localhost:9000/api/v1/campaign/1`

- Output
```{
    "status": 200,
    "message": "Campaign fetched successfully",
    "data": {
        "id": 1,
        "name": "Campaign_one"
    }
}
```
- 3. | Method | Description | Endpoints      |
     | ------ | ----------- | -------------- |
     | GET |Fetch all the campaigns in the database | /api/v1/campaigns|

 - Output
 ```{
    "status": 200,
    "message": "Campaign fetched successfully",
    "data": [
        {
            "id": 1,
            "name": "Campaign_one",
            "client_id": "1",
            "stripe_charge_id": "ch_1ICzI62eZvKYlo2C7JMiZ5fG",
            "registeredon": "2021-01-24T23:00:00.000Z"
        }
    ]
}
 ```

 - 4. | Method | Description | Endpoints      |
      | ------ | ----------- | -------------- |
      | PATCH |Update customer object on stripe| /api/v1/add_vat/:campaign_id|

  - Input `http://localhost:9000/api/v1/add_vat/1`

 - Output
 ```{
    "status": 200,
    "message": "Customer VAT updated successfully",
    "data": {
        "id": "cus_IokscW9UPbH3xm",
        "comapny": "nanos",
        "address": "switzerland",
        "currency": "usd",
        "email": "client1@test.com",
        "metadata": {},
        "tax_exempt": "none",
        "vat_amount": "",
        "net_amount": "",
        "gross_amount": "",
        "phone": null,
        "campaign_name": "",
        "tax_ids": "CHE-4534800-TEST"
    }
}
 ```

 - 5. | Method | Description | Endpoints      |
      | ------ | ----------- | -------------- |
      | GET |Generate invoice from all APIs| /api/v1/add_vat/:campaign_id|

  - Input `http://localhost:9000/api/v1/invoice/1`

 - Output
 ```{
    "status": 200,
    "message": "Invoice generated successfully",
    "data": {
        "ad_campaign_id": 1,
        "client_name": "Julius Ngwu",
        "email": "client1@test.com",
        "campaign_name": "Campaign_one",
        "invoice_currency": "usd",
        "invoice_amount": 100,
        "vat_amount": 7.7,
        "net_amount": 92.3
    }
}
 ```