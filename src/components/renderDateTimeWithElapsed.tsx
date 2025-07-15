"use client"

import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { calculateTimeSince } from "@/utils/calculateTimeSince";

export function renderDateTimeWithElapsed(dateString: string) {
  const [timeSince, setTimeSince] = useState(calculateTimeSince(dateString));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(calculateTimeSince(dateString));
    }, 60000);

    return () => clearInterval(interval);
  }, [dateString]);

  return (
    <div className="flex flex-col">
      <span>{formatDate(dateString)}</span>
      <span className="text-xs text-muted-foreground">{timeSince}</span>
    </div>
  );
}
