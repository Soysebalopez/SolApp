import type { ReactNode } from 'react';
import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';

interface CardProps {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
}

const Card = ({ title, children, action }: CardProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '12px',
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
      }}
    >
      {title && (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h3" color="text.primary">
            {title}
          </Typography>
          {action && (
            <Box sx={{ ml: 2 }}>
              {action}
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default Card; 