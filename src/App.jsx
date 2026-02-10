import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// --- 样式配置 (将你原来的 CSS 转为 JS 对象) ---
const styles = {
  container: "bg-[#080808] min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden",
  nav: "fixed top-0 w-full p-[30px_50px] flex justify-between items-center z-[100] mix-blend-difference",
  logo: "font-[800] text-[1.2rem] tracking-[2px]",
  navLinks: "flex gap-[40px] text-[0.9rem] opacity-60",
  hero: "h-screen flex flex-col justify-center items-center text-center px-[10%] relative z-10",
  heroH1: "text-[clamp(3rem,10vw,8rem)] font-[700] leading-none mb-[20px] bg-gradient-to-b from-white to-[#444] bg-clip-text text-transparent",
  portfolio: "p-[100px_50px] grid grid-cols-1 md:grid-cols-2 gap-[80px] relative z-10",
  projectCard: "group relative w-full h-[600px] overflow-hidden rounded-[4px] bg-[#111]",
  glassInfo: "absolute bottom-[30px] left-[30px] p-[25px] w-[calc(100%-60px)] bg-white/5 backdrop-blur-[15px] border border-white/10 rounded-[12px] translate-y-[20px] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
};

const App = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // 1. 自定义鼠标逻辑
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.3 });
      gsap.to(followerRef.current, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.1 });
    };

    // 2. 页面进入动画
    gsap.from(".reveal", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    });

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // 鼠标悬停放大效果
  const onEnter = () => gsap.to(cursorRef.current, { scale: 3, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.3 });
  const onLeave = () => gsap.to(cursorRef.current, { scale: 1, backgroundColor: "transparent", duration: 0.3 });

  return (
    <div className={styles.container}>
      {/* 自定义鼠标 */}
      <div ref={cursorRef} className="fixed w-5 h-5 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference" />
      <div ref={followerRef} className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]" />

      <nav className={styles.nav}>
        <div className={styles.logo}>ARCHI.VU</div>
        <div className={styles.navLinks}>
          <a href="#" onMouseEnter={onEnter} onMouseLeave={onLeave} className="hover:opacity-100">PROJECTS</a>
          <a href="#" onMouseEnter={onEnter} onMouseLeave={onLeave} className="hover:opacity-100">ABOUT</a>
          <a href="#" onMouseEnter={onEnter} onMouseLeave={onLeave} className="hover:opacity-100">CONTACT</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <h1 className={`${styles.heroH1} reveal`}>CRAFTING<br />SPACE.</h1>
        <p className="reveal text-[#888]">Architecture & Urban Design Portfolio 2024-2026</p>
      </section>

      <section className={styles.portfolio}>
        {/* 项目 1 */}
        <div className={`${styles.projectCard} reveal`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <img 
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200" 
            className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90" 
            alt="Project" 
          />
          <div className={styles.glassInfo}>
            <h3 className="text-xl font-bold">The Concrete Pavilion</h3>
            <p className="text-[#888] text-sm">Minimalist Structure / Tokyo, Japan</p>
          </div>
        </div>

        {/* 项目 2 */}
        <div className={`${styles.projectCard} reveal md:mt-[-100px]`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200" 
            className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90" 
            alt="Project" 
          />
          <div className={styles.glassInfo}>
            <h3 className="text-xl font-bold">Glass Monolith</h3>
            <p className="text-[#888] text-sm">Office Architecture / New York</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;