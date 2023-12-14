/* 
* LMGU-Technik TypedSocket

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

type Callback<T> = (value: T) => void;

export abstract class TypedSignal<T>{
    public onChange(cb: Callback<T>) {
        this.listener.add(cb);
    }
    public removeListener(cb: Callback<T>) {
        this.listener.delete(cb);
    }
    protected listener = new Set<Callback<T>>();
    protected valueUpdated(val: T) {
        this.listener.forEach(_ => _(val));
    }
    public abstract getValue(): T;
    public equals(val: T) {
        return this.getValue() === val;
    }
    public dispose() {
        this.listener.clear();
    }
    [Symbol.dispose]() {
        this.dispose();
    }
}
