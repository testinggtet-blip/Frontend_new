import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { MainDashboard } from 'components/Style';
import NoRecord from 'components/NoRecord';
import ListView from 'components/ListView';
import { FeedTableColumns } from 'constants/appConstant';
const FeedStyle = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '20px 16px',
        boxSizing: 'border-box',
        width: "103.5%",
        overflow: 'hidden',
        marginLeft: "-3px",
        marginTop: "5px",
    },
    topBar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0',
        width: '100%',
        height: 'calc(100vh - 60px)',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        margin: '0',
    },
    emptyStateContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: "65px",
        height: '100%',
    },
    listView: {
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
    },
};

const RealtimeFeeds = () => {
    const [feedData, setFeedData] = useState([]);
    const [searchTerms, setSearchTerms] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitiallyLoading, setIsInitiallyLoading] = useState(false);
    const handleAddFeedModal = () => { };
    const handleEditFeedModal = (recordId) => { };
    const handleRemoveFeedModal = (recordId) => { };
    const updateFeedStatus = (item) => { };

    return (
        <MainDashboard>
            <Box sx={FeedStyle.container}>
                <Stack direction="row" sx={FeedStyle.topBar}>
                    <Typography variant="h5" sx={{ fontWeight: 'normal', marginTop: "-2px" }}>Feeds</Typography>
                </Stack>
                <Box sx={FeedStyle.tableContainer}>
                    <ListView
                        tableData={feedData}
                        rowData={FeedTableColumns}
                        handleDeleteModel={handleRemoveFeedModal}
                        handleEditModel={handleEditFeedModal}
                        updateStatus={updateFeedStatus}
                        initialLoading={isInitiallyLoading}
                        loading={isLoading}
                        icons={['edit', 'delete', 'detail']}
                        sortingIndex={['status', 'FeedName', 'Url', 'createdTime', 'modifiedTime', 'Source']}
                        searchTerms={searchTerms}
                        setSearchTerms={setSearchTerms}
                        selectedRows={selectedItems}
                        setSelectedRows={setSelectedItems}
                        noRecordComponent={
                            <Box sx={FeedStyle.emptyStateContainer}>
                                <NoRecord
                                    type="callback"
                                    moduleName="Feed"
                                    onAction={handleAddFeedModal}
                                />
                            </Box>
                        }
                        sx={{
                            '& .MuiTableContainer-root': {
                                maxHeight: 'none',
                                overflow: 'hidden',
                                border: 'none',
                            },
                            '& .MuiTable-root': {
                                overflow: 'hidden',
                                borderCollapse: 'collapse',
                            },
                            '& .MuiTableCell-root': {
                                borderRight: 'none',
                            },
                            '& .MuiTableCell-root:last-child': {
                                borderRight: 'none',
                            },
                        }}
                    />
                </Box>
            </Box>
        </MainDashboard>
    );
};

export default RealtimeFeeds;
