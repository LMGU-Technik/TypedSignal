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
 * disposes `signal` when signal gets disposed and cleans up callbacks when `signal` gets disposed
 * @param onChange automatically bound to cls
 */
export function disposableInput<T, P>(
    signal: TypedSignal<T>,
    input: TypedSignal<P>,
    onChange: (this: TypedSignal<T>, value: P) => void,
) {
    const cb = (value: P) => {
        onChange.call(signal, value);
    };
    const dispose = () => {
        signal.dispose();
    };
    input.onChange(cb);
    input.onDispose(dispose);
    signal.onDispose(() => {
        input.removeListener(cb);
        input.removeDisposeListener(dispose);
    });
}
