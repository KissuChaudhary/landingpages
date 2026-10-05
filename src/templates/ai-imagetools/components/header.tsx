"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Globe } from "lucide-react"
import { useTranslations } from '@/templates/ai-imagetools/lib/i18n'
import { Logo } from "./logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const t = useTranslations("Header")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  const mainNavItems = useMemo(
    () => [
      { href: "#", label: t("Home") },
      { href: "#features", label: t("Blog") },
    ],
    [t],
  )

  const toolsNavItems = useMemo(
    () => [
      { href: "#tools", label: t("AIimageGenerator") },
      { href: "#tools", label: t("removeBg") },
      { href: "#tools", label: t("upscaler") },
      { href: "#tools", label: t("colorize") },
      { href: "#tools", label: t("restorer") },
      { href: "#tools", label: t("enhance") },
      { href: "#tools", label: t("captionGenerator") },
      { href: "#tools", label: t("imageToText") },
      { href: "#tools", label: t("aiBlemish") },
      { href: "#tools", label: t("aiAcne") },
      { href: "#tools", label: t("aiRetouch") },
    ],
    [t],
  )

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-transparent px-4 py-1 mt-2" : "bg-[#0B0F17]"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center ${
          isScrolled ? "bg-[#0B0F17] backdrop-blur-md shadow-sm rounded-lg px-6 h-14 border border-gray-800" : "px-4 h-16"
        }`}
      >
        <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <Link
            href="#"
            className="flex text-lg items-center gap-2 font-semibold transition-colors duration-300 text-white"
          >
            <Logo />
            {t("title")}
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {mainNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white hover:text-gray-300 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <div className="relative inline-block text-left">
              <button
                type="button"
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white hover:text-gray-300 focus:outline-none"
              >
                {t("allTools")}
                <ChevronDown className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
              </button>
              {isToolsOpen && (
                <div
                  onMouseLeave={() => setIsToolsOpen(false)}
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-[#0B0F17] shadow-lg ring-1 ring-gray-700 focus:outline-none py-1 z-50 max-h-72 overflow-y-auto"
                >
                  {toolsNavItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsToolsOpen(false)}
                      className="group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-800/80 text-gray-300 border border-gray-700">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>EN</span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-300 border border-gray-700">
              <Globe className="w-3 h-3 text-cyan-400" /> EN
            </div>
            <button
              className="transition-colors duration-300 text-white p-1"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 rounded-lg mt-2 border-t bg-[#0B0F17] backdrop-blur-md shadow-sm border-gray-800 transition-all duration-300 ease-in-out p-2 max-h-80 overflow-y-auto">
            {[...mainNavItems, ...toolsNavItems].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2.5 px-4 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
                onClick={toggleMenu}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;
