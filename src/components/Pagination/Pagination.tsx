import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationRounded: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-page.Mui-selected": {
            background: "linear-gradient(145deg, var(--primaryColor), var(--primaryColor))",
            color: "#fff",
          },
          "& .MuiPaginationItem-page:hover": {
            background: "linear-gradient(145deg, var(--hoverColor), var(--hoverColor))",
            color: "#fff",
          },
        }}
      />
    </Stack>
  );
};

export default PaginationRounded;
