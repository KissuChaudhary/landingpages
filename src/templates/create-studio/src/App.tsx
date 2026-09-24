/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-brand-orange selection:text-white">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
