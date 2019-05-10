import React, { Component } from 'react';

import NodeProperties from './properties/NodeProperties';
import MapProperties from './properties/MapProperties';
import Animations from './animations/Animations';
import Styles from './styles/Styles';
import DataSources from './datasources/DataSources';
import Icon from '../icon/Icon';
import CommonButton from '../common/CommonButton';

class ImageConfigurations extends Component {
    static propTypes = {
        canvasRef: null,
        selectedItem: Object,
        onChange: undefined,
        onChangeAnimations: undefined,
        onChangeStyles: undefined,
        onChangeDataSources: undefined,
        animations: [],
        styles: [],
        dataSources: [],
    }

    state = {
        activeKey: 'map',
    }

    handlers = {
        onChangeTab: (activeKey) => {
            this.setState({
                activeKey,
            });
        },
        onCollapse: () => {
            this.setState({
                collapse: !this.state.collapse,
            });
        },
    }

    render() {
        const {
            onChange,
            selectedItem,
            canvasRef,
            animations,
            styles,
            dataSources,
            onChangeAnimations,
            onChangeStyles,
            onChangeDataSources,
        } = this.props;
        const { collapse, activeKey } = this.state;
        const { onChangeTab, onCollapse } = this.handlers;
        const className = classnames('app-editor-configurations', {
            minimize: collapse,
        });
        return (
            <div className={className}>
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    icon={collapse ? 'angle-double-left' : 'angle-double-right'}
                    onClick={onCollapse}
                    style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}
                />
                <Tabs
                    tabPosition="right"
                    style={{ height: '100%' }}
                    activeKey={activeKey}
                    onChange={onChangeTab}
                    tabBarStyle={{ marginTop: 60 }}
                >
                    <Tabs.TabPane tab={<Icon name="cog" />} key="map">
                        <MapProperties onChange={onChange} canvasRef={canvasRef} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<Icon name="cogs" />} key="node">
                        <NodeProperties onChange={onChange} selectedItem={selectedItem} canvasRef={canvasRef} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<Icon name="vine" prefix="fab" />} key="animations">
                        <Animations animations={animations} onChangeAnimations={onChangeAnimations} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<Icon name="star-half-alt" />} key="styles">
                        <Styles styles={styles} onChangeStyles={onChangeStyles} />
                    </Tabs.TabPane>
                    {/* <Tabs.TabPane tab={<Icon name="table" />} key="datasources">
                        <DataSources ref={(c) => { this.dataSourcesRef = c; }} dataSources={dataSources} onChangeDataSources={onChangeDataSources} />
                    </Tabs.TabPane> */}
                </Tabs>
            </div>
        );
    }
}

export default ImageConfigurations;
