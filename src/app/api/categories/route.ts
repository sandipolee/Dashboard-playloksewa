import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const categoriesSet = new Set<string>();

    // 1. Try to fetch from dedicated categories table if it exists
    try {
      const { data: catData, error: catError } = await supabase
        .from("categories")
        .select("name, title, category");
      
      if (!catError && Array.isArray(catData)) {
        catData.forEach((item: any) => {
          const name = item.name || item.title || item.category;
          if (typeof name === "string" && name.trim()) {
            categoriesSet.add(name.trim());
          }
        });
      }
    } catch {
      // Dedicated table may not exist, proceed to check model_sets
    }

    // 2. Fetch distinct categories from existing model_sets
    try {
      const { data: setsData, error: setsError } = await supabase
        .from("model_sets")
        .select("category");

      if (!setsError && Array.isArray(setsData)) {
        setsData.forEach((s: any) => {
          if (typeof s.category === "string" && s.category.trim()) {
            categoriesSet.add(s.category.trim());
          }
        });
      }
    } catch (e) {
      console.warn("Could not query model_sets for categories:", e);
    }

    const categories = Array.from(categoriesSet).sort((a, b) =>
      a.localeCompare(b)
    );

    return NextResponse.json({ data: categories });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
