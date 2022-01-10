import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import GeneralSettingUpdate from '../GeneralSettings/GeneralSettingUpdate';
import CommissionConfigAddNew from './CommissionConfigAddNew';
import { SettingService, SessionProvider } from '../../providers';
import { confirmAlert } from 'react-confirm-alert';
// styles
const customStyles = {

  headCells: {
    style: {
      color: 'rgba(0,0,0,.54)',
      paddingLeft: '18px', // override the cell padding for head cells
      paddingRight: '18px',
    },
  },
  cells: {
    style: {
      paddingLeft: '18px', // override the cell padding for data cells
      paddingRight: '18px',
    },
  },
};

const iconPadding = {
  paddingRight: '3px',
  float: 'Left'
}
const inputWith = {
  width: '20%'
}

export default function TransactionSettings(props) {
    const { commissions } = props;
  const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [settings, setSettings] = useState(commissions);
  const [error, setError] = useState('');
  const [adminLevel, setAdminLevel] = useState(0);
  const [filteredSettings, setFilteredSettings] = useState(commissions);
  const [selectedSetting, setSelectedSetting] = useState({});
  const history = useHistory();

    useEffect(() => {
        if (SessionProvider.isValid()) {
            const user = SessionProvider.get();
             setAdminLevel(user.permission_level)
         }
        //  console.log(commissions)
          setSettings(commissions);
          setFilteredSettings(commissions);

    }, []);
    // table headings definition
const columns = [{
    name: 'Category',
    selector: 'category',
    sortable: true,
}, {
    name: 'Key',
    selector: 'key',
    sortable: true,
  }, {
    name: 'Title',
    selector: 'title',
    sortable: true,
  }, {
    name: 'Value',
    selector: 'value',
    sortable: true,
  },{
    name: 'Sub Category',
    selector: 'subcategory',
    sortable: true,
  }, {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
      <div style={iconPadding}>
        <a
          href={`#`}
          className="btn btn-light btn-sm btn-icon"
          onClick={e => {
            e.preventDefault();
            onSubmitChangeStatus(row);
          }}
        > <span className="fa fa-pencil" />
        </a></div>
        { adminLevel === 5 ?<div style={iconPadding}>
        <a
          href={`#`}
          className="btn btn-light btn-sm btn-icon"
          onClick={e => {
            e.preventDefault();
            return confirmAlert({
                title: 'Confirmation',
                message: 'Are you sure you want to delete this setting?',
                buttons: [
                  {
                    label: 'Ok',
                    onClick: () => {
                        onSubmitDeleteSetting(row)
                    }
                  }
                ]
            });
           // onSubmitChangeStatus(row);
          }}
        > <span className="fa fa-trash" />
        </a></div>: ''}
    </div>
  }];

  const onSubmitChangeStatus = data => {
    setSelectedSetting(data);
    setShow(true);
    //return <Confirm show={show} setShow={setShow} />;
  };

  const onSubmitDeleteSetting = data => {
      if(data.id){
        SettingService.destroySetting(data.id).then((response) => {
            if (response.data.success) {
                setShow(false)
                return confirmAlert({
                    title: 'Succcess',
                    message: 'Setting was successfully updated',
                    buttons: [
                      {
                        label: 'Ok',
                        onClick: () => {
                            window.location = '/configurations/settings';
                        }
                      }
                    ]
                });
            } else {
                setError(response.data.message);
            }
        })
      }

   // setSelectedSetting(data);
    //setShowDelete(true);
  };

  const countSettings = (type) => {
    const countTypes = this.props.movies.filter(movie => movie.media_type === type);
    return countTypes.length;
  };

  const onSearchFilter = filterText => {
    const filteredItems = settings.filter(item => (
        (item && item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
        (item && item.category && item.category.toLowerCase().includes(filterText.toLowerCase())) ||
        (item && item.value && item.value.toLowerCase().includes(filterText.toLowerCase())) ||
        (item && item.key && item.key.toLowerCase().includes(filterText.toLowerCase())) ||
        (item && item.subcategory && item.subcategory.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredSettings(filteredItems);
  }


  return (
    <Card className="o-hidden mb-4">
      <GeneralSettingUpdate show={show} setShow={setShow} setting={selectedSetting} />
      <CommissionConfigAddNew show={showNew} setShow={setShowNew} />
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Commission Structure</span>
          <span className="flex-grow-1" />
          <input
            style={inputWith}
            type="text"
            name="search"
            className={`form-control form-control-m`}
            placeholder="Search..."
            onKeyUp={e => onSearchFilter(e.target.value)}
          />
          <div>
                <button
                onClick={e => {
                    setShowNew(true)
                }}
                className="btn btn-secondary">
                    Add New
                </button>
        </div>
        </div>
      </CardBody>
      <DataTable
        data={filteredSettings}
        columns={columns}
        customStyles={customStyles}
        noHeader
        selectableRowsHighlight
        highlightOnHover
        pagination />

    </Card>
  );
}