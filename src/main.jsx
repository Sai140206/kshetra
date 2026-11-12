import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('KSHETRA ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('kshetra_user');
    sessionStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAF6] text-gray-900 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-3xl shadow-inner">
              🌱
            </div>
            <h2 className="text-xl font-black text-gray-950">
              क्षेत्र प्लॅटफॉर्म (KSHETRA)
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              ॲप्लिकेशन लोड करताना अनपेक्षित समस्या आली. कृपया रीलोड करा किंवा रीसेट करा.
            </p>
            <div className="flex gap-2.5 justify-center pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all"
              >
                पुन्हा लोड करा (Reload)
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
              >
                रीसेट करा (Reset)
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
