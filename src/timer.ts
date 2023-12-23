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

import { SignalConstant } from "./const.ts";
import { disposableInput } from "./disposeMgr.ts";
import { TypedSignal, TypedSignalWithState } from "./signal.ts";

export class Timer<T> extends TypedSignalWithState<T> {
    constructor(
        readonly defaultState: TypedSignal<T>,
        readonly activatedState: TypedSignal<T>,
    ) {
        super();
        this.state = this.defaultState.getValue();
        disposableInput(this, defaultState, this.recompute);
        disposableInput(this, activatedState, this.recompute);
        this.recompute();
    }

    private activations = new Set<symbol>();

    public isActivated(): boolean {
        return this.activations.size > 0;
    }

    protected state: T;

    private recompute() {
        if (this.isDisposed()) {
            return;
        }

        this.updateValue(
            this.isActivated()
                ? this.activatedState.value
                : this.defaultState.value,
        );
    }

    private timeouts = new Set<number>();

    public activate(time = Infinity) {
        const activation = Symbol();
        this.activations.add(activation);
        this.recompute();
        if (time !== Infinity) {
            const to = setTimeout(() => {
                this.timeouts.delete(to);
                this.activations.delete(activation);
                this.recompute();
            }, time);
            this.timeouts.add(to);
        }
        return activation;
    }

    public cancel(activation: symbol) {
        this.activations.delete(activation);
        this.recompute();
    }

    public clear() {
        this.activations.clear();
        this.recompute();
    }
}

export class ValueTimer<T> extends Timer<T> {
    constructor(active: T, inactive: T) {
        super(new SignalConstant(active), new SignalConstant(inactive));
    }
}

export class BoolTimer extends ValueTimer<boolean> {
    constructor() {
        super(true, false);
    }
}
