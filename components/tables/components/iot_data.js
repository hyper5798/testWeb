import util from '~/libs/util.js'

export const typeColumns = [
  {
    title: '序號',
    type: 'index',
    width: 60,
    align: 'center'
  },
  {  
    title: '類型名稱',
    align: 'center',
    key: 'typeName',
    editable: true
  },
  {
    title: '類型代號',
    align: 'center',
    key: 'deviceType'
  },
  {
    title: '創建日期',
    align: 'center',
    key: 'createTime',
    render: function (h) {
      return h('div', 
        util.formatDate(this.row.createTime,'YYYY-MM-DD HH:mm:ss'))
    }
  },
  {
    title: '創建人員',
    align: 'center',
    key: 'createUser'
  }/* ,
  {
    title: '操作',
    align: 'center',
    width: 240,
    key: 'handle'
  } */
];

export const testColumns = [
  {
    title: '序號',
    type: 'index',
    width: 60,
    align: 'center'
  },
  {  
    title: '類型名稱',
    align: 'center',
    key: 'typeName',
    editable: true
  },
  {
    title: '代號',
    align: 'center',
    key: 'deviceType',
    width: 60,
  }
];

export const parseColumns = [
  {
    title: '欄位',
    align: 'center',
    key: 'field',
    editable: true
  },
  {
    title: '啟始前一位',
    align: 'center',
    width: 120,
    key: 'start',
    editable: true
  },
  {  
    title: '結束位置',
    align: 'center',
    width: 120,
    key: 'end',
    editable: true
  },
  {
    title: '公式',
    align: 'center',
    key: 'operation',
    editable: true
  },
  {
    title: '欄位名稱',
    align: 'center',
    width: 300,
    key: 'fieldName',
    editable: true
  },
  {
    title: '操作',
    align: 'center',
    width: 240,
    key: 'handle',
    handle: ['edit', 'delete']
  }
];

export const deviceColumns = [
  {
    title: '序號',
    type: 'index',
    width: 60,
    align: 'center',
    flexd: 'left'
  },
  {  
    title: '名稱',
    align: 'center',
    key: 'device_name',
    width: 200,
    editable: true,
    flexd: 'left'
  },
  {
    title: '識別碼',
    align: 'center',
    key: 'device_mac',
    width: 200
  },
  {
    title: '裝置狀態',
    align: 'center',
    key: 'device_status',
    editable: true
  },
  {
    title: '是否啟用',
    align: 'center',
    key: 'statusDesc'
  },
  {
    title: '類型代號',
    align: 'center',
    key: 'fport'
  },
  {
    title: '操作',
    align: 'center',
    width: 200,
    key: 'handle',
    handle: ['edit', 'delete'],
    flexd: 'right'
  }
];

export const deviceColumns2 = [
  
  {  
    title: '名稱',
    align: 'center',
    key: 'device_name',
    editable: true,
    flexd: 'left'
  }
];

export const eventColumns = [
  {
    title: '序號',
    type: 'index',
    width: 60,
    align: 'center',
    fixed: 'left'
  }/* ,
  {
    title: '日期',
    align: 'center',
    key: 'recv'
  },
  {
    title: '參數',
    align: 'center',
    key: 'information'
  } ,
  {
    title: '創建日期',
    align: 'center',
    key: 'information',
    render: function (h) {
      return h('div', this.row.information.temperature);
    }
  }*/
];


const tableData = {
  testColumns: testColumns,
  typeColumns: typeColumns,
  parseColumns: parseColumns,
  deviceColumns: deviceColumns,
  deviceColumns2: deviceColumns2,
  eventColumns: eventColumns
};

export default tableData;
