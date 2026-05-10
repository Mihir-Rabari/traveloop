import { useState, useEffect } from "react";

export function useFormattedDate(date: string | Date | undefined, options?: Intl.DateTimeFormatOptions) {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    if (!date) return;
    try {
      const d = typeof date === "string" ? new Date(date) : date;
      if (isNaN(d.getTime())) return;
      setFormatted(d.toLocaleDateString(undefined, options));
    } catch (e) {
      // Silent fail
    }
  }, [date, options]);

  return formatted;
}

export function useFormattedTime(date: string | Date | undefined, options?: Intl.DateTimeFormatOptions) {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    if (!date) return;
    try {
      const d = typeof date === "string" ? new Date(date) : date;
      if (isNaN(d.getTime())) return;
      setFormatted(d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', ...options }));
    } catch (e) {
      // Silent fail
    }
  }, [date, options]);

  return formatted;
}
