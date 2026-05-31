"use client";

import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
interface PreviewProps {
  code: string;
}

export default function Preview({ code }: PreviewProps) {
  return (
    <SandpackProvider
      template="react-ts"
      options={{
        externalResources: [
          "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
        ],
      }}
      files={{
        "/App.tsx": `
          import Component from "./Component";

          export default function App() {
            return (
              <div className="min-h-screen flex items-center justify-center border">
                <Component />
              </div>
            );
          }
        `,

        "/Component.tsx": code,
      }}
    >
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton={true}
        showSandpackErrorOverlay
        style={{ height: 500 }}
      />
    </SandpackProvider>
  );
}
