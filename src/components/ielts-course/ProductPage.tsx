// src/components/ielts-course/ProductPage.tsx

"use client";

import { Data } from "@/types/ieltsCourse";

interface Props {
  data: Data;
}

export function ProductPage({ data }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />

      {/* Later: instructors, media, cta, sections etc */}
    </div>
  );
}
