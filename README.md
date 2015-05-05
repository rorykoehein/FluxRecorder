# FluxRecorder: Live Action Replay
Record and replay actions for [Facebook's Flux Dispatcher](https://github.com/facebook/flux)

Inspired by Jeremy Morrel's JSConf UY presentation: [Those who forget the past](https://speakerdeck.com/jmorrell/jsconf-uy-flux-those-who-forget-the-past-dot-dot-dot-1).

## Usage
Require FluxRecorder in your app as such:

``` javascript
var AppDispatcher = require('./dispatcher'); // reference to you Flux Dispatcher instance
var FluxRecorder = require('./flux-recorder'); // the flux-recorder.js from this project
var recorder = new FluxRecorder(AppDispatcher); // create a new recorder
recorder.startRecording(); // start recording
recorder.listenToHotKeys(); // listens to ALT-SHIFT-C for copy and ALT-SHIFT-P for playback
```

<a href="http://nextminds.github.io/flux-recorder/flux-chat/">Live demo of the Flux Chat App with recording here.</a> (Always start with a fresh state (so refresh) before replaying actions!)

## Pointers

1. Turn off your API-communication before replay (all incoming data should be in the actions already)
2. Make sure all application-state changes go through actions and the dispatcher
3. Make sure the starting point for both recording and replay is an 'empty' state
3. When using React Router, use it the flux way (with actions and a RouterStore): https://github.com/rackt/react-router/blob/master/docs/guides/flux.md#accessing-route-and-params-from-action-creators

### npm

Will release a future version if there is enough interest.