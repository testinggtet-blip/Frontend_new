import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Checkbox,
  Pagination,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { columnIcons, listViewIcons, svgBorder } from 'constants/appConstant';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { formatDateTime } from 'utils/commonFunctions';
import {
  paginationFooter,
  paginationStyle,
  tablePagination,
  tableScrollbar,
} from './Style';

const ListView = ({
  rowData,
  tableData,
  handleEditModel,
  handleEnlargeModal,
  handleDeleteModel,
  updateStatus,
  sortingIndex,
  initialLoading,
  searchTerms,
  setSearchTerms,
  selectedRows,
  setSelectedRows,
  noRecordComponent,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  totalCount,
  customIcons,
  isCampaignList = false,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [localSearchTerms, setLocalSearchTerms] = useState(searchTerms);

  const handleSelectedAllRows = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData?.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectedRows = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleClickTooltip = (title, item) => {
    switch (title) {
      case 'Edit':
        handleEditModel(item, false);
        break;
      case 'Enlarge':
        if (typeof handleEnlargeModal === 'function') {
          handleEnlargeModal(item);
        }
        break;
      case 'Delete':
        handleDeleteModel(item?.id);
        break;
      default:
        break;
    }
  };

  const handleChangePage = (event, newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleSort = (key) => {
    let direction =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (e, key) => {
    setLocalSearchTerms((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSearchClick = () => {
    setSearchTerms(localSearchTerms);
  };

  const sortedData = tableData?.sort((a, b) => {
    if (sortConfig.key && a[sortConfig.key] && b[sortConfig.key]) {
      const comparison = a[sortConfig.key].localeCompare(b[sortConfig.key]);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    }
    return 0;
  });

  const paginatedData = tableData;

  const addProtocol = (connectionUrl) => {
    if (
      !connectionUrl?.startsWith('http://') &&
      !connectionUrl?.startsWith('https://')
    ) {
      return 'http://' + connectionUrl;
    }
    return connectionUrl;
  };

  const handleStatusToggle = async (item) => {
    try {
      await toast.promise(updateStatus(item), {
        loading: 'Updating status...',
        success: 'Status updated successfully',
        error: (error) => `Error: ${error.message}`,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const truncateName = (name, length = 25) => {
    return name?.length > length ? name.substring(0, length) + '...' : name;
  };

  useEffect(() => {
    setSearchTerms('');
  }, []);

  useEffect(() => {
    setSelectedRows([]);
  }, [rowsPerPage]);

  const renderTableCell = (column, item) => {
    const isHoverable = column?.hoverable;
    const showIcons = isHoverable && hoveredRow === item.id;
    const isNameField = Object.keys(columnIcons).includes(column.id);

    const iconsToShow = (customIcons || listViewIcons).filter((icon) =>
      columnIcons[column.id]?.includes(icon.title)
    );

    const formatTypeValue = (value) => {
      if (value === 'Push_Notifications') return 'Push Notifications';
      if (value === 'Social_Proof') return 'Social Proof';
      return value;
    };

    return (
      <Box
        onMouseEnter={isHoverable ? () => setHoveredRow(item.id) : null}
        onMouseLeave={isHoverable ? () => setHoveredRow(null) : null}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: column.textAlign,
          width: '95%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: '4px',
            marginX: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '90%',
          }}
        >
          {/* Text */}
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 400,
              fontSize: '0.95rem',
              lineHeight: 1.5,
            }}
          >
            {column.id === 'createdTime' || column.id === 'modifiedTime' ? (
              <span>
                {formatDateTime(
                  item[column.id],
                  isCampaignList ? item.timeZone : null
                )}
              </span>
            ) : column.id === 'connectionUrl' ? (
              <a
                href={addProtocol(item.connectionUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item?.connectionUrl?.length > 35 ? (
                  <Tooltip title={item.connectionUrl} arrow>
                    <p className="text-blue-200">
                      {truncateName(item.connectionUrl, 35)}
                    </p>
                  </Tooltip>
                ) : (
                  <span className="text-blue-700">{item?.connectionUrl}</span>
                )}
              </a>
            ) : isNameField ? (
              item[column.id]?.length > 35 ? (
                <Tooltip title={item[column.id]} arrow>
                  <span style={{ marginLeft: 0 }}>
                    {truncateName(item[column.id], 35)}
                  </span>
                </Tooltip>
              ) : (
                <Box style={{ marginLeft: 0 }}>{item[column.id]}</Box>
              )
            ) : column.id === 'type' ? (
              <span>{formatTypeValue(item[column.id])}</span>
            ) : item[column.id]?.length > 35 ? (
              <Tooltip title={item[column.id]} arrow>
                <span>{truncateName(item[column.id], 35)}</span>
              </Tooltip>
            ) : (
              <span>{truncateName(item[column.id], 35)}</span>
            )}
          </Box>

          {/* Icons (only allowed ones per column) */}
          {isHoverable && isNameField && iconsToShow.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                gap: '3px',
                width: `${iconsToShow.length * 22}px`, // consistent width based on icons
                justifyContent: 'flex-end',
                opacity: showIcons ? 1 : 0,
                transition: 'opacity 0.2s ease',
              }}
            >
              {iconsToShow.map((data, index) => (
                <Tooltip title={data.title} arrow key={index}>
                  <span style={{ cursor: 'pointer' }}>
                    <img
                      src={data.icon}
                      width={data.title === 'Enlarge' ? 18 : 20}
                      height={data.title === 'Enlarge' ? 20 : 20}
                      onClick={() => handleClickTooltip(data.title, item)}
                    />
                  </span>
                </Tooltip>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <TableContainer
        sx={{
          ...tableScrollbar,
          height: '100%',
          maxHeight: '83vh',
          width: '100%',
          maxWidth: { xs: '87vw', sm: '91vw', md: '81vw', lg: '81vw' },
          marginLeft: '0px',
          border: '1px solid #B9B9B9',
          borderRadius: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ backgroundColor: '#DEF7F3' }}>
            <TableRow>
              <TableCell
                padding="checkbox"
                sx={{
                  width: selectedRows?.length > 1 ? '0.5%' : '0.5%',
                  backgroundColor: 'inherit',
                }}
              >
                <Checkbox
                  indeterminate={
                    selectedRows?.length > 0 &&
                    selectedRows?.length < paginatedData?.length
                  }
                  checked={
                    paginatedData?.length > 0 &&
                    selectedRows?.length === paginatedData?.length
                  }
                  onChange={handleSelectedAllRows}
                />
                {/* {selectedRows?.length > 1 && (
                  <DeleteIcon sx={{ marginLeft: 0 }} />
                )} */}
              </TableCell>
              {rowData?.map((item, index) => {
                const isLast = index === rowData.length - 1;
                return (
                  <TableCell
                    key={item.id}
                    align={item.align}
                    width={item.width}
                    sx={{
                      position: 'relative',
                      fontWeight: 'bold',
                      verticalAlign: 'top',
                      backgroundColor: 'inherit',
                    }}
                  >
                    {sortingIndex.includes(item.id) ? (
                      <TableSortLabel
                        active={sortConfig.key === item.id}
                        direction={sortConfig.direction}
                        onClick={() => handleSort(item.id)}
                      >
                        {String(item.label)}
                      </TableSortLabel>
                    ) : (
                      item.label
                    )}
                    {!isLast && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          bottom: '0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        dangerouslySetInnerHTML={{ __html: svgBorder }}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
            {/* {paginatedData?.length > 5 && (
              <TableRow sx={{ background: '#ffffff !important' }}>
                <TableCell
                  padding="checkbox"
                  sx={{ backgroundColor: 'transparent' }}
                >
                  <Box>
                    <Button
                      padding="checkbox"
                      size="small"
                      variant="contained"
                      onClick={handleSearchClick}
                      sx={{
                        width: '80%',
                        marginTop: 0.4,
                        marginX: 0.5,
                        textTransform: 'none',
                      }}
                    >
                      Search
                    </Button>
                  </Box>
                </TableCell>

                {rowData?.map((item, index) => (
                  <TableCell
                    key={`search-${item.id}`}
                    align={item.align}
                    width={item.width}
                    sx={{ padding: '4px', background: 'transparent' }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <InnerTextField
                          size="small"
                          margin="dense"
                          onChange={(e) => handleSearchChange(e, item.id)}
                          placeholder={`Search ${item.label}`}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            )} */}
          </TableHead>
          <TableBody>
            {initialLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: rowData?.length + 1 }).map(
                    (_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton variant="text" width="100%" height={20} />
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : tableData?.length > 0 ? (
              paginatedData?.map((item, index) =>
                item?.welcomeTemplate === true ? null : (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f0f2f5',
                      },
                      height: '50px',
                      position: 'relative',
                    }}
                    onMouseEnter={() => setHoveredRow(item.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell padding="checkbox" sx={{ position: 'relative' }}>
                      {hoveredRow === item.id && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            bottom: '0',
                            width: '3px',
                            backgroundColor: '#07826F',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      )}
                      <Checkbox
                        checked={selectedRows?.includes(item.id)}
                        onChange={() => handleSelectedRows(item.id)}
                      />
                    </TableCell>
                    {rowData?.map((column) => (
                      <TableCell
                        key={column.id}
                        width={column.width}
                        sx={{ textAlign: column.textAlign, padding: 0.5 }}
                      >
                        <Box>
                          {column.id === 'status' ? (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',
                              }}
                            >
                              <Switch
                                checked={item.status === 'Active'}
                                onChange={() => handleStatusToggle(item)}
                              />
                            </Box>
                          ) : column.id === 'connectionUrl' ? (
                            <a
                              href={addProtocol(item.connectionUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item?.connectionUrl?.length > 35 ? (
                                <Tooltip title={item.connectionUrl} arrow>
                                  <p className="text-blue-700">
                                    {truncateName(item.connectionUrl, 35)}
                                  </p>
                                </Tooltip>
                              ) : (
                                <p className="text-blue-700">
                                  {item?.connectionUrl}
                                </p>
                              )}
                            </a>
                          ) : (
                            renderTableCell(column, item)
                          )}
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={(rowData?.length ?? 0) + 1}
                  align="center"
                  sx={{ border: 'none', p: 0 }}
                >
                  {noRecordComponent}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          ...paginationFooter,
          marginBottom: tableData?.length >= 0 ? '0.8rem' : '4rem',
        }}
      >
        {tableData?.length > 5 && (
          <Pagination
            count={Math.ceil(totalCount / rowsPerPage)}
            page={page}
            onChange={(event, newPage) => handleChangePage(event, newPage)}
            color="primary"
            sx={paginationStyle}
          />
        )}
        {tableData?.length > 5 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => ''}
            sx={tablePagination}
          />
        )}
      </Box>
    </>
  );
};

export default ListView;
