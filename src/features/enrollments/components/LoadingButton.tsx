import { Box, Button, CircularProgress } from "@mui/material";

import { FC } from "react";

export const LoadingButton: FC<{
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  sx?: any;
}> = ({ loading, onClick, disabled, children, sx }) => {
  return (
    <Button
      disabled={loading || disabled}
      onClick={onClick}
      sx={{
        position: 'relative',
        ...sx,
      }}
    >
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: '-12px',
            marginTop: '-12px',
          }}
        />
      )}
      <Box sx={{ opacity: loading ? 0 : 1 }}>{children}</Box>
    </Button>
  );
};
