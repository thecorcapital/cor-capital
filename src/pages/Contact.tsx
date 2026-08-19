import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, AlertTriangle, Copy, Settings, HelpCircle, X, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Investor Relations Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'server-unconfigured' | 'static-host-fallback' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  // Load delivery settings from localStorage or fall back to default
  const [deliverySettings, setDeliverySettings] = useState(() => {
    try {
      const saved = localStorage.getItem('cor_capital_delivery_settings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      type: 'auto', // 'auto' | 'formsubmit' | 'backend' | 'web3forms' | 'formspree' | 'mailto'
      web3FormsKey: '', // e.g. "your-web3forms-key-here"
      formspreeId: '',  // e.g. "your-formspree-id-here"
    };
  });

  const handleSaveSettings = (newSettings: typeof deliverySettings) => {
    setDeliverySettings(newSettings);
    try {
      localStorage.setItem('cor_capital_delivery_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.error(e);
    }
  };

  const getMailtoLink = () => {
    const emailTo = "michael@thecorcapital.com";
    const subjectLine = `Inquiry: ${formData.subject} (${formData.name})`;
    const rawBody = `Hello Cor Capital,

I would like to submit the following inquiry:

- Full Name: ${formData.name}
- Email Address: ${formData.email}
- Phone Number: ${formData.phone || 'N/A'}
- Inquiry Type: ${formData.subject}

Message:
${formData.message}

---
Sent via Cor Capital Direct Mailer`;

    return `mailto:${emailTo}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(rawBody)}`;
  };

  const copyToClipboard = () => {
    const text = `Inquiry Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'N/A'}
Subject: ${formData.subject}

Message:
${formData.message}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const sendDirectFormSubmit = async (payload: { name: string; email: string; phone: string; subject: string; message: string }) => {
    const response = await fetch('https://formsubmit.co/ajax/michael@thecorcapital.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || 'N/A',
        inquiry_type: payload.subject,
        _subject: `Cor Capital Inquiry: ${payload.subject} - ${payload.name}`,
        message: payload.message,
        _captcha: 'false',
        _template: 'table'
      })
    });
    return response;
  };

  const handleSendTestEmail = async () => {
    setTestStatus('sending');
    setTestMessage('Dispatching test message to michael@thecorcapital.com...');
    try {
      const res = await sendDirectFormSubmit({
        name: 'Cor Capital Form Test',
        email: 'michael@thecorcapital.com',
        phone: '+1 (555) 019-2834',
        subject: 'System Verification Test',
        message: 'This is a test notification confirming that form submissions are successfully routing to michael@thecorcapital.com.'
      });
      const data = await res.json();
      if (res.ok && (data.success === 'true' || data.success === true)) {
        setTestStatus('success');
        setTestMessage('Test email successfully dispatched to michael@thecorcapital.com! Check your inbox.');
      } else if (data.message && data.message.includes('Activate')) {
        setTestStatus('success');
        setTestMessage("FormSubmit sent an initial 'Activate Form' confirmation email to michael@thecorcapital.com. Click the link in that email to activate instant inbox delivery!");
      } else {
        setTestStatus('error');
        setTestMessage(data.message || 'Unable to deliver test. Please check connection.');
      }
    } catch (e: any) {
      setTestStatus('error');
      setTestMessage(e?.message || 'Network error during test dispatch.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const deliveryType = deliverySettings.type;
    
    // Explicit Web3Forms
    if (deliveryType === 'web3forms') {
      const key = deliverySettings.web3FormsKey || (import.meta as any).env?.VITE_WEB3FORMS_KEY;
      if (!key) {
        // Fallback to direct delivery
        try {
          const res = await sendDirectFormSubmit(formData);
          if (res.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: 'Investor Relations Inquiry', message: '' });
            return;
          }
        } catch (err) {
          console.error(err);
        }
        setStatus('server-unconfigured');
        return;
      }
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: key,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || 'N/A',
            subject: formData.subject,
            message: formData.message,
            from_name: `${formData.name} via Cor Capital Contact`,
            to: 'michael@thecorcapital.com'
          })
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setStatus('success');
          setFormData({ name: '', email: '', phone: '', subject: 'Investor Relations Inquiry', message: '' });
          return;
        }
      } catch (error) {
        console.error("Web3Forms error, failing over:", error);
      }
    }

    // Explicit Formspree
    if (deliveryType === 'formspree') {
      const id = deliverySettings.formspreeId || (import.meta as any).env?.VITE_FORMSPREE_ID;
      if (id) {
        try {
          const response = await fetch(`https://formspree.io/f/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone || 'N/A',
              subject: formData.subject,
              message: formData.message,
              _replyto: formData.email
            })
          });
          if (response.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: 'Investor Relations Inquiry', message: '' });
            return;
          }
        } catch (error) {
          console.error("Formspree error, failing over:", error);
        }
      }
    }

    // Explicit Mailto
    if (deliveryType === 'mailto') {
      window.location.href = getMailtoLink();
      setStatus('success');
      return;
    }

    // Auto / Default Cascade Pipeline:
    // Step 1: Try local backend /api/contact
    let backendSuccess = false;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        backendSuccess = true;
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'Investor Relations Inquiry', message: '' });
        return;
      }
    } catch (backendError) {
      console.warn("Backend API route not available or static environment, engaging direct delivery:", backendError);
    }

    // Step 2: Direct FormSubmit fallback to michael@thecorcapital.com
    if (!backendSuccess) {
      try {
        const directRes = await sendDirectFormSubmit(formData);
        if (directRes.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', phone: '', subject: 'Investor Relations Inquiry', message: '' });
          return;
        }
      } catch (directError) {
        console.error("Direct fallback delivery error:", directError);
      }
    }

    // Step 3: If network/adblocker completely blocked, gracefully show fallback
    setStatus('static-host-fallback');
  };

  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="Contact Investor Relations & Management | Cor Capital"
        description="Get in touch with Cor Capital Management LLC regarding investor relations, inquiries, and institutional asset management partnerships."
        canonicalPath="/contact"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Cor Capital",
          "description": "Investor relations and institutional inquiry contact page for Cor Capital Management LLC.",
          "mainEntity": {
            "@type": "FinancialService",
            "name": "Cor Capital Management LLC",
            "email": "michael@thecorcapital.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "San Antonio",
              "addressRegion": "TX",
              "addressCountry": "US"
            }
          }
        }}
      />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 bg-brand-blue text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://static.wixstatic.com/media/4d302e_fb497cfd628345db90fdde0611f1316c~mv2.png" 
              alt="Cor Capital Contact" 
              className="w-full h-full object-cover grayscale opacity-30 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-blue/60" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-brand-accent"></span>
                <span className="text-brand-accent uppercase tracking-widest text-xs font-semibold">Contact Us</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                Connect With <br/> Our Team.
              </h1>
              <p className="text-lg text-white/80 font-light leading-relaxed">
                Connect with our team to explore opportunities, partnerships, and insights.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Container */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 shadow-2xl relative overflow-hidden text-left"
            >
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <CheckCircle2 size={64} className="text-brand-accent mb-6" />
                  <h2 className="text-3xl font-medium text-brand-blue mb-4">Submission Received</h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for your inquiry. Michael Corvin will review your request and get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-10 py-3 bg-brand-blue text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : status === 'server-unconfigured' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-left"
                >
                  <div className="flex items-center gap-4 mb-6 text-amber-600">
                    <AlertTriangle size={40} />
                    <h2 className="text-2xl font-serif text-brand-blue font-semibold animate-pulse">Email Service Unconfigured</h2>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r mb-8">
                    <p className="text-sm text-amber-800 leading-relaxed font-light">
                      The application server is running, but its email module requires configuration. 
                      Specifically, the <strong>RESEND_API_KEY</strong> environment variable is missing on this hosting server.
                    </p>
                    <p className="text-sm text-amber-800 mt-3 leading-relaxed font-semibold">
                      To resolve this permanently: Set your Resend API Key in your Hostinger or environment variables settings.
                    </p>
                  </div>
                  
                  <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                    Don't worry! Your typed message is fully preserved. You can send it directly to Michael by selecting <strong>Draft Email with Your App</strong> below, or copy the details easily.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href={getMailtoLink()}
                      className="px-8 py-4 bg-brand-blue text-white text-center text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-all duration-300 inline-block"
                    >
                      Draft Email with Your App
                    </a>
                    <button 
                      onClick={copyToClipboard}
                      className="px-8 py-4 border border-brand-blue text-brand-blue text-center text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Copy size={14} />
                      {copied ? 'Copied Details!' : 'Copy Form Details'}
                    </button>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="px-8 py-4 text-gray-500 hover:text-brand-blue text-center text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Go Back & Edit
                    </button>
                  </div>
                </motion.div>
              ) : status === 'static-host-fallback' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-left"
                >
                  <div className="flex items-center gap-4 mb-6 text-brand-blue">
                    <Mail size={40} className="text-brand-accent animate-bounce" />
                    <h2 className="text-2xl font-serif text-brand-blue font-semibold">Direct Email Delivery</h2>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-brand-accent p-6 rounded-r mb-8">
                    <p className="text-sm text-brand-blue leading-relaxed font-light">
                      This site is currently running on a static hosting environment (like GitHub Pages or basic Hostinger plans). Static hosting environments deliver fast static files but do not run backend code.
                    </p>
                    <p className="text-sm text-brand-blue mt-3 leading-relaxed font-semibold">
                      Your inquiry is completely preserved. Click below to launch your default email client to send it instantly, or copy the fully prepared details.
                    </p>
                  </div>

                  <p className="text-gray-600 mb-8 text-sm leading-relaxed font-light">
                    Selecting <strong>Draft Email with Your App</strong> will automatically prepare the subject line, message text, and Michael Corvin's address (<span className="font-semibold text-brand-blue">michael@thecorcapital.com</span>) inside your email app.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <a 
                      href={getMailtoLink()}
                      className="px-8 py-4 bg-brand-blue text-white text-center text-xs font-bold uppercase tracking-widest hover:bg-brand-accent transition-all duration-300 inline-block"
                    >
                      Draft Email with Your App
                    </a>
                    <button 
                      onClick={copyToClipboard}
                      className="px-8 py-4 border border-brand-blue text-brand-blue text-center text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Copy size={14} />
                      {copied ? 'Copied Details!' : 'Copy Form Details'}
                    </button>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="px-8 py-4 text-gray-500 hover:text-brand-blue text-center text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Go Back & Edit
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-3xl font-medium text-brand-blue mb-8">Inquiry Form</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Inquiry Type</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors appearance-none pr-10"
                        >
                          <option>Investor Relations Inquiry</option>
                          <option>Media Inquiry</option>
                          <option>General Information</option>
                          <option>Service Providers / Vendors</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Message</label>
                      <textarea 
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-6 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>
                    <button 
                      disabled={status === 'submitting'}
                      type="submit" 
                      className="w-full py-4 bg-brand-blue text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-brand-accent transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {status === 'submitting' ? 'Processing...' : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Subtle Admin Settings Link */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center text-[11px] text-gray-400">
                    <p>Cor Capital Direct Inquiry Router v1.2</p>
                    <button 
                      type="button"
                      onClick={() => setIsSettingsOpen(true)}
                      className="flex items-center gap-1.5 hover:text-brand-accent transition-colors font-semibold uppercase tracking-wider text-brand-blue cursor-pointer"
                    >
                      <Settings size={12} />
                      Form Setup & Diagnostics
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </section>

      </main>

      {/* Admin Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-blue/60 backdrop-blur-sm p-4 animate-fade-in">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white max-w-lg w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-left"
          >
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-brand-blue transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-serif text-brand-blue mb-2 flex items-center gap-2 font-medium">
              <Settings className="text-brand-accent" size={24} />
              Form Setup & Diagnostics
            </h3>
            <p className="text-xs text-gray-400 mb-6 font-light leading-relaxed">
              Configure how the Cor Capital website handles form submissions across various hosting plans (such as standard static plans or custom servers).
            </p>

            <div className="space-y-6">
              {/* Delivery Driver */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Email Routing Method
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveSettings({ ...deliverySettings, type: 'auto' })}
                    className={`p-3 text-left border text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                      deliverySettings.type === 'auto' 
                        ? 'border-brand-accent bg-blue-50/50 text-brand-blue' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div>
                      <span className="flex items-center gap-2">
                        Automatic Multi-Relay (Recommended)
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-normal normal-case">Fail-Safe</span>
                      </span>
                      <span className="block text-[9px] font-normal text-gray-400 mt-1 normal-case font-light">
                        Tries backend server first, then auto-fails over to direct FormSubmit to michael@thecorcapital.com.
                      </span>
                    </div>
                    {deliverySettings.type === 'auto' && <Check size={14} className="text-brand-accent" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveSettings({ ...deliverySettings, type: 'formsubmit' })}
                    className={`p-3 text-left border text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                      deliverySettings.type === 'formsubmit' 
                        ? 'border-brand-accent bg-blue-50/50 text-brand-blue' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div>
                      <span>Direct FormSubmit (Zero-Setup Static)</span>
                      <span className="block text-[9px] font-normal text-gray-400 mt-1 normal-case font-light">
                        Delivers directly to michael@thecorcapital.com without needing server API keys.
                      </span>
                    </div>
                    {deliverySettings.type === 'formsubmit' && <Check size={14} className="text-brand-accent" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveSettings({ ...deliverySettings, type: 'backend' })}
                    className={`p-3 text-left border text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                      deliverySettings.type === 'backend' 
                        ? 'border-brand-accent bg-blue-50/50 text-brand-blue' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div>
                      <span>Custom Backend Server (Resend API)</span>
                      <span className="block text-[9px] font-normal text-gray-400 mt-1 normal-case font-light">
                        Express server API route using RESEND_API_KEY environment variable.
                      </span>
                    </div>
                    {deliverySettings.type === 'backend' && <Check size={14} className="text-brand-accent" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveSettings({ ...deliverySettings, type: 'web3forms' })}
                    className={`p-3 text-left border text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                      deliverySettings.type === 'web3forms' 
                        ? 'border-brand-accent bg-blue-50/50 text-brand-blue' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div>
                      <span>Web3Forms</span>
                      <span className="block text-[9px] font-normal text-gray-400 mt-1 normal-case font-light">
                        Uses your personal Web3Forms access key.
                      </span>
                    </div>
                    {deliverySettings.type === 'web3forms' && <Check size={14} className="text-brand-accent" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveSettings({ ...deliverySettings, type: 'formspree' })}
                    className={`p-3 text-left border text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                      deliverySettings.type === 'formspree' 
                        ? 'border-brand-accent bg-blue-50/50 text-brand-blue' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div>
                      <span>Formspree</span>
                      <span className="block text-[9px] font-normal text-gray-400 mt-1 normal-case font-light">
                        Uses your personal Formspree Form ID.
                      </span>
                    </div>
                    {deliverySettings.type === 'formspree' && <Check size={14} className="text-brand-accent" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveSettings({ ...deliverySettings, type: 'mailto' })}
                    className={`p-3 text-left border text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                      deliverySettings.type === 'mailto' 
                        ? 'border-brand-accent bg-blue-50/50 text-brand-blue' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div>
                      <span>Direct Mail App (Mailto Link)</span>
                      <span className="block text-[9px] font-normal text-gray-400 mt-1 normal-case font-light">
                        Opens default mail client directly upon submit.
                      </span>
                    </div>
                    {deliverySettings.type === 'mailto' && <Check size={14} className="text-brand-accent" />}
                  </button>
                </div>
              </div>

              {/* Instant Verification Test Box */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                      Live Delivery Test
                    </h4>
                    <p className="text-[10px] text-gray-500 font-light mt-0.5">
                      Send a verification test email to <span className="font-semibold text-brand-blue">michael@thecorcapital.com</span>.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={testStatus === 'sending'}
                    onClick={handleSendTestEmail}
                    className="px-4 py-2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Send size={11} />
                    {testStatus === 'sending' ? 'Sending...' : 'Send Test Email'}
                  </button>
                </div>
                {testMessage && (
                  <div className={`mt-3 p-2.5 text-xs rounded border ${
                    testStatus === 'success' 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : testStatus === 'error'
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : 'bg-blue-50 text-brand-blue border-blue-200'
                  }`}>
                    {testMessage}
                  </div>
                )}
              </div>

              {/* Conditional Inputs */}
              {deliverySettings.type === 'web3forms' && (
                <div className="space-y-2 p-4 bg-gray-50 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue block">
                      Web3Forms Access Key
                    </label>
                    <a 
                      href="https://web3forms.com/#start" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[9px] text-brand-accent hover:underline uppercase tracking-wider font-bold"
                    >
                      Get Free Key
                    </a>
                  </div>
                  <input
                    type="text"
                    value={deliverySettings.web3FormsKey}
                    onChange={(e) => handleSaveSettings({ ...deliverySettings, web3FormsKey: e.target.value })}
                    className="w-full bg-white border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-brand-accent font-mono"
                    placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  />
                  <p className="text-[9px] text-gray-400 leading-normal font-light">
                    Generate an access key for free in 5 seconds and paste it here. Web3Forms securely forwards messages to your registered email address without exposing your email to bots.
                  </p>
                </div>
              )}

              {deliverySettings.type === 'formspree' && (
                <div className="space-y-2 p-4 bg-gray-50 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue block">
                      Formspree Form ID
                    </label>
                    <a 
                      href="https://formspree.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[9px] text-brand-accent hover:underline uppercase tracking-wider font-bold"
                    >
                      Formspree Sign Up
                    </a>
                  </div>
                  <input
                    type="text"
                    value={deliverySettings.formspreeId}
                    onChange={(e) => handleSaveSettings({ ...deliverySettings, formspreeId: e.target.value })}
                    className="w-full bg-white border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-brand-accent font-mono"
                    placeholder="e.g. mqkoryyy"
                  />
                  <p className="text-[9px] text-gray-400 leading-normal font-light">
                    Enter your Formspree form ID (not the full URL, just the 8-character ID).
                  </p>
                </div>
              )}

              {/* Troubleshooting Tips */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1">
                  <HelpCircle size={12} />
                  Delivery Troubleshooting & Tips
                </h4>
                <ul className="text-xs text-gray-500 space-y-2 leading-relaxed font-light list-disc pl-4">
                  <li>
                    <strong className="text-gray-700">Resend Sandbox Limit:</strong> If using Backend Resend, standard Resend accounts start in Sandbox mode. This limits deliveries <strong>strictly</strong> to your Resend account email (e.g. <span className="font-mono text-[10px]">michael@thecorcapital.com</span>). To deliver to any other addresses, verify <span className="font-semibold">thecorcapital.com</span> as a domain in your Resend Dashboard.
                  </li>
                  <li>
                    <strong className="text-gray-700">Static Host restrictions:</strong> On GitHub Pages and standard Hostinger shared hosting, the Express backend is inactive. Choose <span className="font-semibold">Web3Forms</span> or <span className="font-semibold">Formspree</span> to allow instant automatic delivery without any server running!
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="px-6 py-2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Contact;
