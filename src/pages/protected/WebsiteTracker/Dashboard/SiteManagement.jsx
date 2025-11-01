import React, { useState } from 'react';
import {
  Plus,
  Globe,
  Calendar,
  Settings,
  Trash2,
  Edit,
  ExternalLink,
} from 'lucide-react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Modal,
} from '@mui/material';

export const SiteManagement = ({ sites, onSiteSelect }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <Box sx={{ width: '80vw', mx: 'auto', py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Site Management
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Manage your tracked websites and applications
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setShowAddForm(true)}
        >
          Add New Site
        </Button>
      </Box>

      {/* Sites Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {sites.map((site) => (
          <Box
            key={site.id}
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.100',
              p: 3,
              boxShadow: 1,
              transition: '0.3s',
              '&:hover': { boxShadow: 3 },
            }}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor:
                      site.status === 'active' ? 'green.100' : 'grey.100',
                    color: site.status === 'active' ? 'green.600' : 'grey.400',
                  }}
                >
                  <Globe size={20} />
                </Box>
                <Box>
                  <Typography fontWeight={600}>{site.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor:
                          site.status === 'active' ? 'green.500' : 'grey.400',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {site.status}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <IconButton size="small" color="inherit">
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: 'error.main' }}>
                  <Trash2 fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ExternalLink size={16} />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {site.url}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Calendar size={16} />
                <Typography variant="body2" color="text.secondary">
                  Created {new Date(site.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Currency: {site.currency}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Timezone: {site.timezone}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => onSiteSelect(site)}
              >
                View Analytics
              </Button>
              <IconButton
                color="default"
                sx={{ border: '1px solid', borderColor: 'grey.300' }}
              >
                <Settings size={16} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Add Site Modal */}
      <Modal open={showAddForm} onClose={() => setShowAddForm(false)}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'white',
            borderRadius: 2,
            p: 4,
            mx: 'auto',
            mt: '10vh',
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Add New Site
          </Typography>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField label="Site Name" placeholder="My Website" fullWidth />
            <TextField
              label="Website URL"
              placeholder="https://example.com"
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Select defaultValue="USD" fullWidth>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
              <Select defaultValue="UTC" fullWidth>
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="EST">EST</MenuItem>
                <MenuItem value="PST">PST</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" fullWidth>
                Add Site
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
