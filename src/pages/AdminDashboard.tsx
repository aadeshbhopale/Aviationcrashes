import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Database, Users, TrendingUp, AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { mockCrashes } from "@/data/mockCrashes";

const AdminDashboard = () => {
  const [crashes] = useState(mockCrashes);
  
  const totalFatalities = crashes.reduce((sum, crash) => sum + crash.fatalities, 0);
  const totalSurvivors = crashes.reduce((sum, crash) => sum + (crash.survivors || 0), 0);
  const highSeverityCount = crashes.filter(crash => crash.severity === "high").length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-aviation-navy mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage aviation incident records and database content
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
              <Database className="h-4 w-4 text-aviation-navy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-aviation-navy">{crashes.length}</div>
              <p className="text-xs text-muted-foreground">
                Records in database
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fatalities</CardTitle>
              <TrendingUp className="h-4 w-4 text-aviation-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-aviation-danger">
                {totalFatalities.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Lives lost in recorded incidents
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Survivors</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {totalSurvivors.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                People who survived
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Severity</CardTitle>
              <AlertTriangle className="h-4 w-4 text-aviation-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-aviation-warning">
                {highSeverityCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Major incidents recorded
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Section */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage database content and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-aviation-navy hover:bg-aviation-navy/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Incident
                </Button>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
                <Button variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Incidents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>
              Manage and edit aviation incident records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Aircraft</TableHead>
                    <TableHead>Fatalities</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {crashes.slice(0, 10).map((crash) => (
                    <TableRow key={crash.id}>
                      <TableCell className="font-medium">{crash.title}</TableCell>
                      <TableCell>{crash.date}</TableCell>
                      <TableCell>{crash.location}</TableCell>
                      <TableCell>{crash.aircraft}</TableCell>
                      <TableCell className="text-aviation-danger font-medium">
                        {crash.fatalities}
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(crash.severity)}>
                          {crash.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;