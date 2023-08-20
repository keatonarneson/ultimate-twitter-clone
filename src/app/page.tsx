import LeftSidebar from '@/components/LeftSidebar';
import Main from '@/components/Main';
import RightSection from '@/components/RightSection';

const Home = async () => {
    return (
        <div className="w-full h-full flex justify-center items-center text-white relative bg-black">
            <div className="xl:max-w-[70vw] w-full h-full flex relative ">
                <LeftSidebar />
                <Main />
                <RightSection />
            </div>
        </div>
    );
};

export default Home;
