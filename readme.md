# TypedSignal

> [!CAUTION]
> This is not maintained anymore. Consider using [preact signals](https://github.com/preactjs/signals) instead

Build PLC-like applications with Deno.js. Write VHDL-like code with TypeScript.

> [Looking out for the simple API docs because one of your libraries uses TypedSignal?](./consume_only.md)

```typescript
using A = new SignalVariable<boolean>(true);
using B = new SignalVariable<number>(3);

using C /* : TypedSignal<boolean> */ = new SignalCast(B, (val) => val > 5);// number > boolean

using Result = new SignalAnd([A, C]);

console.log(Result.value); // false
B.value = 8;
console.log(Result.value); // true
```

## API

### `TypedSignal<T>`

#### `TypedSignal<T>.value` / `TypedSignal<T>.getValue(): T`

Reads the current value.

#### `TypedSignal<T>.onChange(cb: (value: T) => void): void`

Registers a listener for value changes.

#### `TypedSignal<T>.removeListener(cb: (value: T) => void): void`

Removes the listener again.

#### `TypedSignal<T>.onDispose(cb: () => void): void`

Registers a listener for object dispose.
[Read more about disposing below](#about-dispose).

#### `TypedSignal<T>.removeDisposeListener(cb: () => void): void`

Removes the dispose listener again.

#### `TypedSignal<T>.isDisposed(): boolean`

Returns true if the object has been disposed.

#### `TypedSignal<T>.equals(value: T): boolean`

Returns true if the current value strict equals the given value.

// more docs coming soon

## About dispose

You can (and should) dispose TypedSignals if they are no longer needed by
calling `TypedSignal<T>.dispose()`. `[Signal.dispose]` is an alias. After the
object got disposed any attempt to do something with it (eg. reading its value,
registering listeners) will throw a `DisposedError`.

## License

Copyright (C) 2023 Hans Schallmoser

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details. You
should have received a copy of the GNU General Public License along with this
program. If not, see <https://www.gnu.org/licenses/>.
