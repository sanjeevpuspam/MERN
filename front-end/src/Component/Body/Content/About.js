import React, { Component } from 'react';

class About extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <b>Content Examples</b> represent an approach to training in which you can cross reference specialized example assets with corresponding documentation. Each Content Example consists of its own level within the Content Examples project. As you move through each level, you will see a series of numbered stands, each of which having its own example asset. By looking at the documentation for that Content Example and example number, you can read about how that example was created.

                You should feel free to open any examples within the Content Example levels, change or edit them, make your own versions of them, and learn from how they were assembled. You may also use any of the examples in your own levels.
            </React.Fragment>
        )
    }
}

export default About;
