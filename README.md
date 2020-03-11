<a href="https://github.com/ethomson/send-tweet-action/actions"><img alt="send-tweet-action status" src="https://github.com/ethomson/send-tweet-action/workflows/CI/badge.svg?branch=master&event=push"></a>

# Send a tweet from a GitHub Actions workflow

Use this action to send a tweet from a GitHub actions workflow.

## Twitter Application Setup

First, you'll need to create a Twitter application if you haven't
already.  This will allow you to programmatically authenticate to
the Twitter API and send a tweet.

If you haven't already, visit
[developer.twitter.com/apps](https://developer.twitter.com/apps)
and create a Twitter application.  Then create keys and tokens
to use for authentication.

## Secret Configuration

Configure the authentication keys and tokens for your Twitter
app as secrets in your repository.  I recommend using the
`TWITTER_CONSUMER_API_KEY`, `TWITTER_CONSUMER_API_SECRET`,
`TWITTER_ACCESS_TOKEN`, and `TWITTER_ACCESS_TOKEN_SECRET`
secrets.

## Workflow Usage

Configure your workflow to use `ethomson/send-tweet-action@v1`,
and provide the tweet you want to send as the `status` input.

Provide the authentication keys and tokens for your Twitter app
as the `consumer-key`, `consumer-secret`, `access-token`, and
`access-token-secret` inputs.

For example:

```yml
name: Send a Tweet
on: [push]
jobs:
  tweet:
    runs-on: ubuntu-latest
    steps:
      - uses: ethomson/send-tweet-action@v1
        with:
          status: "Hi, this is a test!"
          consumer-key: ${{ secrets.TWITTER_CONSUMER_API_KEY }}
          consumer-secret: ${{ secrets.TWITTER_CONSUMER_API_SECRET }}
          access-token: ${{ secrets.TWITTER_ACCESS_TOKEN }}
          access-token-secret: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
```

Now whenever you push something to your repository, GitHub Actions
will tweet on your behalf.

