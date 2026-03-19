'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaWhatsapp } from 'react-icons/fa';

export interface StudentInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  setStudentName: (v: string) => void;
  studentAge: string;
  setStudentAge: (v: string) => void;
  onSend: () => void;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  cancelClassName?: string;
}

export function StudentInfoModal({
  open,
  onOpenChange,
  studentName,
  setStudentName,
  studentAge,
  setStudentAge,
  onSend,
  contentClassName = 'bg-[var(--ink)] border border-[var(--amber)]/30 text-[var(--cream)]',
  titleClassName = 'text-2xl font-bold text-[var(--amber)]',
  descriptionClassName = 'text-[var(--cream-dark)]',
  labelClassName = 'text-[var(--amber)]',
  inputClassName = 'bg-[var(--ink-light)] border-[var(--amber)]/30 text-[var(--cream)] placeholder:text-[var(--cream-dark)]/50',
  cancelClassName = 'border-[var(--amber)]/30 text-[var(--cream-dark)] hover:bg-[var(--ink-light)] hover:text-[var(--cream)]',
}: StudentInfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={contentClassName}>
        <DialogHeader>
          <DialogTitle className={titleClassName}>
            Student Information
          </DialogTitle>
          <DialogDescription className={descriptionClassName}>
            Please provide some information before we connect via WhatsApp
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="student-info-name" className={labelClassName}>
              Student Name / Naam
            </Label>
            <Input
              id="student-info-name"
              placeholder="Enter student name..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="student-info-age" className={labelClassName}>
              Student Age / Leeftijd
            </Label>
            <Input
              id="student-info-age"
              type="number"
              placeholder="Enter student age..."
              value={studentAge}
              onChange={(e) => setStudentAge(e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={cancelClassName}
          >
            Cancel
          </Button>
          <Button
            onClick={onSend}
            disabled={!studentName || !studentAge}
            className="bg-[var(--sage)] hover:bg-[var(--sage)]/90 text-white flex items-center gap-2"
          >
            <FaWhatsapp />
            Continue to WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
