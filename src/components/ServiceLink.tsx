import { Button } from "./ui/button";

interface ServiceLinkProps {
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  iconAnimation?: string;
}

export const ServiceLink = ({ title, description, href, icon, iconAnimation }: ServiceLinkProps) => {
  return (
    <Button
      asChild
      variant="glass"
      size="xl"
      className="w-full max-w-md group h-auto py-3 sm:py-4"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-2 sm:gap-3 w-full">
          {icon && <div className={`text-primary group-hover:scale-110 transition-smooth flex-shrink-0 ${iconAnimation || ''}`}>{icon}</div>}
          <div className="flex-1 text-left min-w-0">
            <div className="font-semibold text-foreground text-sm sm:text-base">{title}</div>
            {description && (
              <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{description}</div>
            )}
          </div>
        </div>
      </a>
    </Button>
  );
};
