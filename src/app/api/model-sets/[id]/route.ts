import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data: set, error: setError } = await supabase
      .from("model_sets")
      .select("*")
      .eq("id", id)
      .single();

    if (setError || !set) {
      return NextResponse.json({ error: "Model set not found" }, { status: 404 });
    }

    let questions: any[] = [];
    try {
      const { data: qData, error: qError } = await supabase
        .from("model_set_questions")
        .select("*")
        .eq("model_set_id", id)
        .order("order_index", { ascending: true });

      if (qError) {
        console.warn("Supabase GET model_set_questions warning:", qError.message);
      } else if (qData) {
        questions = qData.map((q: any) => {
          let note = q.note || "";
          let cleanedOptions = q.options || [];
          if (Array.isArray(cleanedOptions)) {
            const noteObj = cleanedOptions.find((opt: any) => opt.id === "__NOTE__");
            if (noteObj) {
              if (!note) note = noteObj.textEn || noteObj.textNp || "";
              cleanedOptions = cleanedOptions.filter((opt: any) => opt.id !== "__NOTE__");
            }
          }
          return {
            ...q,
            options: cleanedOptions,
            note,
          };
        });
      }
    } catch (e) {
      console.warn("Exception fetching model_set_questions:", e);
    }

    return NextResponse.json({
      data: {
        ...set,
        questions,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch model set" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = await createClient();

    // Build update payload from provided fields or body.metadata
    const updatePayload: Record<string, any> = {};
    if (body.status !== undefined) updatePayload.status = body.status;
    if (body.premium !== undefined) updatePayload.premium = body.premium;
    if (body.title !== undefined) updatePayload.title = body.title;
    if (body.category !== undefined) updatePayload.category = body.category;
    if (body.duration !== undefined) updatePayload.duration = body.duration;
    if (body.positive_mark !== undefined) updatePayload.positive_mark = body.positive_mark;
    if (body.negative_mark !== undefined) updatePayload.negative_mark = body.negative_mark;
    if (body.option_shuffling !== undefined) updatePayload.option_shuffling = body.option_shuffling;
    if (body.anti_cheat !== undefined) updatePayload.anti_cheat = body.anti_cheat;
    if (body.immediate_results !== undefined) updatePayload.immediate_results = body.immediate_results;

    // Handle nested metadata object if sent from form
    if (body.metadata) {
      if (body.metadata.title) updatePayload.title = body.metadata.title;
      if (body.metadata.category) updatePayload.category = body.metadata.category;
      if (body.metadata.duration) updatePayload.duration = body.metadata.duration;
      if (body.metadata.marking?.positive !== undefined) updatePayload.positive_mark = body.metadata.marking.positive;
      if (body.metadata.marking?.negative !== undefined) updatePayload.negative_mark = body.metadata.marking.negative;
    }
    if (body.optionShuffling !== undefined) updatePayload.option_shuffling = body.optionShuffling;
    if (body.antiCheat !== undefined) updatePayload.anti_cheat = body.antiCheat;
    if (body.immediateResults !== undefined) updatePayload.immediate_results = body.immediateResults;

    updatePayload.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("model_sets")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // If questions are provided, replace them in model_set_questions
    if (Array.isArray(body.questions)) {
      try {
        await supabase.from("model_set_questions").delete().eq("model_set_id", id);
        if (body.questions.length > 0) {
          const category = updatePayload.category || data.category || "GENERAL";
          const questionRows = body.questions.map((q: any, idx: number) => ({
            model_set_id: id,
            order_index: idx + 1,
            difficulty: q.difficulty || "Easy",
            subject: q.subject || category,
            text_np: q.textNp || q.text_np || "",
            text_en: q.textEn || q.text_en || "",
            options: q.options || [],
            correct_option_id: q.correctOptionId || q.correct_option_id || "A",
            note: q.note || "",
          }));
          let { error: insertErr } = await supabase.from("model_set_questions").insert(questionRows);

          // Fallback if 'note' column is not in DB table
          if (insertErr && insertErr.message && insertErr.message.includes("note")) {
            console.warn("Retrying PUT without dedicated note column:", insertErr.message);
            const fallbackRows = body.questions.map((q: any, idx: number) => ({
              model_set_id: id,
              order_index: idx + 1,
              difficulty: q.difficulty || "Easy",
              subject: q.subject || category,
              text_np: q.textNp || q.text_np || "",
              text_en: q.textEn || q.text_en || "",
              options: Array.isArray(q.options)
                ? q.note ? [...q.options, { id: "__NOTE__", textEn: q.note, textNp: q.note }] : q.options
                : [],
              correct_option_id: q.correctOptionId || q.correct_option_id || "A",
            }));
            await supabase.from("model_set_questions").insert(fallbackRows);
          }
        }
      } catch (qErr) {
        console.warn("Could not update model_set_questions:", qErr);
      }
    }

    return NextResponse.json({ data, message: "Model set updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update model set" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase.from("model_sets").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Model set deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete model set" }, { status: 500 });
  }
}
