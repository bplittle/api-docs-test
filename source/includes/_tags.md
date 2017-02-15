# Tags

Entries can be tagged with simple strings values, which can then be filtered against to group entries. To supply multiple tags, simply comma-delimit them.

Tags can be supplied alongside an optional `tag_type`, which defaults to `tags`.

<!-- ### Attributes

Name | Type | Description
---- | ---- | -----------
`id` | int | The Entry ID
`participant_id` | int | The ID of the Participant who owns the Entry
`metadata` | JSON | Arbitrary key-value data
`created_at` | string | Date and time of creation in ISO 8601 format
`media` | JSON | Two valid keys, `link` and `type` for defining media associated with the Entry
`state` | int | The ID of the Round the Entry is currently a part of
`points` | int | Total Points in Round (displays if `state` is a Points Round)
`rank` | int | Current Rank in Round (displays if `state` is a Points Round) -->

## Get an Entry's Tags

> Example Request - GET /games/:id/entries/:entry_id/?tags=true

```ruby
# Gem functionality not available, please use JSON endpoint
```

> Example Response - 201

```ruby
# Gem functionality not available, please use JSON endpoint
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
  "media": [],
  "tags": [
    {
      "genre": [
        "jazz",
        "funk"
      ]
    },
    {
      "tags": [
        "fan favourite"
      ]
    },
    {
      "private": [
        "great"
      ]
    }
  ]
}
```

### HTTP Request

`GET /v2/games/:id/entries/:entry_id/?tags=true`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:entry_id` | The ID of the parent Game
`tags` | pass `true` to include tags with the Entry

### Notes

We are currently experimenting with also allowing a `tags=true` parameter for the entries index route, to cut down on API requests.

This endpoint looks like this:

`GET /v2/games/:id/entries/?tags=true`

This will return paged results just like `/entries`, but with the nested `tags` attribute for each entry. This will be available for the time being, but we reserve the right to remove the `tags` flag from this endpoint in the future, for performance reasons.


<!-- ### Minimum Permission

Consumer | Permission | Notes
-------- | ---------- | -----
User | `private_token`
Participant | `api_basic`
Participant | `administrate` | If creating an Entry on behalf of another Participant -->

## Add tags to an Entry

> Example Request - POST /games/:id/entries/:entry_id/tags

```ruby
# Gem functionality not available, please use JSON endpoint
```
```json
{
  "tag_type": "genre",
  "tag_name": "jazz,funk"
}
```

> Example Response - 201

```ruby
# Gem functionality not available, please use JSON endpoint
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
  "media": [],
  "tags": [
    {
      "genre": [
        "jazz",
        "funk"
      ]
    },
  ]
}
```

### HTTP Request

`POST /v2/games/:id/entries/:entry_id/tags`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:entry_id` | The ID of the parent Game

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`tag_type` | string | The type of tag, defaults to `tags`
`tag_name` | string | The name of the tag, can be multiple by comma-delimiting. e.g. `tag_name=rock,pop,jazz`


<!-- ### Minimum Permission

Consumer | Permission | Notes
-------- | ---------- | -----
User | `private_token`
Participant | `api_basic`
Participant | `administrate` | If creating an Entry on behalf of another Participant -->

## Delete Tags from Entry

> Example Request - DELETE /games/:id/entries/:entry_id/tags

```ruby
# Gem functionality not available, please use JSON endpoint
```

```json
{
  "tag_type": "genre",
  "tag_name": "rock"
}
```

> Example Response - 200

```ruby
# Gem functionality not available, please use JSON endpoint
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
  "media": [{
    "link": "http://placehold.it/350x150",
    "type": "image"
  }],
  "tags": []
}
```

### HTTP Request

`DELETE /v2/games/:id/entries/:entry_id/tags`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:entry_id` | The ID of the parent Game

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`tag_type` | string | The type of tag that is to be deleted. Defaults to `tags`. *optional*
`tag_name` | string | The name of the tag to be deleted.


## Get all Tags from a game

> Example Request - GET /games/:id/entries/tags

```ruby
# Gem functionality not available, please use JSON endpoint
```

> Example Response - 200

```ruby
# Gem functionality not available, please use JSON endpoint
```

```json
{
  "tags": [
    {
      "genre": ["rock", "jazz"]
    },
    {
      "tags": [ "horse", "staple", "battery"]
    },
    {
      "colour": ["blue"]
    }
  ]
}
```

### HTTP Request

`GET /v2/games/:id/entries/tags?tag_type=genre`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`tag_type` | The type of tags to return, defaults to returning all tags. *optional*

### Parameters

none.

### Notes

This endpoint is computed by looking at the currently tagged entries, and will return empty if no entries are tagged.

<!-- ### Minimum Permission

Consumer | Permission
-------- | ----------
User | `public_token`
Participant | `api_basic` -->

## Get Entries by Tag

> Example Request - GET /games/:id/entries/?tag_type=genre&tag_name=jazz

```ruby
# Gem functionality not available, please use JSON endpoint
```

> Example Response - 200

```ruby
# Gem functionality not available, please use JSON endpoint
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
      "tags": [
        {
          "genre": ["jazz", "rock"]
        },
        {
          "private": ["great"]
        }
      ]
    },
    {
      "id": 9899,
      "participant_id": 6767,
      "state": 4444,
      "created_at": "2016-01-01T00:00:00.001Z",
      "metadata": {
        "title": "My second Entry"
      },
      "tags": [
        {
          "genre": ["jazz", "blues"]
        },
        {
          "private": ["terrible"]
        }
      ]
    },
    {
      "id": 9976,
      "participant_id": 6779,
      "state": 4444,
      "metadata": {
        "title": "My third Entry"
      },
      "tags": [
        {
          "genre": ["jazz", "pop"]
        },
        {
          "private": ["great"]
        }
      ]
    }
  ],
  "paging": {
    "max_id": 1,
    "min_id": 3,
    "next_max_id": 4
  }
}
```

### HTTP Request

`GET /v2/games/:id/entries/?tag_type=genre&tag_name=jazz,rock`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:game_id` | The ID of the parent Game
`tag_type` | The type of tag, defaults to `tags`
`tag_name` | The tag to filter against. Can be multiple, comma-delimited tags

### Paging

Paging is identical to all other paging in the API.

### Notes

When you supply multiple tags, the API will return any entries that match any tag.

> Example request for multiple tag_name

> `GET /v2/games/:id/entries/?tag_type=genre&tag_name=jazz,rock,blues`

> response

```javascript
{
  "results": [
    {
      "id": 123,
      "participant_id": 6779,
      "state": 4444,
      "metadata": {
        "title": "My third Entry"
      },
      "tags": [
        {
          "genre": ["rock", "pop"]
        }
      ]
    },
    {
      "id": 124,
      "participant_id": 6779,
      "state": 4444,
      "metadata": {
        "title": "My third Entry"
      },
      "tags": [
        {
          "genre": ["jazz", "blues"],
          "private": ["offensive"]
        }
      ]
    },
    {
      "id": 125,
      "participant_id": 6779,
      "state": 4444,
      "metadata": {
        "title": "My third Entry"
      },
      "tags": [
        {
          "genre": ["blues", "funk"]
        }
      ]
    }
  ],
  "paging": {
    // paging params
  }
}
```


<!-- ### Minimum Permission

Consumer | Permission
-------- | ----------
User | `public_token`
Participant | `api_basic` -->
