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

export function awaitTypedSignal<T>(state: TypedSignal<T>, match: (val: T) => boolean = _ => !!_, timeout = Infinity) {
    return new Promise<boolean>(resolve => {
        if (match(state.getValue()))
            return void resolve(true);

        const cb = (val: T): void => {
            if (match(val)) {
                clearTimeout(to);
                state.removeListener(cb);
                resolve(true);
            }
        };
        state.onChange(cb);
        const to = timeout !== Infinity ? setTimeout(() => {
            state.removeListener(cb);
            resolve(false);
        }, timeout) : 0;
    });
}
