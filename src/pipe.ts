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

import { SignalConstant } from "./const.ts";
import { TypedSignal } from "./signal.ts";
import { SignalVariable } from "./variable.ts";
import { NO_CHANGE } from "./unsureBool.ts";

export class SignalPipe<T> extends SignalVariable<T> {
    constructor(initialValue: T) {
        super(initialValue);
        this.noChange = new SignalConstant<T | NO_CHANGE>(NO_CHANGE);
        this.piped = this.noChange;

        this.onDispose(() => {
            this.noChange.dispose();
        });
    }

    private piped: TypedSignal<T | NO_CHANGE>;
    private noChange: SignalConstant<T | NO_CHANGE>;

    private pipeChange = () => {
        if (this.piped.value !== NO_CHANGE) {
            this.setValue(this.piped.value);
        }
    };
    private pipeDispose = () => {
        if (!this.isDisposed()) {
            this.dispose();
        }
    };

    public pipe(signal: TypedSignal<T | NO_CHANGE> = this.noChange) {
        this.piped.removeListener(this.pipeChange);
        this.piped.removeDisposeListener(this.pipeDispose);

        this.piped = signal;
        signal.onChange(this.pipeChange);
        signal.onDispose(this.pipeDispose);
    }
}
