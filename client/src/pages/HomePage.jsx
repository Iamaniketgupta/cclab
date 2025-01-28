
import Footer from '../components/Home/Footer';
import HeroSection from '../components/Home/HeroSection';
import Navbar from '../components/Home/Navbar';
export default function HomePage() {
    return (
        <div className='min-h-screen  bg-black relative  text-white'>
            <img src="https://images.careerindia.com/college-photos/31812/16-mca-1024x681_1674534520.png"
                className="absolute bg-fixed inset-0 z-10 h-full w-full object-cover" alt="pcteitlabs" />
            <div className='absolute inset-0 z-20 bg-black opacity-60'></div>
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>

            <HeroSection />
            {/* <Footer /> */}
        </div>
    );
}

