# Errors

> Errors generally take this form:

```ruby
{
  "error": "Error Type",
  "message": "Detailed description of why the error occurred."
}
```

```json
{
  "error": "Error Type",
  "message": "Detailed description of why the error occurred."
}
```

The Strutta API uses the following error codes:

Code | Meaning
---------- | -------
400 | Bad Request -- Error wih your request - generally syntactical
401 | Unauthorized -- Your API token is not valid
422 | Not Acceptable -- Error wih your request - generally semantic
429 | Too Many Requests -- Rate limiting
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarially offline for maintenance. Please try again later.
