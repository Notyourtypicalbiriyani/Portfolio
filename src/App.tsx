import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Activity, Microchip, ChevronRight, Bot, MapPin, GraduationCap, Code, Server, BookOpen, Layers, ExternalLink } from 'lucide-react';
Server, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';

// ==========================================
// ANIMATION CONFIGURATIONS
// ==========================================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ==========================================
// 3D MODEL PLACEHOLDERS (TurtleBot3 & Humanoid)
// ==========================================
function TurtleBot3Placeholder() {
  return (
    <group position={[-1.5, -0.8, 0]}>
      {/* Base/Chassis */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Lidar Tower */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 32]} />
        <meshStandardMaterial color="#444444" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#00aaff" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Wheels */}
      <mesh position={[0.65, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[-0.65, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      
      <Html position={[0, 1.2, 0]} center>
        <div className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap">
          TurtleBot3 Nav
        </div>
      </Html>
    </group>
  );
}

function HumanoidPlaceholder() {
  return (
    <group position={[1.5, -0.8, 0]}>
      {/* Torso */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshStandardMaterial color="#dddddd" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.6, 1.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial color="#999999" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.6, 1.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial color="#999999" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.2, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.2, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
      </mesh>

      <Html position={[0, 3, 0]} center>
        <div className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap">
          VLA Humanoid
        </div>
      </Html>
    </group>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black selection:bg-white/30 text-white font-sans overflow-x-hidden">
      
      {/* ========================================== */}
      {/* NAVIGATION BAR - ALIGNMENT FIXED           */}
      {/* ========================================== */}
      <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="w-full max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-xs font-medium text-apple-gray tracking-wide uppercase">
          <a href="#" className="text-white cursor-pointer hover:text-white transition-colors">Adil Naz Muhammed</a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#profile" className="hover:text-white transition-colors">Profile</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#hardware" className="hover:text-white transition-colors">Hardware</a>
          </div>
        </div>
      </nav>

      {/* ========================================== */}
      {/* HERO SECTION WITH ROBOTICS BACKGROUND      */}
      {/* ========================================== */}
      <section 
        className="pt-56 pb-24 px-6 flex flex-col items-center text-center relative bg-cover bg-center"
        style={{ backgroundImage: "url('/robotics-bg.jpg')" }} // Background Image Applied Here
      >
        {/* Dark overlay to ensure text is readable over the background image */}
        <div className="absolute inset-0 bg-black/80 z-0" />
        
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl relative z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
            Adil Naz Muhammed
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 font-medium mb-6 leading-tight max-w-4xl mx-auto">
            M.Tech. candidate in Robotics and Automation (GATE Fellow) currently affiliated with the College of Engineering Trivandrum (CET).
          </p>
          <p className="text-lg md:text-xl text-gray-400 font-normal mb-10 leading-relaxed max-w-3xl mx-auto">
            I work on robotic manipulation and real-time perception, combining embedded hardware, simulation and learning-based methods with applications in healthcare and sustainability. I am seeking a PhD position to develop robust, deployable perception and control methods for autonomous robots.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#profile" className="bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Explore Profile <ChevronRight size={16} />
            </a>
            <a href="#experience" className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors flex items-center justify-center">
              View Experience
            </a>
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* PROFILE & EDUCATION SECTION                */}
      {/* ========================================== */}
      <section id="profile" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid lg:grid-cols-12 gap-6"
        >
          {/* Main Profile Card */}
          <motion.div variants={fadeUp} className="lg:col-span-8 bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row gap-12 items-center hover:border-white/20 transition-all duration-500">
            
            {/* EASY IMAGE ADDING: Uses standard HTML img tag pointing to your public folder */}
            <div className="w-56 h-56 rounded-full shrink-0 overflow-hidden shadow-2xl border border-white/10 bg-[#1a1a1a]">
              <img 
                src="/Portrait2.png" 
                alt="Adil Naz Muhammed" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // Hides if image not found in public folder
                  e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                }}
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 tracking-tight">Academic Background</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">M.Tech. in Robotics and Automation</h3>
                  <p className="text-sm text-apple-gray mt-1">College of Engineering Trivandrum (CET), India</p>
                  <p className="text-sm text-gray-400 mt-2">2025-2027 (expected) • CGPA: 8.68/10</p>
                  <p className="text-sm text-gray-400 mt-1 italic">Thesis: Dual-arm manipulator grasp perception and kinematic evaluation</p>
                </div>
                
                <div className="w-full h-[1px] bg-white/10" />

                <div>
                  <h3 className="text-lg font-semibold text-white">B.Tech. in Electronics & Biomedical Engineering</h3>
                  <p className="text-sm text-apple-gray mt-1">Model Engineering College, Kochi, India</p>
                  <p className="text-sm text-gray-400 mt-2">2021-2025 • CGPA: 7.99/10</p>
                  <p className="text-sm text-gray-400 mt-1 italic">Thesis: FPGA-based image pre-processing for Advanced Driver Assistance Systems</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/5 text-xs text-gray-300 font-medium">
                  <MapPin size={14} className="text-white" />
                  Kochi, Kerala, India
                </div>
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/5 text-xs text-gray-300 font-medium">
                  <GraduationCap size={14} className="text-white" />
                  GATE Fellowship 2025-2027
                </div>
              </div>
            </div>
          </motion.div>

          {/* Research Interests Sidebar - ALIGNMENT FIXED */}
          <motion.div variants={fadeUp} className="lg:col-span-4 bg-[#111111] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center hover:border-white/20 transition-all duration-500">
            <h3 className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-3">
              <Bot className="text-white shrink-0" size={28} /> Research Interests
            </h3>
            <ul className="space-y-4">
              {[
                "Embodied AI",
                "Grasping & Dual-Arm Manipulation",
                "Embedded Real-Time Vision",
                "Biomedical Signal Analysis",
                "Robotic Biomimicry",
                "Human-Robot Interaction"
              ].map((interest, idx) => (
                <li key={idx} className="flex items-start gap-3 text-apple-gray text-sm hover:text-white transition-colors cursor-default">
                  <span className="text-white shrink-0 mt-0.5 opacity-50">✦</span> 
                  <span className="leading-relaxed">{interest}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* EXPERIENCE TIMELINE - ALIGNMENT FIXED      */}
      {/* ========================================== */}
      <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">Research & Professional Experience</h2>
          
          <div className="space-y-6">
            {[
              {
                title: "Master's Thesis Researcher",
                location: "Department of Electronics, Cochin University of Science and Technology (CUSAT), Kochi",
                date: "Aug 2026-Present",
                points: [
                  "Investigating grasp perception and manipulation kinematics for coordinated dual-arm robotic systems.",
                  "Developing and evaluating an optimized object grasping and transport framework for a dual-arm mobile manipulator system based on TurtleBot3."
                ]
              },
              {
                title: "Project and Mentoring Intern",
                location: "Bosch Rexroth-CET Centre of Excellence in Automation Technologies, Thiruvananthapuram",
                date: "Jun 2026-Aug 2026",
                points: [
                  "Implemented camera guided, colour-based block stacking on an ABB IRB-120 manipulator.",
                  "Delivered workshops and mentoring sessions for undergraduates and maintained lab platforms (Quanser QBot, LEGO Mindstorms, Rexroth sensors)."
                ]
              },
              {
                title: "Student Project Assistant",
                location: "Model Engineering College - Chips-to-Startup (C2S) Programme, MeitY, Kochi",
                date: "Sep 2024-Jun 2025",
                points: [
                  "Implemented real-time image pre-processing on a PYNQ-Z2 FPGA with latency below 2 ms, optimising hardware utilisation and data flow under deterministic-timing constraints.",
                  "Worked in an industry-academia research environment. This work was also my bachelor's thesis."
                ]
              },
              {
                title: "Biomedical Engineering Intern",
                location: "Eightwe Digital Transformations Pvt. Ltd., Kochi",
                date: "May 2023-Jun 2023",
                points: [
                  "Supported technical operations of Medzell, a B2B biomedical platform with data handling, platform maintenance and documentation."
                ]
              }
            ].map((exp, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-[#111111] border border-white/10 p-10 rounded-3xl hover:bg-[#151515] hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div className="pl-4 md:pl-2">
                    <h3 className="text-2xl font-semibold">{exp.title}</h3>
                    <p className="text-apple-gray mt-2">{exp.location}</p>
                  </div>
                  <span className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shrink-0 md:mr-2">
                    {exp.date}
                  </span>
                </div>
                <ul className="space-y-4 text-gray-300 text-sm leading-relaxed mt-6 pl-4 md:pl-2">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-4">
                      <span className="text-white opacity-40 mt-1 shrink-0">―</span> 
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* 3D INTERACTIVE HARDWARE SHOWCASE           */}
      {/* ========================================== */}
      <section id="hardware" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex flex-col xl:flex-row gap-12 items-center bg-gradient-to-br from-[#111111] to-black border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
            
            <div className="flex-1 p-10 md:p-16">
              <h2 className="text-4xl font-bold tracking-tight mb-6">Interactive Hardware</h2>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Utilizing ROS / ROS 2 and manipulator kinematics alongside hardware like the PYNQ-Z2 and ABB IRB-120 to design real-time robotic systems. 
                Explore the VLA Humanoid and TurtleBot3 assemblies embedded directly in the browser environment.
              </p>
              <a href="#projects" className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform inline-flex items-center gap-3">
                View Hardware Repository <ChevronRight size={16} />
              </a>
            </div>

            <div className="flex-1 h-[600px] w-full bg-gradient-to-b from-white/5 to-transparent relative border-t xl:border-t-0 xl:border-l border-white/5 cursor-grab active:cursor-grabbing">
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-semibold tracking-widest uppercase pointer-events-none z-10">
                Drag to Interact
              </div>
              
              <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                <Suspense fallback={null}>
                  {/* Rendering both robotic platforms side by side */}
                  <TurtleBot3Placeholder />
                  <HumanoidPlaceholder />
                  
                  <Environment preset="city" />
                  <ContactShadows position={[0, -1, 0]} opacity={0.7} scale={20} blur={2.5} far={4} color="#000000" resolution={512} />
                </Suspense>
                
                <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2 + 0.1} />
              </Canvas>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* PROJECTS GRID                              */}
      {/* ========================================== */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">Selected Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Integrated Active Gantry System", desc: "Master's Mini-Project. Built a 2-D plotter and a camera-based system for autonomous emergency patient allotment." },
              { icon: Server, title: "Hazard Evolution Detection", desc: "Built an LSTM-based predictor of hazard evolution for field robots in ThreeDWorld simulation environments." },
              { icon: Activity, title: "IoT-EMG Muscular Dystrophy", desc: "Bachelor's Mini-Project. EMG acquisition and IoT-enabled analysis for early muscular dystrophy prediction." },
              { icon: Bot, title: "Vision-Based Coconut Analysis", desc: "Colour and texture based image model for tender coconut content estimation." },
              { icon: Code, title: "Automated Sports Highlights", desc: "Event-detection pipeline for compiling highlights from video feeds." },
              { icon: Microchip, title: "Pattern Drawing Robot", desc: "Simulated robot for automated pattern generation and kinematic path planning." }
            ].map((proj, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-[#111111] border border-white/5 p-8 rounded-3xl hover:border-white/30 transition-all duration-300 group hover:-translate-y-1">
                <proj.icon className="text-white mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
                <h3 className="text-xl font-semibold mb-3 leading-tight">{proj.title}</h3>
                <p className="text-apple-gray text-sm leading-relaxed mb-4">{proj.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SKILLS & CERTIFICATIONS                    */}
      {/* ========================================== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          <motion.div variants={fadeUp} className="space-y-10">
            <h2 className="text-3xl font-bold tracking-tight">Technical Skills</h2>
            <div className="space-y-8">
              {[
                { label: "Programming", skills: "Python (simulation, data analysis, visualisation), C, MATLAB, Verilog" },
                { label: "Robotics", skills: "ROS / ROS 2, manipulator kinematics, grasp perception" },
                { label: "Simulation", skills: "Gazebo, NVIDIA Isaac Sim, MuJoCo, ThreeDWorld" },
                { label: "Vision / ML", skills: "OpenCV, LSTM-based sequence prediction" },
                { label: "Hardware", skills: "FPGA design (PYNQ-Z2, Vivado), biomedical signal acquisition, Fusion 360" }
              ].map((category, idx) => (
                <div key={idx} className="group">
                  <h4 className="text-sm uppercase tracking-widest font-semibold text-gray-500 mb-3 border-b border-white/10 pb-2 group-hover:border-white/30 transition-colors">{category.label}</h4>
                  <p className="text-white font-medium leading-relaxed">{category.skills}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-8">
              <h2 className="text-3xl font-bold tracking-tight mb-8">Languages</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { lang: "Malayalam", prof: "Native" }, { lang: "English", prof: "Fluent" },
                  { lang: "Hindi", prof: "Professional" }, { lang: "German / Spanish", prof: "Basic" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#111111] px-5 py-4 rounded-xl border border-white/5 flex flex-col justify-center">
                    <span className="text-white font-semibold">{item.lang}</span> 
                    <span className="text-xs text-apple-gray mt-1 uppercase tracking-wider font-medium">{item.prof}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certificates (Visible PDF Embed) */}
          <motion.div variants={fadeUp} className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-full shrink-0">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-white">Advanced Robotics</h4>
                    <p className="text-apple-gray text-sm mt-1 font-medium">NPTEL (IIT Kanpur) • 2026</p>
                  </div>
                </div>
                <a href="/NPTEL Certificate.pdf" target="_blank" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
                  <ExternalLink size={20} />
                </a>
              </div>
              
              {/* PDF Embed viewer pointing to public folder */}
              <div className="w-full h-[450px] rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                <iframe 
                  src="/NPTEL Certificate.pdf#toolbar=0" 
                  className="w-full h-full"
                  title="NPTEL Certificate"
                />
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* ========================================== */}
      {/* FOOTER                                     */}
      {/* ========================================== */}
      <footer className="border-t border-white/10 py-16 px-6 mt-12 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-apple-gray gap-8">
          
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg tracking-tight mb-1">Adil Naz Muhammed</h3>
            <p className="opacity-70 text-xs tracking-wider uppercase mb-6">Robotics & Automation Engineer</p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 font-medium">
              <span>Kochi, Kerala, India</span>
              <span className="hidden md:inline text-white/20">|</span>
              <span>+91 91425 25374</span>
              <span className="hidden md:inline text-white/20">|</span>
              <a href="mailto:adilnazmuhammed.mec@gmail.com" className="hover:text-white transition-colors">adilnazmuhammed.mec@gmail.com</a>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="https://linkedin.com/in/your-profile" target="_blank" className="hover:text-black hover:bg-white transition-colors uppercase tracking-wider font-bold text-xs border border-white/20 px-6 py-3 rounded-full text-white">LinkedIn</a>
            <a href="https://github.com/your-username" target="_blank" className="hover:text-black hover:bg-white transition-colors uppercase tracking-wider font-bold text-xs border border-white/20 px-6 py-3 rounded-full text-white">GitHub</a>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto mt-16 text-center text-xs text-white/30 font-medium">
          © {new Date().getFullYear()} Adil Naz Muhammed. All rights reserved.
        </div>
      </footer>
    </div>
  );
}