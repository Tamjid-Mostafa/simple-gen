// AccountPreferences.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ONBOARDING_OPTIONS,
  ONBOARDING_STEPS,
  getStepTitle,
  getStepDescription,
} from "@/constants/onboarding";
import { Label } from "@/components/ui/label";

export default function AccountPreferences() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, string[]>>({});

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => {
      const current = new Set(prev[key] || []);
      current.has(value) ? current.delete(value) : current.add(value);
      return { ...prev, [key]: Array.from(current) };
    });
  };

  const handleOtherAdd = (key: string) => {
    const other = otherValues[key]?.trim();
    if (!other) return;

    setDynamicOptions((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), other],
    }));

    handleChange(key, other);
    setOtherValues((prev) => ({ ...prev, [key]: "" }));
  };

  const handleTextInput = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-8">
      {ONBOARDING_STEPS.map((stepKey) => (
        <Card key={stepKey} className="h-fit">
          <CardHeader>
            <CardTitle>{getStepTitle(stepKey)}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {getStepDescription(stepKey)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ONBOARDING_OPTIONS[stepKey] || dynamicOptions[stepKey] ? (
              <>
                {[...(ONBOARDING_OPTIONS[stepKey] || []), ...(dynamicOptions[stepKey] || [])].map(
                  (item) => {
                    const label = typeof item === "string" ? item : item.label;
                    const description = typeof item === "string" ? null : item.description;

                    return (
                      <Label
                        key={label}
                        className="flex justify-between items-center gap-4 border px-4 py-3 rounded-lg hover:bg-accent"
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-medium">{label}</span>
                          {description && (
                            <span className="text-muted-foreground text-xs">
                              {description}
                            </span>
                          )}
                        </div>
                        <Checkbox
                          checked={formData[stepKey]?.includes(label)}
                          onCheckedChange={() => handleChange(stepKey, label)}
                        />
                      </Label>
                    );
                  }
                )}
                <div className="flex gap-2 items-center pt-4">
                  <Input
                    value={otherValues[stepKey] || ""}
                    onChange={(e) =>
                      setOtherValues((prev) => ({ ...prev, [stepKey]: e.target.value }))
                    }
                    placeholder="Other (Please Specify)"
                  />
                  <Button
                    type="button"
                    onClick={() => handleOtherAdd(stepKey)}
                    variant="secondary"
                  >
                    Add
                  </Button>
                </div>
              </>
            ) : stepKey === "fineTuning" || stepKey === "cta" ? (
              <Textarea
                placeholder={
                  stepKey === "fineTuning"
                    ? "Helping people to make great website. I am a self taught Developer."
                    : "Enter your CTA modifications..."
                }
                value={formData[stepKey] || ""}
                onChange={(e) => handleTextInput(stepKey, e.target.value)}
              />
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}