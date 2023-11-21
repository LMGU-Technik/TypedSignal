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

import { Cast } from "./cast.ts";
import { TypedSignal } from "./signal.ts";

export const TRUE = Symbol("True");
export type TRUE = typeof TRUE;
export const FALSE = Symbol("False");
export type FALSE = typeof FALSE;
export const UNKNOWN = Symbol("Unknown");
export type UNKNOWN = typeof UNKNOWN;
export type UnsureBool = TRUE | FALSE | UNKNOWN;

export const NO_CHANGE = Symbol("NoChange");
export type NO_CHANGE = typeof NO_CHANGE;

export class Bool2Unsure extends Cast<boolean, UnsureBool>{
    constructor(input: TypedSignal<boolean>) {
        super(input, _ => _ ? TRUE : FALSE);
    }
} 
