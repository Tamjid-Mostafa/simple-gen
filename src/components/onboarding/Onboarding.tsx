// OnboardingWizard.tsx
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
import axios from "axios";
import { updateUser } from "@/lib/actions/user.action";
import { UserSettings } from "@/types/user";
import { completeOnboarding } from "@/app/onboarding/_actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, string[]>
  >({});
  const router = useRouter();
  const filteredSteps = ONBOARDING_STEPS.filter((step) => step !== "cta");
  const currentKey = filteredSteps[step];
  const isLastStep = step === filteredSteps.length - 1;
  const isFirstStep = step === 0;

  const handleNext = () => {
    if (!isLastStep) setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirstStep) setStep((prev) => prev - 1);
  };

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

  const isContinueDisabled = () => {
    const value = formData[currentKey];
    if (ONBOARDING_OPTIONS[currentKey] || dynamicOptions[currentKey]) {
      return !value || value.length === 0;
    }
    return !value || value.trim() === "";
  };
  const handleFinish = async () => {
    try {
      const res = await axios.post("/api/onboard-user", {
        ...formData,
      });
      const { data }: { data: UserSettings } = res.data;

      await updateUser(user?.id as string, {
        hasOnboard: true,
        settings: data,
      });
      await completeOnboarding();
      console.log("User metadata updated");
      await user?.reload();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during onboarding finish:", error);
    }
  };

  return (
    <Card className="max-w-lg mx-auto border-none w-full shadow-none">
      <CardHeader>
        <CardTitle>{getStepTitle(currentKey)}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {getStepDescription(currentKey)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {ONBOARDING_OPTIONS[currentKey] || dynamicOptions[currentKey] ? (
          <>
            {[
              ...(ONBOARDING_OPTIONS[currentKey] || []),
              ...(dynamicOptions[currentKey] || []),
            ].map((item) => {
              const label = typeof item === "string" ? item : item.label;
              const description =
                typeof item === "string" ? null : item.description;

              return (
                <Label
                  key={label}
                  className="flex flex-row justify-between items-center gap-4 border px-4 py-3 rounded-lg hover:bg-accent"
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
                    checked={formData[currentKey]?.includes(label)}
                    onCheckedChange={() => handleChange(currentKey, label)}
                  />
                </Label>
              );
            })}
            <div className="flex gap-2 items-center pt-4">
              <Input
                value={otherValues[currentKey] || ""}
                onChange={(e) =>
                  setOtherValues((prev) => ({
                    ...prev,
                    [currentKey]: e.target.value,
                  }))
                }
                placeholder="Other (Please Specify)"
              />
              <Button
                type="button"
                onClick={() => handleOtherAdd(currentKey)}
                variant="secondary"
              >
                Add
              </Button>
            </div>
          </>
        ) : currentKey === "fineTuning" || currentKey === "cta" ? (
          <Textarea
            placeholder={
              currentKey === "fineTuning"
                ? "Helping people to make great website. I am a self taught Developer."
                : "Enter your CTA modifications..."
            }
            value={formData[currentKey] || ""}
            onChange={(e) => handleTextInput(currentKey, e.target.value)}
          />
        ) : null}

        <div className="pt-4 flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={isFirstStep}
            className="w-full"
          >
            Previous
          </Button>
          {isLastStep ? (
            <Button
              onClick={handleFinish}
              className="bg-teal-600 hover:bg-teal-700 w-full"
            >
              Finish
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={isContinueDisabled()}
              className="bg-teal-600 hover:bg-teal-700 w-full"
            >
              Continue
            </Button>
          )}
        </div>

        {isLastStep && (
          <pre className="mt-6 p-4 bg-zinc-800 rounded text-sm">
            {JSON.stringify(formData, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}
