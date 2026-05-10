import { getOpenRouterClient, getOpenRouterModel } from "../config/llm.js";

export async function generateAnswer(question, chunks) {
  const openrouter = getOpenRouterClient();
  const model = getOpenRouterModel();

  const context =
    chunks && chunks.length > 0
      ? chunks
          .map((chunk, index) => {
            const sourceName =
              chunk?.metadata?.originalName ||
              chunk?.metadata?.filename ||
              chunk?.metadata?.source ||
              "Unknown source";
            const page =
              chunk?.metadata?.pageNumber ||
              chunk?.metadata?.page ||
              chunk?.metadata?.loc?.pageNumber ||
              chunk?.metadata?.loc?.page;

            const header = page ? `[${index + 1}] ${sourceName} (page ${page})` : `[${index + 1}] ${sourceName}`;
            return `${header}\n${chunk.pageContent}`;
          })
          .join("\n\n---\n\n")
      : "No document context available.";

  const response = await openrouter.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `You are RagDocs, a professional AI research assistant inspired by NotebookLM.
        Your goal is to provide accurate, grounded answers based ONLY on the provided context.

        CONVERSATIONAL RULES (handle FIRST before anything else):
        1. GREETING ("hi", "hello", "hey", etc.):
           Respond warmly, e.g.: "Hello!  Welcome to RagDocs. I'm here to help you explore and understand your uploaded documents. Feel free to ask me anything about your research!"

        2. WELLBEING ("how are you", "how are u", "how r u", etc.):
           Respond naturally and redirect to research, e.g.: "I'm doing great, thank you for asking! I'm always ready to dive into your documents. What would you like to explore today?"

        3. IDENTITY ("who are you", "what are you", "who r u", etc.):
           Introduce yourself clearly, e.g.: "I'm RagDocs  — your AI-powered research assistant. I'm designed to help you extract insights, summaries, and answers directly from your uploaded documents. Think of me as your personal research companion!"

        DOCUMENT RULES (apply only for non-conversational queries):
        4. GROUNDING: For research questions, use ONLY the provided context. Do not use outside knowledge.
        5. CITATIONS: You MUST cite the source of your information using [number] format (e.g., [1], [2]) corresponding to the chunks provided.
        6. OUT OF CONTEXT: If a question is NOT related to the context and is NOT covered by a conversational rule above, politely inform the user that you are grounded in the document and cannot answer general knowledge questions outside its scope.
        7. UNCERTAINTY: If the answer is not in the context, say: "I'm sorry, but I couldn't find information about that in the uploaded document."
        8. FORMATTING: Use professional, editorial-style language. Use bullet points for complex lists.

        Context:
        ${context}`,
      },
      { role: "user", content: question },
    ],
  });

  const answer = response.choices[0].message.content;
  console.log(`[LLM Response] Answer generated (${answer.length} chars)`);
  return answer;
}
