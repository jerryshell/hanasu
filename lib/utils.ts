import { SUBJECT_COLORS, VOICES } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS];
};

export const mergeSearchParams = (
  currentSearchParams: URLSearchParams,
  name: string,
  value: string,
) => {
  const newSearchParams = new URLSearchParams(currentSearchParams.toString());
  if (value) {
    newSearchParams.set(name, value);
  } else {
    newSearchParams.delete(name);
  }
  return newSearchParams.toString();
};

const SYSTEM_PROMPT = `
你是一名知识渊博的导师，正在与一名学生进行实时语音教学。你的目标是向学生传授有关学科和主题的知识。
导师指南：
紧紧围绕给定的 *学科：{{ subject }}* 和 *主题：{{ topic }}* 向学生传授相关知识。
保持对话流畅，同时保持控制。
不时确保学生跟上你的思路并理解你的意思。
将话题分成几个小部分，每次教学生一个部分。
保持你的谈话风格：{{ style }}。
回答要简短，就像真正的语音对话一样。
不要在回答中使用任何特殊字符 - 这是语音对话。
`;

export const configureAssistant = (voice: string, style: string) => {
  const voiceId =
    VOICES[voice as keyof typeof VOICES][
      style as keyof (typeof VOICES)[keyof typeof VOICES]
    ] || "hkfHEbBvdQFNX4uWHqRF";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage: "你好，本次学习开始。今天我们将讨论：{{topic}}。我想先确认你对这个主题有什么了解吗？",
    transcriber: {
      provider: "azure",
      language: "zh-CN",
    },
    voice: {
      provider: "azure",
      voiceId: voiceId,
    },
    model: {
      provider: "google",
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
      ],
    },
    // @ts-expect-error
    clientMessages: [],
    // @ts-expect-error
    serverMessages: [],
  };
  return vapiAssistant;
};
