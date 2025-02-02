import { test } from "@playwright/test";
import { request } from "http";

export { test };
export const story = test.describe;
export const api = request;
export const precondition = test.beforeEach;
export const beforeAll = test.beforeAll;
export const afterAll = test.afterAll;
export const afterEach = test.afterEach;
