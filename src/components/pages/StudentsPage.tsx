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
import { motion } from 'framer-motion';

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
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Night Sky Background */}
        <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
          {/* Stars */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          {/* Tree Silhouette */}
          <div className="absolute bottom-0 left-1/4 w-32 h-64 bg-black opacity-60">
            <svg viewBox="0 0 100 200" className="w-full h-full">
              <path d="M45 200 L45 120 Q30 100 25 80 Q35 85 50 85 Q65 85 75 80 Q70 100 55 120 L55 200 Z" fill="currentColor"/>
              <circle cx="35" cy="70" r="25" fill="currentColor"/>
              <circle cx="65" cy="65" r="20" fill="currentColor"/>
              <circle cx="50" cy="50" r="30" fill="currentColor"/>
            </svg>
          </div>
          
          {/* Water Reflection */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-800/50 to-transparent">
            <div className="absolute bottom-0 left-1/4 w-32 h-16 bg-black opacity-20 transform scale-y-[-1]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M45 0 L45 40 Q30 50 25 60 Q35 57 50 57 Q65 57 75 60 Q70 50 55 40 L55 0 Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Night Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Tree Silhouette */}
        <div className="absolute bottom-0 left-1/4 w-32 h-64 bg-black opacity-60">
          <svg viewBox="0 0 100 200" className="w-full h-full">
            <path d="M45 200 L45 120 Q30 100 25 80 Q35 85 50 85 Q65 85 75 80 Q70 100 55 120 L55 200 Z" fill="currentColor"/>
            <circle cx="35" cy="70" r="25" fill="currentColor"/>
            <circle cx="65" cy="65" r="20" fill="currentColor"/>
            <circle cx="50" cy="50" r="30" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Water Reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-800/50 to-transparent">
          <div className="absolute bottom-0 left-1/4 w-32 h-16 bg-black opacity-20 transform scale-y-[-1]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M45 0 L45 40 Q30 50 25 60 Q35 57 50 57 Q65 57 75 60 Q70 50 55 40 L55 0 Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="max-w-[120rem] mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-cyan-400" />
              <span className="font-heading font-bold text-lg text-white">PlacementAI</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/students" className="text-cyan-400 font-paragraph font-medium">Students</Link>
              <Link to="/placements" className="text-white/70 hover:text-white font-paragraph">Placements</Link>
              <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Link to="/students/new">Add Student</Link>
              </Button>
            </div>
          </div>
        </nav>

        {/* Header */}
        <div className="px-6 py-12">
          <div className="max-w-[120rem] mx-auto">
            <BackButton className="mb-6 bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="font-heading text-4xl font-bold text-white mb-2">Student Profiles</h1>
                <p className="font-paragraph text-lg text-white/70">
                  Manage and track student information, academic progress, and career readiness.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
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
                <GraduationCap className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  {searchTerm ? 'No students found' : 'No students yet'}
                </h3>
                <p className="font-paragraph text-white/70 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search terms or filters.'
                    : 'Get started by adding your first student profile.'
                  }
                </p>
                {!searchTerm && (
                  <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    <Link to="/students/new">Add First Student</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                  <Card key={student._id} className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-colors">
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
                            <div className="w-15 h-15 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center">
                              <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="font-heading text-lg text-white truncate">
                            {student.fullName || 'Unnamed Student'}
                          </CardTitle>
                          <p className="font-paragraph text-sm text-cyan-400">
                            ID: {student.studentId || 'Not assigned'}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-cyan-400" />
                          <span className="font-paragraph text-sm text-white/80">
                            {student.major || 'Major not specified'}
                          </span>
                        </div>
                        
                        {student.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-cyan-400" />
                            <span className="font-paragraph text-sm text-white/80 truncate">
                              {student.email}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-cyan-400" />
                          <span className="font-paragraph text-sm text-white/80">
                            Graduation: {formatDate(student.graduationDate)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                          GPA: {student.gpa?.toFixed(2) || 'N/A'}
                        </Badge>
                        <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
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
    </div>
  );
}