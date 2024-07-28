import React, { useEffect } from 'react'

/** Animation type. */
type Animation = {
    threshold: number
    animationClass: string
}

/** Element animation config. */
type AnimationConfig = {
    ref: React.RefObject<HTMLElement>
    animations: Animation[]
}

/** Define use animate function. */
const useAnimate = (elements: AnimationConfig[]) => {
    useEffect(() => {
        if (!elements || elements.length === 0) return

        const observers = elements.map(({ ref, animations }) => {
            if (!ref.current) return null

            const observer = new IntersectionObserver(
                ([entry]) => {
                    animations.forEach(({ threshold, animationClass }) => {
                        if (entry.intersectionRatio >= threshold) {
                            ref.current?.classList.add(animationClass)
                        } else {
                            ref.current?.classList.remove(animationClass)
                        }
                    })
                },
                {
                    threshold: animations.map((anim) => anim.threshold),
                },
            )

            observer.observe(ref.current)
            return observer
        })

        return () => {
            observers.forEach((observer) => observer?.disconnect())
        }
    }, [elements])
}

export default useAnimate
