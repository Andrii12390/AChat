'use client';

import { useState, useRef } from 'react';
import { Smile } from 'lucide-react';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { useClickOutside } from '@/hooks';

interface Props {
  onPick: (e: EmojiClickData) => void;
}

export const EmojiPicker = ({ onPick }: Props) => {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(pickerRef, () => setOpen(false));

  return (
    <div
      className="relative cursor-pointer"
      ref={pickerRef}
    >
      <button
        className="text-icon hover:text-primary hover:cursor-pointer"
        aria-label="Add emoji"
        onClick={() => setOpen(o => !o)}
      >
        <Smile
          strokeWidth={1.7}
          size={20}
        />
      </button>

      {open && (
        <div className="absolute bottom-12 right-0">
          <Picker
            autoFocusSearch={false}
            onEmojiClick={e => {
              onPick(e);
              setOpen(false);
            }}
            className="no-scrollbar"
          />
        </div>
      )}
    </div>
  );
};
