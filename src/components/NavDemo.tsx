'use client';

export default function NavDemo() {
  return (
    <section className="min-h-screen bg-gray-900 py-32 flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-white mb-8">
          Navigation Test
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Scroll up and down to see the pinned navigation behavior.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Pinned</h3>
            <p className="text-gray-300">The navbar stays at the top using ScrollTrigger pin</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Smooth</h3>
            <p className="text-gray-300">Navigation links use smooth scrolling</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Responsive</h3>
            <p className="text-gray-300">Background opacity changes on scroll</p>
          </div>
        </div>
      </div>
    </section>
  );
}