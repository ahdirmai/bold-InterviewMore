'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Code, Database, Globe, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const roles = [
  {
    id: 'frontend',
    title: 'Frontend Engineer',
    icon: Globe,
    description: 'React, Vue, Angular, JavaScript, CSS, HTML',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'backend',
    title: 'Backend Engineer', 
    icon: Database,
    description: 'Node.js, Python, Java, APIs, Databases',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'fullstack',
    title: 'Fullstack Engineer',
    icon: Code,
    description: 'Frontend + Backend, System Design',
    color: 'from-purple-500 to-pink-500'
  }
];

const levels = [
  {
    id: 'junior',
    title: 'Junior',
    description: '0-2 years experience',
    difficulty: 1
  },
  {
    id: 'mid',
    title: 'Mid-Level', 
    description: '2-5 years experience',
    difficulty: 2
  },
  {
    id: 'senior',
    title: 'Senior',
    description: '5+ years experience',
    difficulty: 3
  }
];

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const handleStartInterview = () => {
    if (selectedRole && selectedLevel) {
      router.push(`/interview?role=${selectedRole}&level=${selectedLevel}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI Interview Simulator</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome back, {user?.firstName}!</span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ready for Your Interview Practice?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your target role and experience level to get started with personalized AI interview questions
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Select Your Target Role
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card 
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRole === role.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50/50' 
                    : 'bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto bg-gradient-to-br ${role.color} p-4 rounded-xl w-fit mb-4`}>
                    <role.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {role.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Level Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Choose Your Experience Level
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {levels.map((level) => (
              <Card 
                key={level.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedLevel === level.id 
                    ? 'ring-2 ring-purple-500 bg-purple-50/50' 
                    : 'bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80'
                }`}
                onClick={() => setSelectedLevel(level.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: level.difficulty }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                    {Array.from({ length: 3 - level.difficulty }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gray-300" />
                    ))}
                  </div>
                  <CardTitle className="text-xl">{level.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {level.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Start Interview Button */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={handleStartInterview}
            disabled={!selectedRole || !selectedLevel}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start AI Interview Practice <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          {(!selectedRole || !selectedLevel) && (
            <p className="text-sm text-gray-500 mt-2">
              Please select both a role and experience level to continue
            </p>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white max-w-3xl mx-auto">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-2">🎯 Personalized Questions</h4>
                  <p className="text-blue-100">
                    Questions tailored to your selected role and experience level
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🎤 Voice Interaction</h4>
                  <p className="text-blue-100">
                    Practice speaking your answers using voice recognition
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📝 Real-time Feedback</h4>
                  <p className="text-blue-100">
                    Get constructive feedback to improve your responses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}