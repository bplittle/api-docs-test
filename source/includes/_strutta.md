# Strutta API


### docs v2 :fire emojis:

## Background

### More changes??

The Strutta API allows you to tap into the core of Strutta's promotions platform and take advantage of advanced complexity and customization.

In our years of experience creating thousands of turnkey and custom promotions, we've seen the Social Promotions market mature. Our customers have begun to want more than just _Sweepstakes_ or _Contests_; they now want to be able to pick and choose which aspects of each type they want to utilize, and they want to add new elements as well.

So, when we began constructing this API, we decided it was important to do away with the traditional "Contest" and "Sweepstakes" definitions we'd lived by in the past. As engineers and consumers of the Promotions API we felt that generalizing these definitions would encourage us to create a more flexible API. We also understood that changing the definition of what our technology is capable of opens up a huge swath of use cases we had not yet considered.

By giving API clients the ability to add core elements like Games, Entries, Moderation, Random Draws, and Points Rounds to any aspect of their software we're making it possible to apply the power of social promotions to any section of the marketing funnel.

## Technical

This API is designed to be as [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) as possible.
We use HTTP verbs and standard HTTP response codes, and object hierarchy is (with a few exceptions) described exactly by the URI.

This API is designed so that it can easily and securely be implemented on both the client and the server.
JSON is returned in all API responses, including errors, which have a standardized structure.
We do our best to provide specific, in-depth error messages to save you headaches.

We also keep a record of all authenticated API calls (those that result in responses other than 401 or 404) that get made, so you can easily view your own usage history and the history of those you grant permission to.

Throughout the many parameter lists in this documentation, only parameters marked as optional are not required.

## Version

This documentation is for API version 2.0
