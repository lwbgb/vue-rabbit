import type { UseMouseSourceType } from "@vueuse/core";

export interface MouseInElementType {
    x: number;
    y: number;
    sourceType: UseMouseSourceType;
    elementX: number;
    elementY: number;
    elementPositionX: number;
    elementPositionY: number;
    elementHeight: number;
    elementWidth: number;
    isOutside: boolean;
}
