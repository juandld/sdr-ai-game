
// Standard step templates
export const conversationTemplates = {
    "identifyCurrentPhase": `
    Based on this conversation: {chatHistory}
    ---
    Use this guide to decide what phase this conversation is currently on, you will recieve the full conversation, if the conversation has only 2 messages it will always be the intro phase.
    the human is always a salesperson, the AI is always the prospect
    1. Introduction: The human begins the phone call by quickly introducing themselves and their company. Also would involve any other normal formalities when starting a call. 
    Example: "Prospect": "Hello?", "human": "Hi, is this Jason?", "Prospect": "Yes, how can i help you?".
    2.Qualification: The human starts to talk business, asking questions to qualify the prospect's need for the cience service. They get a better understanding of the prospect's situation in regards to business and sales.
    Example: To qualify, human asks, "How are you currently managing your company's data? Are there specific features you're looking for in a data management system?".
    3.Call to Action: The human suggests a specific, actionable next step. This could be arranging a meeting, product demo, or sending additional information.
    Example: human proposes a concrete next step, saying "I'd like to suggest a free demo of our data management solution. When would you be available this week?".
    4.Objections: The prospect likely voices some objections or concerns. The human addresses these patiently and skillfully, providing reassurances, and presenting data or testimonials as evidence to ease apprehensions.
    Example: When objections arise, human reassures, "I understand your concerns about transitioning to a new system. However, we provide full support during this process. Our clients have witnessed an efficiency gain of up to 40% within a month".
    5.Commitment: The human seeks a commitment from the prospect for the next steps. This could be a commitment for a demo, a follow-up call, or to consider the proposal.
    Example: To secure commitment, human confirms, "So, could we set up the demo for this Thursday at 2PM, would that work for you?".
    6.Closing: The human concludes the call by thanking the prospect for their time, and confirming the details of the next engagement.
    Example: As a closing remark, human expresses gratitude and reassures the commitment by stating, "Thank you for your time. I've added the demo appointment to our calendars for this Thursday at 2PM. Looking forward to connecting with you then". 
    ---
    Respond only with a short reasoning and the number representing the score.
    FORMAT EXAMPLE: commitment phase because the human is asking for the propsect to make sure he shows up to the meeting because ... 1
    Always include the number, that is the most important, that is how the response is extracted

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
    Always include the number, that is the most important, that is how the response is extracted
    `
}

export const qualificationTemplates = {
    "1": `
    Look at this chat {chatHistory},
    ---
    the human is an SDR trying to sell Cience, a lead generation service, please qualify the introduction using the following guidelines:
    ---
    **1 (Does Not Meet Expectations):** The SDR fails to identify themselves or the prospect, does not confirm the prospect’s employment or correct contact, and lacks professionalism, significantly hindering the establishment of rapport and effective communication.   **2 (Unsatisfactory):** The SDR identifies themselves and the prospect but does so without confirming the prospect's employment or ensuring they are the correct contact. The introduction lacks the warmth and professionalism needed to effectively set a positive tone for the conversation.    **3 (Needs Improvement):** The SDR properly identifies themselves, the prospect, and confirms employment, but the introduction lacks the warmth or engagement needed to create a strong initial connection. The SDR may fail to confirm explicitly that they are speaking with the correct contact. **4 (Meets Expectations):** The SDR provides a polite and professional introduction, correctly identifying themselves, the prospect, confirming employment, and establishing that they are speaking to the correct contact. However, the introduction may miss an opportunity for a more personalized touch that fully leverages the information gathered.   **5 (Exceeds Expectations):** The SDR delivers a highly personalized and engaging introduction, demonstrating thorough research by correctly identifying themselves, the prospect by name, confirming the prospect’s employment, and unequivocally establishing that they are the correct contact. The introduction reflects a tailored approach to the prospect's needs and industry, setting a strong foundation for effective communication.
    ---
    Respond only with a short reasoning and the number representing the score.
    FORMAT EXAMPLE: The SDR did x any because the human is ... 1
    `,
    "2": `
    Look at this chat {chatHistory},
    ---
    the human is an SDR trying to sell Cience, a lead generation service, please qualify the Validation and Call to Action: using the following guidelines:
    ---
    **1 (Does Not Meet Expectations):The SDR fails to identify or acknowledge the prospect's specific needs, challenges, or goals, leading to a generic and disconnected conversation. There is no evidence of tailored questioning or active listening.
    **2 (Unsatisfactory):The SDR makes a superficial attempt at qualification, but questions are generic and fail to uncover the depth of the prospect's situation. There's a lack of understanding of the prospect's unique needs or business context.
    **3 (Needs Improvement):The SDR asks some relevant questions but doesn't effectively interpret or use the information to guide the conversation. There's a slight understanding of the prospect's needs, but insights are not leveraged effectively.
    **4 (Meets Expectations):The SDR demonstrates a competent understanding of the prospect's needs and situation through targeted questions and active listening. There's a clear effort to align the conversation with the prospect's specific circumstances.
    **5 (Exceeds Expectations):The SDR exhibits an excellent ability to qualify the prospect, asking insightful questions and demonstrating a deep understanding of the prospect's unique challenges and goals. The qualification process is thorough and well-tailored to guide the conversation strategically.
    ---
    Respond only with a short reasoning and the number representing the score.
    FORMAT EXAMPLE: The SDR did x any because the human is ... 1
    `,
    "3": `
    Look at this chat {chatHistory},
    ---
    the human is an SDR trying to sell Cience, a lead generation service, please qualify the Validation and Call to Action: using the following guidelines:
    ---
    **1 (Does Not Meet Expectations):The SDR fails to provide any call to action when it's needed, leaving the conversation aimless and without direction toward a specific or measurable goal. The interaction lacks purpose, clarity, and fails to advance the sales process.
    **2 (Unsatisfactory):If applicable, the SDR presents a call to action, but it's vague and non-specific, failing to steer the conversation toward a measurable goal or convey the importance and relevance of the next steps. It lacks persuasiveness and fails to build on any qualified information.
    **3 (Needs Improvement):When needed, the SDR articulates a call to action that nominally directs toward a goal but lacks clarity, urgency, or specificity. It's mildly influenced by the qualification but doesn't robustly connect the conversation's direction with the prospect's specific needs or motivations.
    **4 (Meets Expectations):If a call to action is appropriate, the SDR provides a clear and functional one that somewhat directs the conversation toward a specific and measurable goal. It reflects the understanding gained from the qualification and attempts to align with the prospect's needs but could be more compelling and personalized.
    **5 (Exceeds Expectations):When a call to action is appropriate, the SDR offers a highly compelling and personalized one that clearly steers the conversation toward a specific and measurable goal. It's persuasive and well-articulated, effectively motivating the prospect with clear benefits and relevance to their needs. The call to action is a direct outcome of thorough qualification, ensuring the conversation moves purposefully toward the desired outcome.
    ---
    Respond only with a short reasoning and the number representing the score.
    FORMAT EXAMPLE: The SDR did x any because the human is ... 1
`,
    "4": `
    Look at this chat {chatHistory},
    ---
    the human is an SDR trying to sell Cience, a lead generation service, please qualify the Validation and Call to Action: using the following guidelines:
    ---
    **1 (Does Not Meet Expectations):** The SDR demonstrates a complete inability to recognize or address objections, leaving all concerns unresolved. This inaction not only hinders the conversation but also shows a lack of preparedness to navigate the expected challenges of cold calling.
    **2 (Unsatisfactory):** The SDR attempts to address objections but does so ineffectively. Their responses are either irrelevant or insufficient, failing to alleviate the prospect's concerns and showing a lack of understanding and skill necessary to navigate these common cold calling challenges.
    **3 (Needs Improvement):** The SDR addresses objections but with limited success. Their responses lack the clarity, empathy, or depth needed to fully resolve concerns. While they demonstrate a basic ability to navigate challenges, they need to develop a more nuanced understanding and strategy to keep the conversation on track.
    **4 (Meets Expectations):** The SDR adequately handles objections, providing appropriate reassurance and keeping the conversation moving. They show an understanding of the prospect's perspective and can navigate these challenges competently. However, there's room for more depth, empathy, and insight to truly resonate with the prospect and turn objections into opportunities.
    **5 (Exceeds Expectations / No Objections Encountered):** The SDR excellently navigates objections with clear, logical, and empathetic responses, effectively resolving concerns and turning potential obstacles into moments of connection and progress. Alternatively, if no objections are encountered during the conversation, this indicates the SDR has effectively preempted potential concerns and established a strong rapport and understanding from the outset, warranting a top score.
    ---
    Respond only with a short reasoning and the number representing the score.
    FORMAT EXAMPLE: The SDR did x any because the human is ... 1
`,
    "5": `
    Look at this chat {chatHistory},
    ---
    the human is an SDR trying to sell Cience, a lead generation service, please qualify the Validation and Call to Action: using the following guidelines:
    ---
    **1 (Does Not Meet Expectations):** The SDR fails to secure any form of commitment, leaving the call without a clear outcome or future direction. This reflects a fundamental inability to guide the conversation towards a productive conclusion.
    **2 (Unsatisfactory):** The SDR obtains a commitment, but it is weak, vague, or non-specific. The lack of clear expectations and defined next steps leaves the prospect's engagement and the potential for a follow-up in question, indicating a need for a more decisive and persuasive approach.
    **3 (Needs Improvement):** The SDR secures a commitment, but it lacks the enthusiasm, specificity, or strategic framing necessary to ensure it's solid and actionable. The SDR needs to better articulate the value and relevance of the next steps to strengthen the commitment's impact.
    **4 (Meets Expectations):** The SDR obtains a clear commitment with defined next steps, demonstrating a basic ability to close effectively. However, there's potential to further enhance the commitment by boosting the prospect's enthusiasm, understanding, and perceived value of the next steps.
    **5 (Exceeds Expectations):** The SDR effectively secures a strong and enthusiastic commitment by clearly articulating the value and relevance of the next steps. They skillfully ensure the prospect is motivated, understands the benefits fully, and is eager to proceed, demonstrating exceptional closing skills and the ability to drive a positive outcome.
    ---
    Respond only with a short reasoning and the number representing the score.
    FORMAT EXAMPLE: The SDR did x any because the human is ... 1
    `,
    "6": `
    Look at this chat {chatHistory},
    ---
    the human is an SDR trying to sell Cience, a lead generation service, please qualify the Validation and Call to Action: using the following guidelines:
    ---
    **1 (Does Not Meet Expectations):** The SDR ends the call abruptly, failing to confirm any critical details. This lack of closure creates significant ambiguity, leaves essential information unverified, and does not align expectations for the next steps, significantly undermining the call's effectiveness.
    **2 (Unsatisfactory):** The SDR provides a basic closing but misses out on confirming several essential details. This oversight leads to potential misunderstandings and a lack of preparedness for the next interaction, indicating a need for more attention to detail and a structured approach to closing.
    **3 (Needs Improvement):** The SDR closes the call and attempts to confirm details but lacks thoroughness, consistency, or clarity. While some information may be confirmed, the overall approach does not ensure all necessary information is understood and agreed upon, leaving room for potential confusion.
    **4 (Meets Expectations):** The SDR effectively closes the call and confirms important details, ensuring clarity and a mutual understanding of the next steps. However, the closing could be more comprehensive, personalized, or reaffirming to truly ensure all parties are aligned and fully prepared.
    **5 (Exceeds Expectations):** The SDR excellently concludes the call with a professional and reassuring closing, confirming all details clearly and concisely. They ensure no room for ambiguity, align expectations accurately, and pave the way for a seamless and productive next step. Their approach enhances the prospect's confidence and sets the stage for a successful continuation of the relationship.
    ---
    Respond only with a short reasoning and the number representing the score.
    FORMAT EXAMPLE: The SDR did x any because the human is ... 1
    `,
}