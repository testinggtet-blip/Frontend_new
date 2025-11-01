import { Box, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DeleteTemplate, FetchAllTemplate, UpdateTemplate } from 'Api/Api';
import ListView from 'components/ListView';
import { DeleteModal } from 'components/Modals';
import { ContainerStyle, MainDashboard } from 'components/Style';
import { TemplateTableColumns } from 'constants/appConstant';
import CreateTemplateModal from './CreateTemplateModal';
import EditTemplateModal from './EditTemplateModal';
import NoRecord from 'components/NoRecord';
import EnlargeTemplateModal from './EnlargeTemplateModal';
import SearchBar from 'components/SearchBar';
import SettingTemplateModal from './SettingTemplateModal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Template = () => {
  const [templateData, setTemplateData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [editId, setEditId] = useState();
  const [searchTerms, setSearchTerms] = useState();
  const [isDetail, setIsDetail] = useState(false);
  const [loading, setLoading] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openEnlarge, setEnlarge] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleCreateModal = () => setCreateModalOpen(true);
  const handleSettingModal = () => setSettingModalOpen(true);

  const handleDeleteModel = (recordId) => {
    setDeleteModalOpen(true);
    setDeleteId(recordId);
  };

  const handleEditModel = (recordId, isDetail) => {
    setEditModalOpen(true);
    setEditId(recordId);
    setIsDetail(isDetail);
  };

  const handleEnlargeModal = (item) => {
    setSelectedTemplate(item);
    setEnlarge(true);
  };

  const onClose = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setEnlarge(false);
    setSelectedTemplate(null);
    setSettingModalOpen(false);
  };

  const filteredData = searchTerms
    ? templateData?.filter((item) =>
        Object.entries(searchTerms).every(([key, value]) =>
          item?.[key]?.toLowerCase()?.includes(value.toLowerCase())
        )
      )
    : templateData;

  const hasConnectionId = () => {
    return !!localStorage.getItem('connectionId');
  };

  async function fetch() {
    if (!hasConnectionId()) {
      setInitialLoading(false);
      return;
    }
    try {
      setInitialLoading(true);
      let response = await FetchAllTemplate({
        page: page,
        limit: rowsPerPage,
        welcomeTemplate: false,
      });
      if (response?.data?.status === true) {
        setTemplateData(response?.data?.data);
        setTotalCount(response?.data?.totalCount);
        if (selectedTemplate) {
          const updatedTemplate = response?.data?.data?.find(
            (template) => template.id === selectedTemplate.id
          );
          if (updatedTemplate) {
            setSelectedTemplate(updatedTemplate);
          }
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setInitialLoading(false);
    }
  }

  async function deleteTemplates(recordId) {
    try {
      const response = await DeleteTemplate(recordId);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        fetch();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  async function updateStatus(item) {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [item.id]: true,
    }));
    try {
      const response = await UpdateTemplate(item?.id, {
        id: item.id,
        status: item.status === 'Active' ? 'Inactive' : 'Active',
        welcomeTemplate: item.welcomeTemplate,
      });
      if (response?.data?.status === true) {
        fetch();
      }
    } catch (error) {
      toast.error('Failed to update status.');
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [item.id]: false,
      }));
    }
  }

  useEffect(() => {
    fetch();
    onClose();
  }, [page, rowsPerPage]);

  return (
    <MainDashboard>
      <Box sx={ContainerStyle.container}>
        <SearchBar
          connectionModule={false}
          title="Templates"
          templateDataLength={templateData?.length || 1}
          onCreate={handleCreateModal}
          onSetting={handleSettingModal}
        />

        <Box sx={ContainerStyle.listView}>
          <ListView
            tableData={searchTerms?.length > 1 ? templateData : filteredData}
            rowData={TemplateTableColumns}
            handleDeleteModel={handleDeleteModel}
            handleEditModel={handleEditModel}
            updateStatus={updateStatus}
            initialLoading={initialLoading}
            loading={loading}
            sortingIndex={[
              'status',
              'templateName',
              'createdTime',
              'modifiedTime',
            ]}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={totalCount}
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleEnlargeModal={handleEnlargeModal}
            noRecordComponent={
              <NoRecord
                moduleName="Templates"
                title="Create engaging push notifications with our easy-to-use templates"
                description="Get started by creating your first template to send beautiful push notifications to your audience."
                onAction={handleCreateModal}
              />
            }
          />
        </Box>
        <EnlargeTemplateModal
          onCloseModal={onClose}
          open={openEnlarge}
          item={selectedTemplate}
          refresh={fetch}
        />
        <CreateTemplateModal
          TransitionComponent={Transition}
          open={createModalOpen}
          onClose={onClose}
          refresh={fetch}
          welcome={false}
        />
        <SettingTemplateModal
          TransitionComponent={Transition}
          open={settingModalOpen}
          onClose={onClose}
          refresh={fetch}
        />
        <EditTemplateModal
          TransitionComponent={Transition}
          open={editModalOpen}
          onClose={onClose}
          itemId={editId}
          isDetail={isDetail}
          refresh={fetch}
        />
        <DeleteModal
          open={deleteModalOpen}
          close={onClose}
          refresh={fetch}
          placeholder="Template"
          deleteFunction={() => deleteTemplates(deleteId)}
        />
      </Box>
    </MainDashboard>
  );
};

export default Template;
