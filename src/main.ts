import * as core from '@actions/core'
import Twitter from 'twitter'

function validateInput(name: string): void {
  if (!core.getInput(name)) {
    core.setFailed(`${name} is a required input`)
  }
}

async function run(): Promise<void> {
  try {
    validateInput('status')
    validateInput('consumer-key')
    validateInput('consumer-secret')
    validateInput('access-token')
    validateInput('access-token-secret')

    const twitter = new Twitter({
      consumer_key: core.getInput('consumer-key'),
      consumer_secret: core.getInput('consumer-secret'),
      access_token_key: core.getInput('access-token'),
      access_token_secret: core.getInput('access-token-secret')
    })

    twitter.post(
      '/statuses/update',
      {status: core.getInput('status')},
      (error, data, response) => {
        if (error) {
          core.setFailed(`Tweet failed! Error data: ${error[0].message}`)
        }

        console.debug(data)

        // set the output 'tweeturl' to the resulting status message URI
        const url = 'https://twitter.com/'
        core.setOutput(
          'tweeturl',
          url.concat(
            data.user.screen_name.toString(),
            '/status/'.toString(),
            data.id_str.toString()
          )
        )
        console.debug(response)
      }
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
