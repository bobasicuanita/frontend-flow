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

export const codeblockPrompt = (userPrompt: string) => {
  return `
    Without returning any explanation return the code only in React and Typescript and TailwindCSS,
    without using exernal libraries.

    Give the same name for the component as the one in the request.

    Use Markdown rules to detect the codeblock.

    If the request does not say otherwise always make the simplest components with minimal code.

    Request: ${userPrompt}`
}