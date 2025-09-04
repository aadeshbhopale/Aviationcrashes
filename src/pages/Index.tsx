import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Database, Shield, TrendingUp, Calendar, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import CrashCard from "@/components/CrashCard";
import { mockCrashes } from "@/data/mockCrashes";

const Index = () => {
  const featuredCrashes = mockCrashes.slice(0, 3);
  const totalFatalities = mockCrashes.reduce((sum, crash) => sum + crash.fatalities, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Plane className="h-12 w-12 text-aviation-navy mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-aviation-navy">
              Aviation History
            </h1>
          </div>
          <p className="text-xl text-aviation-steel mb-8 max-w-3xl mx-auto">
            Preserving the memory of aviation tragedies to honor those lost and learn from the past. 
            A comprehensive database of historical aircraft accidents and their lessons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-aviation-navy hover:bg-aviation-navy/90">
              <Link to="/crashes">
                <Database className="h-5 w-5 mr-2" />
                Browse Database
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">
                <Shield className="h-5 w-5 mr-2" />
                Admin Access
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Incidents
                </CardTitle>
                <Database className="h-4 w-4 text-aviation-navy" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aviation-navy">
                  {mockCrashes.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Historical records preserved
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Lives Lost
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-aviation-danger" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aviation-danger">
                  {totalFatalities.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Remembered and honored
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Years Covered
                </CardTitle>
                <Calendar className="h-4 w-4 text-aviation-steel" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-aviation-steel">
                  50+
                </div>
                <p className="text-xs text-muted-foreground">
                  Decades of aviation history
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Crashes Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-aviation-navy mb-4">
              Notable Aviation Incidents
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from history's most significant aviation accidents. Each incident 
              has contributed to improved safety standards and protocols.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredCrashes.map((crash) => (
              <CrashCard key={crash.id} crash={crash} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/crashes">
                View Complete Database
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-6 w-6 text-aviation-navy mr-2" />
            <span className="text-lg font-semibold text-aviation-navy">Aviation History</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Dedicated to preserving aviation history and honoring those who lost their lives. 
            May their memory contribute to safer skies for all.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
