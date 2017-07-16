/*

   The MIT License (MIT)

   Copyright (c) 2015 Dan Abramov

   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

import CableCar from './cableCar';

let car;
let connected = false;

const middleware = store => next => (incomingAction) => {
    const action = incomingAction;

    switch (action.type) {
        case 'CABLECAR_INITIALIZED':
            car = action.car;
            break;
        case 'CABLECAR_CONNECTED':
            connected = true;
            break;
        case 'CABLECAR_DISCONNECTED':
            connected = false;
            break;
        case 'CABLECAR_DESTROY':
            car.unsubscribe();
            car = null;
            action.CableCar__Action = true;
            break;
        case 'CABLECAR_CHANGE_CHANNEL':
            car.changeChannel(action.channel, action.options || {});
            action.CableCar__Action = true;
            break;
        default:
            break;
    }

    if (car && car.prefixMatches(action) && connected &&
        (action.CableCar__Action === undefined)) {
        car.send(action);
    }

    const propagate = action.CableCarOptimistic || action.CableCar__Action ||
                      !car || !car.prefixMatches(action);

    return (propagate ? next(action) : store.getState());
};

middleware.connect = (store, channel, options) => new CableCar(store, channel, options);

export default middleware;
