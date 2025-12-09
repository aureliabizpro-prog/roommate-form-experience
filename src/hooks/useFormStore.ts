import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FormData } from '@/lib/formSchema';

type FormState = {
  formData: Partial<FormData>;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
};

// TODO: Finalize form store implementation
export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      formData: {},
      setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      resetForm: () => set({ formData: {} }),
    }),
    {
      name: 'roommate_form_draft', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
