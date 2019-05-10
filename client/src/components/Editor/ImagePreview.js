import React, { Component } from 'react';

import Icon from '../icon/Icon';
import Canvas from '../canvas/Canvas';

class ImagePreview extends Component {
    static propTypes = {
        preview: false,
        onChangePreview: PropTypes.func,
        onTooltip: PropTypes.func,
        onAction: PropTypes.func,
    }

    state = {
        canvasRect: {
            width: 0,
            height: 0,
        },
    }

    componentDidMount() {
        this.resizeSensor = new ResizeSensor(this.container, (e) => {
            const { canvasRect: currentCanvasRect } = this.state;
            const canvasRect = Object.assign({}, currentCanvasRect, {
                width: this.container.clientWidth,
                height: this.container.clientHeight,
            });
            this.setState({
                canvasRect,
            });
        });
        this.setState({
            canvasRect: {
                width: this.container.clientWidth,
                height: this.container.clientHeight,
            },
        });
    }

    render() {
        const { canvasRect } = this.state;
        const { onChangePreview, onTooltip, onLink, preview } = this.props;
        return (
            <div className="app-preview">
                <div ref={(c) => { this.container = c; }} style={{ overvlow: 'hidden', display: 'flex', flex: '1', height: '100%' }}>
                    <Canvas
                        ref={(c) => { this.canvasRef = c; }}
                        editable={false}
                        canvasOption={{
                            width: canvasRect.width,
                            height: canvasRect.height,
                            backgroundColor: '#f3f3f3',
                            selection: false,
                        }}
                        onTooltip={onTooltip}
                        onLink={onLink}
                    />
                    <Button
                        className="app-action-btn app-preview-close-btn"
                        onClick={onChangePreview}
                    >
                        <Icon
                            name="times"
                            size={1.5}
                        />
                    </Button>
                </div>
            </div>
        );
    }
}

export default ImagePreview;
