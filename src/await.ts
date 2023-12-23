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

/**
 * resolves after `match` returns `true` when called with signal value
 * @param signal the TypedSignal to check
 * @param match matching function
 * @param timeout optional timeout
 * @returns true if value is matched, false in case of timeout or disposal of `signal`
 */
export function awaitSignal<T>(
    signal: TypedSignal<T>,
    match: (value: T) => boolean = (_) => !!_,
    timeout = Infinity,
): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        if (match(signal.getValue())) {
            return void resolve(true);
        }

        const cb = (value: T): void => {
            if (match(value)) {
                clearTimeout(to);
                signal.removeListener(cb);
                signal.removeDisposeListener(dispose);
                resolve(true);
            }
        };
        const dispose = () => {
            clearTimeout(to);
            resolve(false);
        };

        signal.onChange(cb);
        signal.onDispose(dispose);

        const to = timeout !== Infinity
            ? setTimeout(() => {
                signal.removeListener(cb);
                signal.removeDisposeListener(dispose);
                resolve(false);
            }, timeout)
            : 0;
    });
}
