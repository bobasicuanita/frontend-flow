export const categorizationPrompt = (userPrompt: string) => {
  return `
    Categorize this prompt.

    Return ONLY one of these exact values:

    - code_generation
    - engineering_discussion
    - general

    Rules:

    code_generation:
    The user wants code, components, UI creation,
    frontend implementation, or general code generation.

    engineering_discussion:
    The user is discussing anything related to software engineering
    but NOT asking to generate code.

    general:
    Anything unrelated to software engineering.

    Request: ${userPrompt}`
}

export const setPrompt = () => {
  return `
    You are a helpful assistant.

    You have TWO modes:

    1. NORMAL CHAT MODE
    If the user is greeting, casual, or asking simple questions:

    - Respond with a short welcome message that explains capabilities
    - Do NOT use a single paragraph
    - Do NOT combine sentences
    - Each section must be on its own line block
    - DO NOT ask follow-up questions
    - Keep it under 3–5 lines

    You MUST include:

    - that you can generate React components
    - that you can generate UI with Tailwind
    - that you can explain code
    - that you can build interactive elements

    2. CODE MODE
    If the user asks for code, components, UI, or React:
    - return ONLY valid JSON:

    {
      "type": "component",
      "reasoning": "...",
      "explanation": "...",
      "code": "..."
    }

    Rules for code generation:

    - MUST generate a FULLY USABLE component
    - MUST NOT require missing props to render a meaningful UI
    - MUST NOT assume external state unless explicitly requested
    - MUST include DEFAULT DEMO VALUES when needed
    - MUST ensure the component renders something visible immediately

    IMPORTANT UI RULES:

    For components like Button:
    - must include default text (e.g. "Click me")
    - must NOT rely on children unless explicitly required

    For components like Modal:
    - must default to isOpen = true for preview purposes
    - must include a demo trigger OR self-contained open state using useState
    - must be immediately visible when rendered

    For components with images:
    - NEVER use placeholder.com or via.placeholder.com
    - ALWAYS use stable image sources like picsum.photos or unsplash
    - ensure images are publicly accessible without authentication

    If state is required for usability:
    → use internal useState inside the component

    Example requirement:
    - Modal must open by default or include a button to open it

    Return only React + TypeScript + TailwindCSS
    No external libraries
    No markdown
    No backticks
    Always export default function`
}

export const loadingMessages = [
"Consulting the ancient scrolls...",
"Convincing electrons to cooperate...",
"Brewing a fresh response...",
"Summoning extra brain cells...",
"Teaching pixels to think...",
"Untangling the neural spaghetti...",
"Polishing the probability crystals...",
"Negotiating with the GPUs...",
"Reticulating splines...",
"Asking the rubber duck for advice...",
"Searching for the least wrong answer...",
"Reassembling scattered thoughts...",
"Adjusting the creativity dial...",
"Herding rogue tokens...",
"Mining the depths of latent space...",
"Sharpening digital pencils...",
"Warming up the transformers...",
"Checking the wisdom cache...",
"Looking under the hood...",
"Aligning the thought vectors...",
"Cross-referencing the archives...",
"Generating plausible brilliance...",
"Distilling knowledge into words...",
"Folding tensors neatly...",
"Locating the missing semicolon...",
"Interpreting cosmic whitespace...",
"Organizing the chaos...",
"Connecting the dots...",
"Gathering context...",
"Calculating cleverness...",
"Loading extra imagination...",
"Inspecting alternate timelines...",
"Rewiring the idea factory...",
"Synchronizing thought engines...",
"Consulting imaginary experts...",
"Scanning the knowledge vault...",
"Assembling a coherent narrative...",
"Turning caffeine into computation...",
"Translating neurons into nouns...",
"Finding signal in the noise...",
"Recharging the wit module...",
"Preparing a carefully crafted reply...",
"Building bridges between concepts...",
"Searching for hidden insights...",
"Sorting through possibilities...",
"Compressing complexity...",
"Unpacking understanding...",
"Refining the answer...",
"Putting the finishing touches on it...",
"Almost there...",
]