export default function HeaderSection({
    h1Text = "Head",
    h2Text = "SubHead"
}){
    return(
        <section className="text-center mt-[150px] mb-8 px-6 md:px-16 lg:px-16 sm:px-6">
            <h1 className="text-5xl md:text-6xl  sm:text-4xl leading-[1.1]">
                {h1Text}
            </h1>
            <h2 className={"text-lg mt-6 text-[#4c5664] w-3/4 mx-auto md:w-2/4 sm:w-2/3"}>
                {h2Text}
            </h2>
        </section>
    )
}