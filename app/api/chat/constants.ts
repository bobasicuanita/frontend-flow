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