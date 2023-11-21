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

export class Not extends TypedSignal<boolean>{
    constructor(readonly src: TypedSignal<boolean>) {
        super();
        src.onChange(val => this.valueUpdated(!val));
    }

    public getValue(): boolean {
        return !this.src.getValue();
    }
}

export class NotUnsure extends TypedSignal<UnsureBool>{
    constructor(readonly src: TypedSignal<UnsureBool>) {
        super();
        src.onChange(() => this.valueUpdated(this.getValue()));
    }

    public getValue(): UnsureBool {
        const srcState = this.src.getValue();
        if (srcState === TRUE)
            return FALSE;
        else if (srcState === FALSE)
            return TRUE;
        else
            return UNKNOWN;
    }
}
