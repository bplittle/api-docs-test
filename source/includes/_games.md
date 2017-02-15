# Games

**Games** are the top-level element of the Strutta API.
They are simple container objects that essentially namespace Rounds, Flow, Entries, and Points.

### Attributes

Name | Type | Description
---- | ---- | -----------
`title` | string | The Game's title
`metadata` | JSON | Arbitrary key-value data
`sub_account` | string | Arbitrary string for grouping Games
`entries_count` | integer | Total Entries in Game
`participants_count` | integer | Total Participants in Game
`created` | UNIX timestamp | When the Game was created
`last_updated` | UNIX timestamp | When the Game was last updated

## Create a Game

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'

my_game = {
  title: "My First Game",
  sub_account: "test-1234",
  metadata: {
    summary: "Here's a little more about my game...",
    organizer: "NaaS.io.ly - Ninjas as a service"
  }
}
strutta.games.create(my_game)
```

```json
{
  "title": "My First Game",
  "sub_account": "test-1234",
  "metadata": {
    "summary": "Here's a little more about my game...",
    "organizer": "NaaS.io.ly - Ninjas as a service"
  }
}
```

> Example Response - 201

```ruby
{
  "id": 111,
  "title": "My First Game",
  "sub_account": "test-1234",
  "metadata": {
    "summary": "Here's a little more about my game...",
    "organizer": "NaaS.io.ly - Ninjas as a service"
  },
  "entries_count": 342,
  "participants_count": 234,
  "created": 1413889551,
  "last_updated": 1413889551
}
```

```json
{
  "id": 111,
  "title": "My First Game",
  "sub_account": "test-1234",
  "metadata": {
    "summary": "Here's a little more about my game...",
    "organizer": "NaaS.io.ly - Ninjas as a service"
  },
  "entries_count": 342,
  "participants_count": 234,
  "created": 1413889551,
  "last_updated": 1413889551
}
```

A Game can be an unnamed container object or a well-defined object with a large amount of associated metadata; it all depends on your use case.

### HTTP Request

`POST /v2/games`

### Parameters

Name | Type | Description
---- | ---- | -----------
`title` | string | The Game's title (optional)
`metadata` | JSON | Arbitrary key-value data (optional)
`sub_account` | string | Arbitrary string for grouping Games (optional)

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `N/A`


## Get All Games

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games.all(sub_account: 'test-1234')
```

```json
  {
    "sub_account": "test-1234"
  }
```

> Example Response - 200

```ruby
{
  "results": [
    {
      "id": 111,
      "title": "My First Game",
      "sub_account": "test-1234",
      "metadata": {
        "summary": "Here's a little more about my game...",
        "organizer": "NaaS.io.ly - Ninjas as a service"
      },
      "entries_count": 342,
      "participants_count": 234,
      "created": 1413889551,
      "last_updated": 1413889551
    },
    {
      "id": 222,
      "title": "My Second Game",
      "sub_account": "test-1234",
      "metadata": {
        "summary": "This is another Game",
        "organizer": "NaaS.io.ly - Ninjas as a service"
      },
      "entries_count": 223,
      "participants_count": 101,
      "created": 141398753,
      "last_updated": 141399432
    }
  ],
  "paging": {
    "min_id": 111,
    "max_id": 222,
    "next_max_id": 110,
  }
}
```

```json
{
  "results": [
    {
      "id": 111,
      "title": "My First Game",
      "sub_account": "test-1234",
      "metadata": {
        "summary": "Here's a little more about my game...",
        "organizer": "NaaS.io.ly - Ninjas as a service"
      },
      "entries_count": 342,
      "participants_count": 234,
      "created": 1413889551,
      "last_updated": 1413889551
    },
    {
      "id": 222,
      "title": "My Second Game",
      "sub_account": "test-1234",
      "metadata": {
        "summary": "This is another Game",
        "organizer": "NaaS.io.ly - Ninjas as a service"
      },
      "entries_count": 223,
      "participants_count": 101,
      "created": 141398753,
      "last_updated": 141399432
    }
  ],
  "paging": {
    "min_id": 111,
    "max_id": 222,
    "next_max_id": 110
  }
}
```

Please see [Paging](#paging) for request and response parameters.

### HTTP Request

`GET /v2/games`

### Count Limits/Default

The `count` parameter defaults to 10 and is limited to 20 for this endpoint.

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `N/A`

## Get a Specific Game

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(111).get
```

> Example Response - 200

```ruby
{
  "id": 111,
  "title": "My First Game",
  "sub_account": "test-1234",
  "metadata": {
    "summary": "Here's a little more about my game...",
    "organizer": "NaaS.io.ly - Ninjas as a service"
  },
  "entries_count": 342,
  "participants_count": 234,
  "created": 1413889551,
  "last_updated": 1413889551
}
```

```json
{
  "id": 111,
  "title": "My First Game",
  "sub_account": "test-1234",
  "metadata": {
    "summary": "Here's a little more about my game...",
    "organizer": "NaaS.io.ly - Ninjas as a service"
  },
  "entries_count": 342,
  "participants_count": 234,
  "created": 1413889551,
  "last_updated": 1413889551
}
```

### HTTP Request

`GET /v2/games/:id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the Game to retrieve

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `public_token`
Participant | `api_basic`

## Update Game

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'

update = {
  title: 'Updated title',
  metadata: {
    region: 'West Coast',
    timezone: 'America/Vancouver'
  }
}
strutta.games(333).update(update)
```

```json
{
  "title": "Updated title",
  "metadata": {
    "region": "West Coast",
    "timezone": "America/Vancouver"
  }
}
```

> Example Response - 200

```ruby
{
  "id": 333,
  "title": "Updated title",
  "sub_account": "test-1234",
  "metadata": {
    "region": "West Coast",
    "timezone": "America/Vancouver"
  },
  "entries_count": 342,
  "participants_count": 234,
  "created": 1413889551,
  "last_updated": 1413897453
}
```

```json
{
  "id": 333,
  "title": "Updated title",
  "sub_account": "test-1234",
  "metadata": {
    "region": "West Coast",
    "timezone": "America/Vancouver"
  },
  "entries_count": 342,
  "participants_count": 234,
  "created": 1413889551,
  "last_updated": 1413897453
}
```

### HTTP Request

`PATCH /v2/games/:id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the Game to update

### Parameters

Name | Type | Description
---- | ---- | -----------
`title` | string | The Game's title (optional)
`metadata` | JSON | Arbitrary key-value data (optional)
`sub_account` | string | Arbitrary string for grouping Games (optional)

<aside class="notice">
We do not support partial updates for Game metadata. You must submit the entire metadata hash with each request.
</aside>

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Delete Game

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).delete
```

> Example Response - 204

```
  No Content
```

<aside class="warning">
WARNING: Deleting a game will delete its Participants, Rounds, Flow, Entries, and Points.
</aside>

### HTTP Request

`DELETE /v2/games/:id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the Game to delete

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`
