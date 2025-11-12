import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { StudentPlacements } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { 
  GraduationCap, 
  ArrowLeft, 
  Save,
  Building2,
  Calendar,
  Briefcase,
  ExternalLink,
  FileText
} from 'lucide-react';

export default function PlacementFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = id !== 'new';
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<StudentPlacements>>({
    companyName: '',
    jobTitle: '',
    placementStatus: '',
    startDate: '',
    endDate: '',
    companyWebsite: '',
    offerLetterUrl: ''
  });

  useEffect(() => {
    if (isEditing && id) {
      loadPlacement();
    }
  }, [id, isEditing]);

  const loadPlacement = async () => {
    if (!id) return;
    
    try {
      const placement = await BaseCrudService.getById<StudentPlacements>('studentplacements', id);
      setFormData({
        companyName: placement.companyName || '',
        jobTitle: placement.jobTitle || '',
        placementStatus: placement.placementStatus || '',
        startDate: placement.startDate ? 
          new Date(placement.startDate).toISOString().split('T')[0] : '',
        endDate: placement.endDate ? 
          new Date(placement.endDate).toISOString().split('T')[0] : '',
        companyWebsite: placement.companyWebsite || '',
        offerLetterUrl: placement.offerLetterUrl || ''
      });
    } catch (error) {
      console.error('Error loading placement:', error);
      toast({
        title: "Error",
        description: "Failed to load placement data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const placementData: Partial<StudentPlacements> = {
        ...formData,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined
      };

      if (isEditing && id) {
        await BaseCrudService.update('studentplacements', {
          _id: id,
          ...placementData
        });
        toast({
          title: "Success",
          description: "Placement updated successfully."
        });
      } else {
        const newPlacement = await BaseCrudService.create('studentplacements', {
          _id: crypto.randomUUID(),
          ...placementData
        });
        toast({
          title: "Success",
          description: "Placement created successfully."
        });
        navigate(`/placements/${newPlacement._id}`);
        return;
      }
      
      navigate(`/placements/${id}`);
    } catch (error) {
      console.error('Error saving placement:', error);
      toast({
        title: "Error",
        description: "Failed to save placement.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof StudentPlacements, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const placementStatuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

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
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-secondary/20"></div>
            <nav className="flex items-center space-x-2 text-sm font-paragraph">
              <Link to="/placements" className="text-secondary/70 hover:text-secondary">Placements</Link>
              <span className="text-secondary/50">/</span>
              <span className="text-secondary">
                {isEditing ? 'Edit Placement' : 'New Placement'}
              </span>
            </nav>
          </div>

          <div>
            <h1 className="font-heading text-3xl font-bold text-secondary mb-2">
              {isEditing ? 'Edit Placement' : 'Add New Placement'}
            </h1>
            <p className="font-paragraph text-lg text-secondary/70">
              {isEditing 
                ? 'Update placement information and company details.'
                : 'Create a new student placement record with company and position details.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information */}
            <Card className="bg-white border-secondary/10">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="font-paragraph text-sm font-medium text-secondary">
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName || ''}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite" className="font-paragraph text-sm font-medium text-secondary flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Company Website
                    </Label>
                    <Input
                      id="companyWebsite"
                      type="url"
                      value={formData.companyWebsite || ''}
                      onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                      placeholder="https://company.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Position Information */}
            <Card className="bg-white border-secondary/10">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Position Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="font-paragraph text-sm font-medium text-secondary">
                      Job Title *
                    </Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle || ''}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      placeholder="Enter job title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="placementStatus" className="font-paragraph text-sm font-medium text-secondary">
                      Placement Status *
                    </Label>
                    <Select
                      value={formData.placementStatus || ''}
                      onValueChange={(value) => handleInputChange('placementStatus', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {placementStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-white border-secondary/10">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="font-paragraph text-sm font-medium text-secondary">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate ? (typeof formData.startDate === 'string' ? formData.startDate : new Date(formData.startDate).toISOString().split('T')[0]) : ''}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="font-paragraph text-sm font-medium text-secondary">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate ? (typeof formData.endDate === 'string' ? formData.endDate : new Date(formData.endDate).toISOString().split('T')[0]) : ''}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-white border-secondary/10">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="offerLetterUrl" className="font-paragraph text-sm font-medium text-secondary">
                    Offer Letter URL
                  </Label>
                  <Input
                    id="offerLetterUrl"
                    type="url"
                    value={formData.offerLetterUrl || ''}
                    onChange={(e) => handleInputChange('offerLetterUrl', e.target.value)}
                    placeholder="Enter offer letter URL"
                  />
                  <p className="font-paragraph text-xs text-secondary/60">
                    Provide a direct link to the offer letter document (PDF, Google Drive, etc.)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <LoadingSpinner />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Update Placement' : 'Create Placement'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}