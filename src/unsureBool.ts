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

import { TRUE, FALSE, UnsureBool } from "https://deno.land/x/unsure_bool@v1.0.0/mod.ts";
export * from "https://deno.land/x/unsure_bool@v1.0.0/mod.ts";

export class Bool2Unsure extends Cast<boolean, UnsureBool>{
    constructor(input: TypedSignal<boolean>) {
        super(input, _ => _ ? TRUE : FALSE);
    }
} 
