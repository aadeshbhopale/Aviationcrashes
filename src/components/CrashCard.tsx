import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface CrashData {
  id: string;
  title: string;
  date: string;
  location: string;
  fatalities: number;
  survivors?: number;
  aircraft: string;
  description: string;
  imageUrl?: string;
  severity: "low" | "medium" | "high";
}

interface CrashCardProps {
  crash: CrashData;
}

const CrashCard = ({ crash }: CrashCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-aviation-warning/20 text-aviation-warning border-aviation-warning/30";
      case "high":
        return "bg-aviation-danger/20 text-aviation-danger border-aviation-danger/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Link to={`/crashes/${crash.id}`}>
      <Card className="h-full hover:shadow-card-aviation transition-all duration-300 cursor-pointer group">
        {crash.imageUrl && (
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={crash.imageUrl}
              alt={crash.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <Badge className={getSeverityColor(crash.severity)}>
                <AlertTriangle className="h-3 w-3 mr-1" />
                {crash.severity}
              </Badge>
            </div>
          </div>
        )}
        
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-aviation-navy group-hover:text-primary transition-colors">
            {crash.title}
          </CardTitle>
          <div className="text-sm text-aviation-steel font-medium">
            {crash.aircraft}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {crash.date}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {crash.location}
          </div>
          
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-aviation-danger" />
            <span className="text-aviation-danger font-medium">
              {crash.fatalities} fatalities
            </span>
            {crash.survivors !== undefined && (
              <span className="text-muted-foreground ml-2">
                • {crash.survivors} survivors
              </span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3">
            {crash.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CrashCard;