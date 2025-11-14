import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { JobPostings } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BackButton } from '@/components/ui/back-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Briefcase, Building, MapPin, Clock, DollarSign, Calendar, Users, Mail, ExternalLink } from 'lucide-react';

export default function JobPostingFormPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    companyLogo: '',
    jobDescription: '',
    jobLocation: '',
    employmentType: '',
    salaryRange: '',
    applicationDeadline: '',
    requiredSkills: '',
    experienceLevel: '',
    contactEmail: '',
    applicationUrl: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const jobPosting: Partial<JobPostings> = {
        _id: crypto.randomUUID(),
        ...formData,
        applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline) : undefined
      };

      await BaseCrudService.create('jobpostings', jobPosting as any);
      navigate('/careers');
    } catch (error) {
      console.error('Error creating job posting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <BackButton className="mb-6 bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4 font-heading">
              Post a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Job Opportunity</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-paragraph">
              Connect with talented students and professionals by posting your job openings
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-black/20 backdrop-blur-md border-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-cyan-400" />
                  Job Details
                </CardTitle>
                <CardDescription className="text-white/70">
                  Fill in the details about your job opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Job Title */}
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-white flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-cyan-400" />
                        Job Title *
                      </Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        placeholder="e.g., Senior Software Engineer"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-white flex items-center gap-2">
                        <Building className="h-4 w-4 text-cyan-400" />
                        Company Name *
                      </Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="e.g., Tech Solutions Inc."
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>

                    {/* Company Logo URL */}
                    <div className="space-y-2">
                      <Label htmlFor="companyLogo" className="text-white flex items-center gap-2">
                        <Building className="h-4 w-4 text-cyan-400" />
                        Company Logo URL
                      </Label>
                      <Input
                        id="companyLogo"
                        value={formData.companyLogo}
                        onChange={(e) => handleInputChange('companyLogo', e.target.value)}
                        placeholder="https://example.com/logo.png"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>

                    {/* Job Location */}
                    <div className="space-y-2">
                      <Label htmlFor="jobLocation" className="text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-cyan-400" />
                        Location *
                      </Label>
                      <Input
                        id="jobLocation"
                        value={formData.jobLocation}
                        onChange={(e) => handleInputChange('jobLocation', e.target.value)}
                        placeholder="e.g., Bangalore, India / Remote"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>

                    {/* Employment Type */}
                    <div className="space-y-2">
                      <Label className="text-white flex items-center gap-2">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        Employment Type *
                      </Label>
                      <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Salary Range */}
                    <div className="space-y-2">
                      <Label htmlFor="salaryRange" className="text-white flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-cyan-400" />
                        Salary Range
                      </Label>
                      <Input
                        id="salaryRange"
                        value={formData.salaryRange}
                        onChange={(e) => handleInputChange('salaryRange', e.target.value)}
                        placeholder="e.g., ₹8L - ₹15L per annum"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>

                    {/* Application Deadline */}
                    <div className="space-y-2">
                      <Label htmlFor="applicationDeadline" className="text-white flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-cyan-400" />
                        Application Deadline
                      </Label>
                      <Input
                        id="applicationDeadline"
                        type="date"
                        value={formData.applicationDeadline}
                        onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-2">
                      <Label className="text-white flex items-center gap-2">
                        <Users className="h-4 w-4 text-cyan-400" />
                        Experience Level *
                      </Label>
                      <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry Level">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="Mid Level">Mid Level (2-5 years)</SelectItem>
                          <SelectItem value="Senior Level">Senior Level (5-8 years)</SelectItem>
                          <SelectItem value="Lead Level">Lead Level (8+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Contact Email */}
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-white flex items-center gap-2">
                        <Mail className="h-4 w-4 text-cyan-400" />
                        Contact Email *
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        placeholder="hr@company.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>

                    {/* Application URL */}
                    <div className="space-y-2">
                      <Label htmlFor="applicationUrl" className="text-white flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-cyan-400" />
                        Application URL
                      </Label>
                      <Input
                        id="applicationUrl"
                        type="url"
                        value={formData.applicationUrl}
                        onChange={(e) => handleInputChange('applicationUrl', e.target.value)}
                        placeholder="https://company.com/careers/apply"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2">
                    <Label htmlFor="jobDescription" className="text-white">
                      Job Description *
                    </Label>
                    <Textarea
                      id="jobDescription"
                      value={formData.jobDescription}
                      onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                      placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Required Skills */}
                  <div className="space-y-2">
                    <Label htmlFor="requiredSkills" className="text-white">
                      Required Skills *
                    </Label>
                    <Textarea
                      id="requiredSkills"
                      value={formData.requiredSkills}
                      onChange={(e) => handleInputChange('requiredSkills', e.target.value)}
                      placeholder="List the key skills and technologies required (e.g., React, Node.js, Python, AWS...)"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/careers')}
                      className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Job'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}