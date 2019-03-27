<style lang="less">
@import '../../assets/css/common.less';
.type-item {
  display: block;
  width: 100%;
  height: auto;
  overflow: auto;
}
.record-item {
  box-sizing: content-box;
  display: block;
  overflow: hidden;
  height: 240px;
  line-height: 24px;
  padding: 8px 10px;
  border-bottom: 1px dashed gainsboro;
}
.record-tip-con span {
  font-size: 14px;
}
.edittable-test-con {
  height: 160px;
}
.edittable-table-height-con {
  height: 190px;
}
.edittable-con-1 {
  box-sizing: content-box;
  padding: 15px 0 0;
  height: auto;
}
.edittable-table-get-currentdata-con {
  height: 190px !important;
}
.exportable-table-download-con1 {
  padding: 16px 0 16px 20px;
  border-bottom: 1px dashed #c3c3c3;
  margin-bottom: 16px;
}
.exportable-table-download-con2 {
  padding-left: 20px;
}
.show-image {
  padding: 20px 0px;
}
.show-image img {
  display: block;
  width: 100%;
  height: auto;
}
.searchable-table {
  &-con1 {
    height: 230px !important;
  }
}
</style>

<template>
    <div>
        <Row>
          <Col class="type-item" span="24">
            <Card>
                <p slot="title">
                    <Icon type="load-b"></Icon>
                    說明：點選任何一欄可進行細項設定
                </p>
                <div >
                    <Table
                            highlight-row
                            :columns="columnsList"
                            :data="tableData"
                            border
                            @on-row-click="selectMap">
                    </Table>
                </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Modal
              width="90%"
              v-model="modal1"
              title="裝置類型細項"
              @on-ok="ok"
              @on-cancel="cancel">
              <Row>
                  <Col span="4">
                    <Input v-model="item.typeName" style="width: 200px">
                      <span slot="prepend">類型名稱</span>
                    </Input>
                  </Col>
                  <Col span="4">
                    <Input v-model="item.deviceType" style="width: 200px" disabled>
                      <span slot="prepend">類型代碼</span>
                    </Input>
                  </Col>
                  <Col span="8">
                    <Input v-model="testData" >
                      <span slot="prepend">測試資料</span>
                    </Input>
                  </Col>
                  <Col span="6">
                    <Button type="success">按此解析資料</Button>
                    <Button type="error">刪除此資料類型</Button>
                  </Col>
                  <Col span="2">
                    <Button type="warning" @click="addParseItem">增加欄位</Button>
                  </Col>
              </Row>
              <br>
              <Row>
                <Col span="24">
                    <can-edit-table 
                            refs="table1" 
                            v-model="tableData2" 
                            :columns-list="columnsList2" 
                            @on-del-item="handleTest">
                    </can-edit-table>
                  </Col>
              </Row>
          </Modal>
        </Row>
    </div>
</template>

<script>
import canEditTable from '~/components/tables/components/canEditTable.vue'
import tableData from '~/components/tables/components/table_data.js'
import iotData from '~/components/tables/components/iot_data.js'
let empty = {
        index: 0,
        typeName: '',
        deviceType: '',
        maptable: [],
        map: [],
        fieldName: {}
      }

export default {
  name: 'editable-table',
  components: {
    canEditTable
  },
  data() {
    return {
      columnsList: [],
      tableData: [],
      columnsList2: [],
      tableData2: [],
      showCurrentTableData: false,
      modal1: false,
      selectedIndex: 0,
      testData: '',
      item: JSON.parse(JSON.stringify(empty))
    }
  },
  methods: {
    getData() {
      this.columnsList = iotData.typeColumns
      this.tableData = this.$store.state.device.map
      this.columnsList2 = iotData.parseColumns
      console.log('map getData this.tableData:')
      console.log(this.tableData)
    },
    handleNetConnect(state) {
      this.breakConnect = state
    },
    handleLowSpeed(state) {
      this.lowNetSpeed = state
    },
    getCurrentData() {
      this.showCurrentTableData = true
    },
    handleDel(val, index) {
      this.$Message.success('删除了第' + (index + 1) + '行数据')
    },
    handleCellChange(val, index, key) {
      this.$Message.success(
        '修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据'
      )
    },
    handleChange(val, index) {
      this.$Message.success('修改了第' + (index + 1) + '行数据')
    },
    ok () {
      // this.$Message.info('Clicked ok');
      console.log('this.item.index : ', this.item.index)
      let list = JSON.parse(JSON.stringify(this.tableData2))
      let fieldName = {}
      let map = {}
      for(let i=0; i < list.length; ++i) {
        let tmp = list[i]
        if(tmp.field =='' || tmp.fieldName =='' || tmp.start == '' || tmp.end == '' || tmp.operation == '') {
          this.$Message.error('解析欄位中不能為空值');
          return
        }
        fieldName[tmp.field] = tmp.fieldName
        let arr = [Number(tmp.start), Number(tmp.end), tmp.operation]
        map[tmp.field] = arr
      }
      this.item.fieldName = fieldName
      this.item.map = map
      console.log('this.item : ', JSON.stringify(this.item))
      this.$store.commit('device/UPDATE_MAP', this.item)
      this.tableData = this.$store.state.device.map
    },
    cancel () {
      this.$Message.info('Clicked cancel');
      
    },
    selectMap (selection, row) {
      this.item = JSON.parse(JSON.stringify(empty))
      this.item.index = row
      let mMap = selection.map
      console.log('selection  : ', selection)
      console.log('this.item.index : ', this.item.index)
      console.log('selection  map: ', mMap)
      this.item.typeName = selection.typeName
      this.item.deviceType = selection.deviceType
      this.modal1 = true
      
      if(mMap) {
        let keys = Object.keys(selection.fieldName)
        console.log(keys)
        for(let i=0; i < keys.length; ++i) {
          let key = keys[i]
          let arr = mMap[key]
          console.log(key)
          console.log(arr)
          let obj = {
              'field': key,
              'start': arr[0],
              'end': arr[1],
              'operation': arr[2],
              'fieldName': selection.fieldName[key]
          }
          if(this.item.maptable) {
            this.item.maptable.push(obj)
          } 
        }
        this.tableData2 = this.item.maptable
        console.log('this.item:', JSON.stringify(this.item))
      }
    },
    addParseItem () {
      console.log('addParseItem : ', this.item.maptable.length)
      console.log('this.item.maptable length: ', this.item.maptable.length)
      this.item.maptable.push({
            'field': '',
            'start': '',
            'end': '',
            'operation': '',
            'fieldName': ''
        })
      console.log('this.item.maptable length: ', this.item.maptable.length)
    },
    handleTest (map, index) {
      console.log('this.item.maptable length: ', this.item.maptable.length)
      console.log('handleTest delete index: ', index)
      this.item.maptable.splice(index, 1)
      this.tableData2 = this.item.maptable
      console.log('this.item.maptable length: ', this.item.maptable.length)
    }
  },
  created() {
    this.getData()
  }
}
</script>
