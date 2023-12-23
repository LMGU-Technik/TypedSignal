# Read-only API

You are likely reading this because one of your libraries uses this pattern:

```typescript
class Lib {
    public readonly connected: TypedSignal<boolean>;
    // (or a similar type like SignalVariable, SignalRelay, TSRelay, ...)
}
```

TypedSignal is a lib to provide a unified way of handling state changes.

Implemented the classic way the above example would look like this:

```typescript
type VoidCallback = () => void;
class Lib {
    private connected: boolean = false;
    public getConnectedState(): boolean {
        return this.connected;
    }

    private onConnectedCallbacks = new Set<VoidCallback>();
    public onConnected(cb: VoidCallback) {
        this.onConnectedCallbacks.add(cb);
    }
    public removeConnectedListener(cb: VoidCallback) {
        this.onConnectedCallbacks.delete(cb);
    }

    private onDisconnectedCallbacks = new Set<VoidCallback>();
    public onDisconnected(cb: VoidCallback) {
        this.onDisconnectedCallbacks.add(cb);
    }
    public removeDisconnectedListener(cb: VoidCallback) {
        this.onDisconnectedCallbacks.delete(cb);
    }

    private setConnectedState(connected: boolean) {
        this.connected = connected;
        for (
            const cb of connected
                ? this.onConnectedCallbacks
                : this.onDisconnectedCallbacks
        ) {
            cb();
        }
    }
}
```

With TypedSignal it looks like this:

```typescript
class Lib {
    // this stores the state
    private readonly connState = new SignalVariable<boolean>(false);

    // this extra layer makes it impossible to change the value from outside
    public readonly connected = new SignalRelay(this.connState);

    private setConnectedState(connected: boolean) {
        this.connState.value = connected;
    }
}
```

## API

### `TypedSignal<T>.value` (alias for `TypedSignal<T>.getValue(): T`)

Reads the current value.

### `TypedSignal<T>.onChange(cb: (value: T) => void): void`

Registers a listener for value changes.

### `TypedSignal<T>.removeListener(cb: (value: T) => void): void`

Removes the listener again.

This is all you need to know if you just want to get values out of a
TypedSignal!

## Advanced API

### `TypedSignal<T>.onDispose(cb: () => void): void`

Registers a listener for object dispose. After the object got disposed any
attempt to do something with it will throw a `DisposedError`.

### `TypedSignal<T>.removeDisposeListener(cb: () => void): void`

Removes the dispose listener again.

### `TypedSignal<T>.equals(value: T): boolean`

Returns true if the current value strict equals the given value.
