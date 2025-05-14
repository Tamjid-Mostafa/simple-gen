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
import { Label } from "../ui/label";

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [other, setOther] = useState<string>("");

  const currentKey = ONBOARDING_STEPS[step];
  const isLastStep = step === ONBOARDING_STEPS.length - 1;
  const isFirstStep = step === 0;

  const handleNext = () => {
    if (!isLastStep) setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirstStep) setStep((prev) => prev - 1);
  };

  const handleChange = (value: string) => {
    setFormData((prev) => {
      const current = new Set(prev[currentKey] || []);
      current.has(value) ? current.delete(value) : current.add(value);
      return { ...prev, [currentKey]: Array.from(current) };
    });
  };

  const handleOtherAdd = () => {
    if (!other.trim()) return;
    handleChange(other);
    setOther("");
  };

  const handleTextInput = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isContinueDisabled = () => {
    const value = formData[currentKey];
    if (ONBOARDING_OPTIONS[currentKey]) {
      return !value || value.length === 0;
    }
    return !value || value.trim() === "";
  };

  const page = "account" as "onboarding" | "account";
  return (
    <>
      {page === "onboarding" ? (
        <Card className="max-w-lg mx-auto border-none w-full">
          <CardHeader>
            <CardTitle className="text-xl">
              {getStepTitle(currentKey)}
            </CardTitle>
            <CardDescription className=" text-sm">
              {getStepDescription(currentKey)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ONBOARDING_OPTIONS[currentKey] ? (
              <>
                {ONBOARDING_OPTIONS[currentKey].map((item) => {
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
                        onCheckedChange={() => handleChange(label)}
                      />
                    </Label>
                  );
                })}

                <div className="flex gap-2 items-center pt-4">
                  <Input
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                    placeholder="Other (Please Specify)"
                  />
                  <Button
                    type="button"
                    onClick={handleOtherAdd}
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
              <Button
                onClick={handleNext}
                disabled={isContinueDisabled()}
                className="bg-teal-600 hover:bg-teal-700 w-full"
              >
                {isLastStep ? "Finish" : "Continue"}
              </Button>
            </div>

            {isLastStep && (
              <pre className="mt-6 p-4 bg-zinc-800 rounded text-sm ">
                {JSON.stringify(formData, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
      ) : (
        <div>
          {ONBOARDING_STEPS.map((step, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className=" text-xl">
                      {getStepTitle(step)}
                    </CardTitle>
                    <CardDescription className=" text-sm">
                      {getStepDescription(step)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ONBOARDING_OPTIONS[step] ? (
                      <>
                        {ONBOARDING_OPTIONS[step].map((item) => {
                          const label =
                            typeof item === "string" ? item : item.label;
                          const description =
                            typeof item === "string" ? null : item.description;

                          return (
                            <Label
                              key={label}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                checked={formData[step]?.includes(label)}
                                onCheckedChange={() => handleChange(label)}
                              />
                              <div className="flex flex-col text-left">
                                <span className="font-medium">{label}</span>
                                {description && (
                                  <span className="text-muted-foreground text-sm">
                                    {description}
                                  </span>
                                )}
                              </div>
                            </Label>
                          );
                        })}
                        <div className="flex gap-2 items-center pt-4">
                          <Input
                            value={other}
                            onChange={(e) => setOther(e.target.value)}
                            placeholder="Other (Please Specify)"
                          />
                          <Button
                            type="button"
                            onClick={handleOtherAdd}
                            variant="secondary"
                          >
                            Add
                          </Button>
                        </div>
                      </>
                    ) : step === "fineTuning" || step === "cta" ? (
                      <Textarea
                        placeholder={
                          step === "fineTuning"
                            ? "Helping people to make great website. I am a self taught Developer."
                            : "Enter your CTA modifications..."
                        }
                        value={formData[step] || ""}
                        onChange={(e) =>
                          handleTextInput(step, e.target.value)
                        }
                      />
                    ) : null}

                    <div className="pt-4 flex justify-end">
                      <Button
                        onClick={handleNext}
                        disabled={isLastStep}
                        className="bg-teal-600 hover:bg-teal-700 "
                      >
                        {isLastStep ? "Finish" : "Next"}
                      </Button>
                    </div>

                    {isLastStep && (
                      <pre className="mt-6 p-4 bg-zinc-800 rounded text-sm ">
                        {JSON.stringify(formData, null, 2)}
                      </pre>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
