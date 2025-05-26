"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { useUserSettings } from "@/hooks/useUserSettings";
import { toast } from "sonner";

export default function AccountPreferences() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, string[]>
  >({});
  const { settings, updateSettings } = useUserSettings();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debouncedUpdate = useCallback(
    (data: any) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        updateSettings(data);
        toast.success("Your settings have been saved.");
      }, 1500);
    },
    [updateSettings, toast]
  );

  useEffect(() => {
    if (settings) {
      setFormData(settings);
      // Inject custom values into dynamic options for rehydration
      const newDynamicOptions: Record<string, string[]> = {};
      ONBOARDING_STEPS.forEach((key) => {
        const original =
          ONBOARDING_OPTIONS[key]?.map((item) =>
            typeof item === "string" ? item : item.label
          ) || [];

        const fromUser = settings[key];
        if (Array.isArray(fromUser)) {
          newDynamicOptions[key] = fromUser.filter(
            (val: string) => !original.includes(val)
          );
        }
      });

      setDynamicOptions(newDynamicOptions);
    }
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => {
      const current = new Set(prev[key] || []);
      current.has(value) ? current.delete(value) : current.add(value);
      const updated = { ...prev, [key]: Array.from(current) };
      debouncedUpdate(updated);
      return updated;
    });
  };

  const handleOtherAdd = (key: string) => {
    const other = otherValues[key]?.trim();
    if (!other) return;

    setDynamicOptions((prev) => {
      const updated = { ...prev, [key]: [...(prev[key] || []), other] };
      return updated;
    });

    handleChange(key, other);
    setOtherValues((prev) => ({ ...prev, [key]: "" }));
  };

  const handleTextInput = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      debouncedUpdate(updated);
      return updated;
    });
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
                {[
                  ...(ONBOARDING_OPTIONS[stepKey] || []),
                  ...(dynamicOptions[stepKey] || []),
                ].map((item) => {
                  const label = typeof item === "string" ? item : item.label;
                  const description =
                    typeof item === "string" ? null : item.description;

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
                })}
                <div className="flex gap-2 items-center pt-4">
                  <Input
                    aria-label={`Add new ${getStepTitle(stepKey)}`}
                    value={otherValues[stepKey] || ""}
                    onChange={(e) =>
                      setOtherValues((prev) => ({
                        ...prev,
                        [stepKey]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleOtherAdd(stepKey);
                      }
                    }}
                    placeholder="Other (Please Specify)"
                  />
                  <Button
                    type="button"
                    onClick={() => handleOtherAdd(stepKey)}
                    variant="secondary"
                  >
                    Add &#9166;
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
