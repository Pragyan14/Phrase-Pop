import UploadIcon from "@/components/UploadIcons";
import DemoSection from "@/components/DemoSection";
import HeaderSection from "@/components/HeaderSection";

export default function Home() {
  return (
    <>

      <HeaderSection 
        h1Text="Add epic captions to your videos"
        h2Text="Just upload your videos and we will do the rest"
      />

      <div className="text-center">
        <label className="bg-green-400 py-2 px-6 rounded-full inline-flex gap-2 cursor-pointer">
          <UploadIcon/>
          <span>Choose file</span>
          <input type="file" className="hidden"/>
        </label>
      </div>

      <DemoSection/>

    </>
  );
}
