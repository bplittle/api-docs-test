# Judging



## Get Judging results for a Round

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).judging.get(round_id: 4444)
```

> Example Response - 200

```ruby
{
  "round_id": 4444,
  "judging": [
    {
      "judge_id": 55555,
      "judgments": [
        {
          "id": 1234,
          "entry_id": 878787,
          "score": 3,
          "metadata": {
            "comments": "This entry was very well designed."
          },
          "created": 1413889551
        },
        {
          "id": 1235,
          "entry_id": 878788,
          "score": 2,
          "metadata": {
            "comments": "This entry was decent."
          },
          "created": 1413889599
        },
        {
          "id": 1236,
          "entry_id": 878789,
          "score": 1,
          "metadata": {
            "comments": "This entry was third in my books."
          },
          "created": 1413889655
        }
      ]
    },
    {
      "judge_id": 55556,
      "judgments": [
        {
          "id": 1237,
          "entry_id": 878788,
          "score": 3,
          "metadata": {
            "comments": "This entry was excellent."
          },
          "created": 1413889551
        },
        {
          "id": 1238,
          "entry_id": 878789,
          "score": 2,
          "metadata": {
            "comments": "This entry was relatively good."
          },
          "created": 1413889599
        },
        {
          "id": 1239,
          "entry_id": 878787,
          "score": 1,
          "metadata": {
            "comments": "This entry half-hearted."
          },
          "created": 1413889655
        }
      ]
    }
  ]
}
```

```json
{
  "round_id": 4444,
  "judging": [
    {
      "judge_id": 55555,
      "judgments": [
        {
          "id": 1234,
          "entry_id": 878787,
          "score": 3,
          "metadata": {
            "comments": "This entry was very well designed."
          },
          "created": 1413889551
        },
        {
          "id": 1235,
          "entry_id": 878788,
          "score": 2,
          "metadata": {
            "comments": "This entry was decent."
          },
          "created": 1413889599
        },
        {
          "id": 1236,
          "entry_id": 878789,
          "score": 1,
          "metadata": {
            "comments": "This entry was third in my books."
          },
          "created": 1413889655
        }
      ]
    },
    {
      "judge_id": 55556,
      "judgments": [
        {
          "id": 1237,
          "entry_id": 878788,
          "score": 3,
          "metadata": {
            "comments": "This entry was excellent."
          },
          "created": 1413889551
        },
        {
          "id": 1238,
          "entry_id": 878789,
          "score": 2,
          "metadata": {
            "comments": "This entry was relatively good."
          },
          "created": 1413889599
        },
        {
          "id": 1239,
          "entry_id": 878787,
          "score": 1,
          "metadata": {
            "comments": "This entry half-hearted."
          },
          "created": 1413889655
        }
      ]
    }
  ]
}
```

This endpoint provides detailed information about the Judging for a specific Judging Round.

### HTTP Request

`GET /v2/games/:id/judging`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Request Parameters

Parameter | Description
--------- | -----------
`judge_id` | Restrict this response to just the Judgments made by the Participant with ID: `judge_id` (optional)

<aside class="notice">
The Judging response is pretty intricate, so we've broken it down into a hierarchy of three objects: *Response*, *Participant Judgments*, and *Indivudual Judgments*
</aside>

### Response Parameters

Parameter | Type | Description
--------- | -----| -----------
`round_id` | int | The Judging Round ID requested
`judging` | array | An array of *Participant Judgments* grouped by `judge_id`

### Participant Judgment Parameters

Parameter | Type | Description
--------- | -----| -----------
`judge_id` | int | The ID of the Participant with the `judge` permission who created `judgments`
`judgments` | array | An array of *Individual Judgments* created by this Judge

### Individual Judgment Parameters

Parameter | Type | Description
--------- | -----| -----------
`id` | int | The Judgment ID
`entry_id` | int | The ID of the Entry being judged
`score` | int | The score given to the Entry by the Judge
`metadata` | JSON | Any metadata added by the Judge
`created` | UNIX timestamp | When the Judgment was created

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `judge`


## Judge Entries

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'

judging = [
  {
    entry_id: 1234,
    rank: 1,
    metadata: {
      comments: 'First place'
    }
  },
  {
    entry_id: 1235,
    rank: 2,
    metadata: {
      comments: 'Second place'
    }
  },
  {
    entry_id: 1236,
    rank: 3,
    metadata: {
      comments: 'Third place'
    }
  }
]

strutta.games(333).judging.create(round_id: 4444, judge_id: 55555, judging: judging)
```

```json
{
  "round_id": 4444,
  "judge_id": 55555,
  "judging": [
    {
      "entry_id": 1234,
      "rank": 1,
      "metadata": {
        "comments": "First place"
      }
    },
    {
      "entry_id": 1235,
      "rank": 2,
      "metadata": {
        "comments": "Second place"
      }
    },
    {
      "entry_id": 1236,
      "rank": 3,
      "metadata": {
        "comments": "Third place"
      }
    }
  ]
}
```

> Example Response - 201

```ruby
{
  "message": "Judging was successful"
}
```

```json
{
  "message": "Judging was successful"
}
```

This endpoint provides detailed information about the Judging for a specific Judging Round.

### HTTP Request

`POST /v2/games/:id/judging`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Request Parameters

Parameter | Description
--------- | -----------
`round_id` | The ID of the Judging Round
`judge_id` | The Participant ID of the Judge

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `judge`
