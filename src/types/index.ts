import { uInt16Type, UInt16Type } from "./uInt16Type";
import { uInt32Type, UInt32Type } from "./uInt32Type";
import { uInt8Type, UInt8Type } from "./uInt8Type";

import { int16Type, Int16Type } from "./int16Type";
import { int32Type, Int32Type } from "./int32Type";
import { int8Type, Int8Type } from "./int8Type";

import { float32Type, Float32Type } from "./float32Type";
import { float64Type, Float64Type } from "./float64Type";

export * from "./uInt16Type";
export * from "./uInt32Type";
export * from "./uInt8Type";
export * from "./int16Type";
export * from "./int32Type";
export * from "./int8Type";
export * from "./float32Type";
export * from "./float64Type";

export interface ITypes {
    uInt16Type: UInt16Type;
    uInt32Type: UInt32Type;
    uInt8Type: UInt8Type;

    int16Type: Int16Type;
    int32Type: Int32Type;
    int8Type: Int8Type;

    float32Type: Float32Type;
    float64Type: Float64Type;
}

export const Types: ITypes = {
    uInt16Type,
    uInt32Type,
    uInt8Type,

    int16Type,
    int32Type,
    int8Type,

    float32Type,
    float64Type,
};

export { AbstractType } from "./abstractType";
