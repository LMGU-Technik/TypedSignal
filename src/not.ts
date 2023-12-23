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
import { FALSE, TRUE, UNKNOWN, UnsureBool } from "./unsureBool.ts";

export class SignalNot extends TypedSignalWithState<boolean> {
    constructor(input: TypedSignal<boolean>) {
        super();
        disposableInput(this, input, (value: boolean) => {
            this.updateValue(!value);
        });
        this.state = !input.value;
    }
    protected state: boolean;
}

export class SignalNotUnsure extends TypedSignalWithState<UnsureBool> {
    constructor(input: TypedSignal<UnsureBool>) {
        super();
        disposableInput(this, input, (value: UnsureBool) => {
            const computed = SignalNotUnsure.compute(value);
            this.updateValue(computed);
        });
        this.state = SignalNotUnsure.compute(input.getValue());
    }

    protected state: UnsureBool;

    public static compute(input: UnsureBool) {
        if (input === TRUE) {
            return FALSE;
        } else if (input === FALSE) {
            return TRUE;
        } else {
            return UNKNOWN;
        }
    }
}
