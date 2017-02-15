# Moderation

The Moderation endpoint simplifies the logic of moving an Entry through a Moderation Round.

## Get Entries in Moderation

It is possible for a Game to have concurrent Moderation Rounds.
This endpoint conveniently gathers all Entries in Moderation and orders them by their `state`.

> Example Request - GET /games/:id/moderation

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).moderation.get
```

> Example Response - 200

```ruby
{
  "results": [
    {
      "id": 9898,
      "participant_id": 6767,
      "state": 1234,
      "metadata": {
        "image": "http://placehold.it/350x150",
        "title": "Image Entry",
        "description": "This is a picture of my house"
      }
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 1234,
      "metadata": {
        "image": "http://placehold.it/350x150",
        "title": "Image Entry #2",
        "description": "This is another picture of my house"
      }
    },
    {
      "id": 3322,
      "participant_id": 4433,
      "state": 3324,
      "metadata": {
        "title": "Entry in state 3324"
      }
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 3324,
      "metadata": {
        "title": "Another Entry in state 3324"
      }
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": 9898,
      "participant_id": 6767,
      "state": 1234,
      "metadata": {
        "image": "http://placehold.it/350x150",
        "title": "Image Entry",
        "description": "This is a picture of my house"
      }
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 1234,
      "metadata": {
        "image": "http://placehold.it/350x150",
        "title": "Image Entry #2",
        "description": "This is another picture of my house"
      }
    },
    {
      "id": 3322,
      "participant_id": 4433,
      "state": 3324,
      "metadata": {
        "title": "Entry in state 3324"
      }
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 3324,
      "metadata": {
        "title": "Another Entry in state 3324"
      }
    }
  ]
}
```

### HTTP Request

`GET /v2/games/:id/moderation`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Request Parameters

Parameter | Description
--------- | -----------
`round_id` | Use to filter Entries to a single Moderation Round (optional)

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `moderate`

## Moderate Entries

> Example Request - POST /games/:id/moderation

```ruby
strutta = Strutta::API.new 'mystruttatoken'

moderation = [
  {
    id: 1234,
    pass: true
  },
  {
    id: 3543,
    pass: false
  },
  {
    id: 5435,
    pass: false
  },
  {
    id: 2364,
    pass: true
  },
  {
    id: 8535,
    pass: true
  }
]

strutta.games(333).moderation.create(moderation: moderation)
```

```json
{
  "moderation": [
    {
      "id": 1234,
      "pass": "true"
    },
    {
      "id": 3543,
      "pass": "false"
    },
    {
      "id": 5435,
      "pass": "false"
    },
    {
      "id": 2364,
      "pass": "true"
    },
    {
      "id": 8535,
      "pass": "true"
    }
  ]
}
```

> Example Response - 200

```ruby
{
  "results": [
    {
      "id": 1234,
      "state": 555
    },
    {
      "id": 3543,
      "state": 666
    },
    {
      "id": 5435,
      "state": 666
    },
    {
      "id": 2364,
      "state": "not_in_moderation"
    },
    {
      "id": 8535,
      "state": "error_advancing_entry"
    }
  ]
}
```

```json
{
  "results": [
    {
      "id": 1234,
      "state": 555
    },
    {
      "id": 3543,
      "state": 666
    },
    {
      "id": 5435,
      "state": 666
    },
    {
      "id": 2364,
      "state": "not_in_moderation"
    },
    {
      "id": 8535,
      "state": "error_advancing_entry"
    }
  ]
}
```

This endpoint allows you to Moderate entries in batches - even if they aren’t in the same Moderation Round.

Because this is a batch action, HTTP errors won't be thrown if a single update is not successful.
Rather, errors are recorded in the `state` value of the return object.

Error | Meaning
----- | -------
`not_in_moderation` | Either the Entry does not exist or it is not currently in Moderation
`error_advancing_entry` | An error occurred when updating the Entry's `state`. Try again.

### HTTP Request

`POST /v2/games/:id/moderation`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Parameters

Parameter | Type
--------- | ----
`moderation` | array of Moderation hashes, limit 20

### Moderation Hash Parameters

Parameter | Type | Description
--------- | ---- | -----------
`id` | int | The Entry ID
`pass` | bool | Whether the Entry passed moderation

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `moderate`
