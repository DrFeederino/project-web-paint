import React from 'react';

const Logo = (props) => (
    <div className={props.logoDiv} >
        <img className={props.class} alt="logo" src={props.logo} />
    </div>
);

const Text = (props) => (
    <div className={props.class}>
        {props.text}
    </div>
);

const FieldBox = (props) => (
    <div className="outerDiv">
      <h5 className="header">{props.fieldName}</h5>
      <div className="innerDiv">
        <input
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
    <button className="button" onClick={props.handler}>
      <div className="contents">
        {props.text}
      </div>
    </button>
);

export { Text, Logo, Button, FieldBox }