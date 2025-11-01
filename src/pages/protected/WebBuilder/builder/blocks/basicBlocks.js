// Basic Blocks
export const basicBlocks = [
    {
        id: 'text',
        label: 'Text',
        media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z"/></svg>',
        category: 'Basic',
        content: '<div data-gjs-type="text">Insert your text here</div>',
    },
    {
        id: 'image',
        label: 'Image',
        media: '<svg viewBox="0 0 24 24"><path d="M21 19V5H3v14H21zm-2-2H5V7h14v10zm-6-3.5l2.25 3 3-4L19 17H5l4-5.25L12.75 13.5z"></path></svg>',
        category: 'Basic',
        content: { type: 'image' },
        activate: true,
    },
    {
        id: 'section',
        label: '<b>Section</b>',
        media: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>',
        category: 'Basic',
        content: `
        <section>
            <h1>Section Title</h1>
            <p>This is a section with some text.</p>
        </section>
        `,
    },
    {
        id: 'link',
        label: 'Link',
        media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"/></svg>',
        category: 'Basic',
        content: {
            type: 'link',
            content: 'Insert link text here',
            attributes: { href: '#' }
        },
    },
    {
        id: 'quote',
        label: 'Quote',
        media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14,17H17L19,13V7H13V13H16L14,17M6,17H9L11,13V7H5V13H8L6,17Z"></path></svg>',
        category: 'Basic',
        content: {
            type: 'text',
            content: '<blockquote>Insert your quote here</blockquote>',
            attributes: { class: 'quote-block' }
        }
    },
    {
        id: 'text-section',
        label: 'Text Section',
        media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z"></path></svg>',
        category: 'Basic',
        content: {
            type: 'text',
            content: '<section><p>Insert your text here</p></section>',
            attributes: { class: 'text-section' }
        }
    }
];
