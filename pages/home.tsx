import HomeFeatures from "@/components/HomeFeatures";
import Navbar from "@/components/navbar/Navbar";

function Home() {
    return (
        <div className="flex flex-col">
            {/* <Navbar></Navbar> */}
           <HomeFeatures></HomeFeatures> 
        </div>
    )
}

export default Home;