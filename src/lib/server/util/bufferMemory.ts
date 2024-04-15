import { SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { BufferMemory } from "langchain/memory";

import type { Character } from "$lib/interfaces/Character";
interface ChatMessage {
    tag: 'Human' | 'AI';
    content: string;
}

// Generalsystem template that is filled with character info.
const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(`You are {fullName},
    a {age}-year-old {role} of {company} from {location} You have just received an unexpected
    call from an unknown number {circumstance}, on a scale from 0 to 100 your difficulty level would be {passing_percentage}.
    Always make up an objection about your business situation so that the SDR might adress your objection.
    YOU ARE ALWAYS THE PROSPECT, NEVER THE SDR OR SALESPERSON, YOU ARE {fullName}
    DO NOT BREAK CHARACTER FOR ANY REASON, ADVANCE THE CALL IN A NORMAL FASHION`
)


export const genBufferMemory = async (character: Character, chat: ChatMessage[]) => {
    const bufferMemory = new BufferMemory({ returnMessages: true, memoryKey: "history"})
    // Resolve system template, it returns an array for some reason
    const inception = await systemMessageTemplate.invoke(character)    
    // Add system message to the chat history, only Basemessage in the array
    bufferMemory.chatHistory.addMessage(inception[0]);
    //Template that is added to the chain
    const chatTemplate = ChatPromptTemplate.fromMessages([
        new MessagesPlaceholder("history"),
        ["human", "{input}"],
    ]);

    //Todo: I am going off of the chat stored in client, users could manipulate the chat to get a passing score or outcome. will have to verify in server...
    chat.forEach((message) => {
        if (message.tag === "Human") {
            bufferMemory.chatHistory.addMessage(new HumanMessage(JSON.stringify(message.content)));
        } else if (message.tag === "AI") {
            bufferMemory.chatHistory.addMessage(new AIMessage(JSON.stringify(message.content)));
        }
    });

    return { chatTemplate, bufferMemory }
}