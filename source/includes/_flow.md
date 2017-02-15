# Flow

Once you've defined your Rounds, it's time to define how an Entry moves through them in the context of your Game. This definition is the called the **Flow**.

##How it works

When a Entry's time in a Round ends (triggered either by an [action or a timestamp](#action-and-timed-rounds)),
the rules defined for that Round decide whether the Entry will *pass* or *fail*.
The Flow is used to define what Round the Entry will be moved into at this point.

Each element of the Flow definition contains a reference to an `id` as well as a `pass_round` and a `fail_round` ID.
An Entry that *passes* the Round referenced by `id` will advance into the `pass_round`, an Entry that *fails* will advance into the `fail_round`.
If no `pass_round` or `fail_round` ID is defined, the Entry will no be longer active in the Game.

It is important to note that at some point, each Entry's time in a Game must end.
Either they don't *pass* a Round with no defined `fail_round`, or they advance until they are in a Round with no defined `pass_round` or `fail_round`, known as a *Terminal Round*.

The Round that an Entry is currently a part of is referred to as the Entry's *state*. Visit [Entries](#entries) to learn more.

## Definition

> Definition 1 - Simple Flow

```
[
  {  
      "id": 333,
      "pass_round": 555,
      "start": true
  },  
  {  
      "id": 555,
      "pass_round": 777
  },
  {  
      "id": 777,
      "pass_round": 888
  },
  {  
      "id": 888 (Terminal Round)
  }
]
```

> Definition 2 - Split Flow

```
[
  {  
      "id": 1111,
      "pass_round": 2222,
      "start": true
  },  
  {  
      "id": 2222,
      "pass_round": 3333,
      "fail_round": 5555  
  },
  {  
      "id": 3333,
      "pass_round": 4444
  },
  {  
      "id": 4444 (Terminal Round)
  },
  {  
      "id": 5555,
      "pass_round": 6666
  },
  {  
      "id": 6666 (Terminal Round)
  }
}  
```

> Definition 3 - Wildcard Flow

```
[
  {  
      "id": 111,
      "pass_round": 222,
      "start": true
  },  
  {  
      "id": 222,
      "pass_round": 444,
      "fail_round": 333
  },
  {  
      "id": 333,
      "pass_round": 444
  },
  {  
      "id": 444,
      "pass_round": 555
  },
  {  
      "id": 555 (Terminal Round)
  }
}  
```

> Definition 4 - Category Flow

```
[
  {  
      "id": 111,
      "pass_round": 112,
      "start": true
  },
  {  
      "id": 222,
      "pass_round": 223,
      "start": true
  },  
  {  
      "id": 112,
      "pass_round": 333
  },
  {  
      "id": 222,
      "pass_round": 333
  },
  {  
      "id": 333,
      "pass_round": 444
  },
  {  
      "id": 444 (Terminal Round)
  }
}  
```

### Example 1: Simple Flow

Recall the first Flow defined in the [Round description](#rounds):

`Submission -> Points (Voting) -> Judging -> Webhook (Prize Fullfillment)`
<small>*Round types were adjusted to represent our more generalized Game definition*</small>

This is an example of a simple, linear Flow. Any Entries that don't *pass* each Round are rendered inactive.

Let's assume we've already created our Rounds and collected their IDs:  

- Submission: 333
- Points: 555
- Judging: 777
- Webhook: 888

<aside class="notice">
**Definition 1** shows how this simple Flow would look in JSON.
</aside>

### Example 2: Split Flow

Let's take this one step further. What if a User wanted a contest Game with the typical Submission/Voting/Judging model, but wanted the Participants who didn't make the Judging Round to end on more positive note by entering them into a Random Draw.

All of a sudden we have split Flow: those who *pass* the Voting Round are up for the grand prize via the Judging Round, those who *fail* have a chance at the consolation prize via a Random Draw Round. Here's where the `fail_round` parameter comes into play.

Again, let's assume we've already created our Rounds and collected their IDs:  

- Submission: 1111
- Points (Voting): 2222
- Judging: 3333
- Webhook (Grand Prize Fullfillment): 4444
- Random Draw: 5555
- Webhook (Consolation Prize Fullfillment): 6666

<aside class="notice">
**Definition 2** shows the split Flow in JSON.
</aside>

### Example 3: Wildcard Playoff Flow

A Flow that is split can also rejoin the original path at a later point.

For example, wild-card playoff spots allow a team into the playoffs via an alternate route,
usually in the form of a mini-tournament between teams vying for the wildcard spot.

If we built the above model using this API, here's how the Rounds might be defined:

- Teams register for the season (Submission: 111)
- Teams play each other throughout the season (Points: 222)
- Wildcard hopefulls play each other in mini-tournament (Points: 333)
- Playoff teams play each other in the playoffs (Points: 444)
- Playoff winner gets the Cup (Webhook: 555)

<aside class="notice">
**Definition 3** shows the wildcard Flow in JSON.
</aside>

### Example 4: Categories Flow

Many Games require Entries to divided into categories, voted on, then re-grouped for a finalist Judging Round.
This can be achieved by creating multiple `start` Submission rounds at the beginning of the Flow.

Let's assume we've created the following rounds:

- Submission 1: 111
- Submission 2: 222
- Voting 1: 112
- Voting 2: 223
- Judging: 333
- Webhook 444

Let's also assume that Submission 1 & 2 and Voting 1 & 2 have the exact same start and end dates.

<aside class="notice">
**Definition 4** shows the category Flow in JSON.
</aside>

### A note on readability

For technical simplicity's sake, both the `pass_round` and `fail_round` parameters are optional.
Sometimes this can make examples a little tough to read. If it helps:

`
{
n  "id": 111
}
`

Is equivalent to:

`
{
n  "id": 111,
  "pass_round": null,
  "fail_round": null
}
`


## Flow Element Attributes

<aside class="notice">
The Flow Definition is made up of an array of JSON objects called *Flow Elements*.
</aside>

Name | Type | Description | Default
---- | ---- | ----------- | --------
`id` | int | The ID of the Round
`pass_round` | int | The ID of the pass Round | `null`
`fail_round` | int | The ID of the fail Round | `null`
`start` | boolean | Whether this is the initial Round in the Flow | `false`

## Create a Flow

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'

flow = [
  {  
      id: 777,
      pass_round: 888
  },
  {  
      id: 555,
      pass_round: 777
  },
  {  
      id: 888
  },
  {  
      id: 333,
      pass_round: 555,
      start: true
  }
]
strutta.games(333).flow.create(definition: flow)
```

```json
{
  "definition":
  [
    {  
        "id": 777,
        "pass_round": 888
    },  
    {  
        "id": 555,
        "pass_round": 777
    },

    {  
        "id": 888
    },
    {  
        "id": 333,
        "pass_round": 555,
        "start": true
    }
  ]
}
```

> Example Response - 201. Note that order of Flow Elements reflects the Flow itself

```ruby
[
  {
    "id": "333",
    "pass_round": "555",
    "start": "true"
  },
  {
    "id": "555",
    "pass_round": "777"
  },
  {
    "id": "777",
    "pass_round": "888"
  },
  {
    "id": "888"
  }
]
```

```json
[
  {
    "id": "333",
    "pass_round": "555",
    "start": "true"
  },
  {
    "id": "555",
    "pass_round": "777"
  },
  {
    "id": "777",
    "pass_round": "888"
  },
  {
    "id": "888"
  }
]
```

Constructing a Flow requires that you have already created your Rounds. There are a few other validation requirements to be aware of:

*Start Round*

Each Flow must have at least one Round that has been designated as the `start` Round. This Round must be of type Submission.

*Circular Paths*

A Flow is broken down into a series of paths, beginning at the `start` Round and ending at a Terminal Round or some other inactive state.
While each Round may be accessed via different routes, no Round may be accessed more than once on any given path.

<aside class="notice">
Elements in the Flow Definition can be in any order.
</aside>

### HTTP Request

`POST /v2/games/:id/flow`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Flow Parameters

Name | Type | Description
---- | ---- | -----------
`definition` | JSON | A JSON array of Flow Elements

### Flow Element Parameters

Name | Type | Description | Default
---- | ---- | ----------- | --------
`id` | int | The ID of the Round
`pass_round` | int | The ID of the pass Round | `null`
`fail_round` | int | The ID of the fail Round | `null`
`start` | boolean | Whether this is the initial Round in the Flow | `false`

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Get Flow

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).flow.get
```

> Example Response - 200

```ruby
[
  {
    "id":"333",
    "pass_round":"555",
    "start":"true"
  },
  {
    "id":"555",
    "pass_round":"777"
  },
  {
    "id":"777",
    "pass_round":"888"
  },
  {
    "id":"888"
  }
]
```

```json
[
  {
    "id":"333",
    "pass_round":"555",
    "start":"true"
  },
  {
    "id":"555",
    "pass_round":"777"
  },
  {
    "id":"777",
    "pass_round":"888"
  },
  {
    "id":"888"
  }
]
```

### HTTP Request

`GET /v2/games/:id/flow`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `public_token`
Participant | `api_basic`

## Update Flow

<aside class="notice">
Because of its strict validation requirements, there are no partial updates allowed for Flow. If you wish to edit your Flow, you may overwrite your existing Flow with another POST.
</aside>

## Delete Flow

> Example Request

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).flow.delete
```

> Example Response - 204

```
  No Content
```

### HTTP Request

`DELETE /v2/games/:id/flow`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the Parent Game

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`
