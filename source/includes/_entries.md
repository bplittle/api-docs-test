# Entries

**Entries** are *stateful*, which means that they belong to different Rounds as the Game progresses.
For example, an Entry is part of a Moderation Round until Moderation is completed,
when is is moved to the Moderation Round's `pass_round` or `fail_round`.

A Round's ownership of an Entry is visible in the Entry's `state` attribute, which directly maps to the current Round's ID.

When an Entry is created, the Participant who created the Entry is given the `owner` permission for the Entry.
Entries have Public READ permissions, but only the Entry owner, Administrators and Users can Update and Delete the Entry.

### Attributes

Name | Type | Description
---- | ---- | -----------
`id` | int | The Entry ID
`participant_id` | int | The ID of the Participant who owns the Entry
`metadata` | JSON | Arbitrary key-value data
`created_at` | string | Date and time of creation in ISO 8601 format
`media` | JSON | Two valid keys, `link` and `type` for defining media associated with the Entry
`state` | int | The ID of the Round the Entry is currently a part of
`points` | int | Total Points in Round (displays if `state` is a Points Round)
`rank` | int | Current Rank in Round (displays if `state` is a Points Round)

## Create an Entry

> Example Request - POST /games/:id/entries

```ruby
strutta = Strutta::API.new 'mystruttatoken'

entry = {
  participant_id: 6767,
  metadata: {
    title: 'My House',
    description: 'This is a picture of my house'
  },
  media: {
    link: 'http://placehold.it/350x150',
    type: 'image'
  }
}
strutta.games(333).entries.create(entry)
```

```json
{
  "participant_id": 6767,
  "metadata": {
    "title": "My House",
    "description": "This is a picture of my house"
  },
  "media": {
    "link": "http://placehold.it/350x150",
    "type": "image"
  }
}
```

> Example Response - 201

```ruby
{
  "id": 9898,
  "participant_id": 6767,
  "state": 222,
  "created_at": "2016-01-01T00:00:00.001Z",
  "metadata": {
    "title": "My House",
    "description": "This is a picture of my house"
  },
  "media": {
    "link": "http://placehold.it/350x150",
    "type": "image"
  }
}
```

```json
{
  "id": 9898,
  "participant_id": 6767,
  "state": 222,
  "created_at": "2016-01-01T00:00:00.001Z",
  "metadata": {
    "title": "My House",
    "description": "This is a picture of my house"
  },
  "media": {
    "link": "http://placehold.it/350x150",
    "type": "image"
  }
}
```

Entries must be created by Participants - or on behalf of existing Participants -
when the Game has 1 or more active Submission rounds.

### HTTP Request

`POST /v2/games/:id/entries`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`participant_id` | int | The ID of the Participant the Entry belongs to
`metadata` | JSON | Arbitrary key-value data (optional)
`referral` | string | The ID of a referring Participant (optional; see [Referrals](#referrals))

### Minimum Permission

Consumer | Permission | Notes
-------- | ---------- | -----
User | `private_token`
Participant | `api_basic`
Participant | `administrate` | If creating an Entry on behalf of another Participant

## Get All Entries

> Example Request - GET /games/:id/entries

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).entries.all(state: 4444, participant: true)
```

```json
{
  "state": 4444,
  "participant": true
}
```

> Example Response - 200

```ruby
{
  "results": [
    {
      "id": 9898,
      "participant_id": 6767,
      "state": 222,
      "created_at": "2016-01-01T00:00:00.001Z",
      "metadata": {
        "title": "My House",
        "description": "This is a picture of my house"
      },
      "media": {
        "link": "http://placehold.it/350x150",
        "type": "image"
      },
      "participant": {
        "id": 6767,
        "metadata": {
          "industry": "Print Media",
          "birthdate": "07/02/1812"
        },
        "email": "charles@dickens.com"
      }
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:01.001Z",
      "metadata": {
        "title": "My House",
        "description": "This is a picture of my house"
      },
      "media": {
        "link": "http://placehold.it/350x150",
        "type": "image"
      },
      "participant": {
        "id": 6767,
        "metadata": {
          "industry": "Print Media",
          "birthdate": "07/02/1812"
        },
        "email": "charles@dickens.com"
      }
    }
  ],
  "paging": {
    "min_id": 9898,
    "max_id": 9899,
    "next_max_id": 9897
  }
}
```

```json
{
  "results": [
    {
      "id": 9898,
      "participant_id": 6767,
      "state": 222,
      "created_at": "2016-01-01T00:00:00.001Z",
      "metadata": {
        "title": "My House",
        "description": "This is a picture of my house"
      },
      "media": {
        "link": "http://placehold.it/350x150",
        "type": "image"
      },
      "participant": {
        "id": 6767,
        "metadata": {
          "industry": "Print Media",
          "birthdate": "07/02/1812"
        },
        "email": "charles@dickens.com"
      }
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:01.001Z",
      "metadata": {
        "title": "My House",
        "description": "This is a picture of my house"
      },
      "media": {
        "link": "http://placehold.it/350x150",
        "type": "image"
      },
      "participant": {
        "id": 6767,
        "metadata": {
          "industry": "Print Media",
          "birthdate": "07/02/1812"
        },
        "email": "charles@dickens.com"
      }
    }
  ],
  "paging": {
    "min_id": 9898,
    "max_id": 9899,
    "next_max_id": 9897
  }
}
```

Please see [Paging](#paging) for request and response parameters.

### HTTP Request

`GET /v2/games/:id/entries`

### Count Limits/Default

The `count` parameter defaults to 20 and is limited to 50 for this endpoint.

### Points

`points` and `rank` are included automatically if the Entry's current state is a Points Round.

If `past_state` represents a Points Round, all Entries will return their `rank` and `points` for the Points Round represented by `past_state`, not their current `state`.

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Parameters

Name | Type | Description
---- | ---- | -----------
`since_id` | int | Return Entries created after `since_id`
`max_id` | int | Return Entries created before and including `max_id`
`count` | int | 1-50 (optional - defaults to 50)
`participant_id` | int | Get Entries created by a Participant
`participant` | boolean | Whether to get the Participant with the Entry (optional – defaults to false)
`state` | int | Get Entries currently in this `state`
`past_state` | int | Get Entries that have had this `state`

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `public_token`
Participant | `api_basic`

## Entry Leaderboard

> Example Request - GET /games/:id/entries/leaderboard

```ruby
strutta = Strutta::API.new 'mystruttatoken'

leaderboard_params = {
  round_id: 4444,
  top_rank: 1,
  limit: 3
}
strutta.games(333).entries.leaderboard(leaderboard_params)
```

```json
{
  "round_id": 4444,
  "top_rank": 1,
  "limit": 3
}
```

> Example Response - 200

```ruby
{
  "results": [
    {
      "id": 9898,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:00.001Z",
      "metadata": {
        "title": "My first Entry"
      },
      "points": 231,
      "rank": 1
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:01.001Z",
      "metadata": {
        "title": "My second Entry"
      },
      "points": 187,
      "rank": 2
    },
    {
      "id": 9976,
      "participant_id": 6779,
      "state": 4444,
      "metadata": {
        "title": "My third Entry"
      },
      "points": 76,
      "rank": 3
    }
  ],
  "paging": {
    "top_rank": 1,
    "bottom_rank": 3,
    "next_top_rank": 4
  }
}
```

```json
{
  "results": [
    {
      "id": 9898,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:01.001Z",
      "metadata": {
        "title": "My first Entry"
      },
      "points": 231,
      "rank": 1
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:00.001Z",
      "metadata": {
        "title": "My second Entry"
      },
      "points": 187,
      "rank": 2
    },
    {
      "id": 9976,
      "participant_id": 6779,
      "state": 4444,
      "metadata": {
        "title": "My third Entry"
      },
      "points": 76,
      "rank": 3
    }
  ],
  "paging": {
    "top_rank": 1,
    "bottom_rank": 3,
    "next_top_rank": 4
  }
}
```

A Leaderboard is a set of Entries sorted by points.

You can request a Leaderboard of 1-20 Entries.
For paging, this endpoint uses a combination of the `top_rank` and `limit` parameters.
For Example:

Desired Leaderboard | top_rank | limit
------------------- | -------- | -----
Top 10 Entries (1-10) | 1 | 10
Next 10 Entries (11-20) | 11 | 10

### A note on ties

Entries with equal points will each be given the highest rank possible, as shown below.

Entry ID | Points | Rank
-------- | ------ | ----
111 | 100 | 1
222 | 100 | 1
333 | 100 | 1
444 | 50 | 4
555 | 50 | 4
666 | 10 | 6

<aside class="notice">
Be sure to use the `rank` attribute as opposed to the array index when displaying rank
</aside>

### HTTP Request

`GET /v2/games/:id/entries/leaderboard`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Parameters

Name | Type | Description
---- | ---- | -----------
`round_id` | int | The ID of the Points Round
`top_rank` | int | The highest rank desired. Ie. for the top 10, choose `1` (optional - defaults to 1)
`limit` | int | 1-20 (optional - defaults to 20)

### Paging

Paging in Leaderboard is similar to [paging in List endpoints](#paging).
Just swap `next_top_rank` for `next_max_id`.
Beware that ranks can change very quickly, so there is no completely reliable way to page through a Leaderboard.
It is recommended to use the [Export API](#export-api) if you ever need a full export of Points.

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `public_token`
Participant | `api_basic`

## Get a Specific Entry

> Example Request - GET /games/:id/entries/:entry_id

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).entries(9898).get
```

> Example Response

```ruby
{
  "id": 9898,
  "participant_id": 6767,
  "state": 4444,
  "created_at": "2016-01-01T00:00:00.001Z",
  "metadata": {
    "title": "My Entry"
  },
  "points": 33212,
  "rank": 12
}
```

```json
{
  "id": 9898,
  "participant_id": 6767,
  "state": 4444,
  "created_at": "2016-01-01T00:00:00.001Z",
  "metadata": {
    "title": "My Entry"
  },
  "points": 33212,
  "rank": 12
}
```

### Points

`points` and `rank` are included automatically if the Entry's current state is a Points Round.

If `points_state` represents a Points Round, the response will include the Entry's `rank` and `points` for the  Points Round represented by `points_state`, not its current `state`.

### HTTP Request

`GET /v2/games/:id/entries/:entry_id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:entry_id` | The ID of the Entry to retrieve

### Parameters

Name | Type | Description
---- | ---- | -----------
`points_state` | int | Return `rank` and `points` for the Entry while in the Points Round with this `id`

## Get Entry Transitions

> Example Request - GET /games/:id/entries/:entry_id/transitions

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).entries(9898).transitions
```

> Example Response

```ruby
{
  "transitions": [
    { "from": 555, "to": 666 },
    { "from": 666, "to": 777 }
  ]
}
```

```json
{
  "transitions": [
    { "from": 555, "to": 666 },
    { "from": 666, "to": 999 }
  ]
}
```

Whenever an Entry advances from one Round to another, its transitions are recorded.
Use this endpoint to see the path a specific Entry has taken through a Game.

### HTTP Request

`GET /v2/games/:id/entries/:entry_id/transitions`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:entry_id` | The ID of the Entry to retrieve

### Response Parameters

Parameter | Description
--------- | -----------
`transitions` | An Array of transition elements

### Transition Element Parameters

Parameter | Description
--------- | -----------
`from` | The `state` before the transition
`to` | The `state` after the transition

## On Demand Winners

> Example Request - POST /games/:id/entries/on-demand-winners

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).entries.on_demand_winners
```

> Example Response

```ruby
{
  "results": [
    {
      "id": 9898,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:00.001Z",
      "metadata": {
        "title": "My first Entry"
      }
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:01.001Z",
      "metadata": {
        "title": "My second Entry"
      }
    }
  ],
  "paging": {
    "min_id": 9898,
    "max_id": 9899,
    "next_max_id": 9897
  }
}
```

```json
{
  "results": [
    {
      "id": 9898,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:00.001Z",
      "metadata": {
        "title": "My first Entry"
      }
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "created_at": "2016-01-01T00:00:01.001Z",
      "state": 4444,
      "metadata": {
        "title": "My second Entry"
      }
    }
  ],
  "paging": {
    "min_id": 9898,
    "max_id": 9899,
    "next_max_id": 9897
  }
}
```

The On-Demand Winners endpoint behaves as a mini-game _within_ your Game.
A pre-defined number of entries are randomly drawn from all entries that have an active (non-nil) state.
These winners are then passed through the provided On-Demand Round and returned.

Since any all Entry state changes are recorded, it is easy to get a list of winners using the `past_state` parameter in GET Entries.

### HTTP Request

`POST v2/games/:id/entries/on-demand-winners`

### URI Parameters

Parameter | Description
--------- | -----------
`:winner_count` | The number of Entries to randomly select as winners
`:round_id` | The ID On-Demand Round - required only if you have more than one active On-Demand Round

### Response Parameters

Parameter | Description
--------- | -----------
`results` | An Array of winning Entries
`paging` | The paging hash

## Update Entry

> Example Request - PATCH /games/:id/entries/:entry_id

```ruby
strutta = Strutta::API.new 'mystruttatoken'

update = {
  metadata: {
    title: "New Entry Title"
  },
  state: 123
}
strutta.games(333).entries(9898).update(update)
```

```json
{
  "metadata": {
    "title": "New Entry Title"
  },
  "state": 123
}
```

> Example Response

```ruby
{
  "id": 9898,
  "participant_id": 6767,
  "state": 123,
  "created_at": "2016-01-01T00:00:00.001Z",
  "metadata": {
    "title": "New Entry Title"
  }
}
```

```json
{
  "id": 9898,
  "participant_id": 6767,
  "state": 123,
  "metadata": {
    "title": "New Entry Title"
  }
}
```

### HTTP Request

`PATCH /v2/games/:id/entries/:entry_id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:entry_id` | The ID of the Entry to update

### Parameters

Name | Type | Description
---- | ---- | -----------
`metadata` | JSON | Arbitrary key-value data
`state` | int | The desired state for the Entry
`participant_id` | int | The new owner of the Entry

<aside class="notice">
NOTE: We do not support partial updates for Entry metadata.
</aside>

### Minimum Permission

Consumer | Permission | Notes
-------- | ---------- | -----
User | `private_token`
Participant | Entry `owner`
Participant | `administrate` | If updating `participant_id` or `state` of Entry, or updating on behalf of another participant

## Delete Entry

> Example Request - DELETE /games/:id/entries/:entry_id

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).entries(9898).delete
```

> Example Response - 204

```
  No Content
```

<aside class="warning">
WARNING: Deleting an Entry will also delete its Points, Transitions, and Judgments
</aside>

### HTTP Request

`DELETE /v2/games/:id/entries/:entry_id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the Parent Game
`:entry_id` | The ID of the Entry to delete

### Minimum Permission

Consumer | Permission | Notes
-------- | ---------- | -----
User | `private_token`
Participant | Entry `owner`
Participant | `administrate` | If deleting an Entry on behalf of another Participant
