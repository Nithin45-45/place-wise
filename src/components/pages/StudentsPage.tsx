import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { StudentProfiles } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BackButton } from '@/components/ui/back-button';
import { GraduationCap, Search, Plus, Mail, Calendar, Award } from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentProfiles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const { items } = await BaseCrudService.getAll<StudentProfiles>('studentprofiles');
      setStudents(items);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString();
  };

  const getGpaColor = (gpa: number | undefined) => {
    if (!gpa) return 'bg-secondary/10 text-secondary';
    if (gpa >= 3.5) return 'bg-primary/20 text-primary';
    if (gpa >= 3.0) return 'bg-brandaccent/30 text-secondary';
    return 'bg-destructive/20 text-destructive';
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
            <Button asChild>
              <Link to="/students/new">Add Student</Link>
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
              <h1 className="font-heading text-4xl font-bold text-secondary mb-2">Student Profiles</h1>
              <p className="font-paragraph text-lg text-secondary/70">
                Manage and track student information, academic progress, and career readiness.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary/50" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button asChild>
                <Link to="/students/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="px-6 pb-12">
        <div className="max-w-[120rem] mx-auto">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-16">
              <GraduationCap className="h-16 w-16 text-secondary/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-secondary mb-2">
                {searchTerm ? 'No students found' : 'No students yet'}
              </h3>
              <p className="font-paragraph text-secondary/70 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters.'
                  : 'Get started by adding your first student profile.'
                }
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link to="/students/new">Add First Student</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <Card key={student._id} className="bg-white border-secondary/10 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        {student.profilePicture ? (
                          <Image
                            src={student.profilePicture}
                            alt={`${student.fullName}'s profile picture`}
                            width={60}
                            className="w-15 h-15 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-15 h-15 rounded-full bg-brandaccent flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-secondary" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="font-heading text-lg text-secondary truncate">
                          {student.fullName || 'Unnamed Student'}
                        </CardTitle>
                        <p className="font-paragraph text-sm text-secondary/70">
                          ID: {student.studentId || 'Not assigned'}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-secondary/50" />
                        <span className="font-paragraph text-sm text-secondary/70">
                          {student.major || 'Major not specified'}
                        </span>
                      </div>
                      
                      {student.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-secondary/50" />
                          <span className="font-paragraph text-sm text-secondary/70 truncate">
                            {student.email}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-secondary/50" />
                        <span className="font-paragraph text-sm text-secondary/70">
                          Graduation: {formatDate(student.graduationDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge className={`${getGpaColor(student.gpa)} border-0`}>
                        GPA: {student.gpa?.toFixed(2) || 'N/A'}
                      </Badge>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/students/${student._id}`}>View Details</Link>
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