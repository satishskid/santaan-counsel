// Comprehensive Protocol Templates
export const PROTOCOLS = [
  {
    id: 'protocol_antagonist_150',
    name: 'Antagonist 150 IU',
    category: 'ovarian_stimulation',
    duration: 10,
    color: '#9333EA',
    schedule: [
      {
        day: 1,
        label: 'Start Stimulation',
        events: [
          {
            type: 'medication',
            name: 'Gonal-F 150 IU',
            time: '21:00',
            actions: [
              {
                  actionType: 'whatsapp',
                  templateKey: 'injection_start',
                  time: '20:00',
                  location: 'remote',
                  icon: '📱'
                }
              ]
            }
          ]
        },
        {
          day: 2,
          label: 'Continue Stimulation',
          events: [
            {
              type: 'medication',
              name: 'Gonal-F 150 IU',
              time: '21:00',
              actions: [
                {
                  actionType: 'whatsapp',
                  templateKey: 'injection_checkin',
                  time: '10:00',
                  location: 'remote',
                  icon: '📱'
                }
              ]
            }
          ]
        },
        {
          day: 3,
          label: 'Monitoring Day',
          events: [
            {
              type: 'appointment',
              name: 'Monitoring Scan',
              time: '09:00',
              actions: [
                {
                  actionType: 'call',
                  templateKey: 'scan_reminder',
                  relativeDay: -1,
                  time: '17:00',
                  location: 'remote',
                  icon: '📞'
                }
              ]
            },
            {
              type: 'medication',
              name: 'Gonal-F 150 IU',
              time: '21:00',
              actions: []
            }
          ]
        },
        {
          day: 5,
          label: 'Monitoring Day',
          events: [
            {
              type: 'appointment',
              name: 'Monitoring Scan',
              time: '09:00',
              actions: [
                {
                  actionType: 'call',
                  templateKey: 'scan_reminder',
                  relativeDay: -1,
                  time: '17:00',
                  location: 'remote',
                  icon: '📞'
                }
              ]
            },
            {
              type: 'medication',
              name: 'Gonal-F 150 IU + Ganirelix',
              time: '21:00',
              actions: [
                {
                  actionType: 'whatsapp',
                  templateKey: 'antagonist_start',
                  time: '20:00',
                  location: 'remote',
                  icon: '📱'
                }
              ]
            }
          ]
        },
        {
          day: 7,
          label: 'Monitoring Day',
          events: [
            {
              type: 'appointment',
              name: 'Monitoring Scan',
              time: '09:00',
              actions: []
            },
            {
              type: 'medication',
              name: 'Gonal-F 150 IU + Ganirelix',
              time: '21:00',
              actions: []
            }
          ]
        },
        {
          day: 9,
          label: 'Final Check',
          events: [
            {
              type: 'appointment',
              name: 'Monitoring Scan',
              time: '09:00',
              actions: []
            },
            {
              type: 'medication',
              name: 'Gonal-F 150 IU + Ganirelix',
              time: '21:00',
              actions: []
            }
          ]
        },
        {
          day: 10,
          label: 'Trigger Day',
          events: [
            {
              type: 'medication',
              name: 'Trigger Shot (hCG)',
              time: '22:00',
              actions: [
                {
                  actionType: 'call',
                  templateKey: 'trigger_instructions',
                  time: '17:00',
                  location: 'remote',
                  icon: '📞',
                  priority: 'high'
                }
              ]
            }
          ]
        }
      ]
    },
    
    {
      id: 'protocol_antagonist_225',
      name: 'Antagonist 225 IU',
      category: 'ovarian_stimulation',
      duration: 10,
      color: '#9333EA',
      schedule: [] // Similar to 150 but higher dose
    },
    
    {
      id: 'protocol_agonist_long',
      name: 'Agonist Long Protocol',
      category: 'ovarian_stimulation',
      duration: 21,
      color: '#9333EA',
      schedule: [
        {
          day: 1,
          label: 'Start Lupron (Day 21 of prev cycle)',
          events: [
            {
              type: 'medication',
              name: 'Lupron 0.5 mg',
              time: '21:00',
              actions: [
                {
                  actionType: 'whatsapp',
                  templateKey: 'lupron_start',
                  time: '20:00',
                  location: 'remote',
                  icon: '📱'
                }
              ]
            }
          ]
        },
        {
          day: 14,
          label: 'Baseline Scan (Day 2 of cycle)',
          events: [
            {
              type: 'appointment',
              name: 'Baseline Scan + E2',
              time: '09:00',
              actions: [
                {
                  actionType: 'call',
                  templateKey: 'baseline_reminder',
                  relativeDay: -1,
                  time: '17:00',
                  location: 'remote',
                  icon: '📞'
                }
              ]
            },
            {
              type: 'medication',
              name: 'Lupron 0.5 mg',
              time: '21:00',
              actions: []
            }
          ]
        },
        {
          day: 15,
          label: 'Start Gonal-F (Day 3)',
          events: [
            {
              type: 'medication',
              name: 'Gonal-F 225 IU',
              time: '21:00',
              actions: [
                {
                  actionType: 'whatsapp',
                  templateKey: 'gonadotropin_start',
                  time: '20:00',
                  location: 'remote',
                  icon: '📱'
                }
              ]
            },
            {
              type: 'medication',
              name: 'Lupron 0.5 mg (reduce dose)',
              time: '09:00',
              actions: []
            }
          ]
        }
        // ... continues for 21 days
      ]
    },
    
    {
      id: 'protocol_natural_cycle',
      name: 'Natural Cycle',
      category: 'ovarian_stimulation',
      duration: 14,
      color: '#9333EA',
      schedule: [
        {
          day: 10,
          label: 'Ovulation Monitoring',
          events: [
            {
              type: 'appointment',
              name: 'Follicular Scan',
              time: '09:00',
              actions: []
            }
          ]
        },
        {
          day: 12,
          label: 'Trigger/OPU Planning',
          events: [
            {
              type: 'appointment',
              name: 'Final Scan',
              time: '09:00',
              actions: []
            }
          ]
        }
      ]
    },
    
    {
      id: 'protocol_mild_stim',
      name: 'Mild Stimulation',
      category: 'ovarian_stimulation',
      duration: 12,
      color: '#9333EA',
      schedule: [] // Lower dose protocol
    },
    
    {
      id: 'protocol_luteal_support',
      name: 'Luteal Phase Support',
      category: 'post_transfer',
      duration: 14,
      color: '#059669',
      schedule: [
        {
          day: 1,
          label: 'Start Progesterone',
          events: [
            {
              type: 'medication',
              name: 'Progesterone 400mg',
              time: '08:00',
              actions: [
                {
                  actionType: 'whatsapp',
                  templateKey: 'luteal_support_start',
                  time: '07:00',
                  location: 'remote',
                  icon: '📱'
                }
              ]
            },
            {
              type: 'medication',
              name: 'Progesterone 400mg',
              time: '20:00',
              actions: []
            }
          ]
        },
        {
          day: 14,
          label: 'Beta hCG Test',
          events: [
            {
              type: 'appointment',
              name: 'Blood Test',
              time: '08:00',
              actions: [
                {
                  actionType: 'call',
                  templateKey: 'beta_reminder',
                  relativeDay: -1,
                  time: '17:00',
                  location: 'remote',
                  icon: '📞'
                }
              ]
            }
          ]
        }
      ]
    },
    
    {
      id: 'protocol_monitoring_std',
      name: 'Standard Monitoring',
      category: 'monitoring',
      duration: 10,
      color: '#0891B2',
      schedule: [] // Scan every 2-3 days
    }
  ]
;
