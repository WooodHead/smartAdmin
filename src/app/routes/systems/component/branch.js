import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import {Checkbox, Button, Icon, Modal, message} from 'antd';
import * as systemActions from '../systemActions';
import { config } from '../../../config/config';
import { BigBreadcrumbs } from '../../../components';


const confirm = Modal.confirm;

function mapStateToProps(state) {
  return { system: state.system };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(systemActions, dispatch);
}

function resizeTable(){
  document.querySelector('.ReactTable').style.height = document.body.offsetHeight - document.querySelector('#header').offsetHeight - document.querySelector('.control-box').offsetHeight - document.querySelector('#bigBreadcrumbs').offsetHeight - 20  + 'px';
}


let self_ = null;
class System extends Component {
  constructor(props){
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    self_ = this;
  }

  componentDidMount(){
    this.loadData();
    resizeTable();
    window.addEventListener('resize', resizeTable, true);
  }

  loadData(){
    const {  system } = self_.props;
    let { pageSize, countSkip } = system.catBranch || {};
    pageSize = pageSize || 10;
    countSkip = countSkip || 0;
    const params = {countSkip,pageSize};
    this.props.catData({url: `${config.cdn}/api/w/v1/catbranch`, params});
  }

  renderCheckbox(element){
    const { original } = element;
    const { selectedElement } = self_.props.system || [];
    const isChecked = selectedElement.indexOf(original) > -1;
    return(
      <Checkbox checked={isChecked}  onChange={e=>self_.props.selectedElement(e.target.checked, original)} />
    );
  }

  async removeItems(arr){
    for(let i = 0; i < arr.length; i++ ){
      const item = arr[i];
      let req = await self_.props.removeItem(`${config.cdn}/api/w/v1/catbranch/id`, item);
      const { msg } = req.data;
      if(msg !== 'SUC_ACTION'){
        message.error(`Can't remove this item, something went wrong!`);
        return;
      }
    }
    message.success('Removing Successful!');
    self_.loadData();
    return;
  }

  renderActionsCell(e){
    return(
      <div>
        <Button
          type="ghost"
          size="large"
        ><Icon type="edit" /></Button>
        <Button
          type="danger"
          size="large"
          onClick={el => self_.showConfirm('Do you Want to remove this items?', [e.original.id])}
        ><Icon type="delete" /></Button>
      </div>
    );
  }

  onFetchData(state, instance){
    const {pageSize, page} = state;
    self_.props.catData({url: `${config.cdn}/api/w/v1/catbranch`, params: {countSkip:(page*pageSize),pageSize}});
  }

  showConfirm(title, id){
    confirm({
      title: title,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      destroyOnClose: true,
      async onOk(){
        await self_.removeItems(id);
      }
    })
  }

  render(){
    const { system } = this.props;
    const {pageSize, countSkip, data, totalRecords} = system.catBranch || {};
    const ids = data?data.map(item=>item.id):[];
    return(
      <div id="content">
        <div className="row" id="bigBreadcrumbs">
          <BigBreadcrumbs
            items={['Systems', 'Branch']}
            icon="fa fa-fw fa-table"
            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
          />
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8 ta-r">
            <Button size="large">Export Data</Button>
          </div>
        </div>
        <div className="control-box">
          <Button.Group>
            <Button
              type     = "danger"
              disabled = {system.selectedElement.length > 0?false:true}
              onClick  = {e => self_.showConfirm('Do you Want to remove these items?', self_.removeItems(ids))}
            >Remove Selected</Button>
            <Button type="primary">Add New</Button>
          </Button.Group>
        </div>
        <ReactTable
          defaultPageSize = { pageSize }
          data            = { data }
          className       = "-striped -highlight"
          sortable        = {false}
          filterable      =  {false}
          columns         = {[
            {
              Header: e => (<Checkbox checked={data && system.selectedElement.length === data.length} onChange={el=>self_.props.selectAll(el.target.checked?[...data]:[])} />),
              accessor: 'id',
              style: {textAlign: 'center'},
              Cell: e=> self_.renderCheckbox(e),
              maxWidth: 50,
              resizable: false,
            },{
              Header: 'Name',
              accessor: 'name',
              width: 250
            },{
              Header: 'Code',
              accessor: 'code',
              width: 150
            },{
              Header: 'Description',
              accessor: 'description',
              width: 250
            },{
              Header: 'Is Active',
              accessor: 'isActive',
              Cell: e=> (<Checkbox defaultChecked={e.value} disabled={true} />),
              style: {textAlign: 'center'},
              resizable: false,
              maxWidth: 80
            }, {
              Header: 'Company Name',
              accessor: 'catCompanyName',
              width: 150
            }, {
              Header: 'Actions',
              accessor: 'id',
              Cell: self_.renderActionsCell,
              style: {textAlign: 'center'},
              resizable: false,
              width: 150
            }
          ]}
          pages           = {Math.ceil(totalRecords / pageSize)}
          manual
          onFetchData     = {(state, instance) => self_.onFetchData(state, instance)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(System);
