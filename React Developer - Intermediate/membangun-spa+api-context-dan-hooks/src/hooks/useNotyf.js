import { Notyf } from "notyf";

export function useNotyf() {
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: "center",
      y: "top",
    },
  });

  return notyf;
}
