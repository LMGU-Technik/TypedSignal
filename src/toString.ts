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
import { FALSE, TRUE, UNKNOWN, UnsureBool } from "./unsureBool.ts";

export type ExtendsToString = string | boolean | UnsureBool | {
    toString(): string;
};

export class ToString<T extends ExtendsToString> extends TypedSignal<string>{
    constructor(readonly src: TypedSignal<T>) {
        super();
        src.onChange(val => this.valueUpdated(this.toString(val)));
    }

    public getValue(): string {
        return this.toString(this.src.getValue());
    }

    protected toString(val: ExtendsToString): string {
        if (typeof val === "string")
            return val;

        if (val === true || val === TRUE)
            return "true";

        if (val === false || val === FALSE)
            return "false";

        if (val === UNKNOWN)
            return "unknown";

        return val.toString();

    }
}
