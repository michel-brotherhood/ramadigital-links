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
      className="w-full max-w-md group"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-3 w-full">
          {icon && <div className={`text-primary group-hover:scale-110 transition-smooth ${iconAnimation || ''}`}>{icon}</div>}
          <div className="flex-1 text-left">
            <div className="font-semibold text-foreground">{title}</div>
            {description && (
              <div className="text-sm text-muted-foreground">{description}</div>
            )}
          </div>
        </div>
      </a>
    </Button>
  );
};
