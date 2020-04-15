import * as core from '@actions/core'
import Twitter from 'twitter'

function validateInput(name: string): void {
  if (!core.getInput(name)) throw new Error(`${name} is a required input`)
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

    const statusCandidate = core.getInput('status')
    let status = statusCandidate // If in doubt assume it's a string

    if (Array.isArray(statusCandidate)) {
      // In case it is an array, select the status using the current date (day of month)
      const idx = new Date().getDate() % statusCandidate.length
      status = statusCandidate[idx]
    }

    twitter.post('/statuses/update', {status}, (error, data, response) => {
      if (error) throw error

      console.log(data)
      console.log(response)
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
