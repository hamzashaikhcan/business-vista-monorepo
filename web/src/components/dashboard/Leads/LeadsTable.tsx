import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CustomTablePagination from '../../../constants/CustomPagination';
import { Lead, LeadsTableDataProps } from '../../../constants/types';

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'green';
    case 'in progress':
      return 'orange';
    case 'rejected':
      return 'red';
    default:
      return 'black';
  }
}

const Row: React.FC<{ row: Lead }> = ({ row }) => {
  const [open, setOpen] = useState(false);

  const getResumeUrl = (resume: string | null): string | null => {
    if (resume) {
      return `/path/to/resumes/${resume}`;
    }
    return null;
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ID}
        </TableCell>
        <TableCell align="center">{row.Job_Title}</TableCell>
        <TableCell align="center">{row.Lead}</TableCell>
        <TableCell align="center">{row.BD}</TableCell>
        <TableCell align="center">{row.Dev}</TableCell>
        <TableCell
          align="center"
          style={{
            color: getStatusColor(row.Status),
            borderRadius: '4px',
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '4px',
            fontSize: '12px',
            width: '100px',
          }}>
          {row.Status}
        </TableCell>
        <TableCell align="center">{row.InterviewStage.join(', ')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              {row.resume && (
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom component="div">
                    Resume:
                  </Typography>
                  <Button
                    color="primary"
                    href={getResumeUrl(row.resume) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={!getResumeUrl(row.resume)}>
                    View Resume
                  </Button>
                </Box>
              )}
              <Typography variant="h6" gutterBottom component="div">
                Description:
              </Typography>
              <Typography paragraph dangerouslySetInnerHTML={{ __html: row.description }}></Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const LeadsTableData: React.FC<LeadsTableDataProps> = ({ rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) => value?.toString().toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <TableContainer sx={{ paddingX: '15px' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: '15px', marginTop: '10px', width: '30%' }}
      />
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#eeee' }}>
            <TableCell />
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              ID
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Job Title
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Lead
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              BD
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Dev
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Status
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Interview Stage
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredRows).map(
            (row) => (
              <Row key={row.ID} row={row} />
            ),
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={8} />
            </TableRow>
          )}
        </TableBody>
        <tfoot>
          <TableRow>
            <CustomTablePagination
              count={filteredRows.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </tfoot>
      </Table>
    </TableContainer>
  );
};

export default LeadsTableData;
