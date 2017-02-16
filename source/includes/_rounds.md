# Rounds

## Background

In order to help us generalize Contests and Sweepstakes into Games, we decided to deconstruct them into their simplest elements, **Rounds**.

For example, a Contest Game is typically made up of Rounds that Flow like this:

`Submission -> Voting -> Judging -> Prize Fullfillment (webhook)`

A Sweepstakes Game is slightly more simple:

`Submission -> Random Draw -> Prize Fullfillment (webhook)`

When viewed this way, you see just how similar Contests and Sweepstakes are, and how easy it would be to create a hybrid of the two.
What if a User wanted to run a photo contest where instead of a Judging the ultimate winner was chosen by Random Draw? Simple:

`Submission -> Voting -> Random Draw -> Prize Fullfillment (webhook)`

What if a different User wanted to moderate their Sweepstakes entries before entering them in the Random Draw? Again, simple:

`Submission -> Moderation -> Random Draw -> Prize Fullfillment (webhook)`

As you can see, these use cases become easy to model when you think of each Game as a Flow of Rounds.

**Flow** is described in-depth in the [next section](#flow). First, we must define our **Rounds**.


## Action and Timed Rounds

Programatically, there are two groups of Rounds: **Action** and **Timed**.

### Action Rounds

Action Rounds advance Entries to subsequent rounds when an action takes place.

Moderation is a good example: when an administrator approves or denies an Entry it is moved to the Round's `pass_round` or `fail_round` immediately.

There are two Rounds of this type: `submission` and `on_demand`.

### Timed Rounds

There are four Rounds of this type: `random_draw`, `points`, `judging`, and `webhook`.
Timed rounds, by default, will automatically advance their entries at their `end_date`.

Judging is a good example: Once the Round has ended, based on submitted judgements during the round a number of entries will advance to the Round's `pass_round`. Those that "lose" are advanced to the Round's `fail_round`.

Timed rounds are affected by the `manually_advance` boolean parameter. If `manually_advance` is set to false, they will not advance unless triggered to do so.

## Global Attributes

Each Round type has the following shared global attributes.

### Global Attributes

Name | Type | Description
---- | ---- | -----------
`type` | string | String identifier of the Round type
`title` | string | The Round's title
`start_date` | UNIX timestamp | The Round's start date
`end_date` | UNIX timestamp | The Round's end date
`manually_advance` | boolean | Whether a timed round automatically advanced at its `end_date` or requires a manual trigger

## Round Types and their Rules

### Submission

String identifier: `submission`

If a Game had a front door, it would be a Submission Round.
Rounds of this type define the rules for how often and how frequently a Participant can play a Game.

#### Submission Rules

Name | Type | Description | Options
---- | ---- | ----------- | -------
interval | string | Time period during which `num_entries` and `num_referrals` are allowed | `minute` `hour` `day` `week` `month` `game`
num_entries | int | Total number of Entries a Participant is allowed during `interval`
num_referrals | int | Total number of extra Entries a Participant is allowed during `interval` (optional)


### Moderation

String identifier: `moderation`

Moderation Rounds are used to quickly eliminate any inappropriate or off-topic content.
They can be used between two Rounds of any type.

The `manually_advance` parameter is particularly important for Moderation Rounds.

`manually_advance` | Effect at Moderation Round's `end_date`
------------ | ------------
`false` or `nil` (default) | Any Entries currently in the Moderation Round will advance to its `fail_round`
`true` | Any Entries currently in the Moderation Round will remain in the Moderation Round

Moderation is performed by Participants with the `moderate` permission. Visit [Moderation](#get-entries-in-moderation) to learn more.

#### Moderation Rules

Name | Type | Description
---- | ---- | -----------

_This Round Type has no rules_


### Points

String identifier: `points`

There are many manifestations of Points across the internet.
Examples include: "Votes", "Likes", "Re-Tweets", "Subscribes", and many more.

At the end of the day, each of the above is just a way of keeping score.
To further our generalized *Game* analogy, we opted to use *Points* as our descriptor.

Points Rounds define the number of Points (postive or negative) a Participant can assign per Entry during a pre-defined interval.
When the interval is completed, Entries are sorted by Points, and a pre-defined number "win".

#### Points Rules

Name | Type | Description | Options
---- | ---- | ----------- | -------
interval | int | Time period during which `min_allowed` <= x <= `max_allowed` Points are allowed | `minute` `hour` `day` `week` `month` `game`
winners | int | Total number of winners chosen
max_allowed | int | Maximum number of Points a Participant is allowed during `interval`. Must be greater than 0.
min_allowed | int | Minimum number of Points a Participant is allowed during `interval` Can be negative. Must be less than `max_allowed`. Default: 0.

### Judging

String identifier: `judging`

Judging Rounds allow Participants with the `judge` permission to rank a pre-defined number of Entries
based on whatever criteria the User/Administrator decides. These ranks are translated into a Judging score in the background.
When the Judging Round reaches its end date, the Entries are sorted by these scores, and a pre-defined number "win".

Because of the complexity of validation and implementation of ranking, Judging rounds can only have a maximum `ranking_size` of 20.
This results in `winners` also being limited to 20. If you require a larger pool of ranked Entries and winners, consider using a Points Round.

Visit [Judging](#judging) to learn more.

#### Judging Rules

Name | Type | Description
---- | ---- | -----------
`winners` | int | Total number of winners chosen by judges (1 - 20)
`ranking_size` | int | The number of Entries to be ranked by each Judge (1 - 20)

### Random Draw

String identifier: `random_draw`

Random Draw Rounds are the bread and butter of Sweepstakes Games, but can really be used Games of any kind.
Rounds of this type can define either an absolute number of winners or a percentage of total Entries that will "win" the Round.

#### Random Draw Rules

Name | Type | Description
---- | ---- | -----------
winners | int | Total number of random winners chosen
percentage | boolean | Whether to interpret `winners` as a percentage. Default: `false`

### On Demand

String identifier: `on_demand`

The On-Demand Winners endpoint behaves as a mini-game *within* your Game.
A pre-defined number of entries are randomly drawn from all entries that have an active (non-nil) state.
These winners are then passed through the provided On-Demand Round and returned.

Visit [On Demand Winners](#on-demand-winners) for more information.

#### On Demand Rules

Name | Type | Description
---- | ---- | -----------

_This Round Type has no rules_

### Instant Win

String identifier `instant_win`

Instant Win Rounds will immediately advance an Entry to its `pass_round` or `fail_round` based on odds provided in its rules.

#### Instant Win Rules

Name | Type | Description
---- | ----- | -------
`max_winners` | int | Max number of winners that can go to pass_round
`max_entries` | int |  Max number of times a participant can enter. If entry number > max_entries number, entry is pushed to fail_round
`odds` | int | Chance of winning, 1 in (odds).


### Webhook

String identifier: `webhook`

"Webhook" rounds have undergone a number of transformations as we have come to understand our users' needs.
At this point in time they essentially act as "holding" rounds.

By default, at a "Webhook" Round's `end_date`, all entries will advance to the Round's `pass_round`.
However, if you turn on the `manually_advance` parameter to `true`, they will remain in the round even after the `end_date`.

## Create a Round

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'

submission_round = {
  type: "submission",
  title: "Submission Round",
  start_date: 1413905219,
  end_date: 1414799999,
  rules: {
    num_entries: 10,
    num_referrals: 1,
    interval: "day"
  }
}
strutta.games(333).rounds.create(submission_round)
```

```json
{
  "type": "submission",
  "title": "Submission Round",
  "start_date": 1413905219,
  "end_date": 1414799999,
  "rules": {
    "num_entries": 10,
    "num_referrals": 1,
    "interval": "day"
  }
}
```

> Example Response - 201

```ruby
{
  "id": 4343,
  "title": "Submission Round",
  "start_date": 1413905219,
  "end_date": 1414799999,
  "type": "submission",
  "rules": {
    "num_entries": 10,
    "num_referrals": 1,
    "interval": "day"
  }
}
```

```json
{
  "id": 4343,
  "title": "Submission Round",
  "start_date": 1413905219,
  "end_date": 1414799999,
  "type": "submission",
  "rules": {
    "num_entries": 10,
    "num_referrals": 1,
    "interval": "day"
  }
}
```

There are many types of Rounds, each with a different set of rules. With each POST, pass in both the Round type and the rules associated with that type.

### HTTP Request

`POST /v2/games/:id/rounds`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`type` | string | The string identifier of the type of Round to create
`title` | string | The Round's title
`start_date` | UNIX timestamp | The Round's start date
`end_date` | UNIX timestamp | The Round's end date
`rules` | Type-specific rules. See [Round Types and their Rules](#round-types-and-their-rules).
`manually_advance` | boolean | 	Whether a timed round automatically advanced at its end_date or requires a manual trigger

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Get All Rounds

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).rounds.all
```

> Example Response

```ruby
[
  {
    "id": 4343,
    "title": "Submission Round",
    "start_date": 1413905219,
    "end_date": 1414799999,
    "type": "submission",
    "rules": {
      "num_entries": 10,
      "interval": "day"
    }
  },
  {
    "id": 4344,
    "title": "Random Draw Round",
    "start_date": 1413908765,
    "end_date": 1414876466,
    "type": "random_draw",
    "rules": {
      "winners": 100,
      "percentage": false
    }
  }
]
```

```json
[
  {
    "id": 4343,
    "title": "Submission Round",
    "start_date": 1413905219,
    "end_date": 1414799999,
    "type": "submission",
    "rules": {
      "num_entries": 10,
      "interval": "day"
    }
  },
  {
    "id": 4344,
    "title": "Random Draw Round",
    "start_date": 1413908765,
    "end_date": 1414876466,
    "type": "random_draw",
    "rules": {
      "winners": 100,
      "percentage": false
    }
  }
]
```

### HTTP Request

`GET /v2/games/:id/rounds`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `public_token`
Participant | `api_basic`

## Get a Specific Round

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).rounds(4344).get
```

> Example Response

```ruby
{
  "id": 4344,
  "title": "Random Draw Round",
  "start_date": 1413908765,
  "end_date": 1414876466,
  "type": "random_draw",
  "rules": {
    "winners": 100,
    "percentage": false
  }
}
```

```json
{
  "id": 4344,
  "title": "Random Draw Round",
  "start_date": 1413908765,
  "end_date": 1414876466,
  "type": "random_draw",
  "rules": {
    "winners": 100,
    "percentage": false
  }
}
```

### HTTP Request

`GET /v2/games/:id/rounds/:round_id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the Parent Game
`:round_id` | The ID of the Round to retrieve

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `public_token`
Participant | `api_basic`

## Update Round

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'

update = {
  title: 'Updated Round title',
  end_date: 1414876466,
  rules: {
    num_entries: 51
  }
}
strutta.games(333).rounds(4343).update(update)
```

```json
{
  "title": "Updated Round title",
  "end_date": 1414876466,
  "rules": {
    "num_entries": 51
  }
}
```

> Example Response

```ruby
{
  "id": 4343,
  "title": "Updated Round title",
  "start_date": 1413905219,
  "end_date": 1414876466,
  "type": "submission",
  "rules": {
    "num_entries": 51,
    "interval": "day"
  }
}
```

```json
{
  "id": 4343,
  "title": "Updated Round title",
  "start_date": 1413905219,
  "end_date": 1414876466,
  "type": "submission",
  "rules": {
    "num_entries": 51,
    "interval": "day"
  }
}
```

Once created, a Round may not change its `type`.
Attempting to add or alter attributes not associated with the Round's current type will result in an error.

### HTTP Request

`PATCH /v2/games/:id/rounds/:round_id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:round_id` | The ID of the Round to update

### Parameters

See [Create a Round](#create-a-round) for parameters.

<aside class="notice">
NOTE: A Round's `type` may not be altered after it is created.
</aside>

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Delete Round

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).rounds(4343).delete
```

> Example Response - 204

```
  No Content
```
<aside class="warning">
WARNING: Deleting a Round will also delete the Game's Flow
</aside>

### HTTP Request

`DELETE /v2/games/:id/rounds/:round_id`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the Parent Game
`:round_id` | The ID of the Round to delete

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`
