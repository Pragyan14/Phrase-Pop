import DemoSection from "@/components/DemoSection";
import HeaderSection from "@/components/HeaderSection";
import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <>

      <HeaderSection
        h1Text="Add epic captions to your videos changes by v2"
        h2Text="Just upload your videos and we will do the rest"
      />

      <div className="text-center">

        <UploadForm/>

      </div>

      <DemoSection/>

    </>
  );
}
