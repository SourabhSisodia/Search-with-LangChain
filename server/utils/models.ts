import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";



type ModelOpts = {
  temperature?: number;
  maxTokens?: number;
};

export function getChatModel(opts: ModelOpts = {}): BaseChatModel {
  const temp = opts?.temperature ?? 0.2;

  const forced = (process.env.PROVIDER || "").toLowerCase();
  const hasOpenai = !!process.env.OPENAI_API_KEY;
  const hasGemini = !!process.env.GOOGLE_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (forced === "openai" || (!forced && hasOpenai)) {
    return new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: temp,
    });
  }

  if (forced === "gemini" || (!forced && hasGemini)) {
    return new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash-lite',
      temperature: temp,
    });
  }

  if (forced === "groq" || (!forced && hasGroq)) {
    return new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
      temperature: temp,
    });
  }

  return new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash-lite',
    temperature: temp,
  });

}