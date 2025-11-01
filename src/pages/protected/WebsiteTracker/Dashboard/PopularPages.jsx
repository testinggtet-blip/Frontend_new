import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
} from '@mui/material';
import { ExternalLink } from 'lucide-react';
import { fetchPopularPages } from 'Api/Api';
import { tableScrollbar } from 'components/Style';

export const PopularPages = ({ pages }) => {
  return (
    <Box
      sx={{
        ...tableScrollbar,
        width: '100%',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 1,
        borderColor: 'grey.100',
        px: 2.5,
        py: 1.5,
        height: 'auto',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" mb={1} fontWeight={400} color="text.primary">
          Popular Pages
        </Typography>
      </Box>

      {pages.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No pages available.
        </Typography>
      ) : (
        <Box
          sx={{
            maxHeight: 400,
            overflowY: 'auto',
            overflowX: 'auto',
            pr: 1,
            ...tableScrollbar,
          }}
        >
          <Box
            sx={{
              ...tableScrollbar,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                boxShadow: 'none',
                minWidth: '100%',
                background: 'transparent',
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 400, color: 'text.secondary', py: 1 }}
                    >
                      Page
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 400, color: 'text.secondary', py: 1 }}
                    >
                      Views
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 400, color: 'text.secondary', py: 1 }}
                    >
                      Unique
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 400, color: 'text.secondary', py: 1 }}
                    >
                      Avg Time
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {pages?.map((page, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ py: 1.5 }}>
                        <Box display="flex" flexDirection="column" gap={0.25}>
                          <Box display="flex" alignItems="center" gap={0.75}>
                            <Typography fontWeight={500} color="text.primary">
                              {page.title}
                            </Typography>
                            <IconButton
                              size="small"
                              href={page.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ color: 'text.secondary', p: 0 }}
                            >
                              <ExternalLink size={16} />
                            </IconButton>
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: 0.25 }}
                          >
                            {page.url}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {page.pageViews.toLocaleString()}
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'text.secondary' }}>
                        {page.uniquePageViews.toLocaleString()}
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'text.secondary' }}>
                        {page.avgTimeOnPage}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </Box>
  );
};
