import { useEffect } from "react"

export function useFocusInput(key, inputEl){
  useEffect(() => {
    document.addEventListener("keyup", e => {
      return key === e.key && inputEl?.focus()
    })
  }, [key, inputEl])

}
