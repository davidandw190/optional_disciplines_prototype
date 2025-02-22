import { Box } from "@mui/material";
import { FC } from "react";
import { useTheme } from "@emotion/react";

export const FAQResponseContainer: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: '900px', lg: '1000px' },
        mx: 'auto',
        px: { xs: 0, sm: 2 },
      }}
    >
      {children}
    </Box>
  );
};