
const url = "https://api.openai.com/v1/chat/completions";

export const fetchOpenAI = async (text, genre, theme, style) => {
    const sysMsg = `You are a helpful co-writer. Based on the [text] provide a completion for the sentence that
    would be a good continuation of the text. The completion should be 5-10 words long, in a genre of ${genre}, 
    with a theme of ${theme}, and a style of ${style}. Provide 3 variations of the completion.`;

    const data = {
        // model: "gpt-3.5-turbo",
        model: "gpt-4-0613",
        messages: [
            {
                role: "system",
                content: sysMsg,
            },
            {
                role: "user",
                content: text,
            },
        ],
    };
    const params = {
        headers: {
            Authorization: `Bearer ${import.meta?.env?.DEV ? import.meta.env.VITE_OPENAI : 'REPLACE_WITH_GH_SECRET'}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
    };

    try {
        const response = await fetch(url, params);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching OpenAI data:", error);
    }
}
