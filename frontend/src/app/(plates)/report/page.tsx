'use client';

import { Button } from '@/components/ui/button';

import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

const Report = () => {
  const { toast } = useToast();

  return (
    <div>
      <h1>Relatório</h1>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        Add to calendar
      </Button>
    </div>
  );
};

export default Report;
