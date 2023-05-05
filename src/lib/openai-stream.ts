export type ChatGPTAgent = "user" | "system";

export interface ChateGTPMessage {
  role: ChatGPTAgent;
  content: string;
}
