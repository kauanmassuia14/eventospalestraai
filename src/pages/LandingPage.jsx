import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';

// Lazy load below-the-fold components
const SocialProof = lazy(() => import('../components/SocialProof'));
const Benefits = lazy(() => import('../components/Benefits'));
const Methodology = lazy(() => import('../components/Methodology'));
const Cases = lazy(() => import('../components/Cases'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const CTA = lazy(() => import('../components/CTA'));

const LandingPage = () => {
    return (
        <>
            <Hero />
            {/* Eagerly loaded to ensure smooth scroll from Hero */}
            <About />

            <Suspense fallback={<div className="w-full h-screen bg-black" />}>
                <SocialProof />
                <Benefits />
                <Methodology />
                <Cases />
                <Testimonials />
                <CTA />
            </Suspense>
        </>
    );
};

export default LandingPage;
