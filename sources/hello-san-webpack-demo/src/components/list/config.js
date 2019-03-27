export const tableConf = {
    schema: [
        {name: 'name', label: '姓名'},
        {
            name: 'age',
            label: '年龄',
            width: 500,
            sortable: true
        },
        {name: 'gender', label: '性别', sortable: true},
        {name: 'operation', label: '操作'}
    ]
};


export const blocks = [
    {
        title: '基础样例',
        items: [
            {
                key: 'form',
                url: '/page/form',
                text: '表单页面'
            },
            {
                key: 'list',
                url: '/page/list',
                text: '列表页面'
            }
        ]
    }
];