
// Standard step templates
const conversationTemplates = {
    "identifyCurrentPhase": `
1. Introduction: The salesperson begins the phone call by quickly introducing themselves and their company. They briefly explain why they're calling, ensuring to mention that this call isn't unsolicited. 
Example: Upon receiving {input0}, the salesperson promptly introduces themselves, stating "Hello, I'm salesperson from ABC solutions. I'm not intruding, am I?".
2.Validation: The salesperson validates the prospect by acknowledging their pain points or existing knowledge of the product/service. They aim to strike a chord and establish resonance.
Example: salesperson validates by saying, "I understand running a business can face challenges, especially in the area of data management, isn't that right?".
3.Qualification: The salesperson probes deeper, asking questions to qualify the prospect's need for the product/service. They get a better understanding of the prospect's situation.
Example: To qualify, salesperson asks, "How are you currently managing your company's data? Are there specific features you're looking for in a data management system?".
4.Call to Action: The salesperson suggests a specific, actionable next step. This could be arranging a meeting, product demo, or sending additional information.
Example: salesperson proposes a concrete next step, saying "I'd like to suggest a free demo of our data management solution. When would you be available this week?".
5.Objections: The prospect likely voices some objections or concerns. The salesperson addresses these patiently and skillfully, providing reassurances, and presenting data or testimonials as evidence to ease apprehensions.
Example: When objections arise, salesperson reassures, "I understand your concerns about transitioning to a new system. However, we provide full support during this process. Our clients have witnessed an efficiency gain of up to 40% within a month".
6.Commitment: The salesperson seeks a commitment from the prospect for the next steps. This could be a commitment for a demo, a follow-up call, or to consider the proposal.
Example: To secure commitment, salesperson confirms, "So, could we set up the demo for this Thursday at 2PM, would that work for you?".
7.Closing: The salesperson concludes the call by thanking the prospect for their time, and confirming the details of the next engagement.
Example: As a closing remark, salesperson expresses gratitude and reassures the commitment by stating, "Thank you for your time. I've added the demo appointment to our calendars for this Thursday at 2PM. Looking forward to connecting with you then".
    `,

    "resolveCohesion": `
    hi, how are you? {input0}
    `
}

const qualificationTemplates = {
    "intro": ``,
    "validation": ``,
    "qualification": ``,
    "cta": ``,
    "objections": ``,
    "commitment": ``,
    "closing": ``,
}