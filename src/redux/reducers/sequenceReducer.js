import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sequenceName: '',
  sequenceData: {
    schedule: 'now',
    frequency: '',
    // triggerCampaign: false,
    // subscribersInteractionNeeded: false,
    frequencyDateTime: null,
    timeZone: null,
    selectedSegment: null,
    subscriberCount: null,
    sequence: {
      nodes: [
        {
          id: '1',
          type: 'startNode',
          data: { id: '1', label: 'Triggers' },
          position: { x: 250, y: 5 },
        },
      ],
      edges: [],
    },
  },
};

export const sequenceSlice = createSlice({
  name: 'sequence',
  initialState,
  reducers: {
    updateSequenceName(state, { payload }) {
      state.sequenceName = payload;
    },
    updateSequence(state, { payload }) {
      const { nodes, edges } = payload;
      if (nodes) state.sequenceData.sequence.nodes = [...nodes];
      if (edges) state.sequenceData.sequence.edges = [...edges];
    },
    updateSubscribers(state, { payload }) {
      const { selectedSegment, subscriberCount } = payload;
      if (selectedSegment !== undefined)
        state.sequenceData.selectedSegment = selectedSegment;
      if (subscriberCount !== undefined)
        state.sequenceData.subscriberCount = subscriberCount;
    },
    updateOptions(state, { payload }) {
      for (const key in payload.formState) {
        if (state.sequenceData[key] !== payload.formState[key]) {
          state.sequenceData[key] = payload.formState[key];
        }
      }
    },
    updateToEdit(state, { payload }) {
      const {
        sequenceName = '',
        schedule = 'now',
        frequency = '',
        timeZone = null,
        frequencyDateTime = null,
        selectedSegment = null,
        subscriberCount = null,
        sequence = { nodes: [], edges: [] },
      } = payload || {};

      state.sequenceName = sequenceName;
      state.sequenceData = {
        schedule,
        frequency,
        timeZone,
        frequencyDateTime,
        selectedSegment,
        subscriberCount,
        sequence,
      };
    },

    resetState() {
      return initialState;
    },
  },
});

export const {
  updateSequenceName,
  updateSequence,
  updateSubscribers,
  updateOptions,
  updateToEdit,
  resetState,
} = sequenceSlice.actions;

export default sequenceSlice.reducer;
