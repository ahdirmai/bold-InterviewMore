'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Send,
  User,
  Bot,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Speech Recognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function InterviewPage() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const role = searchParams?.get('role') || 'frontend';
  const level = searchParams?.get('level') || 'junior';

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || '');

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }

    // Initialize speech recognition
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0].transcript;
        setCurrentInput(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Speech recognition error. Please try again.');
        setIsListening(false);
      };
    }

    // Start interview
    startInterview();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startInterview = async () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: `Hi! I'm your AI interviewer for the ${role} ${level} interview practice. I'll ask you technical questions one at a time, and you can respond either by typing or using voice. Let's begin with our first question!`,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
    
    if (isVoiceMode) {
      speakMessage(welcomeMessage.content);
    }

    // Generate first question
    setTimeout(() => generateNextQuestion(), 2000);
  };

  const generateNextQuestion = async () => {
    setIsLoading(true);
    
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const prompt = `Anda adalah seorang interviewer teknikal berpengalaman untuk posisi ${role} engineer pada level ${level}.

    Tugas Anda adalah melakukan simulasi wawancara.

    Aturan:
    1. Ajukan satu pertanyaan teknikal pada satu waktu.
    2. Pastikan pertanyaan sesuai untuk engineer ${role} level ${level}.
    3. Buat pertanyaan yang praktis dan relevan dengan skenario dunia nyata.
    4. Buat pertanyaan singkat dan jelas.
    5. Hanya berikan pertanyaan, tanpa konteks tambahan.

    Contoh untuk ${role} ${level}:
    - Untuk frontend junior: "Bagaimana cara Anda memusatkan sebuah div secara horizontal dan vertikal?"
    - Untuk backend mid: "Jelaskan perbedaan antara database SQL dan NoSQL serta kapan Anda akan menggunakan masing-masing."
    - Untuk fullstack senior: "Bagaimana Anda mendesain sistem yang skalabel untuk menangani notifikasi real-time?"

    Konteks percakapan saat ini: ${messages.length > 0 ? messages.slice(-2).map(m => `${m.sender}: ${m.content}`).join('\n') : 'Memulai wawancara'}

    Buat pertanyaan teknikal berikutnya yang sesuai:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const question = response.text();

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: question,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      if (isVoiceMode) {
        speakMessage(question);
      }
    } catch (error) {
      console.error('Error generating question:', error);
      toast.error('Failed to generate question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateFeedback = async (userAnswer: string) => {
    setIsLoading(true);
    
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const lastQuestion = messages[messages.length - 1]?.content || '';
      
      const prompt = `Anda sedang memberikan umpan balik atas jawaban wawancara teknikal untuk posisi ${role} ${level}.

    Pertanyaan yang diajukan: "${lastQuestion}"
    Jawaban kandidat: "${userAnswer}"

    Berikan umpan balik yang:
    1. Mengapresiasi hal yang sudah dijawab dengan baik (jika ada)
    2. Menunjukkan area yang perlu diperbaiki
    3. Berikan 1-2 saran spesifik
    4. Singkat saja (maksimal 2-3 kalimat)
    5. Gunakan nada yang suportif dan profesional

    Fokus pada akurasi teknis, kejelasan komunikasi, dan kelengkapan jawaban.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const feedback = response.text();

      const feedbackMessage: Message = {
        id: Date.now().toString(),
        content: `Feedback: ${feedback}`,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, feedbackMessage]);
      
      if (isVoiceMode) {
        speakMessage(feedback);
      }

      // Generate next question after feedback
      setTimeout(() => generateNextQuestion(), 3000);
    } catch (error) {
      console.error('Error generating feedback:', error);
      toast.error('Failed to generate feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const speakMessage = (text: string) => {
    if (synthRef.current && isVoiceMode) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast.error('Could not start voice recognition. Please check your microphone permissions.');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || currentInput.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');

    // Generate feedback for the user's answer
    await generateFeedback(messageContent);
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentInput('');
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    startInterview();
    toast.success('Interview session reset!');
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (synthRef.current && isSpeaking) {
      synthRef.current.cancel();
    }
    toast.success(`Voice mode ${!isVoiceMode ? 'enabled' : 'disabled'}`);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'frontend': return 'bg-blue-500';
      case 'backend': return 'bg-green-500';
      case 'fullstack': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelStars = (level: string) => {
    switch (level) {
      case 'junior': return '⭐';
      case 'mid': return '⭐⭐';
      case 'senior': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AI Interview Simulator</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Badge className={`${getRoleColor(role)} text-white`}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Badge>
              <Badge variant="outline">
                {level.charAt(0).toUpperCase() + level.slice(1)} {getLevelStars(level)}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Voice Mode</span>
              <Switch
                checked={isVoiceMode}
                onCheckedChange={toggleVoiceMode}
              />
              {isVoiceMode ? (
                <Volume2 className="h-4 w-4 text-blue-600" />
              ) : (
                <VolumeX className="h-4 w-4 text-gray-400" />
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="hover:bg-red-50 hover:border-red-200"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)] flex flex-col">
        {/* Chat Messages */}
        <Card className="flex-1 mb-4 bg-white/60 backdrop-blur-sm border-white/40">
          <CardContent className="p-0 h-full">
            <ScrollArea className="h-full p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`flex-1 max-w-3xl ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`inline-block p-4 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-gray-200'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40">
          <CardContent className="p-4">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={isVoiceMode ? "Click the mic to speak your answer..." : "Type your answer here..."}
                  className="w-full p-3 rounded-lg border border-gray-200 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2">
                {isVoiceMode && (
                  <Button
                    variant={isListening ? "destructive" : "default"}
                    size="lg"
                    onClick={isListening ? stopListening : startListening}
                    disabled={isLoading || isSpeaking}
                    className={`${isListening ? 'animate-pulse' : ''}`}
                  >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                )}
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!currentInput.trim() || isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {isVoiceMode && (
              <div className="mt-3 flex items-center justify-center space-x-4 text-sm text-gray-600">
                {isListening && (
                  <Badge className="bg-red-100 text-red-800 animate-pulse">
                    <Mic className="h-3 w-3 mr-1" />
                    Listening...
                  </Badge>
                )}
                {isSpeaking && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <Volume2 className="h-3 w-3 mr-1" />
                    AI Speaking...
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}