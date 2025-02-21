import HeaderSection from "@/components/HeaderSection";
import UploadForm from "@/components/UploadForm";
import {Dropzone} from "@/components/DropZone";
import {FeaturesSection} from "@/components/FeaturesSection";
import {Footer} from "@/components/Footer";

export default function Home() {
    return (
        <>
            <div>
                <HeaderSection
                    h1Text="Enhance Your Videos with Smart Captions"
                    h2Text="PhrasePop automatically generates precise captions for your videos—ideal for content creators, educators, and businesses. "
                />
            </div>

            <div className={"text-center px-6 md:px-16 lg:px-16 sm:px-6"}>
                <UploadForm/>
            </div>

            <div className={"bg-white mt-24 py-16 px-6 md:px-16 lg:px-16 sm:px-6"}>
                <FeaturesSection/>
            </div>

            <div>
                <Footer/>
            </div>
        </>
    );
}
