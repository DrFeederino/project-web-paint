import React from 'react';
import { slide as Menu } from 'react-burger-menu';

//<img className={props.class} alt="logo" src={props.logo} />
const Paragraph = (props) => (
  <div className={props.class}>
    <p className={props.subclass}>
      {props.p}
    </p>
  </div>
);

const UserList = (props) => {
  let data = [
    props.row._id,
    props.row.username ? props.row.username : 'не задано',
    props.row.email,
    new Date(props.row.createdAt).toLocaleString()
  ];
  console.log(data);
  return (
    <div className={'table'}>
      {data.map(val => (
        <Paragraph
          class="table-cell"
          subclass=""
          p={val}
        />
      ))}
    </div>
    );
}
const TableHistory = (props) => {
  let data = [
    props.row._id,
    props.row.ip,
    new Date(props.row.loginDate).toLocaleString(),
    props.row.os,
    props.row.action,
  ];
  return (
  <div className={'table'}>
    {data.map(val => (
      <Paragraph
        class="table-cell"
        subclass=""
        p={val}
      />
    ))}
  </div>
  );
}

const UserTableHeader = (props) => {
  let header = [
    'Идентификатор',
    'Имя пользователя',
    'email',
    'Создан',
  ];
  return (
    <div className='table'>
      {header.map(val => (
        <Paragraph
          class="table-cell"
          subclass=""
          p={val}
        />
      ))}
    </div>);
}
const TableHeader = (props) => {
  let header = [
    'Идентификатор',
    'IP адрес',
    'Время',
    'ОС',
    'Действие'
  ];
  return (
    <div className='table'>
      {header.map(val => (
        <Paragraph
          class="table-cell"
          subclass=""
          p={val}
        />
      ))}
    </div>);
}

const Users = (props) => (
  <div className='section'>
    <h4 className="section-header">
      {props.head}
    </h4>
    <p className="section-description">
      {props.description}
    </p>
    <div className='table-wrapper' >
      <UserTableHeader />
      {Object.keys(props.data).map(id => (
        <UserList
          row={props.data[id]}
        />
      ))}
    </div>
  </div>
);
const History = (props) => (
  <div className='section'>
    <h4 className="section-header">
      {props.head}
    </h4>
    <p className="section-description">
      {props.description}
    </p>
    <div className='table-wrapper' >
      <TableHeader />
      {Object.keys(props.data).map(id => (
        <TableHistory
          row={props.data[id]}
        />
      ))}
    </div>
  </div>
);

const PasswordChange = (props) => (
  <div className='section'>
    <h4 className="section-header">
      {props.head}
    </h4>
    <p className="section-description">
      {props.description}
    </p>
    <FieldBox
      type="password"
      fieldName="сменить пароль"
      handler={props.handler}
      value={props.val}
    />
    <Button
      text="Сменить пароль"
      handler={props.buttonHandler}
    />
  </div>
);

const Logout = (props) => (
  <div className='section'>
    <h4 className="section-header">
      {props.head}
    </h4>
    <Button
      type={'button'}
      handler={props.handleLogout}
      text={'Выйти'}
    />
  </div>
);
const Logo = (props) => (
    <div className={props.logoDiv} >
      Авторизация
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

export {
  Text,
  Logo,
  Button,
  FieldBox,
  SideBar,
  TopBar,
  Section,
  History,
  Logout,
  PasswordChange,
  Users,
}