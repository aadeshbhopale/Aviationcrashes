import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, MapPin, Users, Plane, AlertTriangle, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import { mockCrashes } from "@/data/mockCrashes";

const CrashDetail = () => {
  const { id } = useParams();
  const crash = mockCrashes.find(c => c.id === id);

  if (!crash) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-aviation-navy mb-4">Incident Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested incident could not be found in our database.</p>
            <Button asChild>
              <Link to="/crashes">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Database
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/crashes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Database
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl text-aviation-navy mb-2">
                      {crash.title}
                    </CardTitle>
                    <div className="flex items-center text-aviation-steel font-medium">
                      <Plane className="h-4 w-4 mr-2" />
                      {crash.aircraft}
                    </div>
                  </div>
                  <Badge className={getSeverityColor(crash.severity)}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {crash.severity} severity
                  </Badge>
                </div>
              </CardHeader>
              
              {crash.imageUrl && (
                <div className="px-6 pb-6">
                  <img
                    src={crash.imageUrl}
                    alt={crash.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <CardContent>
                <h3 className="font-semibold text-lg mb-3">Incident Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {crash.description}
                </p>
              </CardContent>
            </Card>

            {/* Additional Details Section */}
            <Card>
              <CardHeader>
                <CardTitle>Investigation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detailed investigation reports and findings would be displayed here. 
                  This section would contain information about the probable cause, 
                  contributing factors, and lessons learned from this tragic incident.
                </p>
                <Separator className="my-4" />
                <h4 className="font-semibold mb-2">Safety Improvements</h4>
                <p className="text-muted-foreground">
                  Information about safety measures, regulatory changes, and procedural 
                  improvements that resulted from the investigation of this incident.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-aviation-steel mr-3" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-sm text-muted-foreground">{crash.date}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-aviation-steel mr-3" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">{crash.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-aviation-danger mr-3" />
                  <div>
                    <div className="font-medium">Casualties</div>
                    <div className="text-sm">
                      <span className="text-aviation-danger font-medium">
                        {crash.fatalities} fatalities
                      </span>
                      {crash.survivors !== undefined && (
                        <span className="text-muted-foreground block">
                          {crash.survivors} survivors
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Plane className="h-4 w-4 text-aviation-steel mr-3" />
                  <div>
                    <div className="font-medium">Aircraft</div>
                    <div className="text-sm text-muted-foreground">{crash.aircraft}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Memorial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We remember the {crash.fatalities} lives lost in this tragic incident. 
                  Their memory serves as a reminder of the importance of aviation safety.
                </p>
                <div className="text-xs text-muted-foreground">
                  "May their sacrifice contribute to safer skies for all travelers."
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrashDetail;