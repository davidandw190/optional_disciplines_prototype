import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { CheckCircle, Info } from '@mui/icons-material';

import { Discipline } from '../../../../types/disciplines/disciplines.types';
import { FC } from 'react';

interface RequirementsTabProps {
  discipline: Discipline;
}

export const RequirementsTab: FC<RequirementsTabProps> = ({ discipline }) => {
  return (
    <Stack spacing={4}>
      {discipline.prerequisites.requiredSkills.length > 0 && (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            Required Skills
          </Typography>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <List dense disablePadding>
              {discipline.prerequisites.requiredSkills.map((skill, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircle fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={skill}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}

      {discipline.prerequisites.recommendations && (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            Recommendations
          </Typography>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <List dense disablePadding>
              {discipline.prerequisites.recommendations.map((rec, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Info fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={rec}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Stack>
  );
};
