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

export { awaitSignal } from "./src/await.ts";

export { SignalCast } from "./src/cast.ts";
export { SignalConstant } from "./src/const.ts";
export { SignalLatch } from "./src/latch.ts";
export {
    SignalAnd,
    SignalAndUnsure,
    SignalOr,
    SignalOrUnsure,
} from "./src/logic.ts";
export { SignalNot, SignalNotUnsure } from "./src/not.ts";
export { SignalPipe } from "./src/pipe.ts";
export { SignalRelay, TSRelay } from "./src/relay.ts";
export { DisposedError, TypedSignal } from "./src/signal.ts";
export { ToString } from "./src/string.ts";
export { Switch } from "./src/switch.ts";
export { BoolTimer, Timer, ValueTimer } from "./src/timer.ts";
export { SignalVariable } from "./src/variable.ts";

export type { TypedSignalWithSetter } from "./src/signal.ts";
export type { ExtendsToString } from "./src/string.ts";
export * from "./src/unsureBool.ts";
