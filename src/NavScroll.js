
// ES6 Imports
import React from 'react';
import * as Scroll from 'react-scroll';
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll'

// Or Access Link,Element,etc as follows
// let Link = Scroll.Link;
// let Button = Scroll.Button;
// let Element = Scroll.Element;
// let Events = Scroll.Events;
// let scroll = Scroll.animateScroll;
// let scrollSpy = Scroll.scrollSpy;


var Section = React.createClass({
    componentDidMount: function () {
        Events.scrollEvent.register('begin', function (to, element) {
            console.log('begin', arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            console.log('end', arguments);
        });

        scrollSpy.update();
    },
    componentWillUnmount: function () {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    },
    scrollToTop: function () {
        scroll.scrollToTop();
    },
    scrollToBottom: function () {
        scroll.scrollToBottom();
    },
    scrollTo: function () {
        scroll.scrollTo(100);
    },
    scrollMore: function () {
        scroll.scrollMore(100);
    },
    handleSetActive: function (to) {
        console.log(to);
    },
    render: function () {
        return (
            <div>
                <Scroll.Link activeClass="active" to="test1" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>
                    Test 1
                </Scroll.Link>
                <Scroll.Link activeClass="active" to="test1" spy={true} smooth={true} offset={50} duration={500} delay={1000}>
                    Test 2 (delay)
                </Scroll.Link>
                <Scroll.Link className="test6" to="anchor" spy={true} smooth={true} duration={500}>
                    Test 6 (anchor)
                </Scroll.Link>
                <Scroll.Button activeClass="active" className="btn" type="submit" value="Test 2" to="test2" spy={true} smooth={true} offset={50} duration={500} >
                    Test 2
                </Scroll.Button>

                <Scroll.Element name="test1" className="element">
                    test 1
                </Scroll.Element>

                <Scroll.Element name="test2" className="element">
                    test 2
                </Scroll.Element>

                <div id="anchor" className="element">
                    test 6 (anchor)
                </div>

                <Scroll.Link to="firstInsideContainer" containerId="containerElement">
                    Go to first element inside container
                </Scroll.Link>

                <Scroll.Link to="secondInsideContainer" containerId="containerElement">
                    Go to second element inside container
                </Scroll.Link>
                <div className="element" id="containerElement">
                    <Scroll.Element name="firstInsideContainer">
                        first element inside container
                    </Scroll.Element>

                    <Scroll.Element name="secondInsideContainer">
                        second element inside container
                    </Scroll.Element>
                </div>

                <a onClick={this.scrollToTop}>To the top!</a>
                <br />
                <a onClick={this.scrollToBottom}>To the bottom!</a>
                <br />
                <a onClick={this.scrollTo}>Scroll to 100px from the top</a>
                <br />
                <a onClick={this.scrollMore}>Scroll 100px more from the current position!</a>
            </div>
        );
    }
});

React.render(
    <Section />,
    document.getElementById('example')
);