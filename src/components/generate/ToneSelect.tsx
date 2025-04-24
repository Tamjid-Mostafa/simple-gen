"use client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { Label } from "../ui/label";

// Tone options with emojis
const toneOptions = [
  { value: "Informative", label: "📚 Informative" },
  { value: "Professional", label: "👔 Professional" },
  { value: "Casual", label: "😊 Casual" },
  { value: "Humorous", label: "😂 Humorous" },
  { value: "Inspirational", label: "✨ Inspirational" },
  { value: "Empathetic", label: "🥰 Empathetic" },
  { value: "Critical", label: "⚖️ Critical" },
  { value: "Analytical", label: "📊 Analytical" },
  { value: "Enthusiastic", label: "🥳 Enthusiastic" },
  { value: "Persuasive", label: "🧠 Persuasive" },
  { value: "Reflective", label: "💭 Reflective" },
  { value: "Friendly", label: "🤗 Friendly" },
  { value: "Optimistic", label: "🌞 Optimistic" },
  { value: "Pessimistic", label: "🌧 Pessimistic" },
  { value: "Neutral", label: "⚖️ Neutral" },
  { value: "Authoritative", label: "👑 Authoritative" },
  { value: "Conciliatory", label: "🤝 Conciliatory" },
  { value: "Visionary", label: "🌟 Visionary" },
  { value: "Cautious", label: "🐢 Cautious" },
  { value: "Narrative", label: "📖 Narrative" },
  { value: "Supportive", label: "👍 Supportive" },
  { value: "Questioning", label: "❓ Questioning" },
  { value: "Agreement", label: "✅ Agreement" },
  { value: "Disagreement", label: "❌ Disagreement" },
];

type ToneSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ToneSelect({ value, onChange }: ToneSelectProps) {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="tone" className="font-medium">
        Tone
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select tone" />
        </SelectTrigger>
        <SelectContent>
          {toneOptions.map((tone) => (
            <SelectItem key={tone.value} value={tone.value}>
              <span className="flex items-center gap-2">{tone.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
