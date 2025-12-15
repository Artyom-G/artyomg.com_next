const WaterlooCSRing = () => {
    const idleOpacity = "opacity-60";
    const hoverOpacity = "hover:opacity-90";

    return(
        <div className="flex flex-col">
            <span className="inline-flex gap-2 justify-end text-xs text-white opacity-50">
                Waterloo CS Ring:
            </span>
            <span className="inline-flex gap-2 justify-end">
                <a className={`${idleOpacity} ${hoverOpacity} transition-opacity duration-200`} href='https://cs.uwatering.com/#https://artyomg.com?nav=prev'>←</a>
                <a className={`${idleOpacity} ${hoverOpacity} transition-opacity duration-200`} href='https://cs.uwatering.com/#https://artyomg.com' target='_blank'>
                    <img
                        src='https://cs.uwatering.com/icon.white.svg'
                        alt='CS Webring'
                        className={`${idleOpacity} ${hoverOpacity} transition-opacity duration-200 translate-y-[5px] w-[20px]`}
                    />
                </a>
                <a className={`${idleOpacity} ${hoverOpacity} transition-opacity duration-200`} href='https://cs.uwatering.com/#https://artyomg.com?nav=next'>→</a>
            </span>
        </div>
    );
}

export default WaterlooCSRing;
