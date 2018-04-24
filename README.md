# Serverless Hello World

Explore node and python lambdas with step functions.

Bootstrapped with https://www.npmjs.com/package/serverless. 

Deploy (assuming auth setup) with ```sls deploy```

Test via gateway api call or from command line with:

```sls invoke stepf --name holaMundoMundial --data "{\"input\": {\"stepFunctionInput\":{\"value\":\"4\"}}}"```
