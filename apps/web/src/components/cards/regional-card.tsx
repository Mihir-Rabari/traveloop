import { Card } from "@/components/ui/card";

interface RegionalCardProps {
  title: string;
  image?: string;
  count: number;
}

export function RegionalCard({ title, image, count }: RegionalCardProps) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-2 border-primary/20 group cursor-pointer hover:shadow-2xl transition-all duration-500 bg-card/60 backdrop-blur-md">
      <div className="relative h-40 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop";
            }}
          />
        ) : (
          <div className="w-full h-full bg-primary/10 transition-transform duration-700 group-hover:scale-125" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold text-lg leading-tight">{title}</h3>
          <p className="text-xs font-medium text-white/90 mt-0.5">{count} explorations</p>
        </div>
      </div>
    </Card>
  );
}
