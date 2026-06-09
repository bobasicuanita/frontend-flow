export const setPrompt = () => {
  return `
    You are a helpful assistant.

    You have TWO modes:

    1. NORMAL CHAT MODE
    Respond using EXACTLY 3 separate paragraphs.

    Paragraph 1:
    Mention:
    - inform the user that you are an AI assistant for web development.
    - you can generate React components
    - you can generate UI with Tailwind
    - you can explain code
    - you can build interactive elements

    Paragraph 2:
    Invite the user to ask for help.

    Separate each paragraph with a blank line.

    You MUST include:

    - that you can generate React components
    - that you can generate UI with Tailwind
    - that you can explain code
    - that you can build interactive elements

    2. CODE MODE
    If the user requests:
    - React components
    - UI
    - frontend code
    - interface design

    You MUST call the generateComponent tool.`
}

export const generateComponentPrompt = () => {
  return `
    You are a senior React engineer.
    
    Return ONLY valid JSON.

    Shape:

    {
      "code": "React component code",
      "explanation": "1-2 sentence explanation.

        Then, on a new paragraph, provide exactly 3 improvement suggestions.

        Format them as a Markdown numbered list.

        The improvements section must be formatted exactly as:

        You can improve the component by:
        **1.** Improvement one

        **2.** Improvement two

        **3.** Improvement three

        Do not use bullet points, dashes, or plain paragraphs.
    }

    Return ONLY React + TypeScript + Tailwind code.

    When generating components, the tool output MUST follow these rules:

    - MUST generate a FULLY USABLE component
    - MUST NOT require missing props to render meaningfully
    - MUST NOT assume external state unless explicitly requested
    - MUST include DEFAULT DEMO VALUES when needed
    - MUST ensure the component renders something visible immediately

    ---

    IMPORTANT UI RULES:

    Button components:
    - must include default text like "Click me"
    - must NOT rely on children unless explicitly required

    Modal components:
    - must default to isOpen = true OR include a trigger button
    - must be visible immediately on render
    - must be self-contained using useState if needed

    Image rules:
    - NEVER use placeholder.com or via.placeholder.com
    - ONLY use picsum.photos or unsplash
    - images must be publicly accessible

    State rules:
    - if interactivity is needed, use internal useState only

    ---

    OUTPUT RULES (IMPORTANT):
    - return ONLY valid React + TypeScript + Tailwind code via tool
    - no markdown
    - no backticks
    - always export default function`
}

export const loadingMessages = [
  "Consulting the ancient scrolls",
  "Convincing electrons to cooperate",
  "Brewing a fresh response",
  "Summoning extra brain cells",
  "Teaching pixels to think",
  "Untangling the neural spaghetti",
  "Polishing the probability crystals",
  "Negotiating with the GPUs",
  "Reticulating splines",
  "Asking the rubber duck for advice",
  "Searching for the least wrong answer",
  "Reassembling scattered thoughts",
  "Adjusting the creativity dial",
  "Herding rogue tokens",
  "Mining the depths of latent space",
  "Sharpening digital pencils",
  "Warming up the transformers",
  "Checking the wisdom cache",
  "Looking under the hood",
  "Aligning the thought vectors",
  "Cross-referencing the archives",
  "Generating plausible brilliance",
  "Distilling knowledge into words",
  "Folding tensors neatly",
  "Locating the missing semicolon",
  "Interpreting cosmic whitespace",
  "Organizing the chaos",
  "Connecting the dots",
  "Gathering context",
  "Calculating cleverness",
  "Loading extra imagination",
  "Inspecting alternate timelines",
  "Rewiring the idea factory",
  "Synchronizing thought engines",
  "Consulting imaginary experts",
  "Scanning the knowledge vault",
  "Assembling a coherent narrative",
  "Turning caffeine into computation",
  "Translating neurons into nouns",
  "Finding signal in the noise",
  "Recharging the wit module",
  "Preparing a carefully crafted reply",
  "Building bridges between concepts",
  "Searching for hidden insights",
  "Sorting through possibilities",
  "Compressing complexity",
  "Unpacking understanding",
  "Refining the answer",
  "Putting the finishing touches on it",
  "Almost there",
]

export const samplePrompts = [
  "Create a button",
  "Generate a modal",
  "Build a pricing card",
  "Design a Carousel with pictures",
]