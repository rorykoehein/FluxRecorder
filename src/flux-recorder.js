/**
 * Copyright (c) 2015, Rory Koehein
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source
 * tree.
 */

/*jslint node: true */
'use strict';

/**
 * FluxRecorder records all actions dispatched and enables playback of these actions in a later state. Make sure to
 * turn off you WebApiUtils during playback and make sure all application state changes go through an action as Flux
 * dictates.
 *
 */
class FluxRecorder {

    /**
     * @param Dispatcher instance of the Facebook Flux Dispatcher
     */
    constructor(Dispatcher) {
        this._dispatcher = Dispatcher;
        this._actions = [];
    }

    /**
     * Start recording dispatched actions for the registered dispatcher
     */
    startRecording() {
        if(!this._dispatcher){
            throw new Error("Cannot record without a dispatcher instance");
            return;
        }

        this._dispatchId = this._dispatcher.register(function(action) {
            this._actions.push(action);
        }.bind(this));
    }

    /**
     * Stop recording/unregister from dispatcher
     */
    stopRecording(){
        if(!this._dispatchId){
            return;
        }

        this._dispatcher.unregister(this._dispatchId);
    }

    /**
     * Listen to hotkeys to easily copy the current recording or play it from the browser.
     */
    listenToHotKeys(){
        if(typeof window === 'undefined'){
            return;
        }

        window.addEventListener("keydown", function(e) {
            // listen to ALT + SHIFT + C and to copy recording to clipboard
            if(e.altKey && e.shiftKey && e.keyCode === 67){
                window.prompt("Copy these actions to clipboard: ", JSON.stringify(this._actions));
            }

            // listen to ALT + SHIFT + P and to copy recording to clipboard
            if(e.altKey && e.shiftKey && e.keyCode === 80){
                var actions = window.prompt("Paste actions JSON here:", "");
                this.playback(JSON.parse(actions), 500);
            }
        }.bind(this));
    }

    /**
     * Playback actions recorded by flux-recorder live in the browser.
     *
     * @param actions - list of actions recorded by the flux-recorder
     * @param interval - ms to wait between each action
     */
    playback(actions, interval){
        interval = interval || 500;
        var dispatcher = this._dispatcher;
        var size = actions.length;
        var i = 0;

        function nextAction(){
            dispatcher.dispatch(actions[i]);
            i++;

            if(i < size){
                window.setTimeout(nextAction, interval);
            }else{
                console.log("Playback done: " + i + " actions played.");
            }
        }

        // start the action playback
        nextAction();
    }

    /**
     * Returns recorded actions
     *
     * @returns {Array}
     */
    getRecording() {
        return this._actions;
    }
}

module.exports = FluxRecorder;