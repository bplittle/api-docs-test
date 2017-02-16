# Paging

## Objects that Offer Paging

We offer the option to page through your records of Games, Entries, Participants, and Tags.

## Parameters & Usage
> Ruby Paging Example

```ruby
# Configure API
strutta = Strutta::API.new 'mystruttatoken'
my_game = strutta.games(333)

#page by 10 at a time
limit = 10

# First request - only pass 'limit'
entries = my_game.entries.all(limit: limit)

# Get next 3 pages
page = 1
3.times do
  paging_params = {
    limit: limit,
    offset: limit * page
  }
  new_entries = my_game.entries.all(paging_params)
  page += 1
  # Process entries...
end
```
> example response

```ruby
{
"results": [
  {
    "id": 1,
    "participant_id": 10,
    "game_id": 100,
    "metadata": {
      "country": "canada",
      "state": "",
      "province": "British Columbia"
    }
  },
  {
    "id": 3,
    "participant_id": 12,
    "game_id": 100,
    "metadata": {
      "country": "canada",
      "state": "",
      "province": "Manitoba"
    }
 ],
 "count": 5
}
```
```json
{
"results": [
  {
    "id": 1,
    "participant_id": 10,
    "game_id": 100,
    "metadata": {
      "country": "canada",
      "state": "",
      "province": "British Columbia"
    }
  },
  {
    "id": 3,
    "participant_id": 12,
    "game_id": 100,
    "metadata": {
      "country": "canada",
      "state": "",
      "province": "Manitoba"
    }
 ],
 "count": 5
}
```


The foundations of our paging system are `limit` and `offset` parameters, with an optional supplementary `sort` parameter.

### Paging Request Parameters

All List requests are controlled by three parameters. They can be used together or individually.

Parameter | Description | Default
--------- | ----------- | -------
`limit` | The maximum number of objects to return | Dependent on Object requested
`offset` | Number of objects to skip past | nil
`sort` | Sorting by `created_at` | `asc` or `desc`

<aside class="notice">
Ruby Paging Example (right) shows the above usage in Ruby
</aside>

### Paging Response Parameters

The most recently created objects of any given type have the highest `id` attributes.
By default, list responses are made up of a `results` array sorted by `id` in a descending (high-to-low).

Name | Description
---- | -----------
`results` | Array of objects requested
`count` | Total number of pageable objects

<aside class="notice">
Example response on the right
</aside>
