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

/**
 * cast TypedSignals
 */
export class SignalCast<In, Out> extends TypedSignalWithState<Out> {
    /**
     * @param cast function used to convert values
     */
    constructor(
        input: TypedSignal<In>,
        cast: (value: In) => Out,
    ) {
        super();
        this.state = cast(input.value);
        disposableInput(this, input, (value: In) => {
            this.updateValue(cast(value));
        });
    }
    protected state: Out;
}
