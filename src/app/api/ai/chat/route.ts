import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getHybridRecommendations, parseNaturalLanguageQuery } from "@/lib/ai-engine";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get active conversation or create one
    let conversation = await db.conversation.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          userId: user.id,
          title: "CineSa AI Assistant",
        },
        include: { messages: true },
      });

      // Seed initial welcome message
      await db.message.create({
        data: {
          conversationId: conversation.id,
          sender: "assistant",
          content:
            "Namaste! I'm CineSa, your personal AI film curator. Whether you're searching in English, Hindi, or Hinglish — ask me for mind-bending sci-fi, Hollywood Hindi dubbed hits, family movie nights, or free YouTube full movies!",
        },
      });

      conversation = await db.conversation.findUnique({
        where: { id: conversation.id },
        include: { messages: { orderBy: { createdAt: "asc" } } },
      }) as any;
    }

    return NextResponse.json({ conversation });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, conversationId } = await req.json();
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }

    // 1. Fetch or create conversation
    let convId = conversationId;
    if (!convId) {
      const conv = await db.conversation.create({
        data: { userId: user.id, title: message.slice(0, 40) },
      });
      convId = conv.id;
    }

    // 2. Save User Message
    await db.message.create({
      data: {
        conversationId: convId,
        sender: "user",
        content: message,
      },
    });

    // 3. Natural Language Intent Parsing & Recommendation Retrieval
    const intent = parseNaturalLanguageQuery(message);
    const recommendations = await getHybridRecommendations({
      userId: user.id,
      naturalQuery: message,
      limit: 4,
    });

    // 4. Generate Conversational AI Response
    let assistantReply = "";
    const recTitles = recommendations.map((r) => r.movie.title).join(", ");

    if (intent.isMindBending && intent.referenceMovieTitle) {
      assistantReply = `Great taste! Agar aapko ${intent.referenceMovieTitle} jaisi dimag-ghumane wali films pasand hain, toh maine ye ${recommendations.length} mind-bending masterpieces select kiye hain: ${recTitles}. In sabhi mein non-linear timelines, philosophical questions, aur unexpected plot twists hain.`;
    } else if (intent.audience === "family" && intent.maxRuntimeMinutes) {
      assistantReply = `Aaj raat family movie night ke liye ye best recommendations hain jo 2 ghante se kam ki hain aur sabhi age groups ke saath dekhi ja sakti hain: ${recTitles}. Inki pacing crisp hai aur story heartfelt hai!`;
    } else if (intent.targetDirector) {
      assistantReply = `Director ${intent.targetDirector} ki signature films standout hain! Unki best craft aur highest rated works ye hain: ${recTitles}. Unka narrative direction aur sound design unmatchable hai.`;
    } else if (intent.isSadEnding) {
      assistantReply = `Emotional aur gripping thriller movies jo end tak shant nahi hone dengi: ${recTitles}. Inka climax lingering impact chhodta hai.`;
    } else if (recommendations.length > 0) {
      assistantReply = `Here are my top cinematic recommendations based on your request: ${recTitles}. Each film has been hand-selected considering your preferences, storyline depth, and critical ratings.`;
    } else {
      assistantReply = `I understand you're looking for great cinema. Could you tell me a bit more about the mood, favorite director, or a movie you enjoyed recently?`;
    }

    // 5. Save Assistant Message with embedded movie payload
    const moviePayload = recommendations.map((r) => r.movie);
    const assistantMessage = await db.message.create({
      data: {
        conversationId: convId,
        sender: "assistant",
        content: assistantReply,
        metadata: JSON.stringify({
          recommendations: moviePayload,
          intent,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: {
        id: assistantMessage.id,
        sender: "assistant",
        content: assistantReply,
        recommendations: moviePayload,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
