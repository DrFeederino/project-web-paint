import React, { Component } from 'react';
import { FlexBox, FlexItem } from '../flex';
import i18n from 'i18next';
import { Switch, Icon } from 'antd';

class ImageTitle extends Component {
  welcomeUser = name => i18n.t('user.welcome') + name + '!';
  render() {
    const { title, action } = this.props;
    return (
      <FlexBox
        className="rde-content-layout-title"
        alignItems="center"
        flexWrap="wrap"
      >
        <FlexItem flex="1 1 auto">
          <FlexBox
            className="rde-content-layout-title-title"
            justifyContent="flex-start"
            alignItems="center"
          >
            {title instanceof String ? <h3>{title}</h3> : title}
          </FlexBox>
        </FlexItem>
        <FlexItem flex="1 1 auto">
          <FlexBox
            className="rde-content-layout-title-title"
            justifyContent="flex-start"
            alignItems="center"
          >
            {this.welcomeUser('tester')}
          </FlexBox>
        </FlexItem>
        <span style={{ marginRight: '5px' }}>{i18n.t('editor.darkTheme')}</span>
        <Switch
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
          onChange={this.props.onChange}
        />
        <FlexItem>
          <FlexBox
            className="rde-content-layout-title-action"
            justifyContent="flex-end"
            alignItems="center"
          >
            {action}
          </FlexBox>
        </FlexItem>
      </FlexBox>
    );
  }
}

export default ImageTitle;
