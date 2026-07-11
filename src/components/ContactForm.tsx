import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactFormProps {
  isDarkMode: boolean;
}

export function ContactForm({ isDarkMode }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send email using mailto
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:jayamangalatagore@gmail.com?subject=${subject}&body=${body}`;
      
      toast.success('Message prepared! Your email client will open shortly.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-gray-100 focus:border-cyan-400' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
          } px-4 py-2 focus:outline-none focus:ring-2 ${
            isDarkMode ? 'focus:ring-cyan-400/20' : 'focus:ring-blue-500/20'
          } transition-colors`}
          placeholder="Your name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-gray-100 focus:border-cyan-400' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
          } px-4 py-2 focus:outline-none focus:ring-2 ${
            isDarkMode ? 'focus:ring-cyan-400/20' : 'focus:ring-blue-500/20'
          } transition-colors`}
          placeholder="your.email@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="message" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className={`mt-1 block w-full rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-gray-100 focus:border-cyan-400' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
          } px-4 py-2 focus:outline-none focus:ring-2 ${
            isDarkMode ? 'focus:ring-cyan-400/20' : 'focus:ring-blue-500/20'
          } transition-colors`}
          placeholder="Your message..."
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`inline-flex items-center px-6 py-3 ${
          isDarkMode 
            ? 'bg-cyan-500 text-gray-900 hover:bg-cyan-400' 
            : 'bg-blue-500 text-white hover:bg-blue-400'
        } rounded-lg transition-all duration-300 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}