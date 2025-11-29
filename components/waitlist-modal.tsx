"use client"

import { useEffect, useRef, ReactNode, useState, cloneElement, isValidElement } from "react"
import { X } from "lucide-react"

interface WaitlistModalProps {
  children: ReactNode
}

export function WaitlistModal({ children }: WaitlistModalProps) {
  const [open, setOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Load Tally script only once
  useEffect(() => {
    if (typeof window === "undefined") return

    const scriptId = "tally-embed-script"
    
    // Check if script already exists
    if (document.getElementById(scriptId)) {
      // Script already loaded, just initialize embeds
      if (typeof (window as any).Tally !== "undefined") {
        ;(window as any).Tally.loadEmbeds()
      }
      return
    }

    // Load the script
    const script = document.createElement("script")
    script.id = scriptId
    script.src = "https://tally.so/widgets/embed.js"
    script.async = true
    script.onload = () => {
      // Initialize embeds after script loads
      if (typeof (window as any).Tally !== "undefined") {
        ;(window as any).Tally.loadEmbeds()
      } else {
        // Fallback: initialize any iframes with data-tally-src
        document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe: any) => {
          iframe.src = iframe.dataset.tallySrc
        })
      }
    }
    script.onerror = () => {
      // Fallback: initialize any iframes with data-tally-src
      document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe: any) => {
        iframe.src = iframe.dataset.tallySrc
      })
    }
    document.body.appendChild(script)

    return () => {
      // Don't remove the script on unmount as it might be used elsewhere
    }
  }, [])

  // Initialize Tally embeds when modal opens
  useEffect(() => {
    if (open && typeof (window as any).Tally !== "undefined") {
      // Small delay to ensure iframe is mounted
      setTimeout(() => {
        ;(window as any).Tally.loadEmbeds()
      }, 100)
    } else if (open) {
      // Fallback: initialize any iframes with data-tally-src
      setTimeout(() => {
        document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe: any) => {
          iframe.src = iframe.dataset.tallySrc
        })
      }, 100)
    }
  }, [open])

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open])

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setOpen(false)
    }
  }

  // Clone children and add onClick handler to open modal
  const trigger = isValidElement(children)
    ? cloneElement(children, {
        ...children.props,
        onClick: (e: React.MouseEvent) => {
          setOpen(true)
          // Call original onClick if it exists
          if (children.props.onClick) {
            children.props.onClick(e)
          }
        },
      })
    : children

  return (
    <>
      {trigger}
      {open && (
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={handleOverlayClick}
          >
            {/* Modal */}
            <div
              ref={modalRef}
              className="relative bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 w-full max-w-[520px] min-w-[320px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 text-white opacity-60 hover:opacity-100 transition-opacity p-1"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tally Form */}
              <div className="w-full">
                <iframe
                  data-tally-src="https://tally.so/embed/44ao0o?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                  loading="lazy"
                  width="100%"
                  height="1007"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Lista de Espera Recobra"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

