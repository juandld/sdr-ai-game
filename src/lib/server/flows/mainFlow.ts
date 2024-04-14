import { genCalls } from "../chains/dynamicCall";
import { genMainChain } from "../chains/mainChain";
import { genBufferMemory } from "../util/bufferMemory";
import { conversationTemplates, qualificationTemplates } from "../prompts/mainPrompts";


export const starterConvo = async (data: any) => {
    // Generate chatHistory in Lanchain format for main chat injection.
    const { chatTemplate, bufferMemory } = await genBufferMemory(data.character, data.chat);

    // Generate main chat callable llm
    const mainChain = await genMainChain(chatTemplate, bufferMemory);
    // Generate calls with core templates
    const decisionCalls = genCalls(conversationTemplates);
    // Generate calls to evaluate stages
    const evaluateCalls = genCalls(qualificationTemplates)

    const scores = [];

    const latestHMessage = data.chat[data.chat.length - 1].content;
    // Fallback
    let response;

    const [coherenceRaw, stageRaw] = await Promise.all([
        // Veriify chat coherence to make sure human is not messing with AI
        decisionCalls['resolveCohesion']({ chatHistory: JSON.stringify(data.chat) }),
        // Verify chat stage, to resolve progression and also further coherence down the line
        decisionCalls['identifyCurrentPhase']({ chatHistory: JSON.stringify(data.chat) }),
    ]);

    const coherence = Number(coherenceRaw.match(/\d+/)[0]);
    const stage = Number(stageRaw.match(/\d+/)[0]);

    if (stage == 1) {
        if (coherence == 1) {
            const promiseResults = await Promise.all([
                // Veriify chat coherence to make sure human is not messing with AI
                evaluateCalls['intro']({ chatHistory: JSON.stringify(data.chat) }),
                // Verify chat stage, to resolve progression and also further coherence down the line
                mainChain.invoke({ input: latestHMessage })
            ]);
            scores[0] = promiseResults[0]
            response = promiseResults[1]
        } else {
            //If cohesion good and stage is 1, invoke main chat, if not respond "I´m sorry, what?"
            response = "I'm sorry, what?"
        }
    }


    //If cohesion failed more than once and stage is 1, hang up"
    if (coherence != 1 && data.chat[data.chat.length - 2].content == "I'm sorry, what?") {
        response = "/hangUp"
    }
    //If cohesion good and stage is 2, evaluate stage 1 and what ever is in current stage so far
    if (coherence == 1 && stage >= 2) {
        if (stage == 2) {
            scores[1] = await evaluateCalls['validation']({ chatHistory: JSON.stringify(data.chat) })
        }
    }
    //If evaluation is good enough, decide to continue to next stage

    //Make final evaluation
    console.log(scores[0]);
    
    return response
}

