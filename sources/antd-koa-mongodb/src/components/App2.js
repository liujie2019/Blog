import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form, Input } from 'antd';
import '../App.css';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            visible: false,
            modalTitle: '新建用户',
            username: '',
            age: '',
            address: '',
            loading: true,
            id: ''
        };
    }
    componentDidMount() {
        this.getUserList();
    }
    getUserList() {
        axios.get('http://localhost:8088/api/userList')
            .then((response) => {
                this.setState({
                    userData: response.data.data,
                    loading: false
                });
            }).catch((error) => {
                console.log(error);
            });
    }
    showModal = () => {
        this.setState({
          visible: true,
          modalTitle: '新建用户',
          age: '',
          address: '',
          username: ''
        });
    }
    handleDelete(record) {
        axios.delete(`http://localhost:8088/api/deleteUser?id=${record._id}`).then((response) => {
                this.getUserList();
            }).catch((error) => {
                console.log(error);
            });
    }
    handleEdit(record) {
        this.setState({
            visible: true,
            modalTitle: '编辑用户',
            username: record.username,
            age: record.age,
            address: record.address,
            id: record._id
        });
    }
    handleOk = () => {
        const {username, age, address, modalTitle, id} = this.state;
        const paramData = {
            username: username,
            age: age,
            address: address
        };
        if (modalTitle === '新建用户') {
            axios.post('http://localhost:8088/api/addUser', paramData).then((response) => {
                this.getUserList();
                this.setState({
                    visible: false
                });
            }).catch((error) => {
                console.log(error);
            });
        }
        else {
            paramData.id = id;
            axios.put('http://localhost:8088/api/editUser', paramData).then((response) => {
                this.getUserList();
                this.setState({
                    visible: false
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleChange(e, flag) {
        this.setState({
            [flag]: e.target.value
        });
    }
    render() {
        const {userData, visible, modalTitle, username, age, address, loading} = this.state;
        const columns = [{
            title: '姓名',
            dataIndex: 'username',
            key: 'username'
          }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
          }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address'
          }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return (
                    <div>
                        <a style={{marginRight: "10px"}} href="javascript:;" onClick={() => this.handleDelete(record)}>Delete</a>
                        <a href="javascript:;" onClick={() => this.handleEdit(record)}>Edit</a>
                    </div>
                );
            }
         }];
        return (
        <div className="app">
            <Button icon="plus" type="primary" onClick={this.showModal}>添加用户</Button>
            <Table loading={loading} rowKey="_id" dataSource={userData} columns={columns} />
            <Modal
                title={modalTitle}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                >
                    <Input placeholder="请输入用户名" onChange={e => this.handleChange(e, 'username')} value={username} />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="年龄"
                >
                    <Input placeholder="请输入年龄" onChange={e => this.handleChange(e, 'age')} value={age} />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="住址"
                >
                    <Input placeholder="请输入住址" onChange={e => this.handleChange(e, 'address')} value={address} />
                </FormItem>
            </Form>
            </Modal>
        </div>
        );
    }
}

export default App;
