import CircleButton from "./CircleButton";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";

const WaterlooCSRing = () => {
    return(
        <div className="flex justify-center items-center">
            {/* CS Ring */}
            <a href="https://cs.uwatering.com/#artyomg.com/waterloo-cs-ring?nav=prev" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <CircleButton radius={50} strokeWidth={3}>
                    <Image src={arrow} alt="arrow" className="rotate-180" />
                </CircleButton>
            </a>
            <a href="https://cs.uwatering.com/#artyomg.com" target="_blank" rel="noopener noreferrer" className="inline-flex">
                <CircleButton radius={80} strokeWidth={4}>
                    <a href="https://cs.uwatering.com/#artyomg.com/waterloo-cs-ring" target="_blank">
                        <img src="https://cs.uwatering.com/icon.white.svg" alt="CS Webring" className="w-[66px] opacity-[0.8] translate-x-[3px] translate-y-[4px]"/>
                    </a>
                </CircleButton>
            </a>
            <a href="https://cs.uwatering.com/#artyomg.com/waterloo-cs-ring?nav=next" target="_blank" rel="noopener noreferrer">
                <CircleButton radius={50} strokeWidth={3}>
                    <Image src={arrow} alt="arrow" />
                </CircleButton>
            </a>
        </div>
    );
}

export default WaterlooCSRing;
