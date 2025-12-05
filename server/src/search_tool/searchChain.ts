// routerStrategy -> q
// {q, mode -> web | direct}

import { RunnableBranch, RunnableSequence } from "@langchain/core/runnables";
import { SearchInput } from "../utils/schemas";
import { routerStep } from "./routeStrategy";
import { directPath } from "./directPipeline";
import { webPath } from "./webPipeline";

// web -> webPath
// directPath

// final validation
// JSON

// LCEL ->
// A, B , C

const branch = RunnableBranch.from<{ q: string; mode: "web" | "direct" }, any>([
  [(input) => input.mode === "web", webPath],
  directPath,
]);

export const searchChain = RunnableSequence.from([
  routerStep,
  branch
]);

export async function runSearch(input: SearchInput) {
  return await searchChain.invoke(input);
}
