import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { StudentProfiles } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  GraduationCap, 
  ArrowLeft, 
  Mail, 
  Calendar, 
  Award, 
  FileText, 
  Edit,
  Download,
  User
} from 'lucide-react';

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentProfiles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadStudent();
    }
  }, [id]);

  const loadStudent = async () => {
    if (!id) return;
    
    try {
      const studentData = await BaseCrudService.getById<StudentProfiles>('studentprofiles', id);
      setStudent(studentData);
    } catch (error) {
      console.error('Error loading student:', error);
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

  const getGpaColor = (gpa: number | undefined) => {
    if (!gpa) return 'bg-secondary/10 text-secondary';
    if (gpa >= 3.5) return 'bg-primary/20 text-primary';
    if (gpa >= 3.0) return 'bg-brandaccent/30 text-secondary';
    return 'bg-destructive/20 text-destructive';
  };

  const getGpaStatus = (gpa: number | undefined) => {
    if (!gpa) return 'Not Available';
    if (gpa >= 3.5) return 'Excellent';
    if (gpa >= 3.0) return 'Good';
    if (gpa >= 2.5) return 'Satisfactory';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!student) {
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
            <h1 className="font-heading text-2xl font-bold text-secondary mb-2">Student Not Found</h1>
            <p className="font-paragraph text-secondary/70 mb-6">The student profile you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/students">Back to Students</Link>
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
            <Link to="/students" className="text-primary font-paragraph font-medium">Students</Link>
            <Link to="/placements" className="text-secondary/70 hover:text-secondary font-paragraph">Placements</Link>
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
              <Link to="/students" className="text-secondary/70 hover:text-secondary">Students</Link>
              <span className="text-secondary/50">/</span>
              <span className="text-secondary">{student.fullName || 'Student Details'}</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                {student.profilePicture ? (
                  <Image
                    src={student.profilePicture}
                    alt={`${student.fullName}'s profile picture`}
                    width={120}
                    className="w-30 h-30 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-30 h-30 rounded-2xl bg-brandaccent flex items-center justify-center">
                    <User className="h-12 w-12 text-secondary" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="font-heading text-3xl font-bold text-secondary mb-2">
                  {student.fullName || 'Unnamed Student'}
                </h1>
                <p className="font-paragraph text-lg text-secondary/70 mb-3">
                  Student ID: {student.studentId || 'Not assigned'}
                </p>
                <div className="flex items-center gap-3">
                  <Badge className={`${getGpaColor(student.gpa)} border-0`}>
                    GPA: {student.gpa?.toFixed(2) || 'N/A'} - {getGpaStatus(student.gpa)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link to={`/students/${student._id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
              {student.resumeUrl && (
                <Button asChild>
                  <a href={student.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
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
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Full Name
                      </label>
                      <p className="font-paragraph text-secondary">
                        {student.fullName || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Student ID
                      </label>
                      <p className="font-paragraph text-secondary">
                        {student.studentId || 'Not assigned'}
                      </p>
                    </div>
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Email Address
                      </label>
                      <p className="font-paragraph text-secondary">
                        {student.email || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Major
                      </label>
                      <p className="font-paragraph text-secondary">
                        {student.major || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-secondary/10">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-secondary flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Current GPA
                      </label>
                      <div className="flex items-center gap-3">
                        <p className="font-paragraph text-secondary font-semibold">
                          {student.gpa?.toFixed(2) || 'Not available'}
                        </p>
                        <Badge className={`${getGpaColor(student.gpa)} border-0 text-xs`}>
                          {getGpaStatus(student.gpa)}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="font-paragraph text-sm font-medium text-secondary/70 block mb-1">
                        Expected Graduation
                      </label>
                      <p className="font-paragraph text-secondary">
                        {formatDate(student.graduationDate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white border-secondary/10">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-secondary">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start" variant="outline">
                    <Link to={`/students/${student._id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                  
                  {student.resumeUrl && (
                    <Button asChild className="w-full justify-start" variant="outline">
                      <a href={student.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        View Resume
                      </a>
                    </Button>
                  )}
                  
                  {student.email && (
                    <Button asChild className="w-full justify-start" variant="outline">
                      <a href={`mailto:${student.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-secondary/10">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-secondary">Profile Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary/70">Profile Picture</span>
                      <Badge variant={student.profilePicture ? "default" : "secondary"} className="text-xs">
                        {student.profilePicture ? 'Complete' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary/70">Resume</span>
                      <Badge variant={student.resumeUrl ? "default" : "secondary"} className="text-xs">
                        {student.resumeUrl ? 'Uploaded' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-sm text-secondary/70">Contact Info</span>
                      <Badge variant={student.email ? "default" : "secondary"} className="text-xs">
                        {student.email ? 'Complete' : 'Missing'}
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