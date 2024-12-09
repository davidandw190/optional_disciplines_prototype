import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography, alpha } from "@mui/material";

import { Discipline } from "../../../../types/disciplines/disciplines.types";
import { School } from "@mui/icons-material";

export const OverviewTab = ({ discipline }: { discipline: Discipline }) => {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
          Course Description
        </Typography>
        <Paper 
          elevation={0} 
          sx={{ p: 2, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04) }}
        >
          <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
            {discipline.description || 'No description available.'}
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
          Learning Outcomes
        </Typography>
        <Grid container spacing={2}>
          {discipline.learningOutcomes.map((outcome, index) => (
            <Grid item xs={12} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2, 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="primary">
                    {outcome.category}
                  </Typography>
                  <Typography variant="body2">
                    {outcome.description}
                  </Typography>
                  <List dense disablePadding>
                    {outcome.outcomes.map((item, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <School fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};