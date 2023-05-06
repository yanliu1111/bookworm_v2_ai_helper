# BOOKWORM v2.0 wants to 'hire' gpt as an AI-Helper 🤖 in the web

## Introduction

My first full-stack web app [BOOKWORM v1.0](https://github.com/yanliu1111/ReactFirebase-FullStackProject-bookLibrary) was built by Nov. 2022. I want to improve it by adding an AI helper to assist user to manage my book library. I want to use gpt as the web AI helper.

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

## 🤶 Sharing Some Learning Notes:

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

New package was installed for working with a readable stream, you can create an instance of the parser, and feed it chunks of data - partial or complete:

```ts
yarn add eventsource-parser
```

After install, here is **the hard understanding** 🤔 part code (to me) in `openai-stream`, better to record here:

fead parser: this is to turn the openai stream into a readable format, we can play on the front end

```ts
function onParse(event: ParsedEvent | ReconnectInterval) {
  if (event.type === "event") {
    const data = event.data;
    if (data === "[DONE]") {
      controller.close();
      return;
    }
    try {
      const json = JSON.parse(data);
      console.log("json", json);
      const text = json.choices[0].delta?.content || "";
      if (counter < 2 && (text.match(/\n/) || []).length) {
        return;
      }
      const queue = encoder.encode(text);
      controller.enqueue(queue);
      counter++;
    } catch (err) {
      console.error(err);
    }
  }
}
//fead the parser-feed it chunks of data - partial or complete
// res.body is from stream: true
const parser = createParser(onParse);
for await (const chunk of res.body as any) {
  parser.feed(decoder.decode(chunk));
}
```
