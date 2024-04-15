export const fetchFinalScore = async (chat: any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chat)
    };

    // Send the POST request
    const response = await fetch('/api/score', requestOptions);
    const text = await response.json(); // Extract the text from the response
    return text
}