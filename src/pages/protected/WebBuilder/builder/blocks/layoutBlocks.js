// Layout Blocks
export const layoutBlocks = [
    {
        id: 'column',
        label: 'Column',
        media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"></path></svg>',
        category: 'Layout',
        content: `<div class="col"><p>Single column</p></div>`,
    },
    {
        id: 'two-columns',
        label: '2 Columns',
        media: '<svg viewBox="0 0 23 24"><path fill="currentColor" d="M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z"></path></svg>',
        category: 'Layout',
        content: `
        <div class="row">
            <div class="col"><p>Column 1</p></div>
            <div class="col"><p>Column 2</p></div>
        </div>`,
    },
    {
        id: 'three-columns',
        label: '3 Columns',
        media: '<svg viewBox="0 0 23 24"><path fill="currentColor" d="M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM9 20h5V4H9v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1ZM16 20h5V4h-5v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1Z"></path></svg>',
        category: 'Layout',
        content: `
        <div class="row">
            <div class="col"><p>Column 1</p></div>
            <div class="col"><p>Column 2</p></div>
            <div class="col"><p>Column 3</p></div>
        </div>`,
    },
    {
        id: 'two-column-3-7',
        label: '2 Column 3/7',
        media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z"></path></svg>',
        category: 'Layout',
        content: `
        <div class="row">
            <div class="col-3"><p>Column 1 (3/10)</p></div>
            <div class="col-7"><p>Column 2 (7/10)</p></div>
        </div>`,
    }
];
