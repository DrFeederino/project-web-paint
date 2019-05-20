import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Tabs } from 'antd';
import Properties from './properties/Properties';
import Icon from '../icon/Icon';
import CommonButton from '../common/CommonButton';
import CanvasList from '../canvas/CanvasList';
import i18n from 'i18next';

class ImageConfigurations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'map',
      collapse: false
    };
  }
  static propTypes = {
    canvasRef: PropTypes.any,
    selectedItem: PropTypes.object,
    onChange: PropTypes.func
  };

  handlers = {
    onChangeTab: activeKey => {
      this.setState({
        activeKey
      });
    },
    onCollapse: () => {
      this.setState({
        collapse: !this.state.collapse
      });
    }
  };

  render() {
    const { onChange, selectedItem, canvasRef } = this.props;
    const { collapse, activeKey } = this.state;
    const { onChangeTab, onCollapse } = this.handlers;
    const className = classnames('rde-editor-configurations', {
      minimize: collapse
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
            <Properties onChange={onChange} canvasRef={canvasRef} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<Icon name="star-half-alt" />}>
            <CommonButton
              className="rde-action-btn"
              shape="circle"
              icon="layer-group"
              tooltipTitle={i18n.t('action.canvas-list')}
            />
            <div className="rde-canvas-list">
              <CanvasList canvasRef={canvasRef} selectedItem={selectedItem} />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ImageConfigurations;
