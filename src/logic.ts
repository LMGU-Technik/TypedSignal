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

import { MultiGateSame } from "./gate.ts";
import { TypedSignal } from "./signal.ts";
import { FALSE, TRUE, UNKNOWN, UnsureBool } from "./unsureBool.ts";

abstract class LogicGateMulti extends MultiGateSame<boolean>{

}

export class And extends LogicGateMulti {
    protected render(src: TypedSignal<boolean>[]): boolean {
        return src.map(_ => _.getValue()).reduce((prev, curr) => prev && curr, true);
    }
}

export class Or extends LogicGateMulti {
    protected render(src: TypedSignal<boolean>[]): boolean {
        return src.map(_ => _.getValue()).reduce((prev, curr) => prev || curr, false);
    }
}

abstract class LogicGateMultiUnsure extends MultiGateSame<UnsureBool, UnsureBool>{

}

export class AndUnsure extends LogicGateMultiUnsure {
    constructor(readonly sources: TypedSignal<UnsureBool>[], readonly partial: boolean) {
        super(sources);
    }
    protected render(src: TypedSignal<UnsureBool>[]): UnsureBool {
        if (!src[0])
            return UNKNOWN;

        let allTrue = true;
        let allFalse = true;
        for (const i of src.map(_ => _.getValue())) {
            if (i === TRUE)
                allFalse = false;

            if (i === FALSE)
                allTrue = false;

            if (i === UNKNOWN)
                return UNKNOWN;
        }
        if (allTrue)
            return TRUE;
        else if (allFalse)
            return FALSE;
        else if (this.partial)
            return UNKNOWN;
        else
            return FALSE;
    }
}

export class OrUnsure extends LogicGateMultiUnsure {
    protected render(src: TypedSignal<UnsureBool>[]): UnsureBool {
        if (!src[0])
            return UNKNOWN;

        let res: UnsureBool = TRUE;
        for (const i of src.map(_ => _.getValue())) {
            if (i === UNKNOWN)
                return UNKNOWN;
            if (i === FALSE)
                res = FALSE;
        }
        return res;
    }
}
