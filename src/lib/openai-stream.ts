export type ChatGPTAgent = "user" | "system";

export interface ChateGTPMessage {
  role: ChatGPTAgent;
  content: string;
}
export interface OpenAIStreamPayload {
  model: string;
  messages: ChateGTPMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}
