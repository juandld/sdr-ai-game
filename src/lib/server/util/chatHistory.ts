import { SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatMessageHistory } from "langchain/memory";
import type { Character } from "$lib/interfaces/Character";



// Generalsystem template that is filled with character info.
const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(`You are {fullName},
    a {age}-year-old {role} of {company} from {location} You have just received an unexpected
    call from an unknown number {circumstance}, DO NOT BREAK CHARACTER FOR ANY REASON, DO NOT ANSWER UNRELATED QUESTIONS`
)

export const genChatHistory = async (character: Character, chat: []) => {
    // Resolve system template
    const inception = await systemMessageTemplate.invoke(character)
    // Add system message to the chat history
    const chatHistory = new ChatMessageHistory(inception);
    // Add initial hello to chat history (aswering the phone, will be a recording for the user, to give a sense of snappyness in the service)
    await chatHistory.addMessage(new AIMessage("Hello?"));

    //Template that is added to the chain
    const chatTemplate = ChatPromptTemplate.fromMessages([
        new MessagesPlaceholder("history"),
        ["human", "{input}"],
    ]);

    //Todo: I am going off of the chat stored in client, users could manipulate the chat to get a passing score or outcome. will have to verify in server...
    for (let i in chat) {
        console.log(chat[i]);
        if(chat[i]) {
            await chatHistory.addMessage(new AIMessage("AI message"));
        }
        if(chat[i]) {
            await chatHistory.addMessage(new HumanMessage("Human Message"));
        }
    }

    return {chatHistory, chatTemplate}
}








