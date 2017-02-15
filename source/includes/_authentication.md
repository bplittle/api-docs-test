# Authentication

The Strutta API has two types of consumers - **Users** and **Participants** - each with their own API token(s) and permission sets.

##Users

**Users** are those who have created an account on our [developer portal](http://api.strutta.com).
On account creation, each User is issued a Private and a Public token.


**Private** tokens give permission to perform every action this API provides.
They also allow a User to act on behalf of Participants.
**Never use your private token in client-side code.**
Any client-side action should use either a Participant token or the User's public token.

**Public** tokens are read-only tokens for accessing the elements of Games that do not require any sort of authentication. They are designed for client-side exposure.

User tokens do not expire automatically. A User may add, remove, and regenerate both Private and Public tokens on our [developer portal](http://api.strutta.com).

##Participants

**Participants** are those that play the Games created by Users. It is important to note that a Participant is created within the scope of a single Game, and is only permitted to interact with that Game.

When a Participant is created, they are automatically issued a token with `api_basic` and `registered` permissions.

`api_basic` provides the Participant with general READ permissions.

`registered` scopes ownership of the Participant object to the Participant themselves, allowing the creator to update their metadata and to create/update their own Entries and Points. Think "my body's nobody's body but mine."

Extended permissions (`administrate`, `moderate`, `judge`) can be granted to a Participant by a User or a Participant with the `administrate` permission.
See [Participant Permissions](#participant-permissions) to learn more.

Be sure to auth requests using the Participant's token instead of the User Public token whenever possible.
The details and caller of every API call is logged in our database, and that data will be much more rich if a Participant ID is associated with each possible record. See [Export API Calls](#export-api-calls) to learn more.

By default, Participant tokens expire after 24 hours. See [Renew Participant Token](#renew-participant-token) to learn more.

## Using your token

> Example Requests

```
curl http://api.strutta.com/v2/games \
     -H "Authorization: Token token=mystruttatoken"

GET http://api.strutta.dev:4000/v2/games/?token=mystruttatoken
```


The API expects a token to be included either as a URI parameter or in a request header.

### URI Parameter:
`http://api.strutta.com/v2/path/?token=mystruttatoken`

### Header:
`Authorization: Token token=mystruttatoken`

<aside class="notice">
Replace `mystruttatoken` with your User or Participant token.
</aside>
