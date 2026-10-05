import Image from "next/image"
import { useTranslations } from '@/templates/ai-imagetools/lib/i18n'

const avatars = ["/avatars/avatar1.webp", "/avatars/avatar2.webp", "/avatars/avatar3.webp"]

export default function StatsBar() {
  const t = useTranslations('Index.stats')

  return (
    <div className="bg-zinc-900/90 backdrop-blur-sm rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 w-full mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="flex -space-x-2 mb-2">
          {avatars.map((avatar, i) => (
            <Image
              key={i}
              src={avatar || "/placeholder.svg"}
              alt=""
              width={32}
              height={32}
              className="rounded-full border-2 border-zinc-900"
            />
          ))}
        </div>
        <div className="font-bold text-3xl">{t('assetsCount')}</div>
        <div className="text-sm text-zinc-400">{t('assetsCreated')}</div>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="flex -space-x-2 mb-2">
          {avatars.map((avatar, i) => (
            <Image
              key={i}
              src={avatar || "/placeholder.svg"}
              alt=""
              width={32}
              height={32}
              className="rounded-full border-2 border-zinc-900"
            />
          ))}
        </div>
        <div className="font-bold text-3xl">{t('usersCount')}</div>
        <div className="text-sm text-zinc-400">{t('happyUsers')}</div>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-8 mb-2">
          <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
        </div>
        <div className="font-bold text-3xl">{t('topRated')}</div>
        <div className="text-sm text-zinc-400">{t('industryRecognition')}</div>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-8 mb-2">
          <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
        </div>
        <div className="font-bold text-3xl flex items-center">
          {t('satisfactionPercentage')}
        </div>
        <div className="text-sm text-zinc-400">{t('userSatisfaction')}</div>
      </div>
    </div>
  )
}
