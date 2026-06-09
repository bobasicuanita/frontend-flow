This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can view it live here: [https://frontend-flow-beta.vercel.app/](https://frontend-flow-beta.vercel.app/)

# Challenges & Future Improvements

## Challenges I Faced

### Integrating AI Features

One of the biggest challenges was integrating the Vercel AI SDK and implementing a tool to handle the generateComponentTool.

### Managing Application State

As the application grew, managing chat history, loading states, and error handling became more complex. Managing different states across the SideChatLog and the main chat.

### User Experience Considerations

Building an AI-powered interface is not only about functionality but also responsiveness. I spent some time improving loading indicators, response rendering, and overall usability to make interactions feel more natural.Alas, they can be improved.

### Working with Sandpack

Integrating Sandpack was one of the more challenging parts of the project. Rendering AI-generated React components inside the preview environment required additional configuration and debugging. There is still an unresolved issue where components occasionally fail to render on the initial load and only appear after switching to the preview tab multiple times.

## What I Would Improve

### Testing

The application currently focuses on functionality, but adding automated unit, integration, and end-to-end tests would improve reliability and make future development safer.

### Sandpack

The Sandpack rendering issue should be investigated and resolved to ensure components load consistently without requiring manual user interaction.

### Responsiveness

The interface could be improved for larger screens. The current "window" style component preview works well for demonstrating functionality, but exploring alternative layouts could provide a cleaner and more scalable user experience.

### Prompt Optimization

Prompt design remains an ongoing area of improvement. While the current implementation produces useful results, responses can occasionally be inconsistent or generate incorrect assumptions. Refining system prompts, improving context handling, and introducing stronger output validation would help reduce hallucinations and increase the reliability of generated components.

### Future Features

#### UI Improvements

- Refine the overall visual design.
- Improve accessibility and responsiveness.
- Enhance loading and streaming states.

#### Backend Enhancements

- Support multiple chat sessions.
- Improve chat persistence and history management.
- Introduce more robust backend services.

#### Authentication

- Add user authentication and authorization.
- Enable user-specific chat histories and settings.

#### Image-to-Component Generation

- Allow users to upload images and generate React components from visual designs.

#### Multiple AI Providers

- Support multiple AI services and models.
- Allow users to choose between providers depending on their needs.

#### AI Reasoning & Transparency

- Provide additional context about how AI-generated responses were produced.
- Surface reasoning or decision-making information where appropriate.

---

## Key Takeaways

This project helped me gain hands-on experience with Next.js and the Vercel AI SDK and building responsive AI-powered user interfaces. It reinforced the importance of designing maintainable architectures, handling edge cases, and continuously improving the user experience throughout the development process.
