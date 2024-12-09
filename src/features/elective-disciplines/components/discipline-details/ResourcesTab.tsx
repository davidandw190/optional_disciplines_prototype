import { Box, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { Launch, MenuBook } from '@mui/icons-material';

import { Discipline } from '../../../../types/disciplines/disciplines.types';
import { FC } from 'react';

interface ResourcesTabProps {
  discipline: Discipline;
}

export const ResourcesTab: FC<ResourcesTabProps> = ({ discipline }) => {
  return (
    <Stack spacing={4}>
      {discipline.bibliography && (
        <>
          <Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Required Reading
            </Typography>
            <Grid container spacing={2}>
              {discipline.bibliography.required.map((book, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <Stack spacing={1}>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="flex-start"
                      >
                        <MenuBook color="primary" sx={{ mt: 0.5 }} />
                        <Box>
                          <Typography variant="subtitle2" gutterBottom>
                            {book.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {book.authors} ({book.year})
                          </Typography>
                          {book.isbn && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              ISBN: {book.isbn}
                            </Typography>
                          )}
                        </Box>
                      </Stack>

                      {book.url && (
                        <Link
                          href={book.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          <Launch fontSize="small" />
                          Access Resource
                        </Link>
                      )}
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {discipline.bibliography.recommended.length > 0 && (
            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Recommended Reading
              </Typography>
              <Grid container spacing={2}>
                {discipline.bibliography.recommended.map((book, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                      }}
                    >
                      <Stack spacing={1}>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="flex-start"
                        >
                          <MenuBook color="primary" sx={{ mt: 0.5 }} />
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              {book.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {book.authors} ({book.year})
                            </Typography>
                          </Box>
                        </Stack>

                        {book.url && (
                          <Link
                            href={book.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              color: 'primary.main',
                              textDecoration: 'none',
                              '&:hover': { textDecoration: 'underline' },
                            }}
                          >
                            <Launch fontSize="small" />
                            Access Resource
                          </Link>
                        )}
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {discipline.bibliography.online.length > 0 && (
            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Online Resources
              </Typography>
              <Grid container spacing={2}>
                {discipline.bibliography.online.map((resource, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography variant="subtitle2">
                          {resource.title}
                        </Typography>
                        {resource.authors && (
                          <Typography variant="body2" color="text.secondary">
                            {resource.authors}
                          </Typography>
                        )}
                        {resource.url && (
                          <Link
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              color: 'primary.main',
                              textDecoration: 'none',
                              '&:hover': { textDecoration: 'underline' },
                            }}
                          >
                            <Launch fontSize="small" />
                            Access Resource
                          </Link>
                        )}
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {discipline.teachingActivities.some(
            (activity) => activity.conditions.platforms?.length
          ) && (
            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Teaching Platforms
              </Typography>
              <Grid container spacing={2}>
                {discipline.teachingActivities
                  .flatMap((activity) => activity.conditions.platforms || [])
                  .map((platform, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 2,
                        }}
                      >
                        <Stack spacing={1}>
                          <Typography variant="subtitle2">
                            {platform.name}
                            {platform.required && ' (Required)'}
                          </Typography>
                          {platform.details && (
                            <Typography variant="body2" color="text.secondary">
                              {platform.details}
                            </Typography>
                          )}
                          {platform.url && (
                            <Link
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' },
                              }}
                            >
                              <Launch fontSize="small" />
                              Access Platform
                            </Link>
                          )}
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </>
      )}
    </Stack>
  );
};
