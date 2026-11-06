import React from "react";
import type { DeviceObject } from "./types";

export function isDeviceObject(obj: unknown): obj is DeviceObject {
	return (
		obj != null &&
		typeof obj === "object" &&
		"stateId" in obj &&
		typeof (obj as any).stateId === "string" &&
		"instance" in obj &&
		typeof (obj as any).instance === "number"
	);
}
