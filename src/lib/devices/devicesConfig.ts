import * as CoreStates from "./service/deviceStatesCore";
import { createDeviceConfigs } from "./service/deviceConfigsBlueprint";

export const DEVICE_CONFIGS = createDeviceConfigs(CoreStates);
