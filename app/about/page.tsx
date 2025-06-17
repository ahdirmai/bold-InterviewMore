'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Mic, 
  MessageSquare, 
  Users, 
  ArrowRight, 
  Check, 
  Star,
  Target,
  Zap,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced Gemini Pro AI generates contextually relevant technical questions tailored to your specific role and experience level.'
    },
    {
      icon: Mic,
      title: 'Voice Recognition',
      description: 'Practice speaking your answers naturally using cutting-edge Web Speech API technology for realistic interview simulation.'
    },
    {
      icon: MessageSquare,
      title: 'Real-time Feedback',
      description: 'Get instant, constructive feedback on your responses to help you improve and build confidence for actual interviews.'
    },
    {
      icon: Users,
      title: 'Multiple Specializations',
      description: 'Comprehensive coverage for Frontend, Backend, and Fullstack engineering roles across Junior, Mid-level, and Senior positions.'
    }
  ];

  const benefits = [
    'Practice anytime, anywhere with our web-based platform',
    'No scheduling required - interview practice on your schedule',
    'Personalized questions based on your career goals',
    'Voice interaction for realistic interview experience',
    'Instant feedback to accelerate your improvement',
    'Privacy-focused - no data stored permanently',
    'Completely free to use with Google authentication'
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Sign In & Select',
      description: 'Authenticate with Google and choose your target role and experience level'
    },
    {
      step: '2',
      title: 'Start Practice',
      description: 'Begin your AI-powered interview session with personalized technical questions'
    },
    {
      step: '3',
      title: 'Voice Interaction',
      description: 'Answer questions using voice or text - our AI listens and understands'
    },
    {
      step: '4',
      title: 'Receive Feedback',
      description: 'Get constructive feedback and continue with progressive questioning'
    }
  ];

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
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
            About Our Platform
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Revolutionizing Technical
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Interview Preparation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered interview simulator combines cutting-edge technology with proven interview techniques 
            to help developers master their next technical interview with confidence.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="py-12 text-center">
              <Target className="h-12 w-12 mx-auto mb-6 text-blue-200" />
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
                To democratize access to high-quality technical interview preparation by providing 
                an intelligent, interactive, and accessible platform that adapts to each developer's 
                unique learning needs and career aspirations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <Card key={index} className="text-center bg-white/60 backdrop-blur-sm border-white/40 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto bg-gradient-to-br from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Advanced Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-white/60 backdrop-blur-sm border-white/40">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Developers Choose Our Platform
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border-white/40">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                  <CardTitle className="text-base">Fast & Efficient</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Start practicing immediately with no setup or installation required
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/60 backdrop-blur-sm border-white/40">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  <CardTitle className="text-base">Privacy First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Your practice sessions are private and no personal data is permanently stored
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/60 backdrop-blur-sm border-white/40">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Star className="h-5 w-5 text-purple-500 mr-2" />
                  <CardTitle className="text-base">Continuously Improving</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Our AI model learns and improves to provide better questions and feedback
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Built with Modern Technology</h2>
          <Card className="bg-white/60 backdrop-blur-sm border-white/40">
            <CardContent className="py-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Frontend</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Next.js 13 with App Router</p>
                    <p>TypeScript & Tailwind CSS</p>
                    <p>Shadcn/ui Components</p>
                    <p>Web Speech API</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">AI & Backend</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Google Gemini Pro AI</p>
                    <p>Real-time Processing</p>
                    <p>Intelligent Question Generation</p>
                    <p>Context-Aware Feedback</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Authentication</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Clerk Authentication</p>
                    <p>Google Sign-In</p>
                    <p>Magic Link Support</p>
                    <p>Secure & Fast</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="py-16">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Master Your Next Interview?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who have improved their interview skills and landed their dream jobs
              </p>
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Practicing Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}