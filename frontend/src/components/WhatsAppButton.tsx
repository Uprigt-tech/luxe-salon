import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent('Hello, I am interested in Luxe Men Salon franchise.')
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-6 z-[200] w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-3 bg-dark text-white text-xs font-label tracking-wider px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </button>
  )
}
