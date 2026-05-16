import Link from "next/link";
import { Box, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-md pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Box className="w-6 h-6 text-primary-neon" />
              <span className="text-xl font-bold tracking-tighter text-white neon-text-blue">
                Next Layer 3D
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium 3D printing and custom modeling hub. We turn your ideas into physical reality with cutting-edge technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com/harsh.3dstudio?utm_source=qr&igsh=MXFsZGY4c3h0eGh2OA==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-neon transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/919997392335" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-neon transition-colors"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services/printing" className="hover:text-primary-neon transition-colors">3D Printing</Link></li>
              <li><Link href="/services/modeling" className="hover:text-primary-neon transition-colors">Custom 3D Modeling</Link></li>
              <li><Link href="/services/prototyping" className="hover:text-primary-neon transition-colors">Rapid Prototyping</Link></li>
              <li><Link href="/services/robotics" className="hover:text-primary-neon transition-colors">Robotics Parts</Link></li>
              <li><Link href="/services/cosplay" className="hover:text-primary-neon transition-colors">Cosplay Props</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-primary-neon transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-primary-neon transition-colors">Pricing</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary-neon transition-colors">Portfolio</Link></li>
              <li><Link href="/faq" className="hover:text-primary-neon transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-primary-neon transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-neon shrink-0 mt-0.5" />
                <span>Kaniya, Ramnagar,<br />Uttarakhand, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-neon shrink-0" />
                <span>+91 9997392335</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-neon shrink-0" />
                <a href="mailto:kumarh62058@gmail.com" className="hover:text-primary-neon transition-colors">kumarh62058@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Next Layer 3D Hub. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
