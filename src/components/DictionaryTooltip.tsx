import { Fragment } from "react";
import dictionary from "../data/dictionary.json";

const dictionaryEntries = Object.entries(dictionary as Record<string, string>).sort(
  (a, b) => b[0].length - a[0].length
);

interface Segment {
  text: string;
  definition?: string;
}

function splitWithDictionaryMatches(name: string): Segment[] {
  let segments: Segment[] = [{ text: name }];

  for (const [term, definition] of dictionaryEntries) {
    const nextSegments: Segment[] = [];
    const regex = new RegExp(`(${escapeRegExp(term)})`, "ig");

    for (const segment of segments) {
      if (segment.definition) {
        nextSegments.push(segment);
        continue;
      }

      const parts = segment.text.split(regex);
      for (const part of parts) {
        if (!part) continue;
        if (part.toLowerCase() === term.toLowerCase()) {
          nextSegments.push({ text: part, definition });
        } else {
          nextSegments.push({ text: part });
        }
      }
    }

    segments = nextSegments;
  }

  return segments;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function DictionaryTooltip({ name }: { name: string }) {
  const segments = splitWithDictionaryMatches(name);

  return (
    <>
      {segments.map((segment, i) =>
        segment.definition ? (
          <span key={i} className="group relative inline-block">
            <span className="border-b-2 border-dotted border-gray-500 cursor-help">
              {segment.text}
            </span>
            <span className="pointer-events-none absolute left-1/2 bottom-full z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-normal normal-case text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
              {segment.definition}
              <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </span>
          </span>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        )
      )}
    </>
  );
}
