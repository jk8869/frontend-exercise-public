# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->

To enhance component to accept api:
we pass api object as parameter to Autocomplete component.
we assume that every api shoud accept a parameter for search data based on.
Also api may habve a key to limit response but this is not required.

All apis are defined as object with {url, queryParameterKey, key} parameters and an element of Api object. all are in Api.js

in Autocomplete component based on parameter passed we decide that this should fetch data from static array of api.

To get response from each api, because the response of each one may differ with eachother, we have an extraction function,
so based on the api key we choose the way of extraction.



### Api Docs
Gorest api: whit url https://gorest.co.in, it is a public api and we get users from this api

