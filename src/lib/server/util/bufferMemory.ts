import { SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { BufferMemory } from "langchain/memory";

import { ChatMessageHistory } from "langchain/memory";
import type { Character } from "$lib/interfaces/Character";
interface ChatMessage {
    tag: 'Human' | 'AI';
    content: string;
}

// Generalsystem template that is filled with character info.
const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(`You are {fullName},
    a {age}-year-old {role} of {company} from {location} You have just received an unexpected
    call from an unknown number {circumstance}, DO NOT BREAK CHARACTER FOR ANY REASON, DO NOT ANSWER UNRELATED QUESTIONS`
)

const bufferMemory = new BufferMemory({ returnMessages: true, memoryKey: "history"})

export const genBufferMemory = async (character: Character, chat: ChatMessage[]) => {
    // Resolve system template
    const inception = await systemMessageTemplate.invoke(character)
    // Add system message to the chat history
    bufferMemory.chatHistory.addMessage(new SystemMessage("you are Mary"));
    //Template that is added to the chain
    const chatTemplate = ChatPromptTemplate.fromMessages([
        new MessagesPlaceholder("history"),
        ["human", "{input}"],
    ]);

    //Todo: I am going off of the chat stored in client, users could manipulate the chat to get a passing score or outcome. will have to verify in server...
    chat.forEach((message) => {
        if (message.tag === "Human") {
            bufferMemory.chatHistory.addMessage(new HumanMessage(message.content));
        } else if (message.tag === "AI") {
            bufferMemory.chatHistory.addMessage(new AIMessage(message.content));
        }
    });

    return { chatTemplate, bufferMemory }
}