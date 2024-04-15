import { qualificationTemplates } from "../prompts/mainPrompts";
import { genCalls } from "../chains/dynamicCall";

const evaluateCalls = genCalls(qualificationTemplates);

export const genScore = async (chat: any) => {
    // Create an array to hold all the promises
    const promises = Object.keys(qualificationTemplates).map(key => {
        // Dynamically access the function from evaluateCalls and call it
        return evaluateCalls[key]({ chatHistory: chat });
    });

    // Use Promise.all to wait for all promises to resolve
    const results = await Promise.all(promises);
    let scores: number[] = [];
    for (let i in results) {
        scores[i] = Number(results[i].match(/\d+/)[0]);
    }
    // Calculate the sum of all scores
    let sum = 0;
    for (let i in scores) {
        sum += scores[i];
    }
    // Calculate the average by dividing the sum by the number of scores
    const averageScore = sum / scores.length;
    results.push(averageScore)    
    return results;
}
