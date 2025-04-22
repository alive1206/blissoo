import { Logo } from '@/components'
import { cn, MENU_LIST } from '@/utils'
import { useState } from 'react'

type Props = {
  active: number
}

export const Header: React.FC<Props> = ({ active }) => {
  const [langState, setLangState] = useState('EN')
  const [hoveredLang, setHoveredLang] = useState<string | null>(null)

  return (
    <header
      className="fixed top-0 z-50 h-[90px] w-full"
      style={{ color: active === 0 ? '#fff' : '', transition: active === 0 ? 'color 1s' : '' }}
    >
      <section className="mx-auto my-0 flex h-full w-full items-center justify-between p-[0_54px]">
        <div className="w-[135px]" style={{ fill: active === 0 ? '#fff' : '', transition: active === 0 ? 'fill 1s' : '' }}>
          <Logo />
        </div>
        <div className="flex items-center gap-[60px] text-[18px] font-medium uppercase">
          {MENU_LIST.map((menu) => (
            <div key={menu.id}>{menu.title}</div>
          ))}
          <div className="relative flex items-center gap-2">
            <div
              className={cn(
                'cursor-pointer transition-opacity duration-300 ease-linear',
                hoveredLang === 'KR' || (langState === 'KR' && hoveredLang === null) ? 'opacity-100' : 'opacity-50'
              )}
              onClick={() => setLangState('KR')}
              onMouseEnter={() => setHoveredLang('KR')}
              onMouseLeave={() => setHoveredLang(null)}
            >
              KR
            </div>
            <div
              className={cn(
                'cursor-pointer transition-opacity duration-300 ease-linear',
                hoveredLang === 'EN' || (langState === 'EN' && hoveredLang === null) ? 'opacity-100' : 'opacity-50'
              )}
              onClick={() => setLangState('EN')}
              onMouseEnter={() => setHoveredLang('EN')}
              onMouseLeave={() => setHoveredLang(null)}
            >
              EN
            </div>
            <div
              className={cn(
                'absolute -bottom-[.1vw] h-[1.5px] w-[30px] p-[0_.2vw] transition-transform duration-300 ease-linear',
                hoveredLang === 'KR' || (langState === 'KR' && hoveredLang === null)
                  ? '-translate-x-[2px]'
                  : 'translate-x-[31px]',
                active !== 0 ? 'bg-black' : 'bg-white'
              )}
            ></div>
          </div>
        </div>
      </section>
    </header>
  )
}
