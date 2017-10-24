let speechOutput
let reprompt

const welcomeOutput = 'Hey i can send messages to slack no worries'

const welcomeReprompt = 'Ask to send Messages to Slack'

'use strict'
const fs = require('fs')
const request = require('request')
const moment = require('moment')
const Alexa = require('alexa-sdk')
const Botkit = require('botkit')
const axios = require('axios')
const slackBotKey = 'your-slack-bot-key'
const APP_ID = 'your-amazon-key'; // TODO replace with your app ID (OPTIONAL).

var controller = Botkit.slackbot({})

var slackmessage = null

var bot = controller.spawn({
  token: slackBotKey,
  incoming_webhook: {
    url: 'Webhook_url_cab_be_defined_here_too'
  }
})

const handlers = {
  'LaunchRequest': function () {
    this.response.speak(welcomeOutput).listen(welcomeReprompt)
    this.emit(':responseReady')
  }, 'GetSlackMessage': function () {
    slackmessage = isSlotValid(this.event.request, 'SlackMessage')

    if (slackmessage) {
      this.emit(':ask', 'To which channel you want to send the message to?')
    } else {
      this.emit(':ask', 'What is your slack message?')
    }
  },
  'GetSlackChannel': function () {
    var channel = isSlotValid(this.event.request, 'SlackChannel')
    if (channel) {
      new Promise((resolve, reject) => {

        var searchUrl = null 
        var alexaCh1 = 'separate_webhhok_for_channel1'
        var alexaCh2 = 'separate_webhhok_for_channel2'
        var alexaCh3 = 'separate_webhhok_for_channel3'

        if (channel === 'plumber') {
          searchUrl = alexaCh1
        } else if (channel === 'coder') {
          searchUrl = alexaCh2
        } else if (channel === 'doctor' || channel === 'doctor') {
          searchUrl = alexaCh3
        } else {
          this.emit(':ask', 'I did not get the channel name can u repeat? and thats what u said' + channel)
          return
        }

        axios({
          method: 'post',
          url: searchUrl,
          data: {
            'text': slackmessage
          }
        }).then((res) => {
          resolve({message: slackmessage})
        }).catch((error) => {
          reject({message: 'failed'})
        })
      /*request.post({
          headers: {'content-type': 'application/json'},
          url: searchUrl,
          body: JSON.stringify({text: message})
        }, function (error, response, body) {})
      
      bot.sendWebhook({
         text: slackmessage,
         channel: '#developers',
       }, function (err, res) {
         // handle error
         if (err) {
           this.response.speak('Yo we have a error')
           this.emit(':responseReady')
         }
       }) */
      }).then((content) => {
        if (content.message) {
          this.response.speak('Yor message' + content.message + ' is sent')
          this.emit(':responseReady')
        }
      })
    } else {
      this.emit(':ask', 'I did not get the channel name can u repeat?')
    }
  }
}

exports.handler = (event, context) => {
  var alexa = Alexa.handler(event, context)
  alexa.appId = APP_ID
  // To enable string internationalization (i18n) features, set a resources object.
  // alexa.resources = languageStrings
  alexa.registerHandlers(handlers)
  alexa.execute()
}

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function delegateSlotCollection () {
  console.log('in delegateSlotCollection')
  console.log('current dialogState: ' + this.event.request.dialogState)
  if (this.event.request.dialogState === 'STARTED') {
    console.log('in Beginning')
    var updatedIntent = this.event.request.intent
    // optionally pre-fill slots: update the intent object with slot values for which
    // you have defaults, then return Dialog.Delegate with this updated intent
    // in the updatedIntent property
    this.emit(':delegate', updatedIntent)
  } else if (this.event.request.dialogState !== 'COMPLETED') {
    console.log('in not completed')
    // return a Dialog.Delegate directive with no updatedIntent property.
    this.emit(':delegate')
  } else {
    console.log('in completed')
    console.log('returning: ' + JSON.stringify(this.event.request.intent))
    // Dialog is now complete and all required slots should be filled,
    // so call your normal intent handler.
    return this.event.request.intent
  }
}

function isSlotValid (request, slotName) {
  var slot = request.intent.slots[slotName]
  // console.log("request = "+JSON.stringify(request)) //uncomment if you want to see the request
  var slotValue

  // if we have a slot, get the text and store it into speechOutput
  if (slot && slot.value) {
    // we have a value in the slot
    slotValue = slot.value.toLowerCase()
    return slotValue
  } else {
    // we didn't get a value in the slot.
    return false
  }
}
