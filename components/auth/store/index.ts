import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type State = {
  error: string | undefined;
  success: string | undefined;
  showPass: boolean;
  showConfirmPass: boolean;
};

export type Action = {
  setError: (val: string | undefined) => void;
  setSuccess: (val: string | undefined) => void;
  setShowPass: (val: boolean) => void;
  setShowConfirmPass: (val: boolean) => void;
};

export const loginStore = create<State & Action>()(
  devtools((set) => ({
    error: "",
    success: "",
    showPass: false,
    confirmPass: false,
    setError: (val) =>
      set(() => ({
        error: val,
      })),
    setSuccess: (val) =>
      set(() => ({
        success: val,
      })),
    setShowPass: (val) =>
      set(() => ({
        showPass: val,
      })),
    setShowConfirmPass: (val) =>
      set(() => ({
        showConfirmPass: val,
      })),
  }))
);
