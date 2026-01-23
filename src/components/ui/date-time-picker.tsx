"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick a date and time",
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );
  const [time, setTime] = React.useState<string>(
    value ? format(new Date(value), "HH:mm") : "09:00",
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && onChange) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(hours);
      newDateTime.setMinutes(minutes);
      newDateTime.setSeconds(0);
      newDateTime.setMilliseconds(0);

      const formatted = format(newDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
      onChange(formatted);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    if (date && onChange) {
      const [hours, minutes] = newTime.split(":").map(Number);
      const newDateTime = new Date(date);
      newDateTime.setHours(hours);
      newDateTime.setMinutes(minutes);
      newDateTime.setSeconds(0);
      newDateTime.setMilliseconds(0);

      const formatted = format(newDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSS");
      onChange(formatted);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-input border-border",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(new Date(value), "PPP HH:mm")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
        <div className="p-3 border-t border-border flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="flex-1"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
