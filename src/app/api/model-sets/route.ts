import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch model sets
    const { data: sets, error } = await supabase
      .from("model_sets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET model_sets error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Try to fetch question counts from model_set_questions
    const countsMap: Record<string, number> = {};
    try {
      const { data: qData } = await supabase
        .from("model_set_questions")
        .select("model_set_id");
      if (qData) {
        qData.forEach((q: any) => {
          if (q.model_set_id) {
            countsMap[q.model_set_id] = (countsMap[q.model_set_id] || 0) + 1;
          }
        });
      }
    } catch (e) {
      console.warn("Could not query model_set_questions counts:", e);
    }

    // Map output to include question count
    const mappedSets = (sets || []).map((s: any) => ({
      id: s.id,
      setId: s.set_id || `SET-${s.id.slice(0, 4)}`,
      title: s.title,
      category: s.category,
      duration: s.duration,
      positiveMark: s.positive_mark,
      negativeMark: s.negative_mark,
      questionsCount: countsMap[s.id] || 0,
      premium: s.premium,
      status: s.status,
      createdAt: s.created_at,
    }));

    return NextResponse.json({ data: mappedSets });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch model sets" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      metadata,
      questions,
      status = "Published",
      premium = false,
      optionShuffling = true,
      antiCheat = false,
      immediateResults = true,
    } = body;

    if (!metadata?.title || !metadata?.category) {
      return NextResponse.json({ error: "Title and Category are required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Get current user if authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const setId = `SET-${Math.floor(1000 + Math.random() * 9000)}`;

    // Insert Model Set
    const { data: insertedSet, error: setError } = await supabase
      .from("model_sets")
      .insert({
        set_id: setId,
        title: metadata.title,
        category: metadata.category,
        duration: metadata.duration || 45,
        positive_mark: metadata.marking?.positive || 2.0,
        negative_mark: metadata.marking?.negative || 0.4,
        status: status,
        premium: premium,
        option_shuffling: optionShuffling,
        anti_cheat: antiCheat,
        immediate_results: immediateResults,
        created_by: user?.id || null,
      })
      .select()
      .single();

    if (setError || !insertedSet) {
      console.error("Supabase POST model_sets error:", setError);
      return NextResponse.json({ error: setError?.message || "Failed to insert model set" }, { status: 400 });
    }

    // Insert questions linked to the created model set
    if (Array.isArray(questions) && questions.length > 0) {
      const questionRows = questions.map((q: any, idx: number) => ({
        model_set_id: insertedSet.id,
        order_index: idx + 1,
        difficulty: q.difficulty || "Easy",
        subject: q.subject || metadata.category || "GENERAL",
        text_np: q.textNp || "",
        text_en: q.textEn || "",
        options: q.options || [],
        correct_option_id: q.correctOptionId || "A",
        note: q.note || "",
      }));

      let { error: qError } = await supabase.from("model_set_questions").insert(questionRows);

      // Fallback if 'note' column does not exist yet in Supabase table
      if (qError && qError.message && qError.message.includes("note")) {
        console.warn("Supabase note column missing, falling back to preserving note in options metadata:", qError.message);
        const fallbackRows = questions.map((q: any, idx: number) => ({
          model_set_id: insertedSet.id,
          order_index: idx + 1,
          difficulty: q.difficulty || "Easy",
          subject: q.subject || metadata.category || "GENERAL",
          text_np: q.textNp || "",
          text_en: q.textEn || "",
          options: Array.isArray(q.options)
            ? q.note ? [...q.options, { id: "__NOTE__", textEn: q.note, textNp: q.note }] : q.options
            : [],
          correct_option_id: q.correctOptionId || "A",
        }));
        const retryRes = await supabase.from("model_set_questions").insert(fallbackRows);
        qError = retryRes.error;
      }

      if (qError) {
        console.error("Supabase POST model_set_questions error:", qError);
        // Set is inserted, report questions partial error
        return NextResponse.json({
          data: insertedSet,
          warning: `Model set created but failed to link questions: ${qError.message}`,
        });
      }
    }

    return NextResponse.json({ data: insertedSet, message: "Model set and questions published successfully!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create model set" }, { status: 500 });
  }
}
