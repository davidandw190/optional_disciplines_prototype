import { Box, Typography } from "@mui/material";

import { Link } from 'react-router-dom';
import uvtLogo from '../../../assets/uvt-logo.png';

export const SidebarLogo: React.FC = () => {
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Box
          component="img"
          src={uvtLogo}
          alt="FMI Logo"
          sx={{
            width: '120px',
            height: 'auto',
            mb: 2,
            transition: 'transform 0.15s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        />
      </Link>
      <Typography
        variant="h6"
        sx={{
          color: 'primary.main',
          fontWeight: 600,
          fontSize: '1.1rem',
          letterSpacing: '0.02em',
        }}
      >
        FMI Enroll
      </Typography>
    </Box>
  );
};