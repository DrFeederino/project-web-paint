import React, { Component } from 'react';
import { FlexBox, FlexItem } from '../flex';
import i18n from 'i18next';

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
        {/*
                <FlexItem flex="auto">
                    <FlexBox className="rde-content-layout-title-content" alignItems="center">
                        {content}
                    </FlexBox>
                </FlexItem>
                */}
        <FlexItem>
          <FlexBox
            className="rde-content-layout-title-action"
            justifyContent="flex-end"
            alignItems="center"
          >
            {action}
          </FlexBox>
        </FlexItem>
        <FlexItem>
          <FlexBox
            className="rde-content-layout-title-action"
            justifyContent="flex-end"
            alignItems="center"
          >
            {this.welcomeUser('tester')}
          </FlexBox>
        </FlexItem>
      </FlexBox>
    );
  }
}

export default ImageTitle;
