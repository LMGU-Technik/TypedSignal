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

export class Latch<T> extends TypedSignal<T>{
    constructor(readonly input: TypedSignal<T>, readonly latch: TypedSignal<boolean>) {
        super();
        this.state = this.input.getValue();
        latch.onChange(forward => {
            if (forward && this.state !== input.getValue()) {
                this.valueUpdated(this.getValue());
            }
        });
        input.onChange(val => {
            if (latch.getValue()) {
                this.state = val;
            }
        });
    }
    protected state: T;
    public getValue(): T {
        if (this.latch.getValue())
            this.state = this.input.getValue();

        return this.state;
    }
}

