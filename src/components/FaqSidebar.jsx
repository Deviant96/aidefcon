import { X, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { mockFaqs } from '../data/mockData'

export default function FaqSidebar({ onClose }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900">FAQ</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FAQ items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {mockFaqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left px-4 py-3.5 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                <span
                  className={`text-gray-400 text-lg transition-transform duration-200 flex-shrink-0 ${
                    open === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3 whitespace-pre-line">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 text-xs text-gray-400 text-center">
          Still have questions? Email us at{' '}
          <a href="mailto:support@aidefcon.io" className="text-gray-700 underline">
            support@aidefcon.io
          </a>
        </div>
      </div>
    </div>
  )
}
