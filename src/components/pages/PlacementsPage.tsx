import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { StudentPlacements } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BackButton } from '@/components/ui/back-button';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Building2, 
  Calendar, 
  ExternalLink,
  Briefcase,
  TrendingUp
} from 'lucide-react';

export default function PlacementsPage() {
  const [placements, setPlacements] = useState<StudentPlacements[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPlacements();
  }, []);

  const loadPlacements = async () => {
    try {
      const { items } = await BaseCrudService.getAll<StudentPlacements>('studentplacements');
      setPlacements(items);
    } catch (error) {
      console.error('Error loading placements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlacements = placements.filter(placement =>
    placement.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    placement.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    placement.placementStatus?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString();
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-primary/20 text-primary';
      case 'completed':
        return 'bg-brandaccent/30 text-secondary';
      case 'pending':
        return 'bg-subtlebackground/50 text-secondary';
      case 'cancelled':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-secondary/10 text-secondary';
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <TrendingUp className="h-3 w-3" />;
      case 'completed':
        return <Briefcase className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white border-b border-secondary/10 px-6 py-4">
        <div className="max-w-[120rem] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-lg text-secondary">PlacementAI</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/students" className="text-secondary/70 hover:text-secondary font-paragraph">Students</Link>
            <Link to="/placements" className="text-primary font-paragraph font-medium">Placements</Link>
            <Button asChild>
              <Link to="/placements/new">Add Placement</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="px-6 py-12">
        <div className="max-w-[120rem] mx-auto">
          <BackButton className="mb-6" />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="font-heading text-4xl font-bold text-secondary mb-2">Student Placements</h1>
              <p className="font-paragraph text-lg text-secondary/70">
                Track and manage student internships, co-ops, and job placements with company partners.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary/50" />
                <Input
                  placeholder="Search placements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button asChild>
                <Link to="/placements/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Placement
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white border-secondary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-secondary/70">Total Placements</p>
                    <p className="font-heading text-2xl font-bold text-secondary">{placements.length}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-secondary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-secondary/70">Active Placements</p>
                    <p className="font-heading text-2xl font-bold text-secondary">
                      {placements.filter(p => p.placementStatus?.toLowerCase() === 'active').length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-secondary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-secondary/70">Completed</p>
                    <p className="font-heading text-2xl font-bold text-secondary">
                      {placements.filter(p => p.placementStatus?.toLowerCase() === 'completed').length}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-secondary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-paragraph text-sm text-secondary/70">Partner Companies</p>
                    <p className="font-heading text-2xl font-bold text-secondary">
                      {new Set(placements.map(p => p.companyName).filter(Boolean)).size}
                    </p>
                  </div>
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Placements Grid */}
      <div className="px-6 pb-12">
        <div className="max-w-[120rem] mx-auto">
          {filteredPlacements.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-secondary/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-secondary mb-2">
                {searchTerm ? 'No placements found' : 'No placements yet'}
              </h3>
              <p className="font-paragraph text-secondary/70 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters.'
                  : 'Get started by adding your first student placement.'
                }
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link to="/placements/new">Add First Placement</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlacements.map((placement) => (
                <Card key={placement._id} className="bg-white border-secondary/10 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="font-heading text-lg text-secondary truncate">
                          {placement.jobTitle || 'Position Not Specified'}
                        </CardTitle>
                        <p className="font-paragraph text-sm text-secondary/70 flex items-center gap-1 mt-1">
                          <Building2 className="h-3 w-3" />
                          {placement.companyName || 'Company Not Specified'}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(placement.placementStatus)} border-0 flex items-center gap-1`}>
                        {getStatusIcon(placement.placementStatus)}
                        {placement.placementStatus || 'Unknown'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-secondary/50" />
                        <span className="font-paragraph text-sm text-secondary/70">
                          {formatDate(placement.startDate)} - {formatDate(placement.endDate)}
                        </span>
                      </div>
                      
                      {placement.companyWebsite && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-secondary/50" />
                          <a 
                            href={placement.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-paragraph text-sm text-primary hover:underline truncate"
                          >
                            Company Website
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {placement.offerLetterUrl && (
                        <Button asChild variant="outline" size="sm">
                          <a href={placement.offerLetterUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Offer Letter
                          </a>
                        </Button>
                      )}
                      <Button asChild variant="outline" size="sm" className="ml-auto">
                        <Link to={`/placements/${placement._id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}