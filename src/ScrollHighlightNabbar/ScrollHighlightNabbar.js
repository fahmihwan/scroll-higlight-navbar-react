import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ScrollHighlightNabbar.css";

/**
 * @param {number} currentPosition Current Scroll position
 * @param {Array} sectionPositionArray Array of positions of all sections
 * @param {number} startIndex Start index of array
 * @param {number} endIndex End index of array
 * @return {number} Current Active index
 */
const nearestIndex = (
    currentPosition,
    sectionPositionArray,
    startIndex,
    endIndex
) => {
    if (startIndex === endIndex) return startIndex;
    else if (startIndex === endIndex - 1) {
        if (
            Math.abs(
                sectionPositionArray[startIndex].headerRef.current.offsetTop -
                currentPosition
            ) <
            Math.abs(
                sectionPositionArray[endIndex].headerRef.current.offsetTop -
                currentPosition
            )
        )
            return startIndex;
        else return endIndex;
    } else {
        var nextNearest = ~~((startIndex + endIndex) / 2);
        var a = Math.abs(
            sectionPositionArray[nextNearest].headerRef.current.offsetTop -
            currentPosition
        );
        var b = Math.abs(
            sectionPositionArray[nextNearest + 1].headerRef.current.offsetTop -
            currentPosition
        );
        if (a < b) {
            return nearestIndex(
                currentPosition,
                sectionPositionArray,
                startIndex,
                nextNearest
            );
        } else {
            return nearestIndex(
                currentPosition,
                sectionPositionArray,
                nextNearest,
                endIndex
            );
        }
    }
};

export default function ScrollHighlightNabbar({ navHeader }) {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const handleScroll = (e) => {
            var index = nearestIndex(
                window.scrollY,
                navHeader,
                0,
                navHeader.length - 1
            );
            setActiveIndex(index);
        };
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="navContainer">
            {navHeader.map((header, index) => (
                <a
                    key={index + header.headerID}
                    className="navlink"
                    style={{ backgroundColor: activeIndex === index ? "red" : "green" }}
                    href={`#${header.headerID}`}
                >
                    {header.headerTitle}
                </a>
            ))}
        </div>
    );
}

ScrollHighlightNabbar.propTypes = {
    navHeader: PropTypes.arrayOf(
        PropTypes.shape({
            headerID: PropTypes.string,
            headerRef: PropTypes.object.isRequired,
            headerTitle: PropTypes.string.isRequired
        })
    ).isRequired
};
