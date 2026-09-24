import PremiumPainPoint from '@/templates/drawgle/components/PremiumPainPoint';
import FloatingNav from '@/templates/drawgle/components/FloatingNav';
import DescribeToDesign from '@/templates/drawgle/components/DescribeToDesign';

export default function Page() {
  return (
    <main className="page-shell">
      <FloatingNav />
      {/* Spacer to prevent FloatingNav fixed overlap */}
      <div className="h-[74px] w-full invisible pointer-events-none" aria-hidden="true" />

      <section className="hero" aria-label="AI app design hero">
        <div className="hero-content">
          <a className="announcement" href="#">
            <span>NEW</span>
            AI App UI Designer
          </a>

          <h1>Design production ready mobile app UIs <span>in minutes</span></h1>
          <p className="subhead">Go from idea to beautiful app mockups in minutes by chatting with AI.</p>

          <form className="prompt-box">
            <label className="sr-only" htmlFor="app-idea">App idea</label>
            <textarea id="app-idea" placeholder="I want to design an app that..."></textarea>
            <button className="image-button" type="button" aria-label="Attach image">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="5" width="16" height="14" rx="2"></rect>
                <circle cx="9" cy="10" r="1.6"></circle>
                <path d="m5.8 17 4.4-4.2 3.1 3 2-2 3 3.2"></path>
              </svg>
            </button>
            <button className="submit-button" type="submit">
              Design it
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13"></path>
                <path d="m13 6 6 6-6 6"></path>
              </svg>
            </button>
          </form>
        </div>
      </section>

      <DescribeToDesign />

      <PremiumPainPoint />

      <section className="pain-point-section" aria-label="The Problem">
        <div className="pain-header">
          <h2>Your idea deserves better than a <span className="text-highlight">generic template</span></h2>
          <p>You can picture it perfectly. But existing tools spit out flat, boring wireframes you&apos;d be embarrassed to show an investor. Here is how Drawgle closes that gap.</p>
        </div>

        <div className="showcase-container">
          <div className="showcase-card showcase-before">
            <div className="showcase-inner">
              <div className="showcase-label">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                What existing AI gives you
              </div>
              <div className="showcase-visual">
                <div className="wireframe-mockup">
                  <div className="wf-nav"><div className="wf-logo"></div><div className="wf-menu"></div></div>
                  <div className="wf-hero"><div className="wf-title"></div><div className="wf-sub"></div></div>
                  <div className="wf-grid"><div className="wf-box"></div><div className="wf-box"></div></div>
                </div>
              </div>
              <div className="showcase-text">
                <h3>The &quot;Template&quot; Look</h3>
                <p>Flat interfaces with bland colors, rigid boxes, and zero personality. It looks like a machine made it.</p>
              </div>
            </div>
          </div>

          <div className="showcase-card showcase-after">
            <div className="showcase-inner">
              <div className="showcase-label showcase-label-brand">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>
                The Drawgle Standard
              </div>
              <div className="showcase-visual">
                <div className="premium-ui-mockup">
                  <div className="p-bg-glow"></div>
                  <div className="p-app-frame">
                    <div className="p-nav">
                      <div className="p-avatar"></div>
                      <div className="p-badge">Pro</div>
                    </div>
                    <div className="p-card-featured">
                        <div className="p-card-glass">
                          <div className="p-circle-chart"></div>
                          <div className="p-lines">
                            <div className="p-line w-full"></div>
                            <div className="p-line w-2-3"></div>
                          </div>
                        </div>
                    </div>
                    <div className="p-stats-row">
                      <div className="p-stat">
                        <div className="p-stat-val"></div>
                        <div className="p-stat-lbl"></div>
                      </div>
                      <div className="p-stat">
                        <div className="p-stat-val"></div>
                        <div className="p-stat-lbl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="showcase-text">
                <h3>Studio-Quality Design</h3>
                <p>Intentional colors, considered typography, and modern aesthetics. Ready for your pitch deck.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works" aria-label="How it works">
        <div className="hiw-header">
          <h2>From idea to app in <span className="text-highlight">3 simple steps</span></h2>
          <p>Skip the wire-framing and jump straight into high-fidelity design.</p>
        </div>

        <div className="steps-container">
          <article className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 11.5c-1.7.2-3-1.1-2.7-2.8.3-1.4 1.8-2.3 3.2-1.5.5-2.2 2.5-3.7 4.7-3.4 2 .3 3.6 1.9 3.9 3.9 1.8-.6 3.7.7 3.7 2.7 0 1.6-1.3 2.8-2.9 2.8"></path>
                <path d="M8 13.5c0 3 1.8 5 4 5s4-2 4-5"></path>
                <path d="M9.2 13.5 8 16"></path>
                <path d="m14.8 13.5 1.2 2.5"></path>
                <path d="M10.5 16h3"></path>
              </svg>
            </div>
            <h3>Describe your vision</h3>
            <p>Type a simple prompt describing your app&apos;s core purpose and features.</p>
          </article>

          <article className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.8 3.5 12 9.2l5.7 1.8-5.7 1.8-1.8 5.7-1.8-5.7L2.7 11l5.7-1.8 1.8-5.7 1.8 5.7 5.7 1.8"></path>
                <path d="m18.6 4.1.8 2.4 2.3.7-2.3.8-.8 2.3-.7-2.3-2.4-.8 2.4-.7.7-2.4Z"></path>
              </svg>
            </div>
            <h3>Refine with AI</h3>
            <p>Iterate instantly. Ask Drawgle to change colors, layouts, or add new screens.</p>
          </article>

          <article className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="7" width="16" height="11" rx="2"></rect>
                <path d="M4 11h16"></path>
                <path d="M8 15h3"></path>
                <path d="M14 15h2"></path>
              </svg>
            </div>
            <h3>Export code</h3>
            <p>Download production-ready React templates and start building immediately.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
