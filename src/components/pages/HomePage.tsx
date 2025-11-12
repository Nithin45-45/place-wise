import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { GraduationCap, Building2, Users, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-[120rem] mx-auto">
          <div className="bg-brandaccent/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-lg text-secondary-foreground">PlacementAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/students" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">Students</Link>
              <Link to="/placements" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">Placements</Link>
              <Link to="/analytics" className="text-secondary-foreground hover:text-primary transition-colors font-paragraph">Analytics</Link>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/students">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Inspired by the layout */}
      <section className="relative min-h-screen flex items-center px-6 -mt-20 pt-20">
        <div className="max-w-[120rem] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Following inspiration's text placement */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="font-heading text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight">
                  Smart Student
                  <br />
                  <span className="text-primary">Placement System</span>
                </h1>
                <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-lg leading-relaxed">
                  Revolutionize career services with AI-powered matching, comprehensive student profiles, and seamless placement tracking for educational institutions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/students">Manage Students</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                  <Link to="/placements">View Placements</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-heading">95%</div>
                  <div className="text-sm text-secondary-foreground/70 font-paragraph">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-heading">500+</div>
                  <div className="text-sm text-secondary-foreground/70 font-paragraph">Students Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-heading">150+</div>
                  <div className="text-sm text-secondary-foreground/70 font-paragraph">Partner Companies</div>
                </div>
              </div>
            </div>

            {/* Right Content - Following inspiration's product placement */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-brandaccent/20 to-subtlebackground/30 rounded-3xl p-8 backdrop-blur-sm">
                <Image 
                  src="https://static.wixstatic.com/media/52cebc_a2d0c453fed847869fe181b3a0ff496b~mv2.png?originWidth=576&originHeight=448"
                  alt="Student placement dashboard interface showing analytics and student profiles"
                  width={600}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                
                {/* Floating elements inspired by the green accent in original */}
                <div className="absolute -bottom-4 -right-4 bg-primary rounded-full p-4 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-[120rem] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-secondary mb-4">
              Comprehensive Placement Management
            </h2>
            <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
              Everything you need to manage student careers and track placement success in one intelligent platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-secondary/10">
              <div className="bg-brandaccent rounded-xl p-3 w-fit mb-6">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-secondary mb-3">Student Profiles</h3>
              <p className="font-paragraph text-secondary/70 leading-relaxed">
                Comprehensive student management with academic records, skills tracking, and career preferences.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-secondary/10">
              <div className="bg-subtlebackground rounded-xl p-3 w-fit mb-6">
                <Building2 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-secondary mb-3">Placement Tracking</h3>
              <p className="font-paragraph text-secondary/70 leading-relaxed">
                Monitor placement progress, company partnerships, and success metrics in real-time.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-secondary/10">
              <div className="bg-primary/20 rounded-xl p-3 w-fit mb-6">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-secondary mb-3">AI Analytics</h3>
              <p className="font-paragraph text-secondary/70 leading-relaxed">
                Smart insights and predictive analytics to optimize placement strategies and outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}