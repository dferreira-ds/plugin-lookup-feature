# Plugin Lookup feature in Flex

Twilio Flex plugin that allows to use the [Lookup API](https://www.twilio.com/docs/lookup/v2-api). A search icon is added in the MainHeader component, and when you click on it, a Modal will pop up so you can start querying a specific phone number.

## Example

![Demo-2](/docs/demo-2.png "Demo")

## Setup

In the Lookup component, make sure to update the parameter SERVERLESS_FUNCTION_URL to point to your serverless function.

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex
```

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

