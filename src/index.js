import { createRoot } from "react-dom/client";
import App from "./App";

// create container
const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
