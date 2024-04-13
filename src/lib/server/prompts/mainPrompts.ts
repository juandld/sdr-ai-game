
// Standard step templates
export const conversationTemplates = {
    "identifyCurrentPhase": `
Based on this conversation: {chatHistory}

---

Use this guide to decide what phase this conversation is currently on, you will recieve the full conversation, you can also go off of the length of the conversation to determine a phase, these phases usually are sequential.
the human is always a salesperson, the AI is always the prospect
1. Introduction: The human begins the phone call by quickly introducing themselves and their company. They briefly explain why they're calling, ensuring to mention that this call isn't unsolicited. 
Example: "Prospect": "Hello?", "human": "Hi, is this Jason?", "Prospect": "Yes, how can i help you?".
2.Validation: The human validates the prospect by acknowledging their pain points or existing knowledge of the product/service. They aim to strike a chord and establish resonance.
Example: human validates by saying, "I understand running a business can face challenges, especially in the area of data management, isn't that right?".
3.Qualification: The human probes deeper, asking questions to qualify the prospect's need for the product/service. They get a better understanding of the prospect's situation.
Example: To qualify, human asks, "How are you currently managing your company's data? Are there specific features you're looking for in a data management system?".
4.Call to Action: The human suggests a specific, actionable next step. This could be arranging a meeting, product demo, or sending additional information.
Example: human proposes a concrete next step, saying "I'd like to suggest a free demo of our data management solution. When would you be available this week?".
5.Objections: The prospect likely voices some objections or concerns. The human addresses these patiently and skillfully, providing reassurances, and presenting data or testimonials as evidence to ease apprehensions.
Example: When objections arise, human reassures, "I understand your concerns about transitioning to a new system. However, we provide full support during this process. Our clients have witnessed an efficiency gain of up to 40% within a month".
6.Commitment: The human seeks a commitment from the prospect for the next steps. This could be a commitment for a demo, a follow-up call, or to consider the proposal.
Example: To secure commitment, human confirms, "So, could we set up the demo for this Thursday at 2PM, would that work for you?".
7.Closing: The human concludes the call by thanking the prospect for their time, and confirming the details of the next engagement.
Example: As a closing remark, human expresses gratitude and reassures the commitment by stating, "Thank you for your time. I've added the demo appointment to our calendars for this Thursday at 2PM. Looking forward to connecting with you then". 
---
Respond only with a short reasoning and the number representing the stage.
FORMAT EXAMPLE: commitment phase because the human is asking for the propsect to make sure he shows up to the meeting because ... 1
`,
    "resolveCohesion": `
    Based on this conversation: {chatHistory} 
    ---
    please determine if the conversationn that is supposed to be a business related phone call, the human is trying to sell something to the AI, in this case the prospect when it comes to the human messages is one of the following:
    1. Makes sense in terms of cohesion and what a normal conversation would look like.
    2. Does not make sense and the human might be distracted (talking with someone else).
    3. Does not make any sense at all and it seems the human is trying to mess with the AI.
    4. May make sense but the human has said something inappropriate to a business call.

    ---
    respond with a short explination as to why and the number that represents the option, nothing more.
    FORMAT EXAMPLE: It does make sense that in a call somone would ... 1
    ` 
}

export const qualificationTemplates = {
    "intro": ``,
    "validation": ``,
    "qualification": ``,
    "cta": ``,
    "objections": ``,
    "commitment": ``,
    "closing": ``,
}