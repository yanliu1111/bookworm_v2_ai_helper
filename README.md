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
- react-hot-toast for error handling
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

- New hooks use: useMutation: for irregular data fetching <br>
  **Question**: why dont use axios? I found the this approach way better if we want to return a readable stream back to the client.

- **Enter key to send message**, Enter + Shift key to new line

```ts
onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
              setInput("");
            }
          }}
```

- **Shortcuts:** ctrl + space to check all expected values in {}

- **New package** was installed for working with a readable stream, you can create an instance of the parser, and feed it chunks of data - partial or complete:

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

- **tailwind, overflow-x-hidden** In ChatMessages.tsx, overflow-x-hidden: the reason for the overflow accident is because sometimes when we have links inside of our chat, the chat bot tends to write past the scope of the chat. Becasue we used some markdown which is not problem after done. But during the writing it might look weird and force weird scrollbar. For stop this, we can put this overflow-x-hidden
- **react-hot-toast**: for error handling.
  It is popular package, a displaying tools notification to your users.
- **Upstash** for redis database
  rate limit: such as 10 requests per hour
  slidingWindow: how many requests are allowed per window

```bash
yarn add @upstash/redis @upstash/ratelimit
```

So surprise to learn this redis limit this time.
For good user experience, set user can send request 4 times per 10 seconds.
The structure of files includes `redis.ts` `rate-limiter.ts` `middleware.ts`, also url and secret key would be kept in `.env.local` file.
In `redis-limiter.ts`:

```ts
export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(4, "10 s"),
  prefix: "@upstash/ratelimit",
});
```

In `middleware.ts`:

```ts
export async function middleware(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";
  try {
    const { success } = await rateLimiter.limit(ip);
    if (!success) return new Response("You are writing message too fast.");
    return NextResponse.next();
  } catch (error) {
    return new Response("Sorry, something went wrong. Try again later.");
  }
}

export const config = {
  matcher: "/api/message/:path*",
};
```

Although it is easy setting, but new learning always makes me sooooo happy.😆
