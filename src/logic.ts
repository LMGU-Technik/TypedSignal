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

import { TypedArrayLogicGateSignal } from "./gate.ts";
import { TypedSignal } from "./signal.ts";
import { FALSE, TRUE, UNKNOWN, UnsureBool } from "./unsureBool.ts";

export class SignalAnd extends TypedArrayLogicGateSignal<boolean> {
    protected render(inputs: readonly TypedSignal<boolean>[]): boolean {
        return inputs.map((_) => _.getValue()).reduce(
            (prev, curr) => prev && curr,
            true,
        );
    }
}

export class SignalOr extends TypedArrayLogicGateSignal<boolean> {
    protected render(inputs: readonly TypedSignal<boolean>[]): boolean {
        return inputs.map((_) => _.getValue()).reduce(
            (prev, curr) => prev || curr,
            false,
        );
    }
}

export class SignalAndUnsure extends TypedArrayLogicGateSignal<UnsureBool> {
    constructor(
        inputs: TypedSignal<UnsureBool>[],
        private readonly partial: boolean,
    ) {
        super(inputs);
    }
    protected render(inputs: TypedSignal<UnsureBool>[]): UnsureBool {
        if (!inputs[0]) {
            return UNKNOWN;
        }

        let allTrue = true;
        let allFalse = true;
        for (const input of inputs.map((_) => _.getValue())) {
            if (input === TRUE) {
                allFalse = false;
            }

            if (input === FALSE) {
                allTrue = false;
            }

            if (input === UNKNOWN) {
                return UNKNOWN;
            }
        }
        if (allTrue) {
            return TRUE;
        } else if (allFalse) {
            return FALSE;
        } else if (this.partial) {
            return UNKNOWN;
        } else {
            return FALSE;
        }
    }
}

export class SignalOrUnsure extends TypedArrayLogicGateSignal<UnsureBool> {
    protected render(inputs: TypedSignal<UnsureBool>[]): UnsureBool {
        if (!inputs[0]) {
            return UNKNOWN;
        }

        let result: UnsureBool = TRUE;
        for (const input of inputs.map((_) => _.getValue())) {
            if (input === UNKNOWN) {
                return UNKNOWN;
            }
            if (input === FALSE) {
                result = FALSE;
            }
        }
        return result;
    }
}
