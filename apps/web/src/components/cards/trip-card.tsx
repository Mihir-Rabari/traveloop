import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormattedDate } from "@/lib/hooks/use-formatted-date";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TripCardProps {
  id: string | number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  image?: string;
  status: "upcoming" | "ongoing" | "completed";
}



export function TripCard({ id, title, destination, startDate, endDate, image, status }: TripCardProps) {
  const router = useRouter();
  const startStr = useFormattedDate(startDate);
  const endStr = useFormattedDate(endDate);
  const dateRange = startStr && endStr ? `${startStr} - ${endStr}` : "Dates TBD";

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card 
        onClick={() => router.push(`/trips/${id}`)}
        className="rounded-[2rem] border-2 border-primary/5 overflow-hidden group cursor-pointer shadow-lg hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full bg-white/60 backdrop-blur-xl"
      >
        <div className="relative h-52 overflow-hidden shrink-0">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop";
              }}
            />
          ) : (
            <div className="w-full h-full bg-primary/10 transition-transform duration-1000 group-hover:scale-110" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-5 right-5">
            <span className={cn(
              "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md border border-white/20",
              status === 'upcoming' && "bg-primary/90 text-white",
              status === 'ongoing' && "bg-green-500/90 text-white",
              status === 'completed' && "bg-black/50 text-white"
            )}>
              {status}
            </span>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-black text-xl text-foreground tracking-tighter leading-none group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center text-muted-foreground text-xs font-bold">
              <MapPin className="h-3.5 w-3.5 mr-2 text-primary/60 group-hover:scale-110 transition-transform" />
              <span className="line-clamp-1">{destination}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-primary/5">
            <div className="flex items-center text-muted-foreground text-[9px] font-black uppercase tracking-widest">
              <CalendarDays className="h-3.5 w-3.5 mr-2 text-secondary" />
              <span>{dateRange}</span>
            </div>
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ChevronRight size={16} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
