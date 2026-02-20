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
  contentClassName = 'bg-blue-900 border border-blue-300/50 text-blue-100',
  titleClassName = 'text-2xl font-bold text-blue-400',
  descriptionClassName = 'text-blue-200',
  labelClassName = 'text-blue-300',
  inputClassName = 'bg-blue-800 border-blue-300/50 text-blue-100 placeholder:text-blue-200/50',
  cancelClassName = 'border-blue-300/50 text-blue-200 hover:bg-blue-800 hover:text-blue-100',
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
            className="bg-green-500 hover:bg-green-400 text-white flex items-center gap-2"
          >
            <FaWhatsapp />
            Continue to WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
