import { toast } from '@/components/ui/use-toast';

const showToast = (
  title: string,
  description: string,
  isDestructive: boolean
) => {
  toast({
    title: title,
    description: description,
    variant: isDestructive ? 'destructive' : 'default',
    duration: 2000,
  });
};

export default showToast;
