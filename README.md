
## ALexa Skill to send Slack message

This skill can be used to send slack messages through Alexa and also you can define the channel you want to send the message too.

## Requirements
1. Amazon developers account
2. Amazon Web services account
3. slack webhook Url (these can be generated from https://api.slack.com/incoming-webhooks)
4. SlackBot key
5. Amazon app id


## Usage

copy paste the intents and utterances with the right slot in your amazon alexa skill kit.
then zip this folder and upload to Amazon Lambda for immdediate running. dont forget npm insatll and stuff


## Intents

Slots are where you get your parameters, and the slots that are available for an intent (and their data type) are defined in a schema json file:

{
  "intents": [
    {
      "slots": [
        {
          "name": "SlackMessage",
          "type": "slackmessage"
        }
      ],
      "intent": "GetSlackMessage"
    },
    {
      "slots": [
        {
          "name": "SlackChannel",
          "type": "slackchannel"
        }
      ],
      "intent": "GetSlackChannel"
    }
  ]
}


## Utterances

Then we need our sentence data. These are just examples of how a user might invoke a sentence:

GetSlackMessage please send a message to slack
GetSlackMessage can u write to slack
GetSlackMessage would u notify slack
GetSlackMessage the message for slack is {SlackMessage}
GetSlackMessage slack message is {SlackMessage}
GetSlackMessage message is {SlackMessage}
GetSlackChannel slack channel is {SlackChannel}
GetSlackChannel channel is {SlackChannel}
GetSlackChannel the channel to write to is {SlackChannel}
GetSlackChannel {SlackChannel} write to this channel
GetSlackChannel send to channel {SlackChannel}
GetSlackChannel send to {SlackChannel}

## Slots
1. SlackMessage
hey its me remeber
what is going on man 
i just want to send a message on slack
screw the world

2. SlackChannel
plumber
coder
developer
carpenter
doctor
tester

# alexa-slackmessage-skill
