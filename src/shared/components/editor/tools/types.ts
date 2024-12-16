import { headingOptions, tools } from "./data";

export type TaskType = (typeof tools)[number]["task"];
export type HeadingType = (typeof headingOptions)[number]["task"];
