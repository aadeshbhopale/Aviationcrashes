import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import Navigation from "@/components/Navigation";
import CrashCard from "@/components/CrashCard";
import { mockCrashes } from "@/data/mockCrashes";

const CrashList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredAndSortedCrashes = mockCrashes
    .filter(crash => {
      const matchesSearch = crash.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           crash.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           crash.aircraft.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = severityFilter === "all" || crash.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "fatalities":
          comparison = a.fatalities - b.fatalities;
          break;
        case "location":
          comparison = a.location.localeCompare(b.location);
          break;
        default:
          comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-aviation-navy mb-4">
            Aviation Accident Database
          </h1>
          <p className="text-muted-foreground mb-6">
            Comprehensive records of historical aviation incidents for research and education.
          </p>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, location, or aircraft..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="fatalities">Fatalities</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSortOrder}
                title={`Sort ${sortOrder === "asc" ? "ascending" : "descending"}`}
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedCrashes.length} of {mockCrashes.length} incidents
          </div>
        </div>
        
        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCrashes.map((crash) => (
            <CrashCard key={crash.id} crash={crash} />
          ))}
        </div>
        
        {filteredAndSortedCrashes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              No incidents found matching your criteria.
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSeverityFilter("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrashList;