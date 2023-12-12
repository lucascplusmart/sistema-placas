import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';

import PlateProps from '@/interfaces/plate';

type Props = {
  data: PlateProps | null;
  isOpen: boolean;
  setIsOpen: any;
};

const SearchPlateDialog = ({ data, isOpen, setIsOpen }: Props) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dados da placa</DialogTitle>
          <DialogDescription>
            Descrição dos dados da placa em questão
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full gap-3">
          {/* placa */}
          <div className="flex flex-col items-start">
            <Label
              htmlFor="placa"
              className="text-lg font-bold text-blue-500"
            >
              Placa
            </Label>
            <span id="placa">{data?.placa}</span>
          </div>

          {/* cidade */}
          <div className="flex flex-col items-start">
            <Label
              htmlFor="cidade"
              className="text-lg font-bold text-blue-500"
            >
              Cidade
            </Label>
            <span id="cidade ">{data?.cidade}</span>
          </div>

          {/* data */}
          <div className="flex flex-col items-start">
            <Label
              htmlFor="data"
              className="text-lg font-bold text-blue-500"
            >
              Data
            </Label>
            <span id="data">{data?.data}</span>
          </div>

          {/* hora */}
          <div className="flex flex-col items-start">
            <Label
              htmlFor="hora"
              className="text-lg font-bold text-blue-500"
            >
              Hora
            </Label>
            <span id="hora">{data?.hora}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchPlateDialog;
