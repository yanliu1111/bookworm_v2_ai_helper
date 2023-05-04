# BOOKWORM v2.0 wants to 'hire' gpt as an AI-Helper 🤖 in the web

## Introduction

My first full-stack web app [BOOKWORM v1.0](https://github.com/yanliu1111/ReactFirebase-FullStackProject-bookLibrary) was built by Nov. 2022. I want to improve it by adding an AI helper to help user to manage my book library. I want to use gpt4free as the web AI helper.

> Imagination is limitless. See what I can do for BOOKWORM v2.0 this time. Happy coding! 🧖‍♀️

## Current Tech Stack

- Next.js 13
- TypeScript
- shadcn/ui [Accordion](https://ui.shadcn.com/docs/components/accordion)
- Tailwind CSS
- Class merging with tailwind-merge
- Conditional classes with clsx
- zod for validation
- yarn

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤶 Learning Notes what to share

- New hooks use: useMutation: for irregular data fetching
  **Question**: why dont use axios? I found the this approach way better if we want to return a readable stream back to the client.

- Enter key to send message, Enter + Shift key to new line

```ts
onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
              setInput("");
            }
          }}
```
