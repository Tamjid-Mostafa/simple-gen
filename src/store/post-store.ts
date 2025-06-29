"use client";

import { create } from "zustand";

export interface PostFormData {
  topic: string;
  characters: string;
  customEnding: string;
}

interface PostStore {
  formData: PostFormData;
  post: string | null;

  // Actions
  setFormData: (data: PostFormData) => void;
  updateFormField: (field: keyof PostFormData, value: string) => void;

  addPost: (content: string | null) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  formData: {
    topic: "",
    characters: "600",
    customEnding: "",
  },

  post: null,

  setFormData: (data) => set({ formData: data }),

  updateFormField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  addPost: (content) => set({ post: content }),
}));
