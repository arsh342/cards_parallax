'use client';
import styles from './page.module.scss';
import { projects } from '../data';
import Card from '../components/Card';
import { useScroll } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function Home() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0, // Change this to adjust the duration of the smooth scroll effect
            easing: (t) => t * (2 - t) // Custom easing function, if needed
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            // Cleanup code if needed
        };
    }, []);

    return (
        <main ref={container} className={styles.main}>
            {projects.map((project, i) => {
                const targetScale = 1 - ((projects.length - i) * 0.05);
                return (
                    <Card
                        key={`p_${i}`}
                        i={i}
                        {...project}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </main>
    );
}
