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

export abstract class GateTypedSignal<A, B, T> extends TypedSignal<T>{
    constructor(readonly sourceA: TypedSignal<A>, readonly sourceB: TypedSignal<B>) {
        super();
        this.recompute();
        sourceA.onChange(() => {
            this.recompute();
        });
        sourceB.onChange(() => {
            this.recompute();
        });
    }
    protected recompute() {
        const prevState = this.state;
        this.state = this.render(this.sourceA, this.sourceB);
        if (prevState !== this.state)
            this.valueUpdated(this.state);
    }
    protected abstract render(a: TypedSignal<A>, b: TypedSignal<B>): T;
    // @ts-expect-error init is done in constructor > recompute()
    protected state: T;
    public getValue(): T {
        return this.state;
    }
}

export abstract class MultiGateSame<T, P = T> extends TypedSignal<P>{
    constructor(readonly sources: TypedSignal<T>[]) {
        super();
        this.recompute();
        sources.forEach(st => st.onChange(() => this.recompute()));
    }
    protected recompute() {
        const prevState = this.state;
        this.state = this.render(this.sources);
        if (prevState !== this.state)
            this.valueUpdated(this.state);
    }
    protected abstract render(src: TypedSignal<T>[]): P;
    // @ts-expect-error init is done in constructor > recompute()
    protected state: P;
    public getValue(): P {
        return this.state;
    }
}
