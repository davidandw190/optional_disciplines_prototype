import { Box, Button, Typography } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: 2,
            p: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}