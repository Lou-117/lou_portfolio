import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Download, Globe, Plus, Minus, X, ChevronLeft, Calendar, Building, User, MessageCircle, Send, Loader2, Sparkles } from 'lucide-react';

// --- Shared Data ---
const defaultDetailImages = [
    "[https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop)",
    "[https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop)",
    "[https://images.unsplash.com/photo-1550063873-ab792950096b?q=80&w=2670&auto=format&fit=crop](https://images.unsplash.com/photo-1550063873-ab792950096b?q=80&w=2670&auto=format&fit=crop)"
];

// --- Content Data (在这里修改你的个人信息) ---
const content = {
  en: {
    nav: { work: "Work", about: "About", contact: "Contact", back: "Back", all: "All Projects" },
    hero: {
      role: "Product Designer & AIoT Specialist",
      status: "Based in Wuhan • Available for remote",
      scroll: "Scroll to Explore"
    },
    projects: [
      {
        id: 1,
        title: "XiaoAi Assistant 5.0",
        category: "Voice AI",
        date: "2019 - Present",
        company: "Xiaomi",
        role: "Lead Designer",
        image: "[https://i.postimg.cc/Mp9wvRgR/xiao-ai1.png](https://i.postimg.cc/Mp9wvRgR/xiao-ai1.png)",
        desc: "Redesigned the entire voice interaction paradigm for Xiaomi's ecosystem.",
        detailImages: [
            "[https://i.postimg.cc/Mp9wvRgR/xiao-ai1.png](https://i.postimg.cc/Mp9wvRgR/xiao-ai1.png)",
            "[https://i.postimg.cc/GtPwrskC/xiao-ai2.png](https://i.postimg.cc/GtPwrskC/xiao-ai2.png)",
            "[https://i.postimg.cc/15HhjwmD/xiao-ai3.png](https://i.postimg.cc/15HhjwmD/xiao-ai3.png)",
            "[https://i.postimg.cc/057q7hh4/xiao-ai4.png](https://i.postimg.cc/057q7hh4/xiao-ai4.png)",
            "[https://i.postimg.cc/13jdkKLX/xiao-ai5.png](https://i.postimg.cc/13jdkKLX/xiao-ai5.png)",
            "[https://i.postimg.cc/zXq4KvCt/xiao-ai6.png](https://i.postimg.cc/zXq4KvCt/xiao-ai6.png)",
            "[https://i.postimg.cc/y8bGMTwD/xiao-ai7.png](https://i.postimg.cc/y8bGMTwD/xiao-ai7.png)",
            "[https://i.postimg.cc/nhPWy16v/xiao-ai8.png](https://i.postimg.cc/nhPWy16v/xiao-ai8.png)",
            "[https://i.postimg.cc/76gQTrbQ/xiao-ai9.png](https://i.postimg.cc/76gQTrbQ/xiao-ai9.png)",
            "[https://i.postimg.cc/ZnH7VP8r/xiao-ai10.png](https://i.postimg.cc/ZnH7VP8r/xiao-ai10.png)",
            "[https://i.postimg.cc/Wz8WXmGh/xiao-ai11.png](https://i.postimg.cc/Wz8WXmGh/xiao-ai11.png)",
            "[https://i.postimg.cc/8cNXRX6c/xiao-ai12.png](https://i.postimg.cc/8cNXRX6c/xiao-ai12.png)"
        ],
        details: {
            overview: "XiaoAi is the core voice interaction gateway for Xiaomi's ecosystem. This project (Version 5.0) aimed to transform it from a passive tool into a proactive, emotionally intelligent companion.",
            challenge: "Ensuring visual consistency across diverse hardware (Foldables, Pads, IoT) while humanizing the AI experience.",
            solution: "We introduced an 'Emotional Engine' that adapts UI colors and fluid motions based on conversation context. We also established a modular design system for seamless cross-device adaptation."
        }
      },
      {
        id: 2,
        title: "XiaoAi Design System",
        category: "Design System",
        date: "2020",
        company: "Xiaomi",
        role: "System Designer",
        image: "[https://i.postimg.cc/hjvxm9Cv/xiao-ai-zu-jian-ku1.png](https://i.postimg.cc/hjvxm9Cv/xiao-ai-zu-jian-ku1.png)",
        desc: "Building a scalable UI component library for the XiaoAi ecosystem.",
        detailImages: [
            "[https://i.postimg.cc/hjvxm9Cv/xiao-ai-zu-jian-ku1.png](https://i.postimg.cc/hjvxm9Cv/xiao-ai-zu-jian-ku1.png)",
            "[https://i.postimg.cc/Tw1mbrkh/xiao-ai-zu-jian-ku2.png](https://i.postimg.cc/Tw1mbrkh/xiao-ai-zu-jian-ku2.png)",
            "[https://i.postimg.cc/4dytcz8h/xiao-ai-zu-jian-ku3.png](https://i.postimg.cc/4dytcz8h/xiao-ai-zu-jian-ku3.png)",
            "[https://i.postimg.cc/MTLBmv41/xiao-ai-zu-jian-ku4.png](https://i.postimg.cc/MTLBmv41/xiao-ai-zu-jian-ku4.png)",
            "[https://i.postimg.cc/Y9PFzhVf/xiao-ai-zu-jian-ku5.png](https://i.postimg.cc/Y9PFzhVf/xiao-ai-zu-jian-ku5.png)",
            "[https://i.postimg.cc/LXWP3n7k/xiao-ai-zu-jian-ku6.png](https://i.postimg.cc/LXWP3n7k/xiao-ai-zu-jian-ku6.png)",
            "[https://i.postimg.cc/50rzS6Gr/xiao-ai-zu-jian-ku7.png](https://i.postimg.cc/50rzS6Gr/xiao-ai-zu-jian-ku7.png)"
        ],
        details: {
            overview: "Building a centralized design system to unify the user interface across all XiaoAi-related applications.",
            challenge: "Dealing with legacy technical debt and diverse requirements from different vertical business units.",
            solution: "We established the 'XiaoAi UI' component library, defining atomic design rules for colors, typography, and spacing."
        }
      },
      {
        id: 3,
        title: "Blender 3D Practice",
        category: "3D Design",
        date: "Ongoing",
        company: "Personal",
        role: "3D Artist",
        image: "[https://i.postimg.cc/hvwHnbYQ/blender1.png](https://i.postimg.cc/hvwHnbYQ/blender1.png)",
        desc: "A collection of daily 3D modeling and rendering exercises.",
        detailImages: [
            "[https://i.postimg.cc/hvwHnbYQ/blender1.png](https://i.postimg.cc/hvwHnbYQ/blender1.png)",
            "[https://i.postimg.cc/qB5f247v/blender2.png](https://i.postimg.cc/qB5f247v/blender2.png)",
            "[https://i.postimg.cc/FFBt0NHM/blender3.png](https://i.postimg.cc/FFBt0NHM/blender3.png)",
            "[https://i.postimg.cc/RCDrw40V/blender4.png](https://i.postimg.cc/RCDrw40V/blender4.png)",
            "[https://i.postimg.cc/J4DfqvyZ/blender5.png](https://i.postimg.cc/J4DfqvyZ/blender5.png)",
            "[https://i.postimg.cc/sDQkcqBc/blender6.png](https://i.postimg.cc/sDQkcqBc/blender6.png)",
            "[https://i.postimg.cc/sDkt0mSK/blender7.png](https://i.postimg.cc/sDkt0mSK/blender7.png)",
            "[https://i.postimg.cc/65kD1cRM/blender8.png](https://i.postimg.cc/65kD1cRM/blender8.png)",
            "[https://i.postimg.cc/5NhZkgvG/blender9.png](https://i.postimg.cc/5NhZkgvG/blender9.png)",
            "[https://i.postimg.cc/Kv6dsfBy/blender10.png](https://i.postimg.cc/Kv6dsfBy/blender10.png)",
            "[https://i.postimg.cc/3w7z3wtv/blender11.png](https://i.postimg.cc/3w7z3wtv/blender11.png)",
            "[https://i.postimg.cc/3x2PMGFm/blender12.png](https://i.postimg.cc/3x2PMGFm/blender12.png)",
            "[https://i.postimg.cc/g0d1G0g6/blender13.png](https://i.postimg.cc/g0d1G0g6/blender13.png)",
            "[https://i.postimg.cc/FKmwhKTc/blender14.png](https://i.postimg.cc/FKmwhKTc/blender14.png)",
            "[https://i.postimg.cc/9fVscfLB/blender15.png](https://i.postimg.cc/9fVscfLB/blender15.png)"
        ],
        details: {
             overview: "A personal project dedicated to improving my 3D design skills using Blender.",
             challenge: "Mastering the complex workflows of 3D modeling, texturing, lighting, and rendering.",
             solution: "Through consistent daily practice, I experiment with various techniques, enhancing my spatial awareness."
        }
      },
      {
        id: 4,
        title: "Seven-Leaf Platform",
        category: "Web Platform",
        date: "2021",
        company: "Seven-Leaf",
        role: "Lead Designer",
        image: "[https://i.postimg.cc/tgKYnqbk/1.png](https://i.postimg.cc/tgKYnqbk/1.png)", 
        desc: "A secure and professional digital asset consignment and trading platform.",
        detailImages: [
            "[https://i.postimg.cc/tgKYnqbk/1.png](https://i.postimg.cc/tgKYnqbk/1.png)",
            "[https://i.postimg.cc/vmJcxYMH/2.png](https://i.postimg.cc/vmJcxYMH/2.png)",
            "[https://i.postimg.cc/JhfGHrmR/3.png](https://i.postimg.cc/JhfGHrmR/3.png)",
            "[https://i.postimg.cc/8C2jfpG9/4.png](https://i.postimg.cc/8C2jfpG9/4.png)",
            "[https://i.postimg.cc/0NTbKkxy/5.png](https://i.postimg.cc/0NTbKkxy/5.png)",
            "[https://i.postimg.cc/MT1XyCKJ/6.png](https://i.postimg.cc/MT1XyCKJ/6.png)",
            "[https://i.postimg.cc/rm5zSBF0/7.png](https://i.postimg.cc/rm5zSBF0/7.png)",
            "[https://i.postimg.cc/DZ1mq9yL/8.png](https://i.postimg.cc/DZ1mq9yL/8.png)"
        ],
        details: {
            overview: "Seven-Leaf is a specialized third-party platform for virtual asset transactions.",
            challenge: "Reducing cognitive load during complex account transfer and fund escrow processes.",
            solution: "We reconstructed the visual experience of the entire transaction link, using a blue-gold color scheme."
        }
      }
    ],
    about: {
      intro: "I bridge the gap between complex technology and human intuition. With 6 years at industry giants like Xiaomi and Douyu, I don't just design screens; I design systems.",
      exp: [
        { company: "Xiaomi", role: "Senior UI Designer", year: "2019 - Present" },
        { company: "Douyu", role: "UI Designer", year: "2018 - 2019" },
        { company: "Himalaya", role: "UI Designer", year: "2017 - 2018" },
      ]
    }
  }
};

// --- Resume Context for AI ---
const RESUME_CONTEXT = `
Role: Wan Zhigang (万志刚) - Senior UI Designer.
Experience: 6 years.
Key Strengths: Independent leadership, Cross-platform experience (PC/Mobile/Pad/AIoT), Frontend knowledge.
Work History: Xiaomi (Senior UI), Douyu (UI), Himalaya (UI), XingAi (UI).
`;

// --- Components (Visual & Functional) ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.06] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}
  />
);

const MagneticButton = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex justify-center items-center hover-trigger ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setHovering(!!target.closest('.hover-trigger'));
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: mousePos.x - 8,
        y: mousePos.y - 8,
        scale: hovering ? 4 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
};

const Menu = ({ lang, setLang, view, setView }) => {
  const t = content[lang].nav;
  const isHome = view === 'home';

  return (
    <nav className="fixed top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-start z-50 mix-blend-difference text-white pointer-events-none">
      <div className="pointer-events-auto">
        <button onClick={() => setView('home')} className="font-bold text-xl tracking-tighter block hover-trigger text-left">WZ®</button>
        <span className="text-xs font-mono opacity-60 mt-1 block">UI/UX ARCHIVE</span>
      </div>
      
      <div className="flex gap-8 pointer-events-auto items-center">
        {!isHome ? (
             <button 
             onClick={() => setView('home')}
             className="hidden md:flex gap-2 items-center text-sm font-medium hover:opacity-50 transition-opacity hover-trigger"
           >
             <ChevronLeft size={16} />
             {t.back}
           </button>
        ) : (
            <div className="hidden md:flex gap-6 text-sm font-medium">
            {['work', 'about', 'contact'].map((key) => (
                <a key={key} href={`#${key}`} className="hover:opacity-50 transition-opacity hover-trigger capitalize">{content[lang].nav[key]}</a>
            ))}
            </div>
        )}
       
        <button 
          onClick={() => setLang(prev => prev === 'en' ? 'zh' : 'en')}
          className="text-xs font-bold border border-white/30 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors hover-trigger"
        >
          {lang.toUpperCase()}
        </button>
      </div>
    </nav>
  );
};

// --- AI Chatbot Component ---

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', text: "Hi, I'm AI Wan Zhigang. Ask me anything about my design experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
        const apiKey = ""; // API Key 
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        
        const systemPrompt = `You are Wan Zhigang (万志刚). RESUME CONTEXT: ${RESUME_CONTEXT}`;

        const payload = {
            contents: [{ parts: [{ text: systemPrompt + "\n\nUser Question: " + userMessage }] }]
        };

        const fetchWithRetry = async (retries = 3, delay = 1000) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) throw new Error(`HTTP error!`);
                return await response.json();
            } catch (err) {
                if (retries > 0) {
                    await new Promise(res => setTimeout(res, delay));
                    return fetchWithRetry(retries - 1, delay * 2);
                } else { throw err; }
            }
        };

        const data = await fetchWithRetry();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, error.";
        setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);

    } catch (error) {
        setMessages(prev => [...prev, { role: 'ai', text: "Connection error." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 md:w-96 h-[500px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
               <h3 className="font-bold text-sm text-white">Wan Zhigang (AI)</h3>
               <button onClick={() => setIsOpen(false)}><X size={18}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {messages.map((msg, i) => (
                   <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-white/10'}`}>{msg.text}</div>
                   </div>
               ))}
               {isLoading && <div className="text-xs text-gray-500">Thinking...</div>}
               <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-white/10">
               <input 
                 className="w-full bg-white/5 rounded-full px-4 py-2 text-sm text-white"
                 value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
                 placeholder="Ask me anything..."
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center">
        {isOpen ? <X size={24}/> : <MessageCircle size={24}/>}
      </motion.button>
    </div>
  );
};

// --- Main App ---
const Portfolio_V3 = () => {
  const [lang, setLang] = useState('en');
  const [view, setView] = useState('home');
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => window.scrollTo(0, 0), [view]);

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden cursor-none">
      <Cursor />
      <NoiseOverlay />
      
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-blue-900/10 rounded-full blur-[150px] animate-pulse mix-blend-screen"/>
          <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[120px] animate-pulse mix-blend-screen" style={{animationDelay: '2s'}}/>
      </div>

      <Menu lang={lang} setLang={setLang} view={view} setView={setView} />
      
      <AnimatePresence mode="wait">
        {view === 'home' && (
            <motion.main 
                key="home"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="relative z-10"
            >
                <Hero lang={lang} />
                <ProjectList lang={lang} setView={setView} setCurrentProject={setCurrentProject} />
                <Experience lang={lang} />
                <Footer lang={lang} />
            </motion.main>
        )}
        
        {view === 'archive' && (
            <ArchiveView key="archive" lang={lang} setView={setView} setCurrentProject={setCurrentProject} />
        )}

        {view === 'detail' && (
             <ProjectDetailView key="detail" lang={lang} project={currentProject} setView={setView} />
        )}
      </AnimatePresence>

      <AIChatbot />
    </div>
  );
};

export default Portfolio_V3;