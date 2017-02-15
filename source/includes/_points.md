# Points

There are many manifestations of **Points** across the internet.
Examples include: "Votes", "Likes", "Re-Tweets", "Subscribes", "Diggs", and many more.

At the end of the day, each of the above is just a way of keeping score.
To further our generalized *Game* analogy, we opted to use *Points* as our descriptor.

### Attributes

Name | Type | Description
---- | ---- | -----------
`id` | int | The Point ID
`weight` | int | Weight associated with the Point. Can be negative. (Optional - Defaults to 1)

## Award Points to an Entry

> Example Request - POST /games/:id/points

```ruby
strutta = Strutta::API.new 'mystruttatoken'
point_params = {
  round_id: 4444,
  entry_id: 55555,
  participant: 1212,
  weight: 5
}
strutta.games(333).points.create(point_params)
```

```json
{
  "round_id": 4444,
  "entry_id": 55555,
  "participant_id": 1212,
  "weight": 5
}
```

> Example Response - 201

```ruby
{
  "id": 76767,
  "weight": 5
}
```

```json
{
  "id": 76767,
  "weight": 5
}
```

A **Participant** awards **Points** to an **Entry** during a **Round**. Therefore, the IDs of all of these parent objects must be part of the POST.

### Validation

Recall that when the Points Round is defined, a `min_allowed` and a `max_allowed` value is set, as well as a validation `interval`.

Total Point value is the sum of the `weight` of all Point records created during `interal`.
Since `weight` can be negative, a Participant can theoretically add and subtract values from their total value as many times as they'd like during `interval`, they just have to honour `min_allowed <= total <= max_allowed`.

### HTTP Request

`POST /v2/games/:id/points`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Request Parameters

Parameter | Type | Description
--------- | ---- | -----------
`round_id` | ID of the Points round
`entry_id` | ID of the Entry Points are being awarded to
`participant` | ID of the Participant awarding Points
`weight` | Weight associated with the Point. Can be negative. (Optional - Defaults to 1)

### Minimum Permission

Consumer | Permission | Notes
-------- | ---------- | -----
User | `private_token`
Participant | `registered` | If a Participant is adding Points for themselves
Participant | `administrate` | If a Participant is adding Points on behalf of another
