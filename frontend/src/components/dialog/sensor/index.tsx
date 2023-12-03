import React, { Dispatch, SetStateAction, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import useSensor from '@/hooks/use-sensor';

import { Loader2 } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const SensorDialog = ({ isOpen, onOpenChange }: Props) => {
  const { data, error, isLoading } = useSensor();

  if (isLoading) return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;

  if (error) {
    return (
      <p className="text-destructive font-semibold">
        Erro ao carregar a informação
      </p>
    );
  }

  if (!data) {
    return <p>Sem informações!</p>;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Dados do sensor</DialogTitle>
          <DialogDescription>
            Descrição dos dados do sensor de temperatura
          </DialogDescription>

          <div className="w-full flex flex-col items-start justify-center">
            <Separator className="bg-secondary self-center my-4 h-0.5 w-3/4" />

            <div className="w-full flex flex-col items-start justify-center">
              <h3 className="font-semibold">
                Canal:
                <span className="ms-3 text-zinc-400 font-regular text-base">
                  {data.channel.name}
                </span>
              </h3>
              {data.feeds.map((feed) => {
                return <span key={feed.entry_id}>{feed.field1}</span>;
              })}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SensorDialog;
