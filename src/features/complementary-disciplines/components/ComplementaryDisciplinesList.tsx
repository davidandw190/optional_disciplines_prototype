import { Box, Container, Fade, Grid, Stack, useTheme } from '@mui/material';
import { FC, memo } from 'react';

import { ComplementaryDisciplineCard } from './ComplementaryDisciplineCard';
import { Discipline } from '../../../types/disciplines/disciplines.types';

interface ComplementaryDisciplineListProps {
  disciplines: Discipline[];
  onViewDetails: (discipline: Discipline) => void;
  isEnrollmentPeriodActive: boolean;
}

export const ComplementaryDisciplineList: FC<ComplementaryDisciplineListProps> =
  memo(({ disciplines, onViewDetails, isEnrollmentPeriodActive }) => {
    const theme = useTheme();

    return (
      <Container
        disableGutters
        sx={{
          width: '100%',
          position: 'relative',
          background:
            theme.palette.mode === 'light'
              ? `linear-gradient(${theme.palette.primary.main}08 1px, transparent 1px)`
              : 'none',
          backgroundSize: '100% 48px',
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)', 
              lg: 'repeat(3, 1fr)', 
            },
            gap: { xs: 2, sm: 3 },
            alignItems: 'stretch',
          }}
        >
          {disciplines.map((discipline, index) => (
            <Fade
              key={discipline.id}
              in={true}
              timeout={300}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  '& > *': {
                    minHeight: { xs: '200px', sm: 'auto' },
                  },
                  width: '100%',
                  maxWidth: '110%',
                }}
              >
                <ComplementaryDisciplineCard
                  discipline={discipline}
                  onViewDetails={() => onViewDetails(discipline)}
                  isEnrollmentPeriodActive={isEnrollmentPeriodActive}
                />
              </Box>
            </Fade>
          ))}

          {/* Empty state handling */}
          {disciplines.length === 0 && (
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                py: 8,
                color: theme.palette.text.secondary,
                gridColumn: '1/-1', 
              }}
            >
              <Box
                component="img"
                src="/assets/illustrations/empty-state.svg"
                alt="No disciplines"
                sx={{
                  width: { xs: '200px', sm: '250px' },
                  height: 'auto',
                  opacity: 0.5,
                }}
              />
              <Box sx={{ textAlign: 'center' }}>
                No disciplines available at the moment.
              </Box>
            </Stack>
          )}
        </Grid>
      </Container>
    );
  });
