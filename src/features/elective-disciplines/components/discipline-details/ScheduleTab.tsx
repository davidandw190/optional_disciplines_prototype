import {
  AccessTime,
  Email,
  LocationOn,
  Person
} from '@mui/icons-material';
import { Box, Chip, Grid, Paper, Stack, Typography } from '@mui/material';

import { Discipline } from '../../../../types/disciplines/disciplines.types';
import { FC } from 'react';

interface ScheduleTabProps {
  discipline: Discipline;
}

export const ScheduleTab: FC<ScheduleTabProps> = ({ discipline }) => {
  return (
    <Stack spacing={4}>
      {discipline.teachingActivities.map((activity, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            p: 2.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                {activity.type}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                {activity.teachingMethods.map((method, idx) => (
                  <Chip 
                    key={idx}
                    label={method}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Person fontSize="small" color="primary" />
                    <Typography variant="body2" fontWeight={500}>
                      {activity.teacher.academicTitle.abbreviation}.{' '}
                      {activity.teacher.firstName} {activity.teacher.lastName}
                    </Typography>
                  </Stack>
                  
                  {activity.teacher.email && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Email fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {activity.teacher.email}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTime fontSize="small" color="primary" />
                    <Typography variant="body2">
                      {activity.hoursPerWeek} hours/week ({activity.totalHours} total hours)
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOn fontSize="small" color="primary" />
                    <Typography variant="body2">
                      {activity.conditions.location}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            {activity.conditions.requirements.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Requirements:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {activity.conditions.requirements.map((req, idx) => (
                    <Chip 
                      key={idx}
                      label={req}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};
