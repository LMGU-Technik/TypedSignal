import { SignalAnd, SignalCast, SignalVariable } from "../mod.ts";

using A = new SignalVariable<boolean>(true);
using B = new SignalVariable<number>(3);

using C /* : TypedSignal<boolean> */ = new SignalCast(B, (val) => val > 5);// number > boolean

using Result = new SignalAnd([A, C]);

console.log(Result.value); // false
B.value = 8;
console.log(Result.value); // true
