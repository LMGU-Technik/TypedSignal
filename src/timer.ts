/* 
* LMGU-Technik TypedSignal

* Copyright (C) 2023 Hans Schallmoser

* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { TypedSignal } from "./signal.ts";
import { SignalVariable } from "./signalVariable.ts";

export class Timer<T> extends TypedSignal<T>{
    constructor(readonly defaultState: TypedSignal<T>, readonly activatedState: TypedSignal<T>) {
        super();
        this.state = this.defaultState.getValue();
        defaultState.onChange(this.render);
        activatedState.onChange(this.render);
    }

    protected activations = new Set<symbol>();

    protected isActivated(): boolean {
        return this.activations.size > 0;
    }

    protected state: T;

    public getValue(): T {
        if (this.isActivated())
            return this.activatedState.getValue();
        else
            return this.defaultState.getValue();
    }

    protected render() {
        const currState = this.getValue();
        if (currState !== this.state) {
            this.state = currState;
            this.valueUpdated(currState);
        }
    }

    public activate(time: number) {
        const act = Symbol();
        this.activations.add(act);
        this.render();
        if (time !== Infinity) {
            setTimeout(() => {
                this.activations.delete(act);
                this.render();
            }, time);
        }
        return act;
    }

    public cancel(act: symbol) {
        this.activations.delete(act);
        this.render();
    }

    public clear() {
        this.activations.clear();
        this.render();
    }
}

export class DirectTimer<T> extends Timer<T>{
    constructor(active: T, inactive: T) {
        super(new SignalVariable(active), new SignalVariable(inactive));
    }
}

export class BoolTimer extends DirectTimer<boolean>{
    constructor() {
        super(true, false);
    }
}
