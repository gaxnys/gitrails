/*

   The MIT License (MIT)

   Copyright (c) 2015 Dan Abramov

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

import ActionCable from 'actioncable'

export default class CableCar {

    constructor(store, channel, options = {}) {
        if (typeof ActionCable === 'undefined') {
            throw new Error('CableCar tried to connect to ActionCable but ActionCable is not defined');
        }

        if (typeof channel !== 'string') {
            throw new Error(`CableCar: unknown channel: ${channel}`);
        }

        this.store = store;

        this.initialize(channel, options);
    }

    initialize = (channel, options) => {
        this.channel = channel;
        this.options = options;
        if (typeof this.options.prefix === 'undefined') {
            this.options.prefix = 'CABLECAR';
        }

        let params = options.params || {};
        params = Object.assign({ channel }, params);

        this.subscription = ActionCable.createConsumer("ws://localhost:3001/cable").subscriptions.create(
            params, {
                initialized: this.initialized,
                connected: this.connected,
                disconnected: this.disconnected,
                received: this.received,
                rejected: this.rejected,
            },
        );
    }

    changeChannel = (channel, options = {}) => {
        this.unsubscribe();
        const newOptions = options;
        if (typeof newOptions.prefix === 'undefined') {
            newOptions.prefix = this.options.prefix;
        }
        this.initialize(channel, newOptions);
    }

    // Redux dispatch function
    dispatch = (msg) => {
        let action = typeof msg === 'object' ? msg : this.formatAction(msg);
        action = Object.assign(action, { CableCar__Action: true });
        this.store.dispatch(action);
    }

    formatAction = msg => ({
        type: msg,
        car: this,
        channel: this.channel,
        options: this.options,
    })

    prefixMatches = (action = {}) => {
        if (typeof action === 'object' && typeof action.type === 'string') {
            const actionPrefix = action.type.slice(0, this.options.prefix.length);
            return actionPrefix === this.options.prefix;
        }
        throw new Error(`CableCar: ${action} is not a valid redux action`);
    }

    // ActionCable callback functions
    initialized = () => this.dispatch('CABLECAR_INITIALIZED')

    connected = () => {
        this.dispatch('CABLECAR_CONNECTED');
        if (this.options.connected) { this.options.connected.call(); }
    }

    disconnected = () => {
        this.dispatch('CABLECAR_DISCONNECTED');
        if (this.options.disconnected) { this.options.disconnected.call(); }
    }

    received = msg => this.dispatch(JSON.parse(msg))

    rejected = () => {
        throw new Error(
            `CableCar: Attempt to connect was rejected.
      (Channel: ${this.channel})`,
        );
    }

    // ActionCable subscription functions (exposed globally)
    perform = (method, payload) => this.subscription.perform(method, payload)

    send = action => this.subscription.send(action)

    unsubscribe = () => {
        this.subscription.unsubscribe();
        this.disconnected();
    }
}
