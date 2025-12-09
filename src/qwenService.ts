import axios, { AxiosResponse } from "axios";

interface QwenConfig {
  baseUrl: string;
  model: string;
  timeout: number;
}

interface QwenResponse {
  response: string;
  done: boolean;
}

const defaults: QwenConfig = {
  baseUrl: "http://localhost:11434",
  model: "qwen2.5-coder:7b",
  timeout: 30000,
};

export class QwenService {
  private config: QwenConfig;

  constructor(config?: Partial<QwenConfig>) {
    // TODO: инициализировать config со значениями по умолчанию
    this.config = { ...defaults, ...config };
  }

  async generate(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
      const response: AxiosResponse<QwenResponse> = await axios.post(
        `${this.config.baseUrl}/api/generate`,
        {
          model: this.config.model,
          prompt: fullPrompt,
          stream: false,
        },
        {
          timeout: this.config.timeout,
        }
      );
      return response.data.response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNREFUSED") {
          // сначала проверка специфичной ошибки
          throw new Error("Ollama не запущен");
        }
        throw new Error(error.message); // потом общая ошибка
      }
      throw error; // на случай непредвиденных ошибок
    }
  }

  async explainCode(code: string): Promise<string> {
    const prompt = `Explain this code:\n\n\`\`\`\n${code}\n\`\`\``;
    const response = await this.generate(
      prompt,
      "You are a helpful code assistant. Explain code clearly and concisely."
    );

    return response;
  }

  async reviewCode(code: string): Promise<string> {
    const prompt = `Review this code:\n\n\`\`\`\n${code}\n\`\`\``;

    const response = await this.generate(
      prompt,
      "You are an experienced code reviewer. Find bugs, issues, and suggest improvements."
    );

    return response;
  }

  async askQuestion(code: string, question: string): Promise<string> {
    const prompt = `${question}\n\nCode:\n\`\`\`\n${code}\n\`\`\``;
    const response = await this.generate(
      prompt,
      "You are a helpful assistant."
    );

    return response;
  }
}
