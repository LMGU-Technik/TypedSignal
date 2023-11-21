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

export class Switch<T> extends TypedSignal<T>{
    constructor(readonly sourceA: TypedSignal<T>, readonly sourceB: TypedSignal<T>, readonly input: TypedSignal<boolean>) {
        super();
        this.recompute();
        sourceA.onChange(() => {
            this.recompute();
        });
        sourceB.onChange(() => {
            this.recompute();
        });
        input.onChange(() => {
            this.recompute();
        });
    }
    protected recompute() {
        const prevState = this.state;
        this.state = this.input.getValue() ? this.sourceB.getValue() : this.sourceA.getValue();
        if (prevState !== this.state)
            this.valueUpdated(this.state);
    }
    // @ts-expect-error init is done in constructor > recompute()
    protected state: T;
    public getValue(): T {
        return this.state;
    }
}
