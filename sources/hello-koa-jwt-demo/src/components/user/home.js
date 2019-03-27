import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class SiderDemo extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
        collapsed: !this.state.collapsed,
        });
    }

    handleLogout = () => {
        // 退出登录，删除本地存储的jwtToken
        localStorage.removeItem('jwtToken');
        this.context.router.history.push('/');
    }

  render() {
      const { userData } = this.props;
      console.log(userData);
    return (
        <Layout
            style={{ height: '100vh' }}
        >
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
            >
            <div className="logo">Koa-jwt</div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to='/home/info'>
                        <Icon type="user" />
                        <span>用户信息</span>
                    </Link>
                    </Menu.Item>
                <Menu.Item key="2">
                    <Link to='/home/life'>
                        <Icon type="video-camera" />
                        <span>生活</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to='/home/work'>
                        <Icon type="upload" />
                        <span>工作</span>
                    </Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <div className="logout">
                        <Menu theme="light" mode="horizontal">
                            <SubMenu
                                title={
                                    <span className="submenu-title-wrapper">
                                        <Icon type="user" />{userData.name}
                                    </span>
                                }
                            >
                                <Menu.Item key="setting:1">
                                    <a
                                        href="javascript:void(0);"
                                        onClick={this.handleLogout}
                                    >
                                        退出
                                    </a>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    欢迎欢迎
                    {this.props.children}
                </Content>
            </Layout>
        </Layout>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        userData: state.auth.user
    }
}

export default connect (mapStateToProps)(SiderDemo);