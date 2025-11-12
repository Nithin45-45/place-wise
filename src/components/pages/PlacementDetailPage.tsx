import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { StudentPlacements } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  GraduationCap, 
  ArrowLeft, 
  Building2, 
  Calendar, 
  ExternalLink,
  Edit,
  Briefcase,
  TrendingUp,
  FileText,
  Globe
} from 'lucide-react';

export default function PlacementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [placement, setPlacement] = useState<StudentPlacements | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadPlacement();
    }
  }, [id]);

  const loadPlacement = async () => {
    if (!id) return;
    
    try {
      const placementData = await BaseCrudService.getById<StudentPlacements>('studentplacements', id);
      setPlacement(placementData);
    } catch (error) {
      console.error('Error loading placement:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        return <TrendingUp className="h-4 w-4" />;
      case 'completed':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const calculateDuration = (startDate: Date | string | undefined, endDate: Date | string | undefined) => {
    if (!startDate || !endDate) return 'Duration not specified';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.round(diffDays / 30);
    
    if (diffMonths < 1) return `${diffDays} days`;
    if (diffMonths === 1) return '1 month';
    return `${diffMonths} months`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!placement) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="bg-white border-b border-secondary/10 px-6 py-4">
          <div className="max-w-[120rem] mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-lg text-secondary">PlacementAI</span>
            </Link>
          </div>
        </nav>
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-secondary mb-2">Placement Not Found</h1>
            <p className="font-paragraph text-secondary/70 mb-6">The placement you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/placements">Back to Placements</Link>
            </Button>
          </div>
        </div>
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
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-secondary/20"></div>
            <nav className="flex items-center space-x-2 text-sm font-paragraph">
              <Link to="/placements" className="text-secondary/70 hover:text-secondary">Placements</Link>
              <span className="text-secondary/50">/</span>
              <span className="text-secondary">{placement.jobTitle || 'Placement Details'}</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="bg-brandaccent rounded-2xl p-4">
                <Building2 className="h-12 w-12 text-secondary" />
              </div>
              <div>
                <h1 className="font-heading text-3xl font-bold text-secondary mb-2">
                  {placement.jobTitle || 'Position Not Specified'}
                </h1>
                <p className="font-paragraph text-lg text-secondary/70 mb-3">
                  {placement.companyName || 'Company Not Specified'}
                </p>
                <div className="flex items-center gap-3">
                  <Badge className={`${getStatusColor(placement.placementStatus)} border-0 flex items-center gap-1`}>
                    {getStatusIcon(placement.placementStatus)}
                    {placement.placementStatus || 'Unknown Status'}
                  </Badge>
                  <span className="font-paragraph text-sm text-secondary/60">
                    Duration: {calculateDuration(placement.startDate, placement.endDate)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link to={`/placements/${placement._id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Placement
                </Link>
              </Button>
              {placement.offerLetterUrl && (
                <Button asChild>
                  <a href={placement.offerLetterUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    View Offer Letter
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-12">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white border-secondary/10">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Placement Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Job Title
                      </label>
                      <p className="font-paragraph text-secondary">
                        {placement.jobTitle || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Company Name
                      </label>
                      <p className="font-paragraph text-secondary">
                        {placement.companyName || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Placement Status
                      </label>
                      <Badge className={`${getStatusColor(placement.placementStatus)} border-0 w-fit`}>
                        {placement.placementStatus || 'Unknown'}
                      </Badge>
                    </div>
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Duration
                      </label>
                      <p className="font-paragraph text-secondary">
                        {calculateDuration(placement.startDate, placement.endDate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-secondary/10">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Start Date
                      </label>
                      <p className="font-paragraph text-secondary">
                        {formatDate(placement.startDate)}
                      </p>
                    </div>
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        End Date
                      </label>
                      <p className="font-paragraph text-secondary">
                        {formatDate(placement.endDate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {(placement.companyWebsite || placement.offerLetterUrl) && (
                <Card className="bg-white border-secondary/10">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {placement.companyWebsite && (
                      <div>
                        <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-2">
                          Company Website
                        </label>
                        <Button asChild variant="outline" size="sm">
                          <a href={placement.companyWebsite} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4 mr-2" />
                            Visit Website
                          </a>
                        </Button>
                      </div>
                    )}
                    
                    {placement.offerLetterUrl && (
                      <div>
                        <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-2">
                          Offer Letter
                        </label>
                        <Button asChild variant="outline" size="sm">
                          <a href={placement.offerLetterUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-4 w-4 mr-2" />
                            View Document
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white border-secondary/10">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-secondary">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link to={`/placements/${placement._id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Placement
                    </Link>
                  </Button>
                  
                  {placement.companyWebsite && (
                    <Button asChild className="w-full justify-start" variant="outline">
                      <a href={placement.companyWebsite} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Company Website
                      </a>
                    </Button>
                  )}
                  
                  {placement.offerLetterUrl && (
                    <Button asChild className="w-full justify-start" variant="outline">
                      <a href={placement.offerLetterUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        Offer Letter
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-secondary/10">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-secondary">Placement Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary/70">Current Status</span>
                      <Badge className={`${getStatusColor(placement.placementStatus)} border-0 text-xs`}>
                        {placement.placementStatus || 'Unknown'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary/70">Company Website</span>
                      <Badge variant={placement.companyWebsite ? "default" : "secondary"} className="text-xs">
                        {placement.companyWebsite ? 'Available' : 'Not provided'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary/70">Offer Letter</span>
                      <Badge variant={placement.offerLetterUrl ? "default" : "secondary"} className="text-xs">
                        {placement.offerLetterUrl ? 'Available' : 'Not provided'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}