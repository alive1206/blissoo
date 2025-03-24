import { Logo } from '@/components'
import { MENU_LIST } from '@/utils'

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 h-[90px] w-full text-white">
      <section className="mx-auto my-0 flex h-full w-full items-center justify-between p-[0_54px]">
        <div className="w-[135px]">
          <Logo />
        </div>
        <div className="flex items-center gap-[60px] text-xl uppercase">
          {MENU_LIST.map((menu) => (
            <div key={menu.id}>{menu.title}</div>
          ))}
          <div className="flex items-center gap-2">
            <div className="opacity-70">KR</div>
            <div className="border-b px-1">EN</div>
          </div>
        </div>
      </section>
    </header>
  )
}
