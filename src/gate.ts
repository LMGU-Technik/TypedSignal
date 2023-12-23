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

import { disposableInput } from "./disposeMgr.ts";
import { TypedSignal, TypedSignalWithState } from "./signal.ts";

export abstract class TypedABLogicGateSignal<A, B = A, T = A | B>
    extends TypedSignalWithState<T> {
    constructor(
        private readonly sourceA: TypedSignal<A>,
        private readonly sourceB: TypedSignal<B>,
    ) {
        super();
        disposableInput(this, sourceA, this.recompute);
        disposableInput(this, sourceB, this.recompute);
        this.state = this.recompute();
    }
    private recompute() {
        const state = this.render(this.sourceA, this.sourceB);
        this.updateValue(state);
        return state;
    }
    protected abstract render(a: TypedSignal<A>, b: TypedSignal<B>): T;
    protected state: T;
}

export abstract class TypedArrayLogicGateSignal<T, P = T>
    extends TypedSignalWithState<P> {
    constructor(private readonly inputs: readonly TypedSignal<T>[]) {
        super();
        for (const input of inputs) {
            disposableInput(this, input, this.recompute);
        }
        this.state = this.recompute();
    }
    private recompute() {
        const state = this.render(this.inputs);
        this.updateValue(state);
        return state;
    }
    protected abstract render(src: readonly TypedSignal<T>[]): P;
    protected state: P;
}
