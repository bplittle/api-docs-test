# Participant Permissions

When a Participant is created, they are automatically issued a token with `api_basic` and `registered` permissions.

`api_basic` provides the Participant with general READ permissions.

`registered` scopes ownership of the Participant object to the Participant who created it, allowing the creator to update their metadata and to create/update their own Entries and Points. Think "my body's nobody's body but mine."

There are three other permissions that can be granted to a user:

- `administrate`
- `moderate`
- `judge`

### Administrate

The `administrate` permission gives a Participant the ability to perform every action a User Private key allows,
with the exception of creating new Games and viewing a list of the User's Games. **Do not include Administrator tokens anywhere in client-side code.**

### Moderate

The `moderate` permission gives a Participant the ability to moderate Entries that are in a [Moderation](#moderation) Round.

### Judge

The `judge` permission gives a Participant the ability to judge Entries that are in a [Judging](#judging) Round.

## Get Participant Permissions

> Example Request - GET /games/333/participants/4444/permissions

```ruby
strutta = Strutta::API.new 'mystruttatoken'
strutta.games(333).participants(4444).permissions.get
```

> Example Response - 200

```ruby
{
  "permissions": [
    "api_basic",
    "registered",
    "administrate",
    "moderate"
  ]
}
```

```json
{
  "permissions": [
    "api_basic",
    "registered",
    "administrate",
    "moderate"
  ]
}
```

### HTTP Request

`GET /v2/games/:id/participants/permissions`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`

## Update Participant Permissions

> Example Request - PATCH /games/333/participants/4444/permissions

```ruby
strutta = Strutta::API.new 'mystruttatoken'

permissions = {
  add: %w( judge ),
  remove: %w( administrate moderate )
}

strutta.games(333).participants(4444).permissions.update(permissions)
```

```json
{
    "add": [ "judge" ],
    "remove": [ "administrate", "moderate" ]
}
```

> Example Response - 200

```ruby
{
  "permissions": [
    "api_basic",
    "registered",
    "judge"
  ]
}
```

```json
{
  "permissions": [
    "api_basic",
    "registered",
    "judge"
  ]
}
```

Updates are handled using two arrays, `add` and `remove`.

### HTTP Request

`PATCH /v2/games/:id/participants/:participants_id/permissions`

### URI Parameters

Parameter | Description
--------- | -----------
`:id` | The ID of the parent Game
`:participant_id` | The ID of the Participant to update

### Parameters

Parameter | Type | Description
--------- | -----| -----------
`add` | Array of strings | A list of permissions to add
`remove` | Array of strings | A list of permissions to remove

<aside class="notice">
The `api_basic` and `registered` permissions cannot be removed.
</aside>

### Minimum Permission

Consumer | Permission
-------- | ----------
User | `private_token`
Participant | `administrate`
