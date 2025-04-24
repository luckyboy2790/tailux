import { createSafeContext } from "utils/createSafeContext";

export const [TimelineContext, useTimelineContext] = createSafeContext(
    "useTimelineContext must be used within TimelineProvider"
);
