// Form Blocks
export const formBlocks = [
    {
        id: 'form',
        label: 'Form',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 5.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 8H3V6h18v2zM22 10.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 13H3v-2h18v2z"/><rect width="10" height="3" x="2" y="15" rx=".5"></rect></svg>',
        category: 'Forms',
        content: `<form><input type="text" placeholder="Your Name"/><button type="submit">Submit</button></form>`,
    },
    {
        id: 'input',
        label: 'Input',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h1v4H4z"></path></svg>',
        category: 'Forms',
        content: '<input type="text" placeholder="Type here"/>',
    },
    {
        id: 'textarea',
        label: 'Text Area',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7.5c0-.9-.5-1.5-1.3-1.5H3.4C2.5 6 2 6.6 2 7.5v9c0 .5.5.9 1.3.9h17.4c.8 0 1.3-.4 1.3-.9v-9zM21 17H3V7h18v10z"/><path d="M4 8h1v4H4zM19 7h1v10h-1zM20 8h1v1h-1zM20 15h1v1h-1z"></path></svg>',
        category: 'Forms',
        content: '<textarea placeholder="Type here"></textarea>',
    },
    {
        id: 'select',
        label: 'Select',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M18.5 13l1.5-2h-3zM4 11.5h11v1H4z"></path></svg>',
        category: 'Forms',
        content: `<select><option value="Option 1">Option 1</option><option value="Option 2">Option 2</option></select>`,
    },
    {
        id: 'button',
        label: 'Button',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"></path></svg>',
        category: 'Forms',
        content: '<button>Click Me</button>',
    },
    {
        id: 'checkbox',
        label: 'Checkbox',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2z"/></svg>',
        category: 'Forms',
        content: {
            type: 'checkbox',
            content: `<div class="custom-checkbox">
                <input type="checkbox" id="checkbox1">
                <label for="checkbox1">Check me</label>
            </div>`,
            attributes: { class: 'checkbox-block' }
        }
    },
    {
        id: 'radio',
        label: 'Radio Button',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>',
        category: 'Forms',
        content: {
            type: 'radio',
            content: `<div class="custom-radio">
                <input type="radio" id="radio1" name="radio-group">
                <label for="radio1">Option 1</label>
                <input type="radio" id="radio2" name="radio-group">
                <label for="radio2">Option 2</label>
            </div>`,
            attributes: { class: 'radio-block' }
        }
    },
    {
        id: 'checkbox-group',
        label: 'Checkbox Group',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        category: 'Forms',
        content: `
        <div class="checkbox-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="check1">
                <label class="form-check-label" for="check1">
                    Option 1
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="check2">
                <label class="form-check-label" for="check2">
                    Option 2
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="check3">
                <label class="form-check-label" for="check3">
                    Option 3
                </label>
            </div>
        </div>
        `
    },
    {
        id: 'radio-group',
        label: 'Radio Group',
        media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
        category: 'Forms',
        content: `
        <div class="radio-group">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radioGroup" id="radio1" value="option1">
                <label class="form-check-label" for="radio1">
                    Option 1
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radioGroup" id="radio2" value="option2">
                <label class="form-check-label" for="radio2">
                    Option 2
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radioGroup" id="radio3" value="option3">
                <label class="form-check-label" for="radio3">
                    Option 3
                </label>
            </div>
        </div>
        `
    }
];
