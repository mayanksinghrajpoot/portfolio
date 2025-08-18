import React, { useState, useEffect, useRef } from 'react';
import brightpath from './images/brightpath.png';
import chatbot from './images/chatbot.png';
import elegance from './images/elegance.png';
import {"my-img" as profile} from './images/my-img.jpeg';
import smai from './images/smai.png';
import { Home, UserRound, Code, Mail, Linkedin, Github, ArrowDownToLine, ExternalLink } from 'lucide-react';

// --- Data for Dynamic Content ---
const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: UserRound, label: 'About', href: '#about' },
    { icon: Code, label: 'Projects', href: '#projects' },
    { icon: Mail, label: 'Contact', href: '#contact' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mayank-singh-rajpoot-910b29297' },
    { icon: Github, label: 'Github', href: 'https://github.com/mayanksinghrajpoot' }
];

const techStack = [
    { name: 'HTML', color: '#E34F26' }, { name: 'CSS', color: '#1572B6' },
    { name: 'Tailwind CSS', color: '#38B2AC' }, { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'TypeScript', color: '#3178C6' }, { name: 'ReactJS', color: '#61DAFB' },
    { name: 'NextJS', color: '#ffffff' }, { name: 'Framer Motion', color: '#0055FF' },
    { name: 'NodeJS', color: '#83CD29' }, { name: 'ExpressJS', color: '#C9D1D9' },
    { name: 'MongoDB', color: '#47A248' }, { name: 'Redux Toolkit', color: '#764ABC' },
    { name: 'Git', color: '#F05032' }, { name: 'GitHub', color: '#ffffff' },
    { name: 'Vercel', color: '#ffffff' }, { name: 'Postman', color: '#FF6C37' },
    { name: 'C++', color: '#00599C' }, { name: 'Figma', color: '#F24E1E' }
];

const projects = [
    {
        title: 'Bright Path',
        description: 'AI-based Career Suggestion Tool - Suggest careers based on interests.',
        features: [
            'Career suggestion system using Gemini API for technical insights.',
            'Quiz system to understand the user interest for career suggestion',
            'Roadmap suggestion for the right career of your choice level wise.'
        ],
        tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js','Daisy UI','AI'],
        github: 'https://github.com/mayanksinghrajpoot/BrightPath',
        live: 'https://bright-path-5m28.onrender.com',
        image: {brightpath}
    },
    {
        title: 'Sports League Management System',
        description: 'Full Stack Sports Management System for creating and managing an sport league .',
        features: [
            'Player registration,Team Registration profile viewing and Teamup',
            'Real-time chat Integration for seamless interaction between player, coach and admin .',
            'Optimized for responsiveness and performance.'
        ],
        tech: ['HTML', 'JavaScript', 'Tailwind CSS', 'php', 'mysql'],
        github: 'https://github.com/mayanksinghrajpoot/sports-league-management-system',
        live: 'http://sports-league.infy.uk/',
        image: {smai}
    },
    {
        title: 'Trip Planner Chatbot',
        description: 'Can plan trip for you based on your constraints.',
        features: [
            'Simple UI and design for better understanding',
            'AI Integration for trip plan along with mage features',
            'Multiple language chat feature for seamless interaction'
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'AI'],
        github: 'https://github.com/Mayanksingh108/netflix-gpt',
        live: 'https://poetic-kleicha-66e678.netlify.app/',
        image: {chatbot}
    },
    {
        title: 'Elegance Enclave',
        description: 'Real-time Salon booking System',
        features: [
            'Book your slot for desired service at our salon',
            'Responsive Design with smart menubar',
            ''
        ],
        tech: ['HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/mayanksinghrajpoot/my-salon',
        live: 'https://my-salon.netlify.app/',
        image: {elegance}
    }
];


// --- Reusable Components ---

// Custom hook for scroll animations
const useReveal = (stagger = 0) => {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (stagger > 0) {
                        const items = Array.from(element.children);
                        items.forEach((item, index) => {
                            item.style.transitionDelay = `${index * stagger}ms`;
                        });
                    }
                    element.classList.add('reveal-visible');
                    observer.unobserve(element);
                }
            },
            { threshold: 0.5 }
        );
        
        observer.observe(element);
        
        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [stagger]);
    return ref;
};

// Component for animated elements
const Reveal = ({ children, className = '', stagger = 0 }) => {
    const ref = useReveal(stagger);
    return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};


// --- Section Components ---

const Header = () => {
    return (
        <nav className="fixed text-sm w-full top-0 pt-4 z-50 text-neutral-100 bg-gradient-to-b from-neutral-950 via-neutral-950/70 to-transparent">
            <ul className="flex gap-2 md:gap-3 w-fit bg-neutral-950 border border-neutral-600 rounded-full px-3 py-1 mx-auto">
                {navItems.map((item, index) => (
                    <li key={index} className="relative group">
                        <a href={item.href} {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="navbar-li cursor-pointer p-2 block">
                            <item.icon className="w-5 h-5" />
                            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 bg-white text-neutral-900 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {item.label}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const HeroSection = () => (
    <section id="home" className="w-full pt-36 md:pt-48 flex flex-col items-center gap-y-4">
        <Reveal className="text-xs border border-neutral-600 rounded-full px-4 py-1.5 flex justify-center items-center gap-2 relative overflow-hidden shine">
            Actively Seeking Job Opportunities
        </Reveal>
        <Reveal>
            <h1 className="animated-text-gradient text-4xl sm:text-5xl md:text-6xl font-bold leading-tight px-4 w-full sm:max-w-2xl md:max-w-[52rem]">
                Crafting Beautiful & Functional Web Experiences
            </h1>
        </Reveal>
        <Reveal>
            <h4 className="md:text-xl leading-relaxed w-full sm:max-w-2xl px-4 md:max-w-3xl">
                Hey, I'm Mayank Singh, a Full Stack Developer passionate about building performant, user-friendly, and scalable applications.
            </h4>
        </Reveal>
        <Reveal className="flex max-sm:flex-col w-full px-8 justify-center mt-2 gap-4 md:gap-6">
            <a className="px-8 flex group items-center justify-center gap-2 py-2 rounded-full border border-neutral-600 text-sm md:text-lg cursor-pointer hover:bg-neutral-800 transition-colors" href="https://www.linkedin.com/in/mayank-singh-rajpoot-910b29297" target="_blank" rel="noopener noreferrer">
                <span>👋</span>Let's Connect
            </a>
            <a href="https://drive.google.com/file/d/1oOPzl52UkWsK4j_VrRzpYVkZr1hkbhbw/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-8 flex justify-center items-center gap-2 py-2 rounded-full border border-neutral-600 text-sm md:text-lg cursor-pointer hover:bg-neutral-800 transition-colors">
                My Resume <ArrowDownToLine className="w-4 h-4" />
            </a>
        </Reveal>
        <div className="pointer-events-none relative z-10 mx-auto -mt-32 h-96 w-screen max-w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#1a237e,transparent_80%)] before:opacity-60"></div>
    </section>
);

const AboutSection = () => (
    <section id="about" className="bg-neutral-950 flex flex-col overflow-hidden items-center text-neutral-50 px-4 lg:px-6 py-16 w-full">
        <Reveal className="text-[15px] text-center text-neutral-300 font-medium">GET TO KNOW ME</Reveal>
        <Reveal>
            <h2 className="text-3xl animated-text-gradient md:text-5xl font-semibold pt-2 mb-6 md:mb-10 text-neutral-50">About Me</h2>
        </Reveal>
        <Reveal className="flex max-lg:flex-col max-w-4xl">
            <div className="lg:w-1/3 text-center flex flex-col items-center gap-4 pt-6 lg:px-6">
                <img alt="Profile Pic" loading="lazy" width="170" height="170" className="border border-neutral-600 rounded-full" src={profile} />                                          
                <p className="text-neutral-100 border-b border-neutral-600 pb-4">I'm a passionate Full-Stack Developer who loves building dynamic, user-friendly applications. I thrive on solving problems, creating seamless experiences, and continuously expanding my skills. Always eager to learn and grow, I'm currently looking for new opportunities to contribute and innovate.</p>
                <div className="hidden lg:flex items-center gap-2 text-neutral-100"><UserRound className="w-4 h-4" /><span>Punjab, India</span></div>
            </div>
            <div className="lg:w-2/3 p-2 lg:p-6 space-y-4 lg:border-l lg:border-neutral-600">
                <div className="pb-4 border-b border-neutral-600">
                    <h3 className="text-lg text-neutral-100 font-semibold mb-2">Education</h3>
                    <p className="text-neutral-100 text-sm flex justify-between"><span className="font-semibold">Lovely Professional University</span> <span>2023 - 2025</span></p>
                    <p className="text-neutral-100 text-sm flex justify-between"><span>Computer Science And Engineering</span> <span>CGPA: 8.1</span></p>
                </div>
                <div className="pb-4 border-b border-neutral-600">
                    <h2 className="text-lg font-semibold mb-4">Experience</h2>
                    <div className="mb-6 last:mb-0">
                        <h3 className="text-neutral-100 flex justify-between items-center mb-2"><span className="font-semibold">Freelance Full-Stack Developer</span><span>Feb 2025 – Present</span></h3>
                        <ul className="mt-2 space-y-2 text-neutral-300 text-sm list-disc list-inside">
                            <li>Built 4+ full-stack web applications using MERN stack for diverse clients</li>
                            <li>Delivered high-performance, responsive solutions with exceptional UX</li>
                        </ul>
                    </div>
                </div>
                <section>
                    <h2 className="text-lg font-semibold mb-2 self-start text-neutral-100">Tech Stack</h2>
                    <Reveal className="flex gap-1.5 md:gap-2 flex-wrap max-w-3xl" stagger={50}>
                        {techStack.map((tech, index) => (
                            <span key={index} className="tech-item inline-flex justify-center items-center gap-2 px-3 rounded-full py-1 text-xs border border-neutral-600">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tech.color }}></span> {tech.name}
                            </span>
                        ))}
                    </Reveal>
                </section>
            </div>
        </Reveal>
    </section>
);

const ProjectsSection = () => (
    <section id="projects" className="bg-neutral-950 flex flex-col justify-center items-center text-neutral-100 py-16 w-full">
        <Reveal className="text-[15px] text-center text-neutral-300 font-medium">EXPLORE MY CREATIONS</Reveal>
        <Reveal>
            <h2 className="text-3xl animated-text-gradient md:text-5xl font-semibold pt-2 pb-1 mb-6 md:mb-10 text-neutral-100">Projects</h2>
        </Reveal>
        <div className="px-4 w-full max-w-4xl space-y-8">
            {projects.map((project, index) => (
                <Reveal key={index} className="project-card-container">
                    <div className="project flex max-lg:flex-col bg-neutral-950/50 gap-4 my-4 shadow-md rounded-2xl overflow-hidden border border-neutral-800 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-2xl hover:border-blue-500/30">
                        <div className="projectinfo flex flex-1 flex-col p-4 md:p-8">
                            <h3 className="text-xl md:text-3xl border-b border-neutral-700 pb-2 text-neutral-100 font-semibold">{project.title}</h3>
                            <p className="text-neutral-300 mt-2">{project.description}</p>
                            <ul className="mt-4 space-y-2 text-neutral-300 text-sm list-disc list-inside">
                                {project.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tech.map((t, i) => <span key={i} className="text-xs px-3 py-1 rounded-full border border-neutral-600">{t}</span>)}
                            </div>
                            <div className="flex gap-4 mt-auto pt-4">
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-xl flex justify-center items-center gap-2 text-sm border border-neutral-600 shadow-md hover:bg-neutral-800 transition-all duration-300 ease-out hover:scale-105">GitHub <Github className="w-4 h-4" /></a>
                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-xl flex justify-center items-center gap-2 text-sm border border-blue-700 bg-blue-600 text-white shadow-md hover:bg-blue-500 transition-all duration-300 ease-out hover:scale-105">Live Site <ExternalLink className="w-4 h-4" /></a>
                            </div>
                        </div>
                        <div className="relative flex-1 lg:p-8">
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="block w-full h-64 sm:h-80 md:h-96 lg:h-full">
                                <img alt={`${project.title} screenshot`} loading="lazy" className="rounded-xl object-cover object-top w-full h-full border border-neutral-700 hover:scale-105 transition-transform duration-300" src={project.image} />
                            </a>
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>
    </section>
);

const ContactSection = () => {
    const [formData, setFormData] = useState({ email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Sending...');


        const serviceID = import.meta.env.VITE_APP_SERVICE_ID; // Replace with your Service ID
        const templateID = import.meta.env.VITE_APP_TEMPLATE_ID; // Replace with your Template ID
        const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY; // Replace with your Public Key

        if (!serviceID.includes('YOUR_') && window.emailjs) {
            window.emailjs.send(serviceID, templateID, {
                from_email: formData.email,
                message: formData.message,
            }, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setStatus('Message sent successfully!');
                setFormData({ email: '', message: '' });
                 setTimeout(() => setStatus(''), 5000);
            }, (err) => {
                console.log('FAILED...', err);
                setStatus('Failed to send message. Please try again.');
                 setTimeout(() => setStatus(''), 5000);
            });
        } else if (serviceID.includes('YOUR_')) {
             setStatus('EmailJS is not configured. Please add your credentials.');
             setTimeout(() => setStatus(''), 5000);
        } else {
            setStatus('EmailJS library not loaded yet. Please wait and try again.');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <section id="contact" className="bg-neutral-950 flex flex-col justify-center items-center text-neutral-100 py-16 px-6 w-full">
            <Reveal className="text-[15px] text-center text-neutral-300 font-medium">GET IN TOUCH</Reveal>
            <Reveal>
                <h2 className="text-3xl animated-text-gradient md:text-5xl font-semibold pt-2 mb-6 md:mb-10 text-neutral-100">Contact Me</h2>
            </Reveal>
            <Reveal className="w-full sm:max-w-2xl md:max-w-3xl border border-neutral-600 p-4 md:p-8 rounded-2xl shadow-md text-neutral-100">
                <div className="flex max-md:flex-col gap-4">
                    <a href="mailto:mayanksinghrajpoot01@gmail.com" className="flex flex-1 items-center text-sm justify-center gap-2 py-2 border border-neutral-600 rounded-lg font-medium hover:bg-neutral-800 transition-colors"><Mail className="w-4 h-4" /> mayanksinghrajpoot01@gmail.com</a>
                    <a href="https://wa.me/917739504569?text=Hi!%20I'm%20interested%20in%20working%20with%20you." target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center text-sm justify-center gap-2 py-2 border border-neutral-600 rounded-lg font-medium hover:bg-neutral-800 transition-colors"><Code className="w-4 h-4" /> WhatsApp</a>
                </div>
                <p className="p-6 text-neutral-300 text-xs font-medium text-center">Or send a message</p>
                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="w-full px-4 py-3 border placeholder:text-sm bg-neutral-900 border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <textarea 
                        placeholder="Your Message" 
                        name="message" 
                        rows="5" 
                        className="w-full px-4 py-3 border placeholder:text-sm bg-neutral-900 border-neutral-600 rounded-lg focus:outline-none resize-none focus:ring-2 focus:ring-blue-500" 
                        required
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit" className="w-full bg-neutral-800 cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border border-neutral-600 hover:bg-neutral-700 transition-colors flex justify-center" disabled={status === 'Sending...'}>
                        {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
                {status && <p className={`mt-4 text-sm ${status.includes('Failed') || status.includes('configured') ? 'text-red-400' : 'text-green-400'}`}>{status}</p>}
            </Reveal>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-neutral-950 border-t w-full flex max-md:flex-col-reverse justify-center items-center gap-4 border-neutral-800 text-neutral-300 text-center py-6">
        <p className="text-sm">© 2025 Mayank Singh. All rights reserved.</p>
    </footer>
);

// --- Particles Background Component ---
const ParticlesBackground = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
            if (window.particlesJS) {
                window.particlesJS('particles-js', {
                    "particles": {
                        "number": {"value": 50, "density": {"enable": true, "value_area": 800}},
                        "color": {"value": "#4a4a4a"},
                        "shape": {"type": "circle"},
                        "opacity": {"value": 0.5, "random": true},
                        "size": {"value": 3, "random": true},
                        "line_linked": {"enable": true, "distance": 150, "color": "#555555", "opacity": 0.4, "width": 1},
                        "move": {"enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false}
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {"onhover": {"enable": true, "mode": "grab"}, "onclick": {"enable": false}, "resize": true},
                        "modes": {"grab": {"distance": 140, "line_linked": {"opacity": 1}}}
                    },
                    "retina_detect": true
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                 document.body.removeChild(script);
            }
        }
    }, []);

    return <div id="particles-js" className="fixed top-0 left-0 w-full h-full z-[-1]"></div>;
};


// --- Main App Component ---
export default function App() {
     useEffect(() => {
        // Load EmailJS SDK
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <>
            <style>{`
                html { scroll-behavior: smooth; }
                body { background-color: #0a0a0a; color: #fafafa; }
                .animated-text-gradient {
                    background: linear-gradient(90deg, #e0e0e0, #ffffff, #e0e0e0);
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: shine-text 5s linear infinite;
                }
                @keyframes shine-text {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                .shine::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    animation: shine-effect 3s linear infinite;
                }
                @keyframes shine-effect {
                    0% { left: -100%; }
                    50%, 100% { left: 100%; }
                }
                .reveal {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .reveal-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .reveal-visible .tech-item, .reveal-visible .project-card-container {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeInUp 0.5s forwards;
                }
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <div className="antialiased bg-neutral-950 text-neutral-50 relative z-10">
                <ParticlesBackground />
                <Header />
                <main className="flex flex-col overflow-hidden items-center min-h-screen mx-auto text-center">
                    <HeroSection />
                    <AboutSection />
                    <ProjectsSection />
                    <ContactSection />
                </main>
                <Footer />
            </div>
        </>
    );
}
