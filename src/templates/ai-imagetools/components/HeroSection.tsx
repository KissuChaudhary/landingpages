import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Sparkle } from 'lucide-react'
import { Button } from "./ui/button"
import AnimatedGradientText from "./ui/animated-gradient-text"
import { useTranslations } from '@/templates/ai-imagetools/lib/i18n'
import StatsBar from "./stats-bar"
import { SparklesText } from "./ui/sparkles-text"




export default function HeroSection() {
    const t = useTranslations('Index.hero')
  return (
    <div className="bg-[linear-gradient(135deg,#000_0%,#000_25%,#000_100%)] text-white min-h-screen overflow-x-hidden pt-24">
      <div
        className="hero-section pt-20 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgb(255 255 255 / 10%) 1.5px, #ffffff00 0), linear-gradient(90deg, rgb(253 253 253 / 10%) 1.5px, #ffffff00 0)",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          backgroundSize: "60px 60px",
        }}
      >
        <div className="container mx-auto px-4 pt-4 max-w-4xl">
          <div className="relative w-fit px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto flex flex-col items-center justify-center space-y-4 text-center z-40 backdrop-blur-[2px]">
              <div className="flex justify-center w-full mb-4">
              <a
                href="https://www.producthunt.com/posts/lexistock-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-lexistock&#0045;ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=816411&theme=dark&t=1737882282032"
                  alt="LexiStock&#0032;AI - Let&#0032;AI&#0032;Take&#0032;Your&#0032;Photos&#0032;to&#0032;the&#0032;Next&#0032;Level | Product Hunt"
                  style={{ width: "200px", height: "43px" }}
                  width="200"
                  height="43"
                />
              </a>
            </div>
            <AnimatedGradientText className="bg-background backdrop-blur-0 flex items-center">
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-muted" />{" "}
              <span className="inline animate-gradient bg-gradient-to-r from-primary via-secondary to-primary bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              {t('newFeature')} 
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
            
            <h1 className="text-5xl sm:text-5xl md:text-6xl font-bold text-center mb-4 relative">
            {t('titlePart1')}  <span className="bg-[#E8E3D9] rotate-[-2deg] text-[#1C1C1C] px-3 py-1 mt-2 rounded-md inline-block"><SparklesText text={t('titleHighlight')} /></span>
          
          </h1>

            <p className="mx-auto max-w-3xl text-gray-300 text-sm xs:text-base sm:text-lg md:text-xl mb-8">
            {t('description')}
            </p>

            <Link href="/tools/ai-image-generator">
              <Button className="rounded-md text-base border-b mt-8 h-12">
                <Sparkle className="mr-2" />
                {t('cta')}
                <Sparkle className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-24">

        <Image
          src="/image2.jpeg"
          alt="Colorful portrait"
          width={300}
          height={450}
          className="absolute left-[5%] -translate-y-1/2 top-1/2 -rotate-[15deg] rounded-3xl shadow-lg hidden lg:block"
        />
        <Image
          src="/image1.jpeg"
          alt="Space cat"
          width={300}
          height={450}
          className="absolute right-[5%] -translate-y-1/2 top-1/2 rotate-[15deg] rounded-3xl shadow-lg hidden lg:block"
        />
         </div>

      </div>
      <div className="pb-24 px-4 max-w-7xl mx-auto">
          <StatsBar />
        </div>
    </div>
  )
}
