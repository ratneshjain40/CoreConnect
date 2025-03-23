import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const TooltipButton = ({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClick} type="button">
        <Icon className="h-4 w-4" />
        <span className="sr-only">{label}</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
);
