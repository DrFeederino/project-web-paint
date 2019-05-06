import React, { Component } from 'react';

class Renderer extends Component {
    constructor(props) {
        super(props);
        //to-do
        this.state = {
            imageBase64: null,
            operations: [],
        }
    }

    getImage = (img) => {
        return img;
    }
}

export default Renderer;