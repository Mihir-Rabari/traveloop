import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";

interface TripCardProps {
  title: string;
  location: string;
  dateRange: string;
  image?: string;
  status: "upcoming" | "ongoing" | "completed";
}

export function TripCard({ title, location, dateRange, image, status }: TripCardProps) {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-md transition-all flex flex-col h-full">
      <div className="relative h-40 bg-muted/50 overflow-hidden shrink-0">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-primary/5 transition-transform duration-500 group-hover:scale-105" />
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
            ${status === 'upcoming' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
            ${status === 'ongoing' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
            ${status === 'completed' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' : ''}
          `}>
            {status}
          </span>
        </div>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <div className="flex items-center text-muted-foreground mt-1 text-sm">
            <MapPin className="h-3 w-3 mr-1 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground mt-3 text-xs">
          <CalendarDays className="h-3 w-3 mr-1 shrink-0" />
          <span>{dateRange}</span>
        </div>
      </CardContent>
    </Card>
  );
}
