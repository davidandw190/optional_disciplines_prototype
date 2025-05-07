import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';

import { FC } from 'react';
import { formatDate } from '../../../utils/dateUtils';
import { useAuth } from '../../../contexts/auth.context';
import { useStudent } from '../../../contexts/student.context';

export const ProfilePage: FC = () => {
  const { student, isLoading } = useStudent();
  const { logout } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading student profile...</Typography>
      </Box>
    );
  }

  if (!student) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No student profile found.</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant="h4"
        color="primary.main"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Student Profile
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1">
                  {student.firstName} {student.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  University ID
                </Typography>
                <Typography variant="body1">{student.universityId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{student.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone Number
                </Typography>
                <Typography variant="body1">
                  {student.personalInfo?.phoneNumber || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body1">
                  {student.personalInfo?.address || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Citizenship
                </Typography>
                <Typography variant="body1">
                  {student.personalInfo?.citizenship || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Date of Birth
                </Typography>
                <Typography variant="body1">
                  {student.personalInfo?.birthDate
                    ? formatDate(student.personalInfo.birthDate)
                    : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Academic Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Specialization
                </Typography>
                <Typography variant="body1">
                  {student.specialization}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Year of Study
                </Typography>
                <Typography variant="body1">{student.yearOfStudy}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Semester
                </Typography>
                <Typography variant="body1">{student.semester}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Group
                </Typography>
                <Typography variant="body1">
                  {student.group}/{student.subgroup}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Typography variant="body1">{student.status}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="primary" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
