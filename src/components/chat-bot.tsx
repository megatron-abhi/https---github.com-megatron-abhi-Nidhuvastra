
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chat } from '@/ai/flows/chat-flow';
import type { ChatMessage } from '@/ai/schemas/chat-schemas';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setIsLoading(true);
        // Initial greeting from bot
        setTimeout(() => {
            setMessages([{ role: 'model', content: "Hello! I'm NidhuVastra's assistant. How can I help you today? You can ask me about our products, shipping, or return policies." }]);
            setIsLoading(false);
        }, 1000);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea) {
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatResponse = await chat({
        history: messages,
        message: input,
      });
      const botMessage: ChatMessage = {
        role: 'model',
        content: chatResponse.response,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        content: "I'm sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleToggle = () => {
    setIsOpen(prev => !prev);
    if (isOpen) {
        // Reset on close
        setMessages([]);
        setInput('');
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={handleToggle} size="icon" className="rounded-full w-16 h-16 shadow-lg">
          {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
          <span className="sr-only">{isOpen ? 'Close Chat' : 'Open Chat'}</span>
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm">
          <Card className="flex flex-col h-[60vh] shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot /> NidhuVastra Support
              </CardTitle>
              <CardDescription>
                Ask me anything about our products or raise a support ticket.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                            key={index}
                            className={cn(
                                'flex items-start gap-3',
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                            )}
                            >
                            {message.role === 'model' && (
                                <div className="p-2 bg-primary rounded-full text-primary-foreground">
                                    <Bot className="h-5 w-5" />
                                </div>
                            )}
                            <div
                                className={cn(
                                'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                                message.role === 'user'
                                    ? 'bg-secondary text-secondary-foreground'
                                    : 'bg-card border'
                                )}
                            >
                                {message.content}
                            </div>
                            {message.role === 'user' && (
                                <div className="p-2 bg-muted rounded-full text-muted-foreground">
                                    <User className="h-5 w-5" />
                                </div>
                            )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3 justify-start">
                                <div className="p-2 bg-primary rounded-full text-primary-foreground">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div className="bg-card border rounded-lg px-4 py-2 text-sm flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex w-full items-center space-x-2"
              >
                <Input
                  id="message"
                  placeholder="Type your message..."
                  className="flex-1"
                  autoComplete="off"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
