import { Assignment, Grade } from '@mui/icons-material';
import { Box, Chip, Grid, Paper, Stack, Typography, alpha } from '@mui/material';

import { Discipline } from '../../../../types/disciplines/disciplines.types';
import { FC } from 'react';

interface EvaluationTabProps {
  discipline: Discipline;
}

export const EvaluationTab: FC<EvaluationTabProps> = ({ discipline }) => {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Evaluation Components
        </Typography>
        <Grid container spacing={2}>
          {discipline.evaluationSystem.components.map((component, index) => (
            <Grid item xs={12} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2.5, 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2
                }}
              >
                <Stack spacing={2}>
                  <Stack 
                    direction="row" 
                    spacing={2} 
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      {component.type}
                    </Typography>
                    <Chip
                      icon={<Grade fontSize="small" />}
                      label={`${component.weightInFinalGrade}%`}
                      size="small"
                      color="primary"
                    />
                  </Stack>

                  {component.description && (
                    <Typography variant="body2" color="text.secondary">
                      {component.description}
                    </Typography>
                  )}

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Evaluation Methods:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {component.evaluationMethods.map((method, idx) => (
                        <Chip 
                          key={idx}
                          label={method}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>

                  {component.minimumGrade && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'warning.main',
                        bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                        py: 1,
                        px: 1.5,
                        borderRadius: 1
                      }}
                    >
                      Minimum required grade: {component.minimumGrade}
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          General Requirements
        </Typography>
        <Paper 
          elevation={0}
          sx={{ 
            p: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Stack spacing={2}>
            {discipline.evaluationSystem.minimumRequirements.map((req, index) => (
              <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
                <Assignment fontSize="small" color="primary" sx={{ mt: 0.5 }} />
                <Typography variant="body2">{req}</Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
};
