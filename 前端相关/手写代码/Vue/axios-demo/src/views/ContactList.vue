<template>
  <div class="home">
    <van-contact-list
        :list="list"
        @add="onAdd"
        @edit="onEdit"
    />
    <van-popup v-model="showEdit" position="top">
        <van-contact-edit
            :contact-info="editingContact"
            :is-edit="isEdit"
            @save="onSave"
            @delete="onDelete"
        />
    </van-popup>
  </div>
</template>

<script>
// 在template中使用的组件才需要注册
// Toast没有在template中使用，不需要注册
import { ContactList, Toast, ContactEdit, Popup } from 'vant';
import axios from 'axios';

export default {
  name: 'contactList',
  components: {
      // 注册组件
      [ContactList.name]: ContactList,
      [ContactEdit.name]: ContactEdit,
      [Popup.name]: Popup
  },
  data() {
      return {
          list: [],
          instance: null, // axios实例
          editingContact: {}, // 正在编辑的联系人数据
          showEdit: false,
          isEdit: false,
      }
  },
  created() {
      this.instance = axios.create({
          baseURL: 'http://localhost:9000/api',
          timeout: 1000
      });
      this.getList();
  },
  methods: {
    async getList() {
        // this.instance.get('/contactList').then(res => {
        //     this.list = res.data.data;
        // }).catch(() => {
        //     Toast.fail('请求失败，请稍后重试');
        // });
        let res = await this.$HttpClient.getContactList();
        this.list = res.data;
    },
    // 添加联系人
    onAdd() {
        this.isEdit = false;
        // 展示添加联系人弹窗
        this.showEdit = true;
    },
    // 编辑联系人
    onEdit(item) {
        this.isEdit = true;
        this.showEdit = true;
        this.editingContact = item;
    },
    async onSave(info) {
        if (this.isEdit) {
            // 编辑保存
            // this.instance.put('/contact/edit', info).then(res => {
            //     if (res.data.code === 200) {
            //         this.showEdit = false;
            //         Toast.success('编辑成功');
            //         this.getList();
            //     }
            // }).catch(() => {
            //     Toast.fail('请求失败，请稍后重试');
            // });
            let res = await this.$HttpClient.editContact(info);
            if (res.code === 200) {
                this.showEdit = false;
                Toast.success('编辑成功');
                this.getList();
            }
        } else {
            // 新建保存
            // this.instance.post('/contact/new/json', info).then(res => {
            //     if (res.data.code === 200) {
            //         this.showEdit = false;
            //         Toast.success('创建成功');
            //         this.getList();
            //     }
            // }).catch(() => {
            //     Toast.fail('请求失败，请稍后重试');
            // });
            // let res = await this.$HttpClient.newContactJson(info);
            // if (res.code === 200) {
            //     this.showEdit = false;
            //     Toast.success('创建成功');
            //     this.getList();
            // }
            let res = await this.$HttpClient.newContactForm(info, true);
            if (res.code === 200) {
                this.showEdit = false;
                Toast.success('创建成功');
                this.getList();
            }
        }
    },
    async onDelete(info) {
        // this.instance.delete('/contact', {
        //     params: {
        //         id: info.id
        //     }
        // }).then(res => {
        //     if (res.data.code === 200) {
        //         this.showEdit = false;
        //         Toast.success('删除成功');
        //         this.getList();
        //     }
        // }).catch(() => {
        //     Toast.fail('请求失败，请稍后重试');
        // });
        let res = await this.$HttpClient.deleteContact({id: info.id});
        if (res.code === 200) {
            this.showEdit = false;
            Toast.success('删除成功');
            this.getList();
        }
    }
  }
}
</script>
