'use client'

import { Header } from '@/components'
import { useGSAP } from '@gsap/react'
import { IMG_1, IMG_2, IMG_3, IMG_4 } from '@public/index'
import gsap from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'
export const Home = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const figRef = useRef<HTMLDivElement>(null)
  gsap.registerPlugin(useGSAP)

  const [active, setActive] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const goToSection = useCallback(
    (index: number) => {
      if (index >= 0 && index < 5 && !isScrolling) {
        setIsScrolling(true)
        setActive(index)
        setTimeout(() => {
          setIsScrolling(false)
        }, 500)
      }
    },
    [isScrolling]
  )

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isScrolling) {
        if (e.deltaY > 0) {
          goToSection(active + 1)
        } else {
          goToSection(active - 1)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('wheel', handleWheel)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('wheel', handleWheel)
      }
    }
  }, [active, goToSection, isScrolling])

  useEffect(() => {
    if (!figRef.current || !boxRef.current) return

    const images = Array.from(figRef.current.children) as HTMLElement[]
    images.forEach((img, index) => {
      gsap.set(img, {
        opacity: 0,
      })
    })

    if (active === 0 || active === 1) {
      gsap.to(images[0], {
        opacity: 1,
        scale: active === 0 ? 1.24 : 1,
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(images[active - 1], {
        opacity: 1,

        duration: 0.5,
        ease: 'power2.out',
      })
    }
    gsap.to(boxRef.current, {
      width: active !== 0 ? '50%' : '100%',
      ease: 'power2.out',
      duration: 0.5,
    })

    gsap.to(figRef.current, {
      borderRadius: active !== 0 ? '0 29px 29px 0' : '0',
      duration: 0.5,
    })
  }, [active])

  return (
    <>
      <Header />
      <main className="relative">
        <section className="relative mx-auto my-0 w-full">
          <div className="absolute top-0 left-0 h-[953px] w-full overflow-hidden">
            <div className="relative">
              <div className="absolute top-0 left-0 h-full w-full">
                <div className="fixed top-0 h-full w-full overflow-hidden" ref={boxRef}>
                  <figure className="relative h-full max-h-screen w-full overflow-hidden" ref={figRef}>
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full origin-[38%_0] object-cover object-[0_64.5%] transition-opacity duration-300 ease-linear"
                      src={IMG_1}
                      alt="BLISSO"
                    />
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full object-cover transition-opacity duration-300 ease-linear"
                      src={IMG_2}
                      alt="JISOO"
                    />
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full object-cover transition-opacity duration-300 ease-linear"
                      src={IMG_3}
                      alt="FILMOGRAPHY"
                    />
                    <img
                      className="absolute top-0 left-0 h-full max-h-screen w-full object-cover transition-opacity duration-300 ease-linear"
                      src={IMG_4}
                      alt="NEWS"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
