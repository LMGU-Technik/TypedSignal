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

/**
 * Error thrown when trying to use disposed TypedSignal
 */
export class DisposedError extends Error {
    constructor() {
        super(`TypedSignal used after disposal`);
    }
}

/**
 * base of all TypedSignals
 */
export abstract class TypedSignal<T> {
    constructor() {
        // try to enforce calling checkDisposed on getValue
        const getValue = this.getValue;
        this.getValue = () => {
            this.checkDisposed();
            return getValue.apply(this);
        };
    }

    private disposed = false;
    protected listener = new Set<Callback<T>>();

    /**
     * get notified when value changes
     * @param cb called when value changes with new value as argument
     */
    public onChange(cb: Callback<T>) {
        this.checkDisposed();
        this.listener.add(cb);
    }

    /**
     * remove listener added with `onChange`
     * @param cb reference to callback that was originally provided
     */
    public removeListener(cb: Callback<T>) {
        this.listener.delete(cb);
    }

    protected disposeListener = new Set<Callback<void>>();

    /**
     * get notified when object gets disposed
     * @param cb called when object gets disposed
     */
    public onDispose(cb: Callback<void>) {
        this.checkDisposed();
        this.disposeListener.add(cb);
    }

    /**
     * remove listener added with `onDispose`
     * @param cb reference to callback that was originally provided
     */
    public removeDisposeListener(cb: Callback<void>) {
        this.disposeListener.delete(cb);
    }

    /**
     * Internal: call the onChange listeners
     * @param value new value
     */
    protected valueUpdated(value: T) {
        this.checkDisposed();
        this.listener.forEach(($) => $(value));
    }

    /**
     * reads the current value
     */
    public abstract getValue(): T;

    /**
     * short for `.getValue()`
     */
    public get value() {
        return this.getValue();
    }

    /**
     * Check if value is equal to
     */
    public equals(value: T) {
        this.checkDisposed();
        return this.getValue() === value;
    }

    /**
     * dispose object
     */
    public dispose() {
        this.disposed = true;
        this.listener.clear();
        this.disposeListener.forEach(($) => $());
        this.disposeListener.clear();
    }

    /**
     * alias of `.dispose()`
     */
    [Symbol.dispose]() {
        this.dispose();
    }

    public isDisposed() {
        return this.disposed;
    }

    /**
     * Internal: Should be called whenever someone tries to access the signal
     */
    protected checkDisposed() {
        if (this.disposed) {
            TypedSignal.alreadyDisposed();
        }
    }

    /**
     * throw DisposedError
     */
    protected static alreadyDisposed(): never {
        throw new DisposedError();
    }
}

/**
 * basis for implementing setters
 */
export abstract class TypedSignalWithState<T> extends TypedSignal<T> {
    /**
     * Internal: update state
     * @param value new value
     */
    protected updateValue(value: T) {
        this.checkDisposed();
        if (value !== this.state) {
            this.state = value;
            this.valueUpdated(value);
        }
    }

    /**
     * reads the current value
     */
    protected abstract state: T;
    public getValue(): T {
        this.checkDisposed();
        return this.state;
    }
}

/**
 * basis for implementing setters
 */
export interface TypedSignalWithSetter<T> extends TypedSignal<T> {
    setValue(value: T): void;
    get value(): T;
    set value(value: T);
}
