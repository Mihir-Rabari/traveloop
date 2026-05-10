import { Card, CardContent } from "@/components/ui/card";

interface RegionalCardProps {
  title: string;
  image?: string;
  count: number;
}

export function RegionalCard({ title, image, count }: RegionalCardProps) {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-md transition-all">
      <div className="relative h-32 bg-muted/50 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-primary/10 transition-transform duration-500 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-white/80">{count} destinations</p>
        </div>
      </div>
    </Card>
  );
}
