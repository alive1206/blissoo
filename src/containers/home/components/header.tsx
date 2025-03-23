import { Logo } from '@/components'
import { MENU_LIST } from '@/utils'

export const Header = () => {
  return (
    <section className="relative flex w-full items-center justify-between">
      <div className="w-[135px]">
        <Logo />
      </div>
      <div className="flex items-center gap-10">
        {MENU_LIST.map((menu) => (
          <div key={menu.id}>{menu.title}</div>
        ))}
      </div>
    </section>
  )
}
