import { useEffect, useState } from "react";

const TypeWriter = ({
    text,
    start = true,
    speed = 40,
    onComplete,
    completedGlobal = false,
    lastColor = false, // new prop: last 50% color
}) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        if (!start || completedGlobal) return;

        let index = 0;
        setDisplayText("");

        const interval = setInterval(() => {
            index++;
            const currentText = text.slice(0, index);

            if (lastColor) {
                const splitIndex = Math.floor(text.length / 3); // last 50%
                const colored = (
                    <>
                        <span>{currentText.slice(0, splitIndex)}</span>
                        <span className="text-[#FAED0B]">{currentText.slice(splitIndex)}</span>
                    </>
                );
                setDisplayText(colored);
            } else {
                setDisplayText(currentText);
            }

            if (index === text.length) {
                clearInterval(interval);
                onComplete && onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, start, speed, onComplete, completedGlobal, lastColor]);

    return (
        <span>
            {displayText}
            {!completedGlobal && <span className="animate-pulse">|</span>}
        </span>
    );
};

export default TypeWriter;