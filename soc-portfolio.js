const { useState, useEffect } = React;


function MatrixRain() {
    useEffect(() => {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 14, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const interval = setInterval(draw, 33);
        
        return () => clearInterval(interval);
    }, []);
    
    return <canvas id="matrix-canvas"></canvas>;
}

function App() {
    const [activeSection, setActiveSection] = useState('home');
    
    const renderSection = () => {
        switch(activeSection) {
            case 'home':
                return <Home setActiveSection={setActiveSection} />;
            case 'skills':
                return <Skills />;
            case 'certifications':
                return <Certifications />;
            case 'contact':
                return <Contact />;
            default:
                return <Home setActiveSection={setActiveSection} />;
        }
    };
    
    return (
        <div className="App">
            <MatrixRain />
            <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
            {renderSection()}
            <Footer />
        </div>
    );
}


function Navbar({ activeSection, setActiveSection }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
                <div className="navbar-brand">
                    SOC_ANALYST.exe
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button 
                                className={`nav-link-btn ${activeSection === 'home' ? 'active' : ''}`}
                                onClick={() => setActiveSection('home')}
                            >
                                <i className="fas fa-terminal me-2"></i>HOME
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link-btn ${activeSection === 'skills' ? 'active' : ''}`}
                                onClick={() => setActiveSection('skills')}
                            >
                                <i className="fas fa-shield-alt me-2"></i>SKILLS
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link-btn ${activeSection === 'certifications' ? 'active' : ''}`}
                                onClick={() => setActiveSection('certifications')}
                            >
                                <i className="fas fa-certificate me-2"></i>CERTS
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link-btn ${activeSection === 'contact' ? 'active' : ''}`}
                                onClick={() => setActiveSection('contact')}
                            >
                                <i className="fas fa-envelope me-2"></i>CONTACT
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


function Home({ setActiveSection }) {
    const [typedText, setTypedText] = useState('');
    const roles = [
        'Security Operations Center Analyst',
        'Threat Hunter',
        'Incident Responder',
        'Cybersecurity Defender'
    ];
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
        const currentRole = roles[roleIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        
        const timer = setTimeout(() => {
            if (!isDeleting && charIndex < currentRole.length) {
                setTypedText(currentRole.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else if (isDeleting && charIndex > 0) {
                setTypedText(currentRole.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            } else if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setRoleIndex((roleIndex + 1) % roles.length);
            }
        }, typingSpeed);
        
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex]);
    
    return (
        <section className="hero-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="hero-content">
                            <h1>CYBERSECURITY ANALYST</h1>
                            <div className="typing-effect">
                                {typedText}<span className="typing-cursor">|</span>
                            </div>
                            <p className="hero-description">
                                Specialized in threat detection, incident response, and security monitoring.
                                Protecting digital assets through proactive defense strategies and real-time
                                threat analysis. Experienced in SIEM tools, malware analysis, and network security.
                            </p>
                            
                            <div className="d-flex flex-wrap gap-3 mb-4">
                                <button className="btn-hack" onClick={() => setActiveSection('skills')}>
                                    <i className="fas fa-code"></i>VIEW SKILLS
                                </button>
                                <button className="btn-outline-hack" onClick={() => setActiveSection('contact')}>
                                    <i className="fas fa-paper-plane"></i>CONTACT
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-5">
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-btn btn-red"></div>
                                <div className="terminal-btn btn-yellow"></div>
                                <div className="terminal-btn btn-green"></div>
                            </div>
                            <div className="terminal-content">
                                <div className="terminal-line">
                                    <span className="terminal-prompt">root@soc:~$</span> whoami
                                </div>
                                <div className="terminal-line">SOC Analyst | Threat Hunter</div>
                                <div className="terminal-line">
                                    <span className="terminal-prompt">root@soc:~$</span> cat skills.txt
                                </div>
                                <div className="terminal-line">> SIEM Management</div>
                                <div className="terminal-line">> Threat Intelligence</div>
                                <div className="terminal-line">> Incident Response</div>
                                <div className="terminal-line">> Malware Analysis</div>
                                <div className="terminal-line">> Network Security</div>
                                <div className="terminal-line">
                                    <span className="terminal-prompt">root@soc:~$</span> status
                                </div>
                                <div className="terminal-line">
                                    <span style={{color: '#00ff41'}}>● ACTIVE</span> - Ready to defend
                                </div>
                                <div className="terminal-line">
                                    <span className="terminal-prompt">root@soc:~$</span> <span className="typing-cursor">_</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row mt-4">
                            <div className="col-6">
                                <div className="stat-box">
                                    <div className="stat-number">100+</div>
                                    <div className="stat-label">Threats Detected</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="stat-box">
                                    <div className="stat-number">99.9%</div>
                                    <div className="stat-label">Uptime</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


function Skills() {
    const skillCategories = [
        {
            icon: 'fas fa-shield-alt',
            title: 'Security Operations',
            skills: [
                'SIEM (Splunk, QRadar, ELK)',
                'Log Analysis & Correlation',
                'Alert Triage & Investigation',
                'Security Monitoring 24/7',
                'Threat Detection Rules'
            ]
        },
        {
            icon: 'fas fa-bug',
            title: 'Threat Intelligence',
            skills: [
                'MITRE ATT&CK Framework',
                'IOC Analysis',
                'Threat Hunting',
                'Malware Analysis',
                'OSINT Techniques'
            ]
        },
        {
            icon: 'fas fa-fire-extinguisher',
            title: 'Incident Response',
            skills: [
                'Incident Handling (NIST)',
                'Forensic Analysis',
                'Root Cause Analysis',
                'Containment Strategies',
                'Post-Incident Reporting'
            ]
        },
        {
            icon: 'fas fa-network-wired',
            title: 'Network Security',
            skills: [
                'Wireshark & tcpdump',
                'IDS/IPS (Snort, Suricata)',
                'Firewall Management',
                'Network Traffic Analysis',
                'VPN & Proxy Configuration'
            ]
        },
        {
            icon: 'fas fa-laptop-code',
            title: 'Tools & Technologies',
            skills: [
                'Python for Security',
                'PowerShell Scripting',
                'Linux Administration',
                'Windows Security',
                'Cloud Security (AWS/Azure)'
            ]
        },
        {
            icon: 'fas fa-user-shield',
            title: 'Compliance & Standards',
            skills: [
                'ISO 27001',
                'NIST Cybersecurity Framework',
                'GDPR Compliance',
                'PCI-DSS',
                'Security Auditing'
            ]
        }
    ];
    
    return (
        <section className="section-padding" style={{paddingTop: '150px'}}>
            <div className="container">
                <h2 className="section-title">TECHNICAL ARSENAL</h2>
                <p className="section-subtitle">
                    Comprehensive skill set for defending against cyber threats
                </p>
                
                <div className="row g-4">
                    {skillCategories.map((category, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className="skill-card">
                                <div className="skill-icon">
                                    <i className={category.icon}></i>
                                </div>
                                <h3 className="skill-title">{category.title}</h3>
                                <ul className="skill-list">
                                    {category.skills.map((skill, idx) => (
                                        <li key={idx}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


function Certifications() {
    const certs = [
        {
            badge: 'SEC+',
            title: 'CompTIA Security+',
            issuer: 'CompTIA',
            year: '2024'
        },
        {
            badge: 'CEH',
            title: 'Certified Ethical Hacker',
            issuer: 'EC-Council',
            year: '2024'
        },
        {
            badge: 'CySA+',
            title: 'CompTIA CySA+',
            issuer: 'CompTIA',
            year: '2023'
        },
        {
            badge: 'GCIH',
            title: 'GIAC Certified Incident Handler',
            issuer: 'GIAC',
            year: '2023'
        },
        {
            badge: 'SPLK',
            title: 'Splunk Core Certified User',
            issuer: 'Splunk',
            year: '2023'
        },
        {
            badge: 'AWS',
            title: 'AWS Security Specialty',
            issuer: 'Amazon Web Services',
            year: '2024'
        }
    ];
    
    return (
        <section className="section-padding" style={{paddingTop: '150px'}}>
            <div className="container">
                <h2 className="section-title">CERTIFICATIONS</h2>
                <p className="section-subtitle">
                    Industry-recognized credentials validating expertise
                </p>
                
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        {certs.map((cert, index) => (
                            <div className="cert-card" key={index}>
                                <div className="d-flex align-items-center">
                                    <div className="cert-badge me-4">
                                        {cert.badge}
                                    </div>
                                    <div className="flex-grow-1">
                                        <h4 className="cert-title">{cert.title}</h4>
                                        <p className="cert-issuer mb-0">{cert.issuer} • {cert.year}</p>
                                    </div>
                                    <div>
                                        <span className="badge-info">VERIFIED</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="row mt-5">
                    <div className="col-lg-10 mx-auto">
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-btn btn-red"></div>
                                <div className="terminal-btn btn-yellow"></div>
                                <div className="terminal-btn btn-green"></div>
                            </div>
                            <div className="terminal-content">
                                <div className="terminal-line">
                                    <span className="terminal-prompt">root@soc:~$</span> ./check_credentials.sh
                                </div>
                                <div className="terminal-line">[+] Scanning certifications...</div>
                                <div className="terminal-line">[✓] Security+ - VALID</div>
                                <div className="terminal-line">[✓] CEH - VALID</div>
                                <div className="terminal-line">[✓] CySA+ - VALID</div>
                                <div className="terminal-line">[✓] GCIH - VALID</div>
                                <div className="terminal-line">[✓] Splunk - VALID</div>
                                <div className="terminal-line">[✓] AWS Security - VALID</div>
                                <div className="terminal-line" style={{color: '#00ff41'}}>
                                    [SUCCESS] All credentials verified!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! (This is a demo - connect to your backend)');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    return (
        <section className="section-padding" style={{paddingTop: '150px'}}>
            <div className="container">
                <h2 className="section-title">ESTABLISH CONNECTION</h2>
                <p className="section-subtitle">
                    Secure communication channel - All messages encrypted
                </p>
                
                <div className="row">
                    <div className="col-lg-8">
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-btn btn-red"></div>
                                <div className="terminal-btn btn-yellow"></div>
                                <div className="terminal-btn btn-green"></div>
                            </div>
                            <form className="contact-form p-3" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">NAME</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">EMAIL</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">SUBJECT</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">MESSAGE</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="5"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-hack w-100">
                                    <i className="fas fa-paper-plane me-2"></i>SEND MESSAGE
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="contact-info-box mb-4">
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <h5 style={{color: '#00ff41'}}>EMAIL</h5>
                            <p style={{color: '#7fff7f'}}>analyst@cybersec.com</p>
                        </div>
                        
                        <div className="contact-info-box mb-4">
                            <div className="contact-icon">
                                <i className="fab fa-linkedin"></i>
                            </div>
                            <h5 style={{color: '#00ff41'}}>LINKEDIN</h5>
                            <p style={{color: '#7fff7f'}}>linkedin.com/in/socanalyst</p>
                        </div>
                        
                        <div className="contact-info-box">
                            <div className="contact-icon">
                                <i className="fab fa-github"></i>
                            </div>
                            <h5 style={{color: '#00ff41'}}>GITHUB</h5>
                            <p style={{color: '#7fff7f'}}>blablah.com/socanalyst</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center mb-4">
                        <a href="https://github.com" className="social-icon" target="_blank">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://linkedin.com" className="social-icon" target="_blank">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://twitter.com" className="social-icon" target="_blank">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="mailto:analyst@cybersec.com" className="social-icon">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                    <div className="col-12 text-center">
                        <p style={{color: '#7fff7f', fontFamily: 'Courier New, monospace'}}>
                            © 2025 SOC Analyst Portfolio 
                        </p>
                        <p style={{color: '#00ff41', fontSize: '0.9rem'}}>
                            <span className="terminal-prompt">root@soc:~$</span> Defending the digital frontier
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));
