import "./index.css";
import { render } from "preact/compat";
import { App } from "./App";

// biome-ignore lint/style/noNonNullAssertion: root is there
render(<App />, document.getElementById("root")!);
