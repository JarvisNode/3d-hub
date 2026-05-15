export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Next Layer 3D Hub</h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          We are a team of passionate engineers, designers, and makers dedicated to bringing your ideas to physical reality.
        </p>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-8 md:p-12 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Founded by robotics students and engineering enthusiasts, Next Layer 3D Hub aims to bridge the gap between digital concepts and tangible products. We believe that high-quality 3D printing and professional CAD modeling should be accessible to everyone—from hobbyists working in their garages to established businesses developing their next big product.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          By combining state-of-the-art FDM and SLA technologies with our expertise in mechanical design, we deliver exceptional precision, fast turnarounds, and unparalleled support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-2xl border border-white/10 p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li><strong>Expert Team:</strong> Our background in robotics and product design ensures we understand functional requirements, not just aesthetics.</li>
            <li><strong>Premium Quality:</strong> We use industrial-grade machines and carefully calibrated profiles.</li>
            <li><strong>Rapid Turnaround:</strong> Iteration is key. We strive to get prototypes in your hands as fast as possible.</li>
          </ul>
        </div>
        <div className="glass rounded-2xl border border-white/10 p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Our Technology</h3>
          <ul className="space-y-4 text-gray-400">
            <li><strong>FDM Printing:</strong> Multimaterial capabilities, strong engineering filaments (ABS, Nylon, Polycarbonate).</li>
            <li><strong>SLA Printing:</strong> High-resolution resin printing for incredible detail and smooth finishes.</li>
            <li><strong>Design Software:</strong> Industry-standard CAD tools for robust parametric modeling.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
