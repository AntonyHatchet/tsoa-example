# Common routes
## HealthCheck - check the service validity
Method: GET
URL: http://localhost:3000/v1/HealthCheck
Params: no params


# Report routes

## avr
Method: GET
URL: http://localhost:3000/v1/reports/avr
Params:
    agreementId=1
    startDateFrom=2018-01-02
    startDateTo=2018-01-05
    endDateFrom=2018-02-01
    endDateTo=2018-02-02
    limit=8
    page=1
Example:
http://localhost:3000/v1/reports/avr?agreementId=1&startDateFrom=2018-01-02&startDateTo=2018-01-05&endDateFrom=2018-02-01&endDateTo=2018-02-02&limit=8&page=1

## next_payment
Method: GET
URL: http://localhost:3000/v1/reports/next_payment
Params:
    agreementId=1
    agreementNum=2
    startDateFrom=2018-01-02
    startDateTo=2018-01-05
    endDateFrom=2018-02-01
    endDateTo=2018-02-02
    limit=1
    page=0
Example:
http://localhost:3000/v1/reports/next_payment?agreementId=1&agreementNum=2&startDateFrom=2018-01-02&startDateTo=2018-01-05&endDateFrom=2018-02-01&endDateTo=2018-02-02&limit=1&page=0

## sales
Method: GET
URL: http://localhost:3000/v1/reports/sales
Params:
    agreementId=1
    agreementNum=2
    startDateFrom=2018-01-02
    startDateTo=2018-01-05
    endDateFrom=2018-02-01
    endDateTo=2018-02-02
    limit=1
    page=0
Example:
http://localhost:3000/v1/reports/sales?agreementId=1&agreementNum=2&startDateFrom=2018-01-02&startDateTo=2018-01-05&endDateFrom=2018-02-01&endDateTo=2018-02-02&limit=1&page=0

## prolongation
Method: GET
URL: http://localhost:3000/v1/reports/prolongation
Params:
    agreementId=1
    agreementNum=2
    startDateFrom=2018-01-02
    startDateTo=2018-01-05
    endDateFrom=2018-02-01
    endDateTo=2018-02-02
    limit=1
    page=0
Example:
http://localhost:3000/v1/reports/prolongation?agreementId=1&agreementNum=2&startDateFrom=2018-01-02&startDateTo=2018-01-05&endDateFrom=2018-02-01&endDateTo=2018-02-02&limit=1&page=0




