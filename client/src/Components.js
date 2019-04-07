import React from 'react';
import { slide as Menu } from 'react-burger-menu';

//<img className={props.class} alt="logo" src={props.logo} />

const Logo = (props) => (
    <div className={props.logoDiv} >
      logo placeholder
    </div>
);

const Text = (props) => (
    <div className={props.class}>
        {props.text}
    </div>
);

const TopBar = (props) => (
  <div className="top-bar">
    <Text
      class="top-bar-title"
      text={'Добро пожаловать, ' + props.username + '.'}
    />
  </div>
);
const SideBar = (props) => (
  <Menu pageWrapId={'page-wrap'}>
    {props.nav.map(id => (
      <a href={'#'+id} className="side-bar-item" key={id}>
        {id}
      </a>
    ))}
  </Menu>
);

const Section = (props) => (
  <div className="section" id={props.Id}>
    <h4 className="section-header">
      {props.head}
    </h4>
    <p className="section-description">
      {props.description}
    </p>
    <Button />
  </div>
);
const FieldBox = (props) => (
    <div className="outerDiv">
      <h5 className="header">{props.fieldName}</h5>
      <div className="innerDiv">
        <input
          required
          type={props.type}
          id={props.fieldID}
          className="inputDefault"
          onChange={props.handler}
          value={props.value}
        />
      </div>
    </div>
);

const Button = (props) => (
    <button className="button" onClick={props.handler} type={props.type}>
      <div className="contents">
        {props.text}
      </div>
    </button>
);

export { Text, Logo, Button, FieldBox, SideBar, TopBar, Section }