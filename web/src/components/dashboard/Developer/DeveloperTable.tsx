'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Developer, DeveloperTableProps } from '../../../constants/types';

function Row({ row }: { row: Developer }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Name}
        </TableCell>
        <TableCell align="center">{row.Phone}</TableCell>
        <TableCell align="center">{row.Email}</TableCell>
        <TableCell align="center">{row.Designation}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              <Typography variant="h6" gutterBottom component="div">
                Skills and Expertise
              </Typography>
              <Typography paragraph dangerouslySetInnerHTML={{ __html: row.TechnicalSkills }}></Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const DeveloperTable: React.FC<DeveloperTableProps> = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#eeee' }}>
            <TableCell />
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Name
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Phone
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Email
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Designation
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeveloperTable;
