<style lang="less">
@import '../../assets/css/common.less';
.add-btn {
  float: right;
  margin-right: 10px;
}
.device-item {
  padding: 0 0 0 10px;
  height: 550px;
  border-bottom: 1px dashed #c3c3c3;
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
          <Col span="5">
            <div class="device-item">
              <Table
                    height="550"
                    highlight-row
                    :columns="columnsList"
                    :data="tableData"
                    border
                    @on-row-click="selectMap">
              </Table>
            </div>
            
          </Col>
          <Col span="19">
            <div class="device-item">
              <Card>
                <div slot="title">
                    <Icon type="load-b"></Icon>
                    {{tableTile}}
                    <Tooltip class="add-btn" v-bind:content="addTitle">
                        <Button class="add-btn" 
                                type="primary" 
                                shape="circle" 
                                icon="android-add"
                                @click="addDevice">
                        </Button>
                    </Tooltip>
                    
                </div>
                
                <div >
                    <can-edit-table 
                          refs="table1" 
                          @on-delete="handleDel" 
                          v-model="tableData2" 
                          :columns-list="columnsList2"
                          @on-change="handleSave"
                          @on-del-item="handleDelete">
                    </can-edit-table>
                </div>
              </Card>
            </div>
            <Modal
              v-model="modal1"
              v-bind:title="addTitle"
              :loading="loading"
              @on-ok="checkNew"
              @on-cancel="cancel">
              <Input v-model="params.d" style="width: 300px">
                <span slot="prepend">裝置識別碼(字元長度16) </span>
              </Input>
            </Modal>
          </Col>
        </Row>
    </div>
</template>

<script>
import canEditTable from '~/components/tables/components/canEditTable.vue'
import iotData from '~/components/tables/components/iot_data.js'
import { addDevice, deleteDevice, updateDevice, getSensorList} from '~/libs/api'
export default {
  name: 'editable-table',
  components: {
    canEditTable
  },
  data() {
    return {
      loading: false,
      columnsList: [],
      tableData: [],
      columnsList2: [],
      tableData2: [],
      showCurrentTableData: false,
      mapList: [],
      tableTile: '說明：點選左邊類型後, 以下會依選擇裝置篩選',
      addTitle: '新增裝置',
      targetMap: {},
      modal1: false,
      data: [],
      params: {
        token: this.$store.state.user.token,
        d: '00000000',
        type: 'LoRaM',
        fport: ''
      }
    }
  },
  methods: {
    async handleSave(devices,index) {
      // alert(JSON.stringify(devices[index]))
      let app = this
      let device = devices[index]
      let updateParams = {
                      token: this.$store.state.user.token,
                      d: device.device_mac,
                      name: device.device_name
                   }
      let req = await updateDevice(updateParams)
      // alert(JSON.stringify(JSON.stringify(req)))
      if (req.data.responseCode == '000') {
        this.$Message.success({
          content: '更新裝置成功',
          duration: 5,
          closable: true
        })
        this.getDeviceList(app)
      }
    },
    async handleDelete (devices, index) {
      let app = this
      let device = devices[index]
      /* alert(device.device_mac)
      let list = this.$store.state.device.list
      let flag = 0
      for(let i=0; i < list.length; i++) {
        if (list[i].device_mac === device.device_mac) {
          break;
        }
        ++flag
      }
      list.splice(flag, 1) */
      // alert(JSON.stringify(device))
      let delParams = {
                      token: this.$store.state.user.token,
                      delDeviceId: device.deviceId,
                      mac: device.device_mac,
                      name: this.$store.state.user.info.name
                   }
      // alert(JSON.stringify(params))
      let req = await deleteDevice(delParams)
      if (req.data.responseCode == '000') {
        this.$Message.success({
          content: '刪除裝置成功',
          duration: 5,
          closable: true
        })
        this.getDeviceList(app)
        // alert(JSON.stringify(JSON.stringify(req)))
      }
      
    },
    async checkNew() {
      if(this.params.d.length != 16){
        this.$Message.error({
          content: '裝置識別碼字元長度 '+this.params.d.length + ' ,不正確請再次輸入',
          duration: 5,
          closable: true
        })
      }
      let app = this
      let req = await addDevice(this.params)
      console.log('新增 result :', JSON.stringify(req))
      if (req.data.responseCode == '000') {
        this.$Message.success({
          content: '新增裝置成功',
          duration: 5,
          closable: true
        })
        this.getDeviceList(app)
      }
    },
    async getDeviceList(app) {
      let params = {token: this.$store.state.user.token}
      let req2 = await getSensorList(params)
      if(req2.data && req2.data.mList) {
        app.$store.commit('device/SET_LIST', req2.data.mList)
      }
      this.getData()
    },
    cancel() {

    },
    addDevice() {
      this.modal1= true
    },
    async getData() {
      this.columnsList = iotData.testColumns
      if(this.$store.state.device.map.length == 0) {
        let eq1 = await getMapList(params)
        console.log(req1)
        if(req1.data && req1.data.data) {
            this.$store.commit('device/SET_MAP', req1.data.data)
        }
      }
      this.tableData = this.$store.state.device.map
      this.columnsList2 = iotData.deviceColumns
      if(this.$store.state.device.list.length == 0) {
        let req2 = await getSensorList(params)
        if(req2.data && req2.data.mList) {
          this.$store.commit('device/SET_LIST', req2.data.mList)
        }
      }
      let list = this.$store.state.device.list
      // console.log('managergetData list:')
      // console.log(this.tableData)
      this.targetMap = this.tableData[0]
      this.setMapDevice()
    },
    setMapDevice() {
      this.data = []
      let list = this.$store.state.device.list
      for(let i=0; i < list.length; ++i) {
        let obj = list[i]
        if(obj.fport == Number( this.targetMap.deviceType)) {
          this.data.push(obj)
        }
      }
      this.tableData2 = this.data
      this.tableTile = this.targetMap.typeName
      this.addTitle = '增加' + this.targetMap.typeName + '裝置'
      this.params.fport = Number( this.targetMap.deviceType)
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
    selectMap (selection, row) {
      this.targetMap = selection
      this.setMapDevice()
    }
  },
  created() {
    this.getData()
  }
}
</script>
