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
### Are we removing Flow?


## Action and Timed Rounds

Programatically, there are two groups of Rounds: **Action** and **Timed**.

### Action Rounds

Action Rounds advance Entries to subsequent rounds when an action takes place.

Moderation is a good example: when an administrator approves or denies an Entry it is moved to the Round's `pass_round` or `fail_round` immediately.

There are two Rounds of this type: `submission` and `moderation`.

### Timed Rounds

Timed Rounds automatically advance their entries at a pre-defined timestamp.

Random Draw is a good example: Once the Round has ended, a pre-defined number of Entries "win" and advance to the Round's `pass_round` at that time. Those that "lose" are advanced to the Round's `fail_round`.

There are four Rounds of this type: `random_draw`, `points`, `judging`, and `webhook`


## Global Attributes

Each Round type has the following shared global attributes.

### Global Attributes

Name | Type | Description
---- | ---- | -----------
`type` | string | String identifier of the Round type
`title` | string | The Round's title
`start_date` | UNIX timestamp | The Round's start date
`end_date` | UNIX timestamp | The Round's end date

## Round Types and their Rules

### Submission

String identifier: `submission`

If a Game had a front door, it would be a Submission Round.
Rounds of this type define the rules for how often and how frequently a Participant can play a Game.

### Submission Rules

Name | Type | Description | Options
---- | ---- | ----------- | -------
interval | string | Time period during which `num_entries` and `num_referrals` are allowed | `minute` `hour` `day` `week` `month` `game`
num_entries | int | Total number of Entries a Participant is allowed during `interval`
num_referrals | int | Total number of extra Entries a Participant is allowed during `interval` (optional)

### Moderation

String identifier: `moderation`

Moderation Rounds are used to quickly eliminate any inappropriate or off-topic content.
They can be used between two Rounds of any type, and are very useful for monitoring the overall progress of a Game.

If there are Entries awaiting moderation, this Round POSTs status reports to the `status_webhook` a maximum of two times per day.
If you do not wish to receive these reports, do not provide a `status_webhook`.

Make sure to give a realistic buffer period for Moderation.
If the Round ends and there are still Entries in Moderation, they will be advanced to the `fail_round` defined in the Game Flow.

Moderation is performed by Participants with the `moderate` permission. Visit [Moderation](#get-entries-in-moderation) to learn more.

### Moderation Rules

Name | Type | Description
---- | ---- | -----------
status_webhook | string | POST status reports to this URL - ie. *Entries awaiting moderation* (optional)

### Points

String identifier: `points`

There are many manifestations of Points across the internet.
Examples include: "Votes", "Likes", "Re-Tweets", "Subscribes", "Diggs", and many more.

At the end of the day, each of the above is just a way of keeping score.
To further our generalized *Game* analogy, we opted to use *Points* as our descriptor.

Points Rounds define the number of Points (postive or negative) a Participant can assign per Entry during a pre-defined interval.
When the interval is completed, Entries are sorted by Points, and a pre-defined number "win".

### Points Rules

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

### Judging Rules

Name | Type | Description
---- | ---- | -----------
`winners` | int | Total number of winners chosen by judges (1 - 20)
`ranking_size` | int | The number of Entries to be ranked by each Judge (1 - 20)

### Random Draw

String identifier: `random_draw`

Random Draw Rounds are the bread and butter of Sweepstakes Games, but can really be used Games of any kind.
Rounds of this type can define either an absolute number of winners or a percentage of total Entries that will "win" the Round.

### Random Draw Rules

Name | Type | Description
---- | ---- | -----------
winners | int | Total number of random winners chosen
percentage | boolean | Whether to interpret `winners` as a percentage. Default: `false`

### On Demand

String identifier: `on_demand`

The On-Demand Winners endpoint behaves as a mini-game _within_ your Game.
A pre-defined number of entries are randomly drawn from all entries that have an active (non-nil) state.
These winners are then passed through the provided On-Demand Round and returned.

### On Demand Rules

Name | Type | Description
---- | ---- | -----------

_This Round Type has no rules_

### Webhook

String identifier: `webhook`

Webhook Rounds were originally named Prize Fulfillment Rounds, but were later generalized so that they might be used for passing Entries, failing Entries, or even things like mid-Game progress reports.
When a Webhook Round reaches its end date, it POSTs the data of all its Entries to a pre-defined webhook and advances the Entries to the next Round.

If a webhook POST is unsuccessful (anything other than a 200 response), it can be retried or dismissed at our [developer portal](http://api.strutta.com).

### Webhook Rules

Name | Type | Description
---- | ---- | -----------
webhook | string | URI to POST to on Round completion
notify_user | boolean | Whether to email User on Round completion. Default: `false`.

## Referrals

You may want to run a Sweepstakes in which Participants get bonus Entries for referring others to the Game.
To allow this, we have implemented Referrals.

To include this feature in your Game, there are two requirements.

First, when creating a Submission Round, you must include a `num_referrals` parameter in the Round definition with a value of how many extra Entries you want to allow Participants during the given interval.

When you create a Participant, if you have `administrate` permissions, a `referral_code` will be returned with that Participant.
Then, to tell the API that an Entry is a referral of that Participant, you must include this code in the `referral` parameter of the Entry.
If the number of that Participant's bonus Entries do not exceed the `num_referrals` value of the Round, this will automatically create a bonus Entry for the Participant.
The bonus Entry's `metadata` value will be `{email: participant_email, referral: true}`, where `participant_email` is the original Participant's email address.

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
