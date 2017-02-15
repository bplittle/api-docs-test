# Export API

## Background

The Export API was built to give access to the large datasets associated with Strutta Games - namely **Participants**, **Entries**, and **Points** - that would be cumbersome or slow to retrieve with the Strutta API.
It is designed to demand as little memory as possible, on both the client and the server.

There is no paging or filtering in the Export API. When you request make a request for Participants, Entries, or Points, you get *everything*.

## Technical

**Generic endpoint format:**

`https://api.strutta.com/export/<object>`

**Input**

All Export API endpoints expect GET requests with normal HTTP parameters.

**Output**

Output data is streamed as JSON strings separated by newline characters( `\n` ).
This might seem strange at first, but makes a lot of sense when the use case is considered.

Instead of loading the entire dataset into memory on the server (which could likely exceed memory limits, ultimately destroying the request) and transmitting the entire object as a single response (which could easily timeout partway through, resulting in invalid JSON), each JSON object can be processed as it arrives, then removed from memory.

## Authentication

The Export API can be accessed using User Private tokens of tokens belonging to Participants with the `administrate` permission.
Since all Export API requests are GET requests, only tokens passed as HTTP request parameters will be accepted. Example:

`https://api.strutta.com/export/<object>/?token=mystruttatoken`

[Read more about the Strutta Authentication](#authentication)

## Errors

Unfortunately, because all Export API responses are streamed, Errors cannot use typical HTTP response codes.
Instead, errors are returned one-per-line in the form:

Raw:
`"{\"error\":\"error message\"}\n"`

Parsed:
`{"error":"error message"}`

You can safely assume that if errors are streamed, no data will follow.


## Version

This documentation is for Export API version 1.0

## Export Participants

> https://api.strutta.com/export/participants/?game_id=3344&token=mystruttatoken

```
NOTE: Spacing between objects is added only for Readability

"

{\"id\":\"3333\",\"email\":\"ellen.grady@aol.com\",\"metadata\":{\"details\":\"User Details\"},\"game_id\":\"3344\",\"created_at\":\"2014-11-07 09:17:26.046529\"}\n

{\"id\":\"2222\",\"email\":\"cara.nguyen@google.co.uk\",\"metadata\":{\"details\":\"User Details\"},\"game_id\":\"3344\",\"created_at\":\"2014-11-07 09:17:26.026228\"}\n

{\"id\":\"1111\",\"email\":\"chris.kambere@yahoo.com\",\"metadata\":{\"details\":\"User Details\"},\"game_id\":\"3344\",\"created_at\":\"2014-11-07 09:17:25.968242\"}\n

"

```

### HTTP Request

`GET https://api.strutta.com/export/participants`

### Request Parameters

Parameter | Description
--------- | -----------
`game_id` | The ID of the parent Game

### JSON String Response Parameters

Parameter | Description
--------- | -----------
`id` | The Participant ID
`email` | The Participant's email
`metadata` | Metadata associated with the Participant
`game_id` | ID of the parent Game
`created_at` | The creation timestamp (ISO 8601 format)

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Export Entries

> https://api.strutta.com/export/entries/?game_id=3344&token=mystruttatoken

```
NOTE: Spacing between objects is added only for Readability

"

{\"id\":\"1\",\"game_id\":\"3344\",\"metadata\":{\"email\":\"joe.carter@bluejays.com\",\"first_name\":\"Joe\",\"last_name\":\"Carter\"},\"created_at\":\"2014-11-07 09:31:53.651251\",\"state\":\"71\",\"participant_id\":\"1232\"}\n

{\"id\":\"2\",\"game_id\":\"3344\",\"metadata\":{\"email\":\"mike.bibby@grizzlies.com\",\"first_name\":\"Mike\",\"last_name\":\"Bibby\"},\"created_at\":\"2014-11-07 09:31:53.664817\",\"state\":\"56\",\"participant_id\":\"1323\"}\n

{\"id\":\"3\",\"game_id\":\"3344\",\"metadata\":{\"email\":\"gino.odjick@canucks.com\",\"first_name\":\"Gino\",\"last_name\":\"Odjick\"},\"created_at\":\"2014-11-07 09:31:53.676233\",\"state\":\"99\",\"participant_id\":\"1333\"}\n


"

```

### HTTP Request

`GET https://api.strutta.com/export/entries`

### Request Parameters

Parameter | Description
--------- | -----------
`game_id` | The ID of the parent Game

### JSON String Response Parameters

Parameter | Description
--------- | -----------
`id` | The Entry ID
`game_id` | ID of the parent Game
`metadata` | Metadata associated with the Entry
`created_at` | The creation timestamp (ISO 8601 format)
`state` | The current `state` of the Entry
`participant_id` | The ID of the Entry's owner.

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Export Points

> https://api.strutta.com/export/entries/?round_id=2222&game_id=3344&token=mystruttatoken

```
NOTE: Spacing between objects is added only for Readability

"

{\"id\":\"3\",\"entry_id\":\"333\",\"round_id\":\"2222\",\"weight\":\"1\",\"ip_address\":"84.92.256.65",\"created_at\":\"2014-11-07 09:41:34.061395\",\"participant_id\":\"444\"}\n

{\"id\":\"2\",\"entry_id\":\"222\",\"round_id\":\"2222\",\"weight\":\"5\",\"ip_address\":"84.92.256.65",\"created_at\":\"2014-11-07 09:41:34.058693\",\"participant_id\":\"656\"}\n

{\"id\":\"1\",\"entry_id\":\"777\",\"round_id\":\"2222\",\"weight\":\"3\",\"ip_address\":"84.92.256.65",\"created_at\":\"2014-11-07 09:41:34.053759\",\"participant_id\":\"876\"}\n

"

```

### HTTP Request

`GET https://api.strutta.com/export/entries`

### Request Parameters

Parameter | Description
--------- | -----------
`game_id` | The ID of the parent Game
`round_id` | The ID of the parent Points Round

### JSON String Response Parameters

Parameter | Description
--------- | -----------
`id` | The Entry ID
`entry_id` | ID of the parent Entry
`round_id` | ID of the parent Points Round
`weight` | The weight associated with the Point
`ip_address` | The IP address of the Participant who created the Point
`created_at` | The creation timestamp (ISO 8601 format)
`participant_id` | The ID of the Point's owner.

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Export API Calls

> https://api.strutta.com/export/entries/?game_id=3344&token=mystruttatoken

```
NOTE: Spacing between objects is added only for Readability

"

{\"id\":\"10\",\"user_id\":\"222\",\"request_method\":\"POST\",\"path\":\"/v1/games\",\"response_code\":\"200\",\"created_at\":\"2014-11-13 13:29:01.825946\",\"game_id\":\"132\",\"round_id\":null,\"entry_id\":null,\"point_id\":null,\"request_params\":null,\"participant_caller_id\":2554,\"participant_id\":null}

{\"id\":\"9\",\"user_id\":\"222\",\"request_method\":\"POST\",\"path\":\"/v1/games\",\"response_code\":\"422\",\"created_at\":\"2014-11-13 13:29:01.823424\",\"game_id\":\"132\",\"round_id\":null,\"entry_id\":null,\"point_id\":null,\"request_params\":null,\"participant_caller_id\":5443,\"participant_id\":null}

"

```

<aside class="notice">
Api Calls are scoped to a specific `game_id`
</aside>

### HTTP Request

`GET https://api.strutta.com/export/api-calls`

### Request Parameters

Parameter | Description
--------- | -----------
`game_id` | The ID of the parent Game

### JSON String Response Parameters

Parameter | Description
--------- | -----------
`id` | The Api Call ID
`user_id` | ID of the parent User
`participant_caller_id` | If the API call was made by a Participant, their ID
`game_id` | ID of the parent Game
`participant_id` | If API call affected a Participant, their `id`
`round_id` | If API call affected a Round, its `id`
`entry_id` | If API call affected an Entry, its `id`
`point_id` | If API call affected a Point, its `id`
`request_method` | The HTTP request method
`response code` | The HTTP response code
`uri` | The uri requested
`request_params` | The call's request parameters
`created_at` | The creation timestamp (ISO 8601 format)

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`
