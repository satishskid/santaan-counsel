import { useNavigate } from 'react-router-dom';
import { 
  ClipboardDocumentListIcon, 
  ChatBubbleLeftRightIcon, 
  HeartIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BeakerIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ClipboardDocumentListIcon,
      title: 'Timeline-Driven Care',
      description: 'Every patient journey becomes a living, chronological document capturing all interactions and decisions.'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: '810+ Communication Templates',
      description: 'Pre-built messages in multiple languages ensure consistent, compassionate communication at every stage.'
    },
    {
      icon: HeartIcon,
      title: 'Reaction & Anxiety Tracking',
      description: 'Capture patient emotional state and understanding after every communication for better care.'
    },
    {
      icon: BeakerIcon,
      title: '7 Treatment Protocols',
      description: 'Standardized IVF protocols with automated action series and medication schedules.'
    },
    {
      icon: DocumentTextIcon,
      title: 'Medical Acronym Expansion',
      description: 'Automatically expands 16+ common IVF acronyms to full medical terms for clarity.'
    },
    {
      icon: ChartBarIcon,
      title: 'Performance Analytics',
      description: 'Track clinic metrics, treatment outcomes, and staff performance in real-time.'
    },
    {
      icon: UserGroupIcon,
      title: 'Multi-Role Access',
      description: 'Role-based permissions for doctors, nurses, counselors, embryologists, and receptionists.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'HIPAA-Compliant',
      description: 'Enterprise-grade security with encryption, audit trails, and automated backups.'
    }
  ];

  const stats = [
    { value: '810+', label: 'Communication Templates' },
    { value: '7', label: 'Treatment Protocols' },
    { value: '6', label: 'User Roles' },
    { value: '2', label: 'Languages Supported' }
  ];

  const roles = [
    { role: 'Clinic Admin', access: 'Full system access, user management, reports' },
    { role: 'Doctor', access: 'Clinical oversight, treatment plans, protocol selection' },
    { role: 'Nurse', access: 'Timeline events, patient communication, daily care' },
    { role: 'Counselor', access: 'Emotional tracking, counseling notes, anxiety monitoring' },
    { role: 'Embryologist', access: 'Lab results, embryo updates, quality grading' },
    { role: 'Receptionist', access: 'Patient registration, scheduling, check-ins' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Santaan IVF Platform
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Transform IVF patient care through timeline-driven documentation and staff-mediated communication
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold text-lg hover:bg-primary-50 transition duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started →
              </button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold text-lg hover:bg-primary-400 transition duration-200 border-2 border-white"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-50 border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-700 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary-50 rounded-lg p-8 border-2 border-primary-200">
              <p className="text-xl font-semibold text-primary-700 mb-4">
                Events → Templates → Communication → Reaction Capture → Timeline Update
              </p>
              <p className="text-gray-600">
                Every patient interaction follows this proven workflow, ensuring consistent care, 
                comprehensive documentation, and data-driven insights that improve outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools designed specifically for IVF clinics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-200">
                <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Roles Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Your Entire Team</h2>
          <p className="text-xl text-gray-600">
            Role-based access ensures everyone has the tools they need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-primary-400 transition duration-200">
              <h3 className="text-lg font-semibold text-primary-700 mb-2">{item.role}</h3>
              <p className="text-gray-600 text-sm">{item.access}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Santaan Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Patient Journey Starts</h3>
              <p className="text-primary-100">
                Initial consultation creates patient timeline. Every interaction is logged chronologically.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Protocol & Communication</h3>
              <p className="text-primary-100">
                Doctor selects treatment protocol. Staff uses templates for consistent patient communication.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Track & Optimize</h3>
              <p className="text-primary-100">
                Capture reactions, monitor anxiety, analyze outcomes. Continuous improvement through data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-green-50 rounded-lg p-8 border-2 border-green-200">
          <div className="flex items-start gap-6">
            <ShieldCheckIcon className="h-16 w-16 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise-Grade Security</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                <div>✅ HIPAA-equivalent data protection</div>
                <div>✅ Encryption at rest and in transit</div>
                <div>✅ Daily automated backups</div>
                <div>✅ Complete audit trail</div>
                <div>✅ Role-based access control</div>
                <div>✅ SOC 2 compliant infrastructure</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Deployment</h2>
            <p className="text-xl text-gray-600">
              Single Docker Compose deployment. Runs on AWS, DigitalOcean, or Railway.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-700 mb-2">$12-50</div>
                <div className="text-gray-600">Monthly hosting cost</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-700 mb-2">&lt; 15 min</div>
                <div className="text-gray-600">Setup time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-700 mb-2">SSL</div>
                <div className="text-gray-600">Auto Let&apos;s Encrypt</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your IVF Clinic?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join clinics using Santaan to improve patient outcomes through better documentation and communication.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-12 py-4 bg-white text-primary-700 rounded-lg font-semibold text-xl hover:bg-primary-50 transition duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Today →
          </button>
          <p className="text-primary-200 mt-6 text-sm">
            Demo credentials: admin / demo / admin123
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold text-white">Santaan</p>
              <p className="text-sm">IVF Clinic Management Platform</p>
            </div>
            <div className="text-sm text-center md:text-right">
              <p>© 2026 Santaan. All rights reserved.</p>
              <p className="mt-1">Built with ❤️ for better IVF care</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
