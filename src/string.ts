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

export type ExtendsToString = string | boolean | UnsureBool | {
    toString(): string;
};

export class ToString<T extends ExtendsToString>
    extends TypedSignalWithState<string> {
    constructor(input: TypedSignal<T>) {
        super();
        disposableInput(this, input, (value: T) => {
            this.updateValue(ToString.toString(value));
        });
        this.state = ToString.toString(input.getValue());
    }

    protected state: string;

    public static override toString(value: ExtendsToString): string {
        if (typeof value === "string") {
            return value;
        }

        if (value === true || value === TRUE) {
            return "true";
        }

        if (value === false || value === FALSE) {
            return "false";
        }

        if (value === UNKNOWN) {
            return "unknown";
        }

        return value.toString();
    }
}
