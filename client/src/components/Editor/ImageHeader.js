import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { FlexBox, FlexItem } from '../flex';
import CanvasList from '../canvas/CanvasList';
import { CommonButton } from '../common';

class ImageHeaderToolbar extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
        selectedItem: PropTypes.object,
    }

    render() {
        const { canvasRef, selectedItem } = this.props;
        const isCropping = canvasRef ? canvasRef.interactionMode === 'crop' : false;
        return (
            <FlexBox className="app-editor-header-toolbar-container" flex="1">
                <FlexItem className="app-canvas-toolbar app-canvas-toolbar-list">
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        icon="layer-group"
                        tooltipTitle={i18n.t('action.canvas-list')}
                    />
                    <div className="app-canvas-list">
                        <CanvasList canvasRef={canvasRef} selectedItem={selectedItem} />
                    </div>
                </FlexItem>
                <FlexItem className="app-canvas-toolbar app-canvas-toolbar-alignment">
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.bringForward()}
                        icon="angle-up"
                        tooltipTitle={i18n.t('action.bring-forward')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.sendBackwards()}
                        icon="angle-down"
                        tooltipTitle={i18n.t('action.send-backwards')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.bringToFront()}
                        icon="angle-double-up"
                        tooltipTitle={i18n.t('action.bring-to-front')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.sendToBack()}
                        icon="angle-double-down"
                        tooltipTitle={i18n.t('action.send-to-back')}
                    />
                </FlexItem>
                <FlexItem className="app-canvas-toolbar app-canvas-toolbar-alignment">
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.alignmentHandlers.left()}
                        icon="align-left"
                        tooltipTitle={i18n.t('action.align-left')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.alignmentHandlers.center()}
                        icon="align-center"
                        tooltipTitle={i18n.t('action.align-center')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.alignmentHandlers.right()}
                        icon="align-right"
                        tooltipTitle={i18n.t('action.align-right')}
                    />
                </FlexItem>
                <FlexItem className="app-canvas-toolbar app-canvas-toolbar-group">
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.toGroup()}
                        icon="object-group"
                        tooltipTitle={i18n.t('action.object-group')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.toActiveSelection()}
                        icon="object-ungroup"
                        tooltipTitle={i18n.t('action.object-ungroup')}
                    />
                </FlexItem>
                <FlexItem className="app-canvas-toolbar app-canvas-toolbar-crop">
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={canvasRef ? canvasRef.cropHandlers.validType() : true}
                        onClick={() => canvasRef.cropHandlers.start()}
                        icon="crop"
                        tooltipTitle={i18n.t('action.crop')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={canvasRef ? !canvasRef.cropRect : true}
                        onClick={() => canvasRef.cropHandlers.finish()}
                        icon="check"
                        tooltipTitle={i18n.t('action.crop-save')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={canvasRef ? !canvasRef.cropRect : true}
                        onClick={() => canvasRef.cropHandlers.cancel()}
                        icon="times"
                        tooltipTitle={i18n.t('action.crop-cancel')}
                    />
                </FlexItem>
                <FlexItem className="app-canvas-toolbar app-canvas-toolbar-operation">
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.saveImage()}
                        icon="image"
                        tooltipTitle={i18n.t('action.image-save')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.duplicate()}
                        icon="clone"
                        tooltipTitle={i18n.t('action.clone')}
                    />
                    <CommonButton
                        className="app-action-btn"
                        shape="circle"
                        disabled={isCropping}
                        onClick={() => canvasRef.handlers.remove()}
                        icon="trash"
                        tooltipTitle={i18n.t('action.delete')}
                    />
                </FlexItem>
                {/* <FlexItem className="app-canvas-toolbar app-canvas-toolbar-history">
                    <Button className="app-action-btn" disabled={isCropping}>
                        <Icon name="undo-alt" style={{ marginRight: 8 }} />
                        {'Undo'}
                    </Button>
                    <Button className="app-action-btn" disabled={isCropping}>
                        {'Redo'}
                        <Icon name="redo-alt" style={{ marginLeft: 8 }} />
                    </Button>
                </FlexItem> */}
            </FlexBox>
        );
    }
}

export default ImageHeaderToolbar;
