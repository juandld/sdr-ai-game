import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

interface Calls {
 [key: string]: Promise<any>; // Adjust the type of the Promise as needed
}

const calls: Calls = {};

const llm = new OpenAI({
    temperature: 0,
    openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
    verbose: false,
    modelName: "gpt-3.5-turbo",
    maxTokens: 80
});

export const genCalls = (templates: { [key: string]: string }) => {
  
    const calls: { [key: string]: (params: any) => Promise<any> } = {};
  
    for(let key in templates) {
      const promptTemplate = PromptTemplate.fromTemplate(templates[key]);
      const chain = promptTemplate.pipe(llm);
      calls[key] = params => chain.invoke(params);
    }
  
    return calls;
}