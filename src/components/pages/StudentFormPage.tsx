import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { StudentProfiles } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { 
  GraduationCap, 
  ArrowLeft, 
  Save,
  User,
  Mail,
  Calendar,
  Award,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

export default function StudentFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = id !== 'new';
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<StudentProfiles>>({
    fullName: '',
    studentId: '',
    email: '',
    major: '',
    gpa: undefined,
    graduationDate: '',
    resumeUrl: '',
    profilePicture: ''
  });

  // Generate unique student ID for new students
  const generateStudentId = () => {
    const currentYear = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `STU${currentYear}${randomNum}`;
  };

  useEffect(() => {
    if (isEditing && id) {
      loadStudent();
    } else if (!isEditing) {
      // Auto-generate student ID for new students
      setFormData(prev => ({
        ...prev,
        studentId: generateStudentId()
      }));
    }
  }, [id, isEditing]);

  const loadStudent = async () => {
    if (!id) return;
    
    try {
      const student = await BaseCrudService.getById<StudentProfiles>('studentprofiles', id);
      setFormData({
        fullName: student.fullName || '',
        studentId: student.studentId || '',
        email: student.email || '',
        major: student.major || '',
        gpa: student.gpa || undefined,
        graduationDate: student.graduationDate ? 
          new Date(student.graduationDate).toISOString().split('T')[0] : '',
        resumeUrl: student.resumeUrl || '',
        profilePicture: student.profilePicture || ''
      });
    } catch (error) {
      console.error('Error loading student:', error);
      toast({
        title: "Error",
        description: "Failed to load student data.",
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
      const studentData: Partial<StudentProfiles> = {
        ...formData,
        gpa: formData.gpa ? Number(formData.gpa) : undefined,
        graduationDate: formData.graduationDate || undefined
      };

      if (isEditing && id) {
        await BaseCrudService.update('studentprofiles', {
          _id: id,
          ...studentData
        });
        toast({
          title: "Success",
          description: "Student profile updated successfully."
        });
      } else {
        const newStudent = await BaseCrudService.create('studentprofiles', {
          _id: crypto.randomUUID(),
          ...studentData
        });
        toast({
          title: "Success",
          description: "Student profile created successfully."
        });
        navigate(`/students/${newStudent._id}`);
        return;
      }
      
      navigate(`/students/${id}`);
    } catch (error) {
      console.error('Error saving student:', error);
      toast({
        title: "Error",
        description: "Failed to save student profile.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof StudentProfiles, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
            <Link to="/students" className="text-primary font-paragraph font-medium">Students</Link>
            <Link to="/placements" className="text-secondary/70 hover:text-secondary font-paragraph">Placements</Link>
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
              <Link to="/students" className="text-secondary/70 hover:text-secondary">Students</Link>
              <span className="text-secondary/50">/</span>
              <span className="text-secondary">
                {isEditing ? 'Edit Student' : 'New Student'}
              </span>
            </nav>
          </div>

          <div>
            <h1 className="font-heading text-3xl font-bold text-secondary mb-2">
              {isEditing ? 'Edit Student Profile' : 'Add New Student'}
            </h1>
            <p className="font-paragraph text-lg text-secondary/70">
              {isEditing 
                ? 'Update student information and academic details.'
                : 'Create a comprehensive student profile with academic and contact information.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card className="bg-white border-secondary/10">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="font-paragraph text-sm font-medium text-secondary">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName || ''}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="font-paragraph text-sm font-medium text-secondary">
                      Student ID *
                    </Label>
                    <Input
                      id="studentId"
                      value={formData.studentId || ''}
                      onChange={(e) => handleInputChange('studentId', e.target.value)}
                      placeholder="Auto-generated student ID"
                      required
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}
                    />
                    {!isEditing && (
                      <p className="font-paragraph text-xs text-secondary/60">
                        Student ID is automatically generated upon registration
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-paragraph text-sm font-medium text-secondary flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profilePicture" className="font-paragraph text-sm font-medium text-secondary flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Profile Picture URL
                  </Label>
                  <Input
                    id="profilePicture"
                    type="url"
                    value={formData.profilePicture || ''}
                    onChange={(e) => handleInputChange('profilePicture', e.target.value)}
                    placeholder="Enter profile picture URL"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="bg-white border-secondary/10">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="major" className="font-paragraph text-sm font-medium text-secondary">
                      Major/Field of Study
                    </Label>
                    <Input
                      id="major"
                      value={formData.major || ''}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      placeholder="Enter major or field of study"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gpa" className="font-paragraph text-sm font-medium text-secondary">
                      Current GPA
                    </Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={formData.gpa || ''}
                      onChange={(e) => handleInputChange('gpa', parseFloat(e.target.value) || 0)}
                      placeholder="Enter GPA (0.00 - 4.00)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduationDate" className="font-paragraph text-sm font-medium text-secondary flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Expected Graduation Date
                  </Label>
                  <Input
                    id="graduationDate"
                    type="date"
                    value={formData.graduationDate ? (typeof formData.graduationDate === 'string' ? formData.graduationDate : new Date(formData.graduationDate).toISOString().split('T')[0]) : ''}
                    onChange={(e) => handleInputChange('graduationDate', e.target.value)}
                  />
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
                  <Label htmlFor="resumeUrl" className="font-paragraph text-sm font-medium text-secondary">
                    Resume URL
                  </Label>
                  <Input
                    id="resumeUrl"
                    type="url"
                    value={formData.resumeUrl || ''}
                    onChange={(e) => handleInputChange('resumeUrl', e.target.value)}
                    placeholder="Enter resume URL"
                  />
                  <p className="font-paragraph text-xs text-secondary/60">
                    Provide a direct link to the student's resume (PDF, Google Drive, etc.)
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
                    {isEditing ? 'Update Student' : 'Create Student'}
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