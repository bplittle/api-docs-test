# Paging

## Cursoring

The List endpoints in this API borrow their pagination method - **Cursoring** - from the [Twitter Search API](https://dev.twitter.com/rest/public/search).
Cursoring was developed to overcome the inefficiencies associated with passing offsets to a database, particularly when dealing with a high volume of new content being added consistently. Twitter probably understands this problem better than any other organization, and since Strutta games can have huge spikes of new content at any given time, we decided to adopt their solution.

Read their well-worded and illustrated post about working with timelines [here](https://dev.twitter.com/rest/public/timelines).

<aside class="notice">
**List endpoints** are those that request multiple objects at once
</aside>

## Parameters & Usage

> Ruby Paging Example

```ruby
# Configure API
strutta = Strutta::API.new 'mystruttatoken'
my_game = strutta.games(333)

# First request - only pass 'count'
entries = my_game.entries.all(count: 10)

# Record the paging hash's max_id for future use
# (The more likely use case would be to store this in a database)
original_max_id = entries['paging']['max_id']

# Get next 3 pages
3.times do
  paging_params = {
    count: 10,
    max_id: entries['paging']['next_max_id']
  }
  entries = my_game.entries.all(paging_params)
  # Process entries...
end

# Check for any Entries added since first request
paging_params = {
  count: 10,
  since_id: original_max_id
}
entries = my_game.entries.all(paging_params)

# If necessary, get remaining pages of new content
begin
  paging_params = {
    count: 10,
    since_id: original_max_id
    max_id: entries['paging']['next_max_id']
  }
  entries = my_game.entries.all(paging_params)
  # Process entries...
end while entries['paging']['next_max_id'] > original_max_id
```

### Paging Request Parameters

All List requests are controlled by three parameters. They can be used together or individually.

Parameter | Description | Default
--------- | ----------- | -------
`count` | The maximum number of objects to return | Dependant on Object requested
`max_id` | Return Entries created before and including the Entry with this `id` | nil
`since_id` | Return Entries created after the Entry with this `id` | nil

### Paging Response Parameters

The most recently created objects of any given type have the highest `id` attributes.
List responses are made up of a `results` array sorted by `id` in a descending (high-to-low) manner and a `paging` hash.

Name | Description
---- | -----------
`results` | Array of objects requested
`paging` | Paging hash

### Paging Hash Keys

Name | Description
--------- | -----------
`min_id` | The lowest `id` in the `results` array
`max_id` | The highest `id` in the `results` array
`next_max_id` | The `next_id` to pass to a subsequent paging request

### Usage

For the first request, pass only the `count` parameter.

Process the `results` array, and record the `paging` hash's `max_id` for future use.
If you wish to retrieve the next page, use the `paging` hash's `next_max_id` as the `max_id` for the next request. Repeat as desired.

Once you've iterated through your pages, you can be sure to only get new content by passing the original `max_id` as the `since_id` in subsequent requests.

<aside class="notice">
Ruby Paging Example (right) shows the above usage in Ruby
</aside>
