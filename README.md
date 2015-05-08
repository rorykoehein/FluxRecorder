# FluxRecorder: Live Action Replay
A proof of concept to record and replay actions for [Facebook's Flux Dispatcher](https://github.com/facebook/flux)

Inspired by Jeremy Morrell's JSConf UY presentation: [Those who forget the past](https://speakerdeck.com/jmorrell/jsconf-uy-flux-those-who-forget-the-past-dot-dot-dot-1).

## Usage:

``` javascript
var AppDispatcher = require('./dispatcher'); // reference to you Flux Dispatcher instance
var FluxRecorder = require('./flux-recorder'); // the flux-recorder.js from this project
var recorder = new FluxRecorder(AppDispatcher); // create a new recorder instance
recorder.startRecording(); // listen to and save actions
recorder.listenToHotKeys(); // enable prompts: ALT-SHIFT-C to copy and ALT-SHIFT-P to replay
```

<a href="http://nextminds.github.io/flux-recorder/flux-chat/">Live demo of the Flux Chat App with recording here.</a> (Always start with a fresh state (so refresh) before replaying actions!)

## Pointers

1. Turn off your API-communication before replay (all incoming data should be in the actions already)
2. Make sure all application-state changes go through actions and the dispatcher
3. Make sure the starting point for both recording and replay is an 'empty' state
3. When using React Router, use it the flux way (with actions and a RouterStore): https://github.com/rackt/react-router/blob/master/docs/guides/flux.md#accessing-route-and-params-from-action-creators

## npm
This is a proof of concept. Will release a future version if there is enough interest. Contributions and feedback very
welcome in GitHub issues.