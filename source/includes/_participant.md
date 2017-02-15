# Participants

Participants are those who interact with a User's games.
They create Entries and Points, and they can also be Administrators, Judges, and Moderators.

See [Participant Permissions](#participant-permissions) to learn more.

### Attributes

Name | Type | Description
---- | ---- | -----------
`email` | string | The Participants's email
`metadata` | JSON | Arbitrary key-value data
`referral_code` | string | The Participant's Referral code (see [Referrals](#referrals))
`token` | string | The Participant's API token
`token_expired` | boolean | Whether the Participant's token has expired

## Create a Participant

> Example Request - POST /games/333/participants

```ruby
strutta = Strutta::API.new 'mystruttatoken'

participant = {
  email: 'charles@dickens.com',
  metadata: {
    industry: 'Print Media',
    birthdate: '07/02/1812'
  }
}
strutta.games(333).participants.create(participant)
```

```json
{
  "email": "charles@dickens.com",
  "metadata": {
    "industry": "Print Media",
    "birthdate": "07/02/1812"
  }
}
```

> Example Response - 201

```ruby
{
  "id": 6767,
  "metadata": {
    "industry": "Print Media",
    "birthdate": "07/02/1812"
  },
  "email": "charles@dickens.com",
  "referral_code": "rmimgndo",
  "token": "18d20376152626a013c4acd35ee8859a",
  "token_expired": false
}
```

```json
{
  "id": 6767,
  "metadata": {
    "industry": "Print Media",
    "birthdate": "07/02/1812"
  },
  "email": "charles@dickens.com",
  "referral_code": "rmimgndo",
  "token": "18d20376152626a013c4acd35ee8859a",
  "token_expired": false
}
```

When a Participant is created, they are automatically issued an API token with the `api_basic` and `registered` permissions.

The initial token is only valid for 24 hours.
Any subsequent actions by the Participant will require [renewing](#renew-participant-token) the Participant's token.

Be sure to auth requests using the Participant's token instead of the User Public token whenever possible.
Every API call is logged in our database, and that data will be much more rich if a Participant ID is associated with each possible record.

<aside class="notice">
Participants are identified by their email addresses and scoped to a single Game.
</aside>

### HTTP Request

`POST /v2/games/:id/participants`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`email` | string | The Participants's email
`metadata` | JSON | Arbitrary key-value data (optional)

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Get All Participants

> Example Request - GET /games/333/participants

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).participants.all
```

> Example Response - 200

```ruby
{
  "results": [
    {
      "id": 6767,
      "metadata": {
        "industry": "Print Media",
        "birthdate": "07/02/1812"
      },
      "email": "charles@dickens.com"
    },
    {
      "id": 8720,
      "metadata": {
        "industry": "Politics",
        "birthdate": "30/04/1797"
      },
      "email": "george@washington.com"
    },
  ],
  "paging": {
    "min_id": 6767,
    "max_id": 8720,
    "next_max_id": 6766
  }
}
```

```json
[
  {
    "id": 6767,
    "metadata": {
      "industry": "Print Media",
      "birthdate": "07/02/1812"
    },
    "email": "charles@dickens.com"
  },
  {
    "id": 6768,
    "metadata": {
      "industry": "Politics",
      "birthdate": "30/04/1797"
    },
    "email": "george@washington.com"
  },
]
```

Please see [Paging](#paging) for request and response parameters.

<aside class="notice">
API tokens are not returned when requesting multiple Participants
</aside>

### HTTP Request

`GET /v2/games/:id/participants`

### Count Limits/Default

The `count` parameter defaults to 20 and is limited to 50 for this endpoint.

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `public_token`
Participant | `api_basic`

## Get a Specific Participant

> Example Request - GET /games/333/participants/6767

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).participants(6767).get
```

> Example Response - 200

```ruby
{
  "id": 6767,
  "metadata": {
    "industry": "Print Media",
    "birthdate": "07/02/1812"
  },
  "email": "charles@dickens.com",
  "token": "18d20376152626a013c4acd35ee8859a",
  "token_expired": true
}
```

```json
{
  "id": 6767,
  "metadata": {
    "industry": "Print Media",
    "birthdate": "07/02/1812"
  },
  "email": "charles@dickens.com",
  "token": "18d20376152626a013c4acd35ee8859a",
  "token_expired": true
}
```

<aside class="notice">
Token data is not included unless a Private or Administrator token is used
</aside>

### HTTP Request

`GET /v2/games/:id/participants/:participant_id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:participant_id` | The ID of the Participant to retrieve

### Minimum Permission

Consumer | Permission | Notes
-------- | ---------- | -----
User | `public_token`
User | `private_token` | To access Participant token data
Participant | `api_basic`
Participant | `administrate` | To access Participant token data

## Get Participant by Email

> Example Request - GET /games/333/participants/search

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).participants.search(email: 'charles@dickens.com')
```

```json
{
  "email": "charles@dickens.com"
}
```

> Example Response - 200

```ruby
{
  "id": 6767,
  "metadata": {
    "industry": "Print Media",
    "birthdate": "07/02/1812"
  },
  "email": "charles@dickens.com",
  "token": "18d20376152626a013c4acd35ee8859a",
  "token_expired": false
}
```

```json
{
  "id": 6767,
  "metadata": {
    "industry": "Print Media",
    "birthdate": "07/02/1812"
  },
  "email": "charles@dickens.com",
  "token": "18d20376152626a013c4acd35ee8859a",
  "token_expired": false
}
```

<aside class="notice">
Token data is not included unless a Private or Administrator token is used
</aside>

### HTTP Request

`GET /v2/games/:id/participants/search`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Parameters

Name | Type | Description
---- | ---- | -----------
`email` | string |  The email of the desired Participant

### Minimum Permission

Consumer | Permission | Notes
-------- | ---------- | -----
User | `public_token`
User | `private_token` | To access Participant token data
Participant | `api_basic`
Participant | `administrate` | To access Participant token data

## Update Participant

> Example Request - PATCH /games/333/participants/6767

```ruby
strutta = Strutta::API.new 'mystruttatoken'

update = {
  metadata: {
    birthday: '02/07/1812'
    industry: 'Print Media',
    died: '09/06/1870'
  }
}
strutta.games(333).participants(6767).update(update)
```

```json
{
  "metadata": {
    "birthday": "02/07/1812",
    "industry": "Print Media",
    "died": "09/06/1870"
  }
}
```

> Example Response - 200

```ruby
{
  "id": 6767,
  "metadata": {
    "birthday": "02/07/1812",
    "industry": "Print Media",
    "died": "09/06/1870"
  },
  "email": "charles@dickens.com",
  "token": "18d20376152626a013c4acd35ee8859a",
  "token_expired": false
}
```

```json
{
  "id": 6767,
  "metadata": {
    "birthday": "02/07/1812",
    "industry": "Print Media",
    "died": "09/06/1870"
  },
  "email": "charles@dickens.com",
  "token": "18d20376152626a013c4acd35ee8859a",
  "token_expired": false
}
```

You can edit a Participant's metadata at any time.
Since email addresses are used to identify Participants, a Participant's email address cannot be changed.

### HTTP Request

`PATCH /v2/games/:id/participants/:participant_id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:participant_id` | The ID of the Participant to update

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`metadata` | JSON | Arbitrary key-value data

<aside class="notice">
NOTE: We do not support partial updates for Participant metadata.
</aside>

### Minimum Permission

Consumer | Permission | Notes
-------- | ---------- | -----
User | `private_token`
Participant | `administrate`
Participant | `registered` | If a Participant is editing their own metadata

## Renew Participant Token

> Example Request - PATCH /games/333/participants/6767/token

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).participants(6767).token_renew(duration: 60 * 60)
```

```json
{
  "duration": 3600
}
```

> Example Response - 200

```ruby
{
  "token": "3e9dsgskj32f8fj3fae0vfnsi217dnds",
  "token_expired": false
}
```

```json
{
  "token": "3e9dsgskj32f8fj3fae0vfnsi217dnds",
  "token_expired": false
}
```

Participant API tokens are valid as long as you'd like them to be.
Ideally their duration matches or exceeds the session length of the API client.
This way, a new Participant token only needs to be requested with each login to the client.

### HTTP Request

`PATCH /v2/games/:id/participants/:participant_id/token`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:participant_id` | The ID of the Participant to renew

### Parameters

Name | Type | Description | Default
---- | ---- | ----------- | -------
`duration` | int |  The amount of seconds the token is valid for | 1 day

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Delete Participant

> Example Request - DELETE /games/333/participants/6767

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).participants(6767).delete
```

> Example Response - 204

```
  No Content
```

<aside class="warning">
WARNING: Deleting a Participant will also delete their Entries and Points
</aside>

### HTTP Request

`DELETE /v2/games/:id/participant/:participant_id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the Parent Game
`:participant_id` | The ID of the Participant to delete

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`
